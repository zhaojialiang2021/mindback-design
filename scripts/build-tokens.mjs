#!/usr/bin/env node
// build-tokens.mjs —— 从 tokens/*.json (W3C DTCG 格式) 生成多平台产物
// 不依赖 style-dictionary：复合令牌 (typography) 和 $extensions.modes 都需要
// 自定义处理；自写脚本更短、更可读、且无新依赖。
//
// 输入：tokens/{color,typography,dimension,motion,shadow}.json
// 输出：
//   tokens/build/tokens.flat.json  —— 扁平化给 AI 喂的版本
//   tokens/build/tokens.css        —— CSS 变量 (light + [data-theme=dark])
//   tokens/build/tailwind.preset.cjs —— Tailwind v3 preset
//   tokens/build/DESIGN.md         —— 给 AI 读的紧凑 markdown
//   src/tokens.css                 —— 同步到 mindback App
//
// 用法：node scripts/build-tokens.mjs

import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const TOKENS_DIR = join(ROOT, 'tokens')
const BUILD_DIR = join(TOKENS_DIR, 'build')

// === 1. 加载所有 tokens/*.json 合并 ===
function loadTokens() {
  const merged = {}
  for (const file of readdirSync(TOKENS_DIR)) {
    if (!file.endsWith('.json') || file === 'tokens.flat.json') continue
    const raw = JSON.parse(readFileSync(join(TOKENS_DIR, file), 'utf-8'))
    for (const [k, v] of Object.entries(raw)) {
      if (k === '$description') continue
      merged[k] = v
    }
  }
  return merged
}

// === 2. 扁平化：递归遍历，叶子节点是带 $value 的对象 ===
function flatten(node, path = []) {
  const out = []
  if (node && typeof node === 'object' && '$value' in node) {
    out.push({
      name: path.join('.'),
      value: node.$value,
      type: node.$type,
      description: node.$description,
      modes: node.$extensions?.modes || null,
    })
    return out
  }
  if (node && typeof node === 'object') {
    for (const [k, v] of Object.entries(node)) {
      if (k.startsWith('$')) continue
      out.push(...flatten(v, [...path, k]))
    }
  }
  return out
}

// === 3. 名字转 CSS 变量名：color.label.primary -> --label-primary ===
//   规则：去掉首段（color/space/radius 等类目），剩下用 - 连接。
//   space.1 -> --space-1，radius.full -> --radius-full
function toCssVar(name) {
  const parts = name.split('.')
  // 跟旧 build-tokens.py 的口径保持一致（避免 docs.css / 组件 CSS 大面积失效）：
  // - color.label.primary -> --label-primary（去掉 color 类目前缀）
  // - typography.headline-h1 -> --headline-h1（去掉 typography 类目前缀）
  // - radius.xlarge -> --radius-x-large（兼容旧名 x-large）
  // - 其它类目保留：space.4 -> --space-4，duration.fast -> --duration-fast
  if (parts[0] === 'color') return '--' + parts.slice(1).join('-')
  if (parts[0] === 'typography') return '--' + parts.slice(1).join('-')
  if (parts[0] === 'radius' && parts[1] === 'xlarge') return '--radius-x-large'
  return '--' + parts.join('-')
}

// === 4. CSS 输出 ===
function buildCss(tokens) {
  const lightLines = []
  const darkLines = []
  for (const t of tokens) {
    // typography 是复合令牌：拆成 -size / -weight / -line-height
    if (t.type === 'typography') {
      const v = t.value
      lightLines.push(`  ${toCssVar(t.name)}-size: ${v.fontSize};`)
      lightLines.push(`  ${toCssVar(t.name)}-weight: ${v.fontWeight};`)
      lightLines.push(`  ${toCssVar(t.name)}-line-height: ${v.lineHeight};`)
      continue
    }
    lightLines.push(`  ${toCssVar(t.name)}: ${t.value};`)
    if (t.modes?.dark) {
      darkLines.push(`  ${toCssVar(t.name)}: ${t.modes.dark};`)
    }
  }
  return [
    `/* tokens.css —— 由 scripts/build-tokens.mjs 从 tokens/*.json 生成`,
    ` * 不要手动修改。改令牌请改 tokens/*.json，跑 node scripts/build-tokens.mjs。`,
    ` * 真相源：tokens/*.json (W3C Design Tokens 格式)`,
    ` */`,
    ``,
    `:root {`,
    ...lightLines,
    `}`,
    ``,
    // 系统暗色跟随：未显式 light 时生效（兼容 Showcase 等不走 useTheme 的路径）
    `@media (prefers-color-scheme: dark) {`,
    `  :root:not([data-theme='light']) {`,
    ...darkLines.map((l) => '  ' + l),
    `  }`,
    `}`,
    ``,
    // 用户手动切换
    `[data-theme='dark'] {`,
    ...darkLines,
    `}`,
    ``,
  ].join('\n')
}

