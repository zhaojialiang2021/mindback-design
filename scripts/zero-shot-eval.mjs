#!/usr/bin/env node
// zero-shot-eval.mjs —— 零样本测试集评分器
//
// brief §2.3 的核心 KPI：合法 token 使用率 / props 命中率 / 状态完整性
//
// 输入：zero-shot-tests/samples/*.tsx（真实 AI 输出贴这里）
// 输出：zero-shot-tests/results/<timestamp>.json + 命令行报告
//
// 用法：node scripts/zero-shot-eval.mjs

import { readFileSync, readdirSync, writeFileSync, existsSync } from 'node:fs'
import { join, dirname, basename } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const TESTS = join(ROOT, 'zero-shot-tests')
const TOKENS = JSON.parse(readFileSync(join(ROOT, 'tokens/build/tokens.flat.json'), 'utf-8')).tokens
const COMPS = JSON.parse(readFileSync(join(ROOT, 'tokens/build/components.json'), 'utf-8')).components

const TOKEN_NAMES = new Set(TOKENS.map((t) => '--' + (t.name.startsWith('color.') ? t.name.slice(6) : t.name.startsWith('typography.') ? t.name.slice(11) : t.name).replace(/\./g, '-').replace('xlarge', 'x-large')))

// 期望状态：每个 prompt 文件名对应一组期望覆盖的状态/组件
const EXPECTATIONS = {
  '01-login-page': {
    requiredComponents: ['Button', 'Input'],
    requiredStates: ['empty', 'focus', 'error', 'disabled'],
    requiredButtonIntents: ['primary', 'ghost'],
  },
  '02-file-upload': {
    requiredComponents: ['Button'],
    requiredStates: ['empty', 'loading', 'error'],
  },
  '03-delete-confirm': {
    requiredComponents: ['Button'],
    requiredButtonIntents: ['destructive', 'secondary'],
  },
  '04-empty-channel': {
    requiredComponents: ['EmptyState', 'Button'],
    requiredKinds: ['first-time'],
  },
  '05-search-result': {
    requiredComponents: ['Card', 'EmptyState'],
    requiredStates: ['empty', 'loading', 'no-result'],
  },
}

