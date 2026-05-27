import { writings } from '../manifest'
import { getFrontmatter } from '../markdown'
import { navigate } from '../router'
import { useLocale } from '../useLocale'
import heroKeyhole from '../assets/hero-keyhole.png'

const sources = import.meta.glob('../../../references/writings/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

function loadArticle(slug: string): string | null {
  const path = Object.keys(sources).find((p) => p.endsWith(`/${slug}.md`))
  return path ? sources[path] : null
}

function formatDate(raw: string | undefined): string {
  if (!raw) return ''
  return raw.replace(/-/g, '.')
}

function extractSummary(src: string, fallback: string): string {
  const lines = src.replace(/\r\n/g, '\n').split('\n')
  let i = 0
  if (lines[0] === '---') {
    const end = lines.findIndex((l, idx) => idx > 0 && l === '---')
    if (end > 0) i = end + 1
  }
  while (i < lines.length) {
    const line = lines[i]
    if (line.startsWith('#') || line.startsWith('>') || !line.trim()) {
      i++
      continue
    }
    break
  }
  const para: string[] = []
  while (i < lines.length && lines[i].trim() && !lines[i].startsWith('#') && !lines[i].startsWith('>')) {
    para.push(lines[i].trim())
    i++
  }
  let text = para.join(' ').replace(/[*`]/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
  if (!text) text = fallback
  if (text.length > 96) text = text.slice(0, 96) + '…'
  return text
}

// 三条根本原则的极简符号集：用于上半部分 advantages
function AdvantageGlyph({ kind }: { kind: 'doc' | 'token' | 'split' }) {
  const common = {
    width: 40,
    height: 40,
    viewBox: '0 0 40 40',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.25,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }
  if (kind === 'doc') {
    return (
      <svg {...common}>
        <rect x="9" y="6" width="22" height="28" rx="2" />
        <line x1="13" y1="13" x2="27" y2="13" opacity="0.7" />
        <line x1="13" y1="19" x2="27" y2="19" opacity="0.7" />
        <line x1="13" y1="25" x2="22" y2="25" opacity="0.7" />
      </svg>
    )
  }
  if (kind === 'token') {
    return (
      <svg {...common}>
        <circle cx="13" cy="13" r="3.5" />
        <circle cx="27" cy="13" r="3.5" />
        <circle cx="13" cy="27" r="3.5" />
        <circle cx="27" cy="27" r="3.5" />
        <line x1="16.5" y1="13" x2="23.5" y2="13" opacity="0.55" />
        <line x1="13" y1="16.5" x2="13" y2="23.5" opacity="0.55" />
        <line x1="27" y1="16.5" x2="27" y2="23.5" opacity="0.55" />
        <line x1="16.5" y1="27" x2="23.5" y2="27" opacity="0.55" />
      </svg>
    )
  }
  // split：左右两个对位的形态
  return (
    <svg {...common}>
      <circle cx="13" cy="20" r="6" />
      <rect x="22" y="14" width="12" height="12" rx="2" />
      <line x1="20" y1="20" x2="22" y2="20" opacity="0.5" />
    </svg>
  )
}

export function LandingPage() {
  const { locale } = useLocale()

  // 构建文章预览（按日期倒序，取前 4 篇）
  const articles = [...writings]
    .map((w) => {
      const src = loadArticle(w.slug)
      const fm = src ? getFrontmatter(src) : {}
      const date = fm['updated'] ?? fm['date'] ?? '2026-05'
      const summary = src ? extractSummary(src, w.desc) : w.desc
      return { ...w, date, summary }
    })
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 4)

  return (
    <div className="docs-landing">
      {/* === 上半屏：框架逻辑 + 优势 === */}
      <section className="docs-landing__upper">
        <div className="docs-landing__upper-inner">
          <div className="docs-landing__hero">
            <div className="docs-landing__eyebrow">
              {locale === 'zh' ? 'MindBack 设计系统' : 'MindBack Design System'}
            </div>
            <h1 className="docs-landing__title">
              {locale === 'zh' ? (
                <>
                  一套<em>文档驱动</em>的
                  <br />
                  AI-native 设计系统
                </>
              ) : (
                <>
                  A <em>doc-driven</em> design
                  <br />
                  system, AI-native by default
                </>
              )}
            </h1>
            <p className="docs-landing__lead">
              {locale === 'zh'
                ? '设计师写规则，agent 画画板，开发取参数 —— 三方共用一套 markdown 真相源。规格写在文档里，画板和代码都是它的下游产物。'
                : 'Designers write rules. Agents draw screens. Engineers consume tokens. All three roles share one markdown source of truth — Figma and code are downstream of it.'}
            </p>
            <div className="docs-landing__hero-actions">
              <button
                className="docs-landing__cta docs-landing__cta--primary"
                onClick={() => navigate('/docs/intro')}
              >
                {locale === 'zh' ? '了解系统结构' : 'Explore the system'}
              </button>
              <button
                className="docs-landing__cta docs-landing__cta--ghost"
                onClick={() => navigate('/docs/writing')}
              >
                {locale === 'zh' ? '阅读构建的思考' : 'Read the notes'}
              </button>
            </div>
          </div>

          <div className="docs-landing__arch" aria-hidden>
            <img className="docs-landing__hero-image" src={heroKeyhole} alt="" />
          </div>
        </div>

        <div className="docs-landing__advantages">
          <div className="docs-landing__advantage">
            <div className="docs-landing__advantage-icon">
              <AdvantageGlyph kind="doc" />
            </div>
            <h3 className="docs-landing__advantage-title">
              {locale === 'zh' ? '文档是真相源' : 'Docs as source of truth'}
            </h3>
            <p className="docs-landing__advantage-text">
              {locale === 'zh'
                ? '规格写在 markdown 里，可读、可 diff、可被 agent 执行。画板和代码都从它生成，三方持续对齐。'
                : 'Specs live in markdown — readable, diffable, agent-executable. Boards and code are generated from it; all three sides stay aligned.'}
            </p>
          </div>
          <div className="docs-landing__advantage">
            <div className="docs-landing__advantage-icon">
              <AdvantageGlyph kind="token" />
            </div>
            <h3 className="docs-landing__advantage-title">
              {locale === 'zh' ? '令牌优先于具体值' : 'Tokens before raw values'}
            </h3>
            <p className="docs-landing__advantage-text">
              {locale === 'zh'
                ? '颜色、字号、间距、动效都从令牌取值。命名让一致性可追溯——叫 label-primary 的两个地方注定同色。'
                : 'Color, type, spacing, motion all flow from named tokens. The name makes consistency traceable — two places named label-primary are guaranteed to match.'}
            </p>
          </div>
          <div className="docs-landing__advantage">
            <div className="docs-landing__advantage-icon">
              <AdvantageGlyph kind="split" />
            </div>
            <h3 className="docs-landing__advantage-title">
              {locale === 'zh' ? 'Agent 与人各司其职' : 'Agent and human, divided labor'}
            </h3>
            <p className="docs-landing__advantage-text">
              {locale === 'zh'
                ? '合规校验、批量生成、引用一致——交给 agent。视觉氛围、情感弧线、相邻方案的取舍——留给人。'
                : 'Compliance, batch generation, reference checking — let the agent handle it. Mood, emotional arc, judgment between near-options — keep it human.'}
            </p>
          </div>
        </div>
      </section>

      {/* === 上下分隔 === */}
      <div className="docs-landing__divider" aria-hidden>
        <span className="docs-landing__divider-rule" />
        <span className="docs-landing__divider-label">
          {locale === 'zh' ? '构建的思考' : 'Notes on building'}
        </span>
        <span className="docs-landing__divider-rule" />
      </div>

      {/* === 下半屏：构建的思考 === */}
      <section className="docs-landing__lower">
        <div className="docs-landing__lower-head">
          <h2 className="docs-landing__lower-title">
            {locale === 'zh' ? '构建的思考' : 'Notes on Building'}
          </h2>
          <p className="docs-landing__lower-lead">
            {locale === 'zh'
              ? '这套框架不是被设计出来的，是这些思考一篇一篇沉淀下来的结果。读这些文章，等同于读它的源码。'
              : 'This framework wasn’t designed first and written about later. It accreted from these notes. Read them and you’re reading its source.'}
          </p>
        </div>

        <ol className="docs-landing-articles" role="list">
          {articles.map((a, i) => (
            <li key={a.slug} className="docs-landing-articles__item">
              <button
                className="docs-landing-articles__row"
                onClick={() => navigate(`/docs/writing/${a.slug}`)}
              >
                <span className="docs-landing-articles__meta">
                  <span className="docs-landing-articles__index">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="docs-landing-articles__date">{formatDate(a.date)}</span>
                </span>
                <span className="docs-landing-articles__body">
                  <span className="docs-landing-articles__title">{a.title}</span>
                  <span className="docs-landing-articles__summary">{a.summary}</span>
                </span>
              </button>
            </li>
          ))}
        </ol>

        <div className="docs-landing__lower-foot">
          <button
            className="docs-landing__cta docs-landing__cta--ghost"
            onClick={() => navigate('/docs/writing')}
          >
            {locale === 'zh' ? '查看全部思考' : 'See all notes'}
          </button>
        </div>
      </section>
    </div>
  )
}
