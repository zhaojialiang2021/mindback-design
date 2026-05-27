import { useEffect, useMemo, useState } from 'react'
import { writings, type WritingMeta } from '../manifest'
import { extractToc, getFrontmatter, renderMarkdown } from '../markdown'
import { navigate } from '../router'
import { useLocale } from '../useLocale'
import { SoonPage } from './SoonPage'
import { NotFoundPage } from './NotFoundPage'

const sources = import.meta.glob('../../../references/writings/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

function loadArticle(slug: string): string | null {
  const path = Object.keys(sources).find((p) => p.endsWith(`/${slug}.md`))
  return path ? sources[path] : null
}

export function WritingPage({ slug }: { slug: string }) {
  const w = writings.find((x) => x.slug === slug)
  if (!w) return <NotFoundPage path={`writing/${slug}`} />

  const src = loadArticle(slug)
  if (!src) {
    return (
      <SoonPage
        title={w.title}
        lead={`${w.desc}。本文将由设计师本人撰写完整内容（Day 7-8）。`}
      />
    )
  }

  return <WritingArticle slug={slug} src={src} meta={w} />
}

function extractTitle(src: string, fallback: string): string {
  const lines = src.replace(/\r\n/g, '\n').split('\n')
  let i = 0
  if (lines[0] === '---') {
    const end = lines.findIndex((l, idx) => idx > 0 && l === '---')
    if (end > 0) i = end + 1
  }
  while (i < lines.length) {
    const line = lines[i]
    if (line.startsWith('# ')) return line.slice(2).trim()
    if (line.trim()) break
    i++
  }
  return fallback
}

// 抽出 H1 之后第一段作为摘要（论文格式）
function extractAbstract(src: string, fallback: string): string {
  const lines = src.replace(/\r\n/g, '\n').split('\n')
  let i = 0
  if (lines[0] === '---') {
    const end = lines.findIndex((l, idx) => idx > 0 && l === '---')
    if (end > 0) i = end + 1
  }
  // 跳到 H1 之后
  while (i < lines.length && !lines[i].startsWith('# ')) i++
  if (i < lines.length) i++ // 跳过 H1 本身
  // 跳过 H1 紧随其后的 quote / 空行
  while (i < lines.length) {
    const line = lines[i]
    if (!line.trim() || line.startsWith('>')) {
      i++
      continue
    }
    break
  }
  // 抓首段
  const para: string[] = []
  while (
    i < lines.length &&
    lines[i].trim() &&
    !lines[i].startsWith('#') &&
    !lines[i].startsWith('>') &&
    !lines[i].startsWith('```')
  ) {
    para.push(lines[i].trim())
    i++
  }
  const text = para.join(' ').replace(/[*`]/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
  return text || fallback
}

function formatDate(raw: string | undefined): string {
  if (!raw) return ''
  return raw.replace(/-/g, '-')
}

function WritingArticle({ slug, src, meta }: { slug: string; src: string; meta: WritingMeta }) {
  const { locale } = useLocale()
  const toc = useMemo(() => extractToc(src), [src])
  const title = useMemo(() => extractTitle(src, meta.title), [src, meta.title])
  const fm = useMemo(() => getFrontmatter(src), [src])
  const abstract = useMemo(() => extractAbstract(src, meta.desc), [src, meta.desc])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    if (toc.length === 0) return
    const headings = toc
      .map((tocItem) => document.getElementById(tocItem.id))
      .filter((el): el is HTMLElement => !!el)
    if (headings.length === 0) return

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActiveId(visible[0].target.id)
      },
      // token-lint-disable-line IO rootMargin 是滚动检测阈值，不是间距
      { rootMargin: '-80px 0px -70% 0px' },
    )
    headings.forEach((h) => obs.observe(h))
    return () => obs.disconnect()
  }, [toc])

  // 上下篇导航
  const idx = writings.findIndex((x) => x.slug === slug)
  const prev = idx > 0 ? writings[idx - 1] : null
  const next = idx >= 0 && idx < writings.length - 1 ? writings[idx + 1] : null

  const updatedAt = fm['updated'] ?? fm['date'] ?? '2026-05'

  // 文案
  const labels =
    locale === 'zh'
      ? {
          back: '← 返回列表',
          prev: '上一篇',
          next: '下一篇',
          abstract: '摘要',
          contents: '目录',
        }
      : {
          back: '← All notes',
          prev: 'Previous',
          next: 'Next',
          abstract: 'Abstract',
          contents: 'Contents',
        }

  return (
    <article className="docs-writing" key={slug}>
      <div className="docs-writing__container">
        <button
          className="docs-writing__back"
          onClick={() => navigate('/docs/writing')}
          aria-label={labels.back}
        >
          {labels.back}
        </button>

        <div className="docs-writing__date">{formatDate(updatedAt)}</div>
        <h1 className="docs-writing__title">{title}</h1>

        <div className="docs-writing__nav">
          <button
            className={`docs-writing__pill docs-writing__pill--prev ${prev ? '' : 'is-disabled'}`}
            onClick={() => prev && navigate(`/docs/writing/${prev.slug}`)}
            disabled={!prev}
          >
            ← {labels.prev}
          </button>
          <button
            className={`docs-writing__pill ${next ? '' : 'is-disabled'}`}
            onClick={() => next && navigate(`/docs/writing/${next.slug}`)}
            disabled={!next}
          >
            {labels.next} →
          </button>
        </div>

        <dl className="docs-writing__meta">
          <div className="docs-writing__row">
            <dt>{labels.abstract}</dt>
            <dd className="docs-writing__abstract">{abstract}</dd>
          </div>
        </dl>

        <div className="docs-writing__divider" aria-hidden />

        <div className="docs-writing__layout">
          <div className="docs-writing__body">{renderMarkdown(src)}</div>

          {toc.length > 0 && (
            <aside className="docs-writing__toc" aria-label={labels.contents}>
              <div className="docs-writing__toc-title">{labels.contents}</div>
              <ol className="docs-writing__toc-list">
                {toc.map((tocItem, i) => (
                  <li
                    key={tocItem.id}
                    className={`docs-writing__toc-item docs-writing__toc-item--h${tocItem.level} ${
                      activeId === tocItem.id ? 'is-active' : ''
                    }`}
                  >
                    <a
                      href={`#${tocItem.id}`}
                      onClick={(e) => {
                        e.preventDefault()
                        const el = document.getElementById(tocItem.id)
                        if (el) {
                          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                          setActiveId(tocItem.id)
                        }
                      }}
                    >
                      <span className="docs-writing__toc-num">
                        {tocItem.level === 2 ? String(i + 1).padStart(2, '0') : ''}
                      </span>
                      <span className="docs-writing__toc-text">{tocItem.text}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </aside>
          )}
        </div>
      </div>
    </article>
  )
}
