// 极简 markdown 渲染器 —— 只支持本项目实际用到的语法
// 标题、段落、列表、表格、代码、引用、强调

import type { ReactNode } from 'react'

type Block =
  | { kind: 'h1' | 'h2' | 'h3'; text: string }
  | { kind: 'p'; text: string }
  | { kind: 'hr' }
  | { kind: 'quote'; text: string }
  | { kind: 'ul'; items: string[] }
  | { kind: 'ol'; items: string[] }
  | { kind: 'code'; text: string }
  | { kind: 'table'; head: string[]; rows: string[][] }
  | { kind: 'frontmatter'; data: Record<string, string> }

function parseFrontmatter(lines: string[]): { fm: Record<string, string>; rest: string[] } {
  if (lines[0] !== '---') return { fm: {}, rest: lines }
  const end = lines.findIndex((l, i) => i > 0 && l === '---')
  if (end === -1) return { fm: {}, rest: lines }
  const fm: Record<string, string> = {}
  for (let i = 1; i < end; i++) {
    const m = /^([\w-]+):\s*(.+)$/.exec(lines[i])
    if (m) fm[m[1]] = m[2]
  }
  return { fm, rest: lines.slice(end + 1) }
}

function parseBlocks(src: string): Block[] {
  const rawLines = src.replace(/\r\n/g, '\n').split('\n')
  const { fm, rest: lines } = parseFrontmatter(rawLines)
  const blocks: Block[] = []
  if (Object.keys(fm).length) blocks.push({ kind: 'frontmatter', data: fm })

  let i = 0
  while (i < lines.length) {
    const line = lines[i]

    if (!line.trim()) {
      i++
      continue
    }

    if (line.startsWith('### ')) {
      blocks.push({ kind: 'h3', text: line.slice(4).trim() })
      i++
      continue
    }
    if (line.startsWith('## ')) {
      blocks.push({ kind: 'h2', text: line.slice(3).trim() })
      i++
      continue
    }
    if (line.startsWith('# ')) {
      blocks.push({ kind: 'h1', text: line.slice(2).trim() })
      i++
      continue
    }
    if (line.trim() === '---') {
      blocks.push({ kind: 'hr' })
      i++
      continue
    }
    // quote 行：'> xxx' 或 '>'（空 quote 行，用作段内分段）
    if (line === '>' || line.startsWith('> ')) {
      const parts: string[] = [line === '>' ? '' : line.slice(2)]
      while (i + 1 < lines.length) {
        const next = lines[i + 1]
        if (next === '>' || next.startsWith('> ')) {
          parts.push(next === '>' ? '' : next.slice(2))
          i++
        } else {
          break
        }
      }
      // 折叠连续空行 + 用 \n\n 作为段间分隔
      const text = parts.join('\n')
      blocks.push({ kind: 'quote', text })
      i++
      continue
    }
    if (line.startsWith('```')) {
      const start = i + 1
      let end = start
      while (end < lines.length && !lines[end].startsWith('```')) end++
      blocks.push({ kind: 'code', text: lines.slice(start, end).join('\n') })
      i = end + 1
      continue
    }
    if (/^[-*]\s/.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^[-*]\s/.test(lines[i])) {
        items.push(lines[i].replace(/^[-*]\s/, ''))
        i++
      }
      blocks.push({ kind: 'ul', items })
      continue
    }
    if (/^\d+\.\s/.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s/, ''))
        i++
      }
      blocks.push({ kind: 'ol', items })
      continue
    }
    if (line.startsWith('|') && i + 1 < lines.length && /^\|[\s|:-]+\|$/.test(lines[i + 1].trim())) {
      const head = line.split('|').slice(1, -1).map((c) => c.trim())
      i += 2
      const rows: string[][] = []
      while (i < lines.length && lines[i].startsWith('|')) {
        rows.push(lines[i].split('|').slice(1, -1).map((c) => c.trim()))
        i++
      }
      blocks.push({ kind: 'table', head, rows })
      continue
    }
    // paragraph
    let text = line
    while (i + 1 < lines.length && lines[i + 1].trim() && !isBlockStart(lines[i + 1])) {
      text += ' ' + lines[i + 1].trim()
      i++
    }
    blocks.push({ kind: 'p', text })
    i++
  }

  return blocks
}

function isBlockStart(line: string): boolean {
  return (
    line.startsWith('#') ||
    line.startsWith('>') ||
    line.startsWith('```') ||
    line.startsWith('|') ||
    /^[-*]\s/.test(line) ||
    /^\d+\.\s/.test(line) ||
    line.trim() === '---'
  )
}

