import { writings } from '../manifest'
import { getFrontmatter } from '../markdown'
import { navigate } from '../router'
import { useLocale } from '../useLocale'

const sources = import.meta.glob('../../../references/writings/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

function loadArticle(slug: string): string | null {
  const path = Object.keys(sources).find((p) => p.endsWith(`/${slug}.md`))
  return path ? sources[path] : null
}

// 格式化日期：'2026-05-15' / '2026-05' → '2026.05.15' / '2026.05'
function formatDate(raw: string | undefined): string {
  if (!raw) return ''
  return raw.replace(/-/g, '.')
}

// 截一段摘要：首段（去掉 frontmatter / quote / heading），再截 ~140 字
function extractSummary(src: string, fallback: string): string {
  const lines = src.replace(/\r\n/g, '\n').split('\n')
  let i = 0
  if (lines[0] === '---') {
    const end = lines.findIndex((l, idx) => idx > 0 && l === '---')
    if (end > 0) i = end + 1
  }
  // 跳过 H1 与紧随其后的 quote/blank
  while (i < lines.length) {
    const line = lines[i]
    if (line.startsWith('#') || line.startsWith('>') || !line.trim()) {
      i++
      continue
    }
    break
  }
  // 抓首段：连续非空行
  const para: string[] = []
  while (i < lines.length && lines[i].trim() && !lines[i].startsWith('#') && !lines[i].startsWith('>')) {
    para.push(lines[i].trim())
    i++
  }
  let text = para.join(' ').replace(/[*`]/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
  if (!text) text = fallback
  if (text.length > 140) text = text.slice(0, 140) + '…'
  return text
}

export function WritingIndexPage() {
  const { locale } = useLocale()
  const heading = locale === 'zh' ? '构建的思考' : 'Notes on Building'
  const lead =
    locale === 'zh'
      ? '这套框架不是被设计出来的，是这些思考一篇一篇沉淀下来的结果。读这些文章，等同于读它的源码。'
      : 'This framework wasn’t designed first and written about later. It accreted from these notes. Read them and you’re reading its source.'

  // 按更新日期倒序
  const items = [...writings]
    .map((w) => {
      const src = loadArticle(w.slug)
      const fm = src ? getFrontmatter(src) : {}
      const date = fm['updated'] ?? fm['date'] ?? '2026-05'
      const summary = src ? extractSummary(src, w.desc) : w.desc
      return { ...w, date, summary, available: !!src }
    })
    .sort((a, b) => b.date.localeCompare(a.date))

  return (
    <div className="docs-writings">
      <header className="docs-writings__header">
        <h1 className="docs-writings__heading">{heading}</h1>
        <p className="docs-writings__lead">{lead}</p>
      </header>

      <ol className="docs-writings-list" role="list">
        {items.map((w, i) => (
          <li key={w.slug} className="docs-writings-list__item">
            <button
              className="docs-writings-list__row"
              onClick={() => navigate(`/docs/writing/${w.slug}`)}
            >
              <div className="docs-writings-list__meta">
                <span className="docs-writings-list__index">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="docs-writings-list__date">{formatDate(w.date)}</span>
              </div>
              <div className="docs-writings-list__body">
                <h2 className="docs-writings-list__title">{w.title}</h2>
                <p className="docs-writings-list__summary">{w.summary}</p>
              </div>
            </button>
          </li>
        ))}
      </ol>
    </div>
  )
}
