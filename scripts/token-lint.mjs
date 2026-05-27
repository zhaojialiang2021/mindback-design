#!/usr/bin/env node
// token-lint.mjs —— 扫源码里硬编码的颜色 / 间距 / 圆角 / 字号
// 规则：在 src/**/*.{ts,tsx,css} 里发现 hex 色、rgba()、px 数值（除少量例外）
// 就报错。tokens.css、icons、SVG 内联色等加白名单。
//
// 用法：node scripts/token-lint.mjs
// 退出码：0 = 通过，1 = 有违规

import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const SRC = join(ROOT, 'src')

// 不扫的文件（自身定义令牌、外部资产）
const SKIP_FILES = new Set([
  'src/tokens.css',
  'src/docs/tokens-data.ts', // 文档站要展示原始 hex，例外
  'src/docs/icons.tsx', // 内联 SVG path 颜色
  'src/App.css', // legacy showcase，迁移后删
  'src/App.tsx', // legacy showcase
  'src/main.tsx',
  'src/index.css',
  // V2 时期文档站的 hex（accent 装饰色、stage 网格底纹）—— 作为 Day 5+ 清理项纳入 backlog
  'src/docs/docs.css',
])

// 浅组件 preview（brief §1.3 v1 非目标）—— 待 v2 重写时再 token 化
const SKIP_PREFIXES = [
  'src/docs/previews/NavBarPreview',
  'src/docs/previews/SidebarPreview',
  'src/docs/previews/SwitchPreview',
  'src/docs/previews/InputPreview',
  'src/docs/previews/ModalPreview',
  'src/docs/previews/DividerPreview',
  'src/docs/previews/ToastPreview',
  'src/docs/previews/ActionBarPreview',
]

// 不扫的目录
const SKIP_DIRS = new Set(['legacy', 'assets'])

// 扫这些扩展名
const EXTS = new Set(['.ts', '.tsx', '.css'])

// 违规模式
const PATTERNS = [
  {
    name: 'hex-color',
    re: /#[0-9A-Fa-f]{3,8}\b/g,
    desc: '硬编码 hex 色，应使用 var(--brand-blue) 等令牌',
  },
  {
    name: 'rgb-color',
    re: /\brgba?\(\s*\d+\s*,/g,
    desc: '硬编码 rgba()，应使用令牌',
  },
  {
    name: 'px-magic-number',
    // 仅捕获明显是间距 / 圆角的 px 值。跳过 0px / 1px (border) / 0.5px / 1.5px (hairline)
    // 用 negative-lookbehind 避免 .5px 中的 5px 被误捕
    re: /(?<![.\d])(?:[2-9]|[1-9]\d+)px\b/g,
    desc: '硬编码 px 间距，应使用 var(--space-N) 等令牌',
  },
]

// 在一行的某个上下文里允许这些字面量
function isAllowedContext(line, allLines, idx, _file) {
  // 注释
  if (/^\s*(\/\/|\/\*|\*)/.test(line)) return true
  // SVG path d=, viewBox 等纯几何属性
  if (/\bd="[Mm][^"]*"/.test(line)) return true
  if (/viewBox=/.test(line)) return true
  // SVG <text> body：纯数字 + 单位 是显示文案，不是 CSS 值
  // 当行只有缩进 + 数字 + px/em/rem 等单位时豁免
  if (/^\s+\d+(px|em|rem|%)?\s*$/.test(line)) {
    // 上下文必须是 SVG 文本节点（向上 5 行内出现 <text 或 textAnchor）
    for (let k = idx - 1; k >= Math.max(0, idx - 8); k--) {
      if (/<text[\s>]|textAnchor=/.test(allLines[k])) return true
      if (/<\/text>/.test(allLines[k])) break
    }
  }
  // CSS 行里出现 var(--xxx) —— 已部分 token 化
  if (/var\(--[\w-]+\)/.test(line)) return true
  // 文案行：带中文的几乎不会是真硬编码（hex/px 都被当词讲），豁免
  if (/[一-鿿]/.test(line)) return true
  // 同行有标记
  if (/token-lint-disable-line/.test(line)) return true
  // 向上回看 14 行：找到最近的 token-lint-disable-line 注释 + 当前行仍在该 element / object 块里
  // 中断条件：闭合标签 </X> 或空行（表示新 statement）；JSX 标签开头不中断
  for (let k = idx - 1; k >= Math.max(0, idx - 14); k--) {
    const above = allLines[k]
    if (/token-lint-disable-line/.test(above)) return true
    if (/^\s*<\/[A-Za-z]/.test(above)) break // 闭合标签
    if (/^\s*$/.test(above)) break // 空行
  }
  return false
}

function walk(dir) {
  const out = []
  for (const ent of readdirSync(dir)) {
    if (SKIP_DIRS.has(ent)) continue
    const full = join(dir, ent)
    const st = statSync(full)
    if (st.isDirectory()) {
      out.push(...walk(full))
    } else {
      const ext = full.slice(full.lastIndexOf('.'))
      if (EXTS.has(ext)) out.push(full)
    }
  }
  return out
}

function lint() {
  const files = walk(SRC)
  const violations = []

  for (const file of files) {
    const rel = relative(ROOT, file)
    if (SKIP_FILES.has(rel)) continue
    if (SKIP_PREFIXES.some((p) => rel.startsWith(p))) continue

    const content = readFileSync(file, 'utf-8')
    const lines = content.split('\n')

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      if (isAllowedContext(line, lines, i, rel)) continue

      for (const p of PATTERNS) {
        for (const m of line.matchAll(p.re)) {
          violations.push({
            file: rel,
            line: i + 1,
            col: m.index + 1,
            match: m[0],
            rule: p.name,
            desc: p.desc,
          })
        }
      }
    }
  }

  if (violations.length === 0) {
    console.log('✓ token-lint 通过：未发现硬编码字面量')
    process.exit(0)
  }

  // 按文件分组打印
  const byFile = {}
  for (const v of violations) {
    ;(byFile[v.file] ??= []).push(v)
  }

  console.log(`✗ token-lint 失败：${violations.length} 处硬编码`)
  console.log('')
  for (const [file, list] of Object.entries(byFile)) {
    console.log(`  ${file}`)
    for (const v of list.slice(0, 10)) {
      console.log(`    L${v.line}:${v.col}  ${v.rule.padEnd(18)}  ${v.match}`)
    }
    if (list.length > 10) console.log(`    ... 另 ${list.length - 10} 处`)
  }
  console.log('')
  console.log('修复指引：')
  for (const p of PATTERNS) console.log(`  - ${p.name}: ${p.desc}`)

  process.exit(1)
}

lint()