// inline: **bold**, *italic*, `code`, [text](url), [[link]]
function inline(text: string): ReactNode[] {
  const out: ReactNode[] = []
  const re = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*|\[\[[^\]]+\]\]|\[[^\]]+\]\([^)]+\))/g
  let last = 0
  let m: RegExpExecArray | null
  let key = 0
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index))
    const tok = m[0]
    if (tok.startsWith('`')) {
      out.push(<code key={key++}>{tok.slice(1, -1)}</code>)
    } else if (tok.startsWith('**')) {
      out.push(<strong key={key++}>{tok.slice(2, -2)}</strong>)
    } else if (tok.startsWith('[[')) {
      out.push(<em key={key++}>{tok.slice(2, -2)}</em>)
    } else if (tok.startsWith('[')) {
      const lm = /\[([^\]]+)\]\(([^)]+)\)/.exec(tok)
      if (lm) out.push(<a key={key++} href={lm[2]} target="_blank" rel="noreferrer">{lm[1]}</a>)
    } else if (tok.startsWith('*')) {
      out.push(<em key={key++}>{tok.slice(1, -1)}</em>)
    }
    last = m.index + tok.length
  }
  if (last < text.length) out.push(text.slice(last))
  return out
}

/** 把 heading 文本转为稳定的 anchor id —— 中文保留为 unicode，空格变 -，标点剥离 */
function slugify(text: string): string {
  // U+3000 (全角空格) 用 \\u3000 转义避免 ESLint no-irregular-whitespace
  return text
    .toLowerCase()
    .trim()
    .replace(/[\s\u3000]+/g, '-')
    .replace(/[^\w一-鿿-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

/** 提取 TOC（h2 + h3）—— 给 WritingPage 渲染右侧 sticky TOC 用 */
export type TocItem = { level: 2 | 3; text: string; id: string }
export function extractToc(src: string): TocItem[] {
  const blocks = parseBlocks(src)
  const out: TocItem[] = []
  for (const b of blocks) {
    if (b.kind === 'h2' || b.kind === 'h3') {
      out.push({
        level: b.kind === 'h2' ? 2 : 3,
        text: b.text,
        id: slugify(b.text),
      })
    }
  }
  return out
}

export function renderMarkdown(src: string): ReactNode {
  const blocks = parseBlocks(src)
  return (
    <div className="docs-prose">
      {blocks.map((b, i) => {
        switch (b.kind) {
          case 'frontmatter':
            return null
          case 'h1':
            return null // 标题由外层 page header 提供
          case 'h2':
            return (
              <h2 key={i} id={slugify(b.text)}>
                {inline(b.text)}
              </h2>
            )
          case 'h3':
            return (
              <h3 key={i} id={slugify(b.text)}>
                {inline(b.text)}
              </h3>
            )
          case 'p':
            return <p key={i}>{inline(b.text)}</p>
          case 'hr':
            return <hr key={i} style={{ border: 0, borderTop: '0.5px solid var(--line-non-opaque)', margin: '24px 0' }} />
          case 'quote': {
            // 用 \n\n 拆段；多个段落分别 <p> 包裹
            const paras = b.text.split(/\n{2,}/).map((s) => s.trim()).filter(Boolean)
            return (
              <blockquote key={i}>
                {paras.length <= 1
                  ? inline(b.text)
                  : paras.map((p, j) => <p key={j}>{inline(p)}</p>)}
              </blockquote>
            )
          }
          case 'ul':
            return (
              <ul key={i}>
                {b.items.map((it, j) => <li key={j}>{inline(it)}</li>)}
              </ul>
            )
          case 'ol':
            return (
              <ol key={i}>
                {b.items.map((it, j) => <li key={j}>{inline(it)}</li>)}
              </ol>
            )
          case 'code':
            return (
              <pre
                key={i}
                style={{
                  background: 'var(--bg-1)',
                  padding: 'var(--space-4)',
                  borderRadius: 'var(--radius-medium)',
                  overflow: 'auto',
                  fontFamily: 'SF Mono, Menlo, monospace',
                  fontSize: 'var(--footnote-size)',
                  lineHeight: 'var(--footnote-line-height)',
                }}
              >
                <code>{b.text}</code>
              </pre>
            )
          case 'table':
            return (
              <table key={i} className="docs-table" style={{ marginBottom: 'var(--space-4)' }}>
                <thead>
                  <tr>
                    {b.head.map((h, j) => <th key={j}>{inline(h)}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {b.rows.map((r, j) => (
                    <tr key={j}>
                      {r.map((c, k) => <td key={k}>{inline(c)}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            )
        }
      })}
    </div>
  )
}

export function getFrontmatter(src: string): Record<string, string> {
  const lines = src.replace(/\r\n/g, '\n').split('\n')
  const { fm } = parseFrontmatter(lines)
  return fm
}
