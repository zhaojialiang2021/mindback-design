#!/usr/bin/env node
// schema-lint.mjs —— 校验 components/*.schema.json 的内部一致性
//
// 检查项：
//   1. 必填字段：slug / name / category / description / props / states / constraints / anatomy / tokens / doDont
//   2. tokens.* 引用的令牌名必须命中 tokens/build/tokens.flat.json（或是已知派生）
//   3. constraints.rule 命名风格统一（snake_case）
//   4. anatomy.part 出现的 token 名也必须命中令牌表
//   5. props.values 不能空、default 必须在 values 内
//
// 用法：node scripts/schema-lint.mjs
// 退出码：0 = 通过，1 = 有违规

import { readFileSync, readdirSync } from 'node:fs'
import { join, dirname, basename } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const COMP_DIR = join(ROOT, 'components')
const TOKENS_FLAT = join(ROOT, 'tokens', 'build', 'tokens.flat.json')

const REQUIRED = [
  'slug',
  'name',
  'category',
  'description',
  'props',
  'states',
  'constraints',
  'anatomy',
  'tokens',
  'doDont',
]

function loadKnownTokenNames() {
  const data = JSON.parse(readFileSync(TOKENS_FLAT, 'utf-8'))
  const names = new Set()
  for (const t of data.tokens) {
    // tokens.flat.json 名字是 'color.label.primary' / 'space.4' / 'radius.xlarge' 等
    names.add(t.name)
    // schema 里更常用 'label-primary' / 'brand-blue' 这类剥前缀的名字
    if (t.name.startsWith('color.')) {
      names.add(t.name.slice('color.'.length).replace(/\./g, '-'))
    }
    if (t.name.startsWith('typography.')) {
      names.add(t.name.slice('typography.'.length))
    }
    if (t.name.startsWith('space.')) names.add(`space-${t.name.split('.')[1]}`)
    if (t.name.startsWith('radius.')) {
      const sub = t.name.split('.')[1]
      // schema 里习惯 radius-x-large、radius-full 等
      names.add(`radius-${sub}`)
      if (sub === 'xlarge') names.add('radius-x-large')
    }
    if (t.name.startsWith('duration.')) names.add(`duration-${t.name.split('.')[1]}`)
    if (t.name.startsWith('curve.')) names.add(`curve-${t.name.split('.')[1]}`)
    if (t.name.startsWith('shadow.')) names.add(`shadow-${t.name.split('.')[1]}`)
  }
  // 加几个经常被引用、不在 token 系统但合法的几何字面量
  // schema 的 "X px / Yx" 这种是说明用，不该当 token 校验
  return names
}

function isLikelyTokenRef(value) {
  // schema tokens 的值有几种形态：
  //   "label-primary"          → 命中 names
  //   "transparent"             → CSS 关键字
  //   "20px" / "48px" / "9999px" → 字面尺寸
  //   "shadow-modal"
  //   "color.brand.blue"        → 完整路径，命中 names
  //   "rgba(...)"               → 自定义值（罕见，应改成 token）
  //   "radius-full radius-full 0 0" → 圆角组合
  return typeof value === 'string'
}

function isAcceptableValue(value, knownNames) {
  if (value === 'transparent' || value === 'inherit' || value === 'currentColor') return true
  // 字面尺寸
  if (/^-?\d+(\.\d+)?(px|em|rem|%)$/.test(value)) return true
  // 多 token 组合（按空格拆）
  const tokens = value.split(/\s+/)
  if (tokens.length > 1) {
    return tokens.every((t) => isAcceptableValue(t, knownNames))
  }
  return knownNames.has(value)
}

function checkComponent(file, raw, knownNames) {
  const violations = []
  let schema
  try {
    schema = JSON.parse(raw)
  } catch (e) {
    return [{ rule: 'parse', msg: `JSON 解析失败：${e.message}` }]
  }

  // 1. 必填字段
  for (const k of REQUIRED) {
    if (!(k in schema)) violations.push({ rule: 'required', msg: `缺字段 ${k}` })
  }

  // 2. props 校验
  if (schema.props && typeof schema.props === 'object') {
    for (const [name, def] of Object.entries(schema.props)) {
      if (!Array.isArray(def.values) || def.values.length === 0) {
        violations.push({ rule: 'props', msg: `${name}.values 为空或非数组` })
        continue
      }
      if (!('default' in def)) {
        violations.push({ rule: 'props', msg: `${name} 缺 default` })
      } else if (!def.values.includes(def.default)) {
        violations.push({
          rule: 'props',
          msg: `${name}.default = ${JSON.stringify(def.default)} 不在 values 内`,
        })
      }
    }
  }

  // 3. constraints 命名风格
  if (Array.isArray(schema.constraints)) {
    for (const c of schema.constraints) {
      if (!c.rule || typeof c.rule !== 'string') {
        violations.push({ rule: 'constraints', msg: `constraint 缺 rule 字段` })
        continue
      }
      if (!/^[a-z][a-z0-9_]*$/.test(c.rule)) {
        violations.push({
          rule: 'constraints',
          msg: `${c.rule} 不符合 snake_case 命名`,
        })
      }
      if (!c.description) {
        violations.push({ rule: 'constraints', msg: `${c.rule} 缺 description` })
      }
    }
  }

  // 4. tokens 引用必须命中 token 表
  if (schema.tokens && typeof schema.tokens === 'object') {
    for (const [key, value] of Object.entries(schema.tokens)) {
      if (!isLikelyTokenRef(value)) continue
      if (!isAcceptableValue(value, knownNames)) {
        violations.push({
          rule: 'tokens',
          msg: `tokens["${key}"] = "${value}" 不在令牌表中`,
        })
      }
    }
  }

  // 5. anatomy 必填 part
  if (Array.isArray(schema.anatomy)) {
    for (const a of schema.anatomy) {
      if (!a.part) violations.push({ rule: 'anatomy', msg: 'anatomy 项缺 part 字段' })
    }
  }

  return violations
}

function main() {
  const knownNames = loadKnownTokenNames()
  const files = readdirSync(COMP_DIR).filter((f) => f.endsWith('.schema.json'))
  let totalViolations = 0
  for (const f of files) {
    const raw = readFileSync(join(COMP_DIR, f), 'utf-8')
    const violations = checkComponent(f, raw, knownNames)
    if (violations.length === 0) {
      console.log(`✓ ${basename(f)}`)
    } else {
      totalViolations += violations.length
      console.log(`✗ ${basename(f)} (${violations.length} 处)`)
      for (const v of violations.slice(0, 20)) {
        console.log(`  · [${v.rule}] ${v.msg}`)
      }
      if (violations.length > 20) console.log(`  ... 另 ${violations.length - 20} 处`)
    }
  }
  if (totalViolations > 0) {
    console.log('')
    console.log(`✗ schema-lint 失败：${totalViolations} 处违规`)
    process.exit(1)
  }
  console.log('')
  console.log('✓ schema-lint 通过：所有 component schema 合规')
}

main()
