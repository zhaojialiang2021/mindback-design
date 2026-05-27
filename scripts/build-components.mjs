#!/usr/bin/env node
// build-components.mjs —— 打包所有组件 schema 为 AI 可消费的产物
//
// 输入：components/*.schema.json
// 输出：
//   tokens/build/components.json  —— 所有 schema 合一，给机器读
//   tokens/build/components.md    —— 紧凑 markdown，给 AI 喂 prompt
//
// 用法：node scripts/build-components.mjs

import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const COMPONENTS_DIR = join(ROOT, 'components')
const BUILD_DIR = join(ROOT, 'tokens', 'build')

function load() {
  const all = []
  for (const f of readdirSync(COMPONENTS_DIR)) {
    if (!f.endsWith('.schema.json')) continue
    all.push(JSON.parse(readFileSync(join(COMPONENTS_DIR, f), 'utf-8')))
  }
  return all.sort((a, b) => a.slug.localeCompare(b.slug))
}

function buildJson(all) {
  return {
    $generatedAt: new Date().toISOString(),
    $count: all.length,
    components: all,
  }
}

function buildMd(all) {
  const lines = []
  lines.push('# MindBack Component Contracts (machine-readable)')
  lines.push('')
  lines.push('> 自动生成自 `components/*.schema.json`。AI 在生成 MindBack 风格 UI 时，组件 props 必须从 values 枚举中选；states 必须全覆盖；constraints 不能违反。')
  lines.push('')
  for (const c of all) {
    lines.push(`## ${c.name} (\`${c.slug}\`)`)
    lines.push('')
    lines.push(`**Category**: ${c.category}`)
    lines.push('')
    lines.push(c.description)
    lines.push('')

    lines.push('### Props')
    for (const [name, def] of Object.entries(c.props)) {
      const vals = def.values.map((v) => JSON.stringify(v)).join(' | ')
      lines.push(`- \`${name}\`: ${vals} _(default: \`${JSON.stringify(def.default)}\`)_`)
      lines.push(`  ${def.description}`)
    }
    lines.push('')

    lines.push('### States')
    lines.push(c.states.map((s) => `\`${s}\``).join(', '))
    lines.push('')

    lines.push('### Constraints')
    for (const con of c.constraints) {
      lines.push(`- **${con.rule}**: ${con.description}`)
    }
    lines.push('')

    lines.push('### Anatomy')
    for (const a of c.anatomy) {
      const tail = a.description ?? a.tokens?.join(', ') ?? ''
      lines.push(`- **${a.part}**: ${tail}`)
    }
    lines.push('')

    lines.push('### Do')
    for (const d of c.doDont.do) lines.push(`- ${d}`)
    lines.push('')
    lines.push("### Don't")
    for (const d of c.doDont.dont) lines.push(`- ${d}`)
    lines.push('')

    lines.push('---')
    lines.push('')
  }
  return lines.join('\n')
}

function buildSkillMd(componentsMd) {
  // 跟 vite.config.ts /skill.md 中间件保持一致的 intro
  const designMd = readFileSync(join(BUILD_DIR, 'DESIGN.md'), 'utf-8')
  const intro = [
    '# MindBack Design System Skill',
    '',
    '> 把这份内容粘到 Cursor / Claude Code 的系统提示里，再开始生成 UI。',
    '> AI-native 设计系统：给机器读的契约。约束被违反 = 幻觉。',
    '',
    '## 使用约定',
    '- **颜色**：仅引用 `var(--<token-name>)`（见下方 Tokens 段），禁止 hex/rgba 字面量。',
    '- **间距**：仅用 `var(--space-1)` ~ `var(--space-10)`，禁止自定义 px。',
    '- **圆角**：5 级封闭枚举 `radius-small / medium / large / x-large / full`。',
    '- **字号**：从 typography 令牌挑（headline-h1/h2/h3, body-primary/secondary, callout, subhead, footnote, caption-1/2）。',
    '- **组件**：见下方 Component Contracts。props 必须命中 values 枚举；states 必须全覆盖；constraints 不能违反。',
    '- **校验**：生成完跑 `npm run lint:tokens`，0 违规才算合格。',
    '',
    '---',
    '',
  ].join('\n')
  return intro + designMd + '\n\n---\n\n' + componentsMd
}

function buildLlmsTxt() {
  return [
    '# MindBack Design System',
    '',
    'AI-native 设计系统：给机器读的契约，不是给人看的约定。',
    '',
    '## 关键端点',
    '- /skill.md         一站式 Skill 包（推荐 AI 直接拉这个）',
    '- /design.md        Token 紧凑 markdown',
    '- /tokens.json      Token 扁平 JSON（含 dark 模式覆盖）',
    '- /components.md    组件契约 markdown',
    '- /components.json  组件契约 JSON',
    '',
    '## 使用方式',
    '`curl https://docs.mindback.com/skill.md` 把内容粘到 Cursor / Claude 系统提示。',
    '所有颜色、间距、字号、圆角必须引用令牌名，禁止 hardcoded 字面量。',
    '生成完跑 `npm run lint:tokens` 检查，0 违规才算合格。',
    '',
  ].join('\n')
}

function main() {
  const all = load()
  const json = JSON.stringify(buildJson(all), null, 2)
  const md = buildMd(all)
  writeFileSync(join(BUILD_DIR, 'components.json'), json)
  writeFileSync(join(BUILD_DIR, 'components.md'), md)

  // 同步到 public/ 让生产部署可访问
  const pub = join(ROOT, 'public')
  writeFileSync(join(pub, 'components.json'), json)
  writeFileSync(join(pub, 'components.md'), md)
  writeFileSync(join(pub, 'skill.md'), buildSkillMd(md))
  writeFileSync(join(pub, 'llms.txt'), buildLlmsTxt())

  console.log(`✓ 打包 ${all.length} 个组件 schema`)
  console.log(`  - tokens/build/components.json, components.md`)
  console.log(`  - public/components.json, components.md, skill.md, llms.txt`)
}

main()