// === 5. Tailwind preset 输出 ===
function buildTailwind(tokens) {
  const colors = {}
  const spacing = {}
  const borderRadius = {}
  const fontSize = {}
  const transitionDuration = {}
  const transitionTimingFunction = {}
  const boxShadow = {}

  for (const t of tokens) {
    const segments = t.name.split('.')
    const tail = segments.slice(1).join('-')
    if (t.type === 'color') {
      // color.label.primary -> label-primary
      // color.brand.blue-text -> brand-blue-text
      colors[tail] = `var(${toCssVar(t.name)})`
    } else if (segments[0] === 'space') {
      // space.4 -> spacing[4]
      spacing[segments[1]] = `var(${toCssVar(t.name)})`
    } else if (segments[0] === 'radius') {
      borderRadius[segments[1]] = `var(${toCssVar(t.name)})`
    } else if (t.type === 'typography') {
      fontSize[tail] = [
        t.value.fontSize,
        { lineHeight: String(t.value.lineHeight), fontWeight: String(t.value.fontWeight) },
      ]
    } else if (segments[0] === 'duration') {
      transitionDuration[segments[1]] = t.value
    } else if (segments[0] === 'curve') {
      transitionTimingFunction[segments[1]] = t.value
    } else if (segments[0] === 'shadow') {
      boxShadow[segments[1]] = `var(${toCssVar(t.name)})`
    }
  }

  return `// tailwind.preset.cjs —— 由 scripts/build-tokens.mjs 生成
// 在 docs 站的 tailwind.config 里 \`presets: [require('@/tokens/build/tailwind.preset.cjs')]\` 引入。
module.exports = {
  theme: {
    extend: {
      colors: ${JSON.stringify(colors, null, 2)},
      spacing: ${JSON.stringify(spacing, null, 2)},
      borderRadius: ${JSON.stringify(borderRadius, null, 2)},
      fontSize: ${JSON.stringify(fontSize, null, 2)},
      transitionDuration: ${JSON.stringify(transitionDuration, null, 2)},
      transitionTimingFunction: ${JSON.stringify(transitionTimingFunction, null, 2)},
      boxShadow: ${JSON.stringify(boxShadow, null, 2)},
    },
  },
}
`
}

// === 6. DESIGN.md：给 AI 读的紧凑 markdown ===
function buildDesignMd(tokens) {
  const groups = {}
  for (const t of tokens) {
    const cat = t.name.split('.')[0]
    ;(groups[cat] ??= []).push(t)
  }

  const lines = [
    `# MindBack Design Tokens (machine-readable)`,
    ``,
    `> 自动生成自 \`tokens/*.json\`。AI 在生成 MindBack 风格 UI 时，所有数值必须从此处取，禁止 hardcoded hex / px。`,
    ``,
    `**约束**：`,
    `- 颜色只能引用下表令牌名。Light/Dark 双模式下，dark 值见每条的 \`(dark: ...)\` 后缀。`,
    `- 间距、圆角是封闭枚举，禁止自定义中间值（不能写 \`14px\`，只能用 \`space.4\` = 16px）。`,
    `- 字体仅 PingFang SC，禁止其他字体。`,
    ``,
  ]

  const titleMap = {
    color: 'Color',
    font: 'Font Family',
    typography: 'Typography',
    space: 'Spacing',
    radius: 'Radius',
    duration: 'Motion · Duration',
    curve: 'Motion · Curve',
    shadow: 'Shadow',
  }

  for (const [cat, list] of Object.entries(groups)) {
    lines.push(`## ${titleMap[cat] ?? cat}`)
    lines.push('')
    if (list[0].type === 'typography') {
      lines.push('| 令牌 | size | weight | line-height | 说明 |')
      lines.push('|---|---|---|---|---|')
      for (const t of list) {
        const v = t.value
        lines.push(`| \`${t.name}\` | ${v.fontSize} | ${v.fontWeight} | ${v.lineHeight} | ${t.description ?? ''} |`)
      }
    } else {
      lines.push('| 令牌 | 值 | 说明 |')
      lines.push('|---|---|---|')
      for (const t of list) {
        const dark = t.modes?.dark ? ` (dark: \`${t.modes.dark}\`)` : ''
        const value = typeof t.value === 'string' ? `\`${t.value}\`${dark}` : `\`${JSON.stringify(t.value)}\``
        lines.push(`| \`${t.name}\` | ${value} | ${t.description ?? ''} |`)
      }
    }
    lines.push('')
  }
  return lines.join('\n')
}

// === 7. 跑 ===
function main() {
  const merged = loadTokens()
  const flat = flatten(merged)

  // tokens.flat.json: 给 AI 和 lint 读
  writeFileSync(
    join(BUILD_DIR, 'tokens.flat.json'),
    JSON.stringify(
      {
        $generatedAt: new Date().toISOString(),
        $count: flat.length,
        tokens: flat,
      },
      null,
      2,
    ),
  )

  // CSS
  const css = buildCss(flat)
  writeFileSync(join(BUILD_DIR, 'tokens.css'), css)
  // 同步到 mindback App
  writeFileSync(join(ROOT, 'src', 'tokens.css'), css)

  // Tailwind preset
  writeFileSync(join(BUILD_DIR, 'tailwind.preset.cjs'), buildTailwind(flat))

  // DESIGN.md
  writeFileSync(join(BUILD_DIR, 'DESIGN.md'), buildDesignMd(flat))

  // 同步到 public/，让 Vite build 把它们当静态资源打包，
  // 这样 vercel / 任何静态托管的 /design.md /tokens.json 端点都能命中。
  const pub = join(ROOT, 'public')
  writeFileSync(join(pub, 'design.md'), buildDesignMd(flat))
  writeFileSync(
    join(pub, 'tokens.json'),
    JSON.stringify(
      { $generatedAt: new Date().toISOString(), $count: flat.length, tokens: flat },
      null,
      2,
    ),
  )

  console.log(`✓ 生成 ${flat.length} 个令牌`)
  console.log(`  - tokens/build/tokens.flat.json`)
  console.log(`  - tokens/build/tokens.css`)
  console.log(`  - tokens/build/tailwind.preset.cjs`)
  console.log(`  - tokens/build/DESIGN.md`)
  console.log(`  - src/tokens.css (synced)`)
  console.log(`  - public/design.md, public/tokens.json (for prod)`)
}

main()