// === 评分规则 ===
function scoreSample(name, src) {
  const exp = EXPECTATIONS[name] ?? {}
  const result = {
    name,
    metrics: {},
    violations: [],
  }

  // 1. 合法 token 使用率：所有 var(--xxx) 必须命中令牌名
  const varRefs = [...src.matchAll(/var\(\s*(--[\w-]+)\s*\)/g)].map((m) => m[1])
  const totalVar = varRefs.length
  const validVar = varRefs.filter((v) => {
    // 接受 typography 衍生（--*-size, --*-weight, --*-line-height）
    if (/-(size|weight|line-height)$/.test(v)) {
      const base = v.replace(/-(size|weight|line-height)$/, '')
      return TOKEN_NAMES.has(base) || TOKENS.some((t) => t.type === 'typography' && '--' + t.name.slice('typography.'.length) === base)
    }
    return TOKEN_NAMES.has(v)
  }).length
  const tokenUsageRate = totalVar === 0 ? 0 : validVar / totalVar
  result.metrics.tokenUsageRate = tokenUsageRate
  result.metrics.tokenRefsTotal = totalVar
  result.metrics.tokenRefsValid = validVar

  // 2. 硬编码字面量：hex / rgba / 非 0/1px 的 px-magic
  const hexes = (src.match(/#[0-9A-Fa-f]{3,8}\b/g) || []).filter((h) => h.length >= 4)
  const rgbas = src.match(/rgba?\(\s*\d/g) || []
  const pxLits = (src.match(/\b(?<!var\(--[\w-]*?\b)([2-9]|[1-9]\d+)px\b/g) || []).filter((p) => p !== '1px')
  result.metrics.hardcodedHex = hexes.length
  result.metrics.hardcodedRgba = rgbas.length
  result.metrics.hardcodedPx = pxLits.length

  // 3. 组件覆盖：先看字面引用（PascalCase / mb- 前缀 / kebab class），
  //    再补一层语义启发式——inline 实现也能识别。
  const heuristics = {
    EmptyState: [
      /kind=['"](?:empty|no-result|no-permission|error|first-time)['"]/, // schema enum
      /mb-button--primary[^"]*["'][^>]*>[^<]{0,30}(创建|开始|了解|重试|清除)/u, // 引导式 CTA
      /illustration[=:]['"]?(?:icon|spot|scene)['"]?/, // schema 字段
    ],
    Card: [
      /var\(--radius-(?:large|x-large)\)[\s\S]{0,100}?var\(--space-/, // 圆角 + padding 的卡片骨架
      /border:[^,;]*var\(--line-non-opaque\)/, // hairline 卡片边
    ],
    Button: [/mb-button--/, /\bButton\b/],
    Input: [/<input[\s>]/i, /\bInput\b/],
  }

  const usedComponents = (exp.requiredComponents || []).map((c) => {
    const literal = new RegExp(`\\b${c}\\b`).test(src) || new RegExp(`mb-${c.toLowerCase()}`).test(src)
    if (literal) return { name: c, found: true, by: 'literal' }
    const rules = heuristics[c] || []
    const heuristic = rules.some((re) => re.test(src))
    return { name: c, found: heuristic, by: heuristic ? 'heuristic' : 'none' }
  })
  result.metrics.componentCoverage =
    usedComponents.length === 0
      ? 1
      : usedComponents.filter((c) => c.found).length / usedComponents.length
  result.metrics.componentsFound = usedComponents

  // 4. 状态完整性
  const usedStates = (exp.requiredStates || []).map((s) => ({
    name: s,
    found: new RegExp(`['"]${s}['"]`).test(src),
  }))
  result.metrics.stateCompleteness =
    usedStates.length === 0 ? 1 : usedStates.filter((s) => s.found).length / usedStates.length
  result.metrics.statesFound = usedStates

  // 5. Props 命中：检测 mb-button--{intent}
  const usedIntents = (exp.requiredButtonIntents || []).map((i) => ({
    name: i,
    found: new RegExp(`mb-button--${i}\\b`).test(src) || new RegExp(`intent=['"]${i}['"]`).test(src),
  }))
  result.metrics.propHitRate =
    usedIntents.length === 0 ? 1 : usedIntents.filter((i) => i.found).length / usedIntents.length
  result.metrics.intentsFound = usedIntents

  // 综合分（加权）
  const composite =
    (result.metrics.tokenUsageRate * 0.4 +
      (result.metrics.hardcodedHex + result.metrics.hardcodedRgba + result.metrics.hardcodedPx === 0 ? 1 : 0) * 0.2 +
      result.metrics.componentCoverage * 0.15 +
      result.metrics.stateCompleteness * 0.15 +
      result.metrics.propHitRate * 0.1)
  result.metrics.composite = composite

  return result
}

function fmt(p) {
  return (p * 100).toFixed(1) + '%'
}

function main() {
  const samplesDir = join(TESTS, 'samples')
  const files = readdirSync(samplesDir).filter((f) => f.endsWith('.tsx'))
  if (files.length === 0) {
    console.log('⚠ samples/ 为空。把 AI 真实输出贴到 zero-shot-tests/samples/<name>.tsx 后再跑。')
    process.exit(0)
  }

  const results = []
  for (const f of files) {
    const name = basename(f, '.tsx')
    const src = readFileSync(join(samplesDir, f), 'utf-8')
    results.push(scoreSample(name, src))
  }

  // 输出
  console.log('')
  console.log('=== 零样本测试集评分报告 ===')
  console.log('')

  let avgComposite = 0
  for (const r of results) {
    const m = r.metrics
    console.log(`${r.name}`)
    console.log(`  综合分           ${fmt(m.composite)}`)
    console.log(`  Token 使用率      ${fmt(m.tokenUsageRate)}  (${m.tokenRefsValid}/${m.tokenRefsTotal} valid)`)
    console.log(`  硬编码           ${m.hardcodedHex} hex · ${m.hardcodedRgba} rgba · ${m.hardcodedPx} px`)
    console.log(`  组件覆盖         ${fmt(m.componentCoverage)}  ${m.componentsFound.map((c) => (c.found ? '✓' : '✗') + c.name + (c.by === 'heuristic' ? '*' : '')).join(' ')}`)
    console.log(`  状态完整性       ${fmt(m.stateCompleteness)}  ${m.statesFound.map((s) => (s.found ? '✓' : '✗') + s.name).join(' ')}`)
    console.log(`  Props 命中       ${fmt(m.propHitRate)}  ${m.intentsFound.map((i) => (i.found ? '✓' : '✗') + i.name).join(' ')}`)
    console.log('')
    avgComposite += m.composite
  }
  avgComposite /= results.length

  console.log('---')
  console.log(`平均综合分         ${fmt(avgComposite)}`)
  console.log(`样本数             ${results.length}`)
  console.log('---')
  console.log('')
  console.log('KPI 目标（brief §2.3）：')
  console.log('  Token 使用率 ≥ 95% · Props 命中 100% · 状态完整 100%')
  console.log('')

  // 持久化结果
  const ts = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)
  const outFile = join(TESTS, 'results', `${ts}.json`)
  if (!existsSync(dirname(outFile))) {
    process.stderr.write(`error: results dir 不存在\n`)
    process.exit(2)
  }
  writeFileSync(
    outFile,
    JSON.stringify(
      {
        timestamp: new Date().toISOString(),
        avgComposite,
        results,
      },
      null,
      2,
    ),
  )
  console.log(`详情写入 ${outFile.replace(ROOT + '/', '')}`)
}

main()
