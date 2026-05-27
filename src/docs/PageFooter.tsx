import { components, pages, patterns, writings } from './manifest'
import { navigate, type DocsRoute } from './router'
import { Icon } from './icons'
import { useT } from './useLocale'

type Item = { href: string; label: string }

/**
 * 按侧栏视觉顺序构建一份所有路由的扁平序列。
 * Prev / Next 在这个序列里前后查找。
 */
function buildSequence(): Item[] {
  const seq: Item[] = []
  // System 区
  seq.push({ href: '/docs/intro', label: '关于 / Introduction' })
  seq.push({ href: '/docs/manifesto', label: 'Manifesto' })
  seq.push({ href: '/docs/workflow', label: '设计工作流 / Workflow' })

  for (const sub of ['color', 'typography', 'spacing', 'radius', 'motion'] as const) {
    seq.push({ href: `/docs/foundations/${sub}`, label: sub })
  }
  seq.push({ href: '/docs/principles', label: '设计原则 / Principles' })
  seq.push({ href: '/docs/haptics', label: '触觉反馈 / Haptics' })

  // Deep first，浅后
  for (const c of components.filter((x) => x.depth === 'deep')) {
    seq.push({ href: `/docs/components/${c.slug}`, label: c.name })
  }
  for (const c of components.filter((x) => x.depth !== 'deep')) {
    seq.push({ href: `/docs/components/${c.slug}`, label: c.name })
  }

  seq.push({ href: '/docs/patterns', label: 'Patterns' })
  for (const p of patterns) {
    seq.push({ href: `/docs/patterns/${p.slug}`, label: p.name })
  }

  seq.push({ href: '/docs/ai-workflows', label: 'AI Workflows' })
  seq.push({ href: '/docs/changelog', label: 'Changelog' })

  // MindBack 区
  for (const p of pages) {
    seq.push({ href: `/docs/pages/${p.slug}`, label: p.name })
  }

  // Writing 区
  for (const w of writings) {
    seq.push({ href: `/docs/writing/${w.slug}`, label: w.title })
  }

  return seq
}

function routeToHref(route: DocsRoute): string | null {
  switch (route.kind) {
    case 'home':
      return '/docs'
    case 'intro':
      return '/docs/intro'
    case 'manifesto':
      return '/docs/manifesto'
    case 'workflow':
      return '/docs/workflow'
    case 'foundations':
      return `/docs/foundations/${route.sub}`
    case 'principles':
      return '/docs/principles'
    case 'haptics':
      return '/docs/haptics'
    case 'component':
      return `/docs/components/${route.slug}`
    case 'patterns':
      return route.slug ? `/docs/patterns/${route.slug}` : '/docs/patterns'
    case 'ai-workflows':
      return '/docs/ai-workflows'
    case 'changelog':
      return '/docs/changelog'
    case 'page':
      return `/docs/pages/${route.slug}`
    case 'writing':
      return `/docs/writing/${route.slug}`
    case 'not-found':
      return null
  }
  return null
}

export function PageFooter({ route }: { route: DocsRoute }) {
  const t = useT()
  // Writing 详情页有自己的 prev/next 胶囊，不再叠一层 PageFooter（也避免占位顶高，光晕能贴到底）
  if (route.kind === 'writing' && 'slug' in route && route.slug) return null
  // Landing 页不显示页脚导航（自身是入口）
  if (route.kind === 'home') return null
  const href = routeToHref(route)
  if (!href) return null
  const seq = buildSequence()
  const idx = seq.findIndex((s) => s.href === href)
  if (idx === -1) return null
  const prev = idx > 0 ? seq[idx - 1] : null
  const next = idx < seq.length - 1 ? seq[idx + 1] : null
  if (!prev && !next) return null

  return (
    <nav className="docs-page-footer" aria-label="page navigation">
      {prev ? (
        <button className="docs-page-footer__btn docs-page-footer__btn--prev" onClick={() => navigate(prev.href)}>
          <Icon.Back size={14} />
          <span>
            <span className="docs-page-footer__hint">{t('footer.prev')}</span>
            <span className="docs-page-footer__title">{prev.label}</span>
          </span>
        </button>
      ) : (
        <span />
      )}
      {next && (
        <button className="docs-page-footer__btn docs-page-footer__btn--next" onClick={() => navigate(next.href)}>
          <span>
            <span className="docs-page-footer__hint">{t('footer.next')}</span>
            <span className="docs-page-footer__title">{next.label}</span>
          </span>
          <Icon.ChevronRight size={14} />
        </button>
      )}
    </nav>
  )
}
