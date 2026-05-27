import { components, pages, patterns, writings } from '../manifest'
import { navigate } from '../router'
import { Icon } from '../icons'
import { useT } from '../useLocale'
import { DocsHero } from '../PageHeader'

function levenshtein(a: string, b: string): number {
  if (!a.length) return b.length
  if (!b.length) return a.length
  const dp: number[][] = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0))
  for (let i = 0; i <= a.length; i++) dp[i][0] = i
  for (let j = 0; j <= b.length; j++) dp[0][j] = j
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost)
    }
  }
  return dp[a.length][b.length]
}

function buildAllPaths(): Array<{ href: string; label: string }> {
  const out: Array<{ href: string; label: string }> = [
    { href: '/docs', label: '介绍 / Introduction' },
    { href: '/docs/manifesto', label: 'Manifesto' },
    { href: '/docs/workflow', label: '设计工作流' },
    { href: '/docs/principles', label: '设计原则' },
    { href: '/docs/haptics', label: '触觉反馈' },
    { href: '/docs/patterns', label: 'Patterns' },
    { href: '/docs/ai-workflows', label: 'AI Workflows' },
    { href: '/docs/changelog', label: 'Changelog' },
  ]
  for (const sub of ['color', 'typography', 'spacing', 'radius', 'motion'] as const) {
    out.push({ href: `/docs/foundations/${sub}`, label: sub })
  }
  for (const c of components) out.push({ href: `/docs/components/${c.slug}`, label: c.name })
  for (const p of patterns) out.push({ href: `/docs/patterns/${p.slug}`, label: p.name })
  for (const p of pages) out.push({ href: `/docs/pages/${p.slug}`, label: p.name })
  for (const w of writings) out.push({ href: `/docs/writing/${w.slug}`, label: w.title })
  return out
}

function findSimilar(path: string, n = 4) {
  const all = buildAllPaths()
  return all
    .map((p) => ({ ...p, score: levenshtein(path.toLowerCase(), p.href.replace(/^\/docs\//, '').toLowerCase()) }))
    .sort((a, b) => a.score - b.score)
    .slice(0, n)
}

export function NotFoundPage({ path }: { path: string }) {
  const t = useT()
  const suggestions = findSimilar(path)
  return (
    <>
      <DocsHero
        align="center"
        eyebrow={t('nf.eyebrow')}
        title={t('nf.title')}
        lead={
          <>
            {t('nf.lead.before')}
            {/* token-lint-disable-line 紧凑 chip 几何 */}
            <code
              style={{
                background: 'var(--fill-quaternary)',
                padding: '2px 8px',
                borderRadius: 'var(--radius-small)',
                fontFamily: "'SF Mono', ui-monospace, Menlo, monospace",
                fontSize: 'var(--footnote-size)',
              }}
            >
              /{path}
            </code>
            {t('nf.lead.after')}
          </>
        }
      />
      <div
        style={{
          display: 'flex',
          gap: 'var(--space-3)',
          justifyContent: 'center',
          marginTop: 'var(--space-7)',
          marginBottom: 'var(--space-9)',
        }}
      >
        <button
          className="mb-button mb-button--primary mb-button--standard"
          onClick={() => navigate('/docs')}
        >
          <Icon.Back size={14} />
          {t('nf.back')}
        </button>
        <button
          className="mb-button mb-button--ghost mb-button--standard"
          onClick={() => navigate('/docs/components/button')}
        >
          {t('nf.explore')}
        </button>
      </div>

      {/* 路径相似度建议 */}
      <section className="docs-nf-suggestions">
        <div className="docs-nf-suggestions__title">{t('nf.suggestions')}</div>
        <ul>
          {suggestions.map((s) => (
            <li key={s.href}>
              <button onClick={() => navigate(s.href)}>
                <span className="docs-nf-suggestions__path">{s.href}</span>
                <span className="docs-nf-suggestions__label">{s.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
