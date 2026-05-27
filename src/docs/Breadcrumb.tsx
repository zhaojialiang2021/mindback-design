import { components, pages, patterns, writings } from './manifest'
import { navigate, type DocsRoute } from './router'
import { useT } from './useLocale'
import { Icon } from './icons'

type Crumb = { label: string; href?: string }

type Translator = ReturnType<typeof useT>

function buildCrumbs(route: DocsRoute, t: Translator): Crumb[] {
  switch (route.kind) {
    case 'home':
      return [{ label: t('area.system') }, { label: t('nav.intro') }]
    case 'manifesto':
      return [{ label: t('area.system') }, { label: t('nav.manifesto') }]
    case 'workflow':
      return [
        { label: t('area.system') },
        { label: t('group.guidelines') },
        { label: t('nav.workflow') },
      ]
    case 'principles':
      return [
        { label: t('area.system') },
        { label: t('group.guidelines') },
        { label: t('nav.principles') },
      ]
    case 'haptics':
      return [
        { label: t('area.system') },
        { label: t('group.guidelines') },
        { label: t('nav.haptics') },
      ]
    case 'foundations': {
      const subKey = `foundation.${route.sub}` as
        | 'foundation.color'
        | 'foundation.typography'
        | 'foundation.spacing'
        | 'foundation.radius'
        | 'foundation.motion'
      return [
        { label: t('area.system') },
        { label: t('group.foundations') },
        { label: t(subKey) },
      ]
    }
    case 'component': {
      const c = components.find((x) => x.slug === route.slug)
      return [
        { label: t('area.system') },
        { label: t('group.components') },
        { label: c?.name ?? route.slug },
      ]
    }
    case 'patterns': {
      const p = route.slug ? patterns.find((x) => x.slug === route.slug) : null
      const crumbs: Crumb[] = [
        { label: t('area.system') },
        { label: t('group.patterns'), href: '/docs/patterns' },
      ]
      if (p) crumbs.push({ label: p.name })
      return crumbs
    }
    case 'ai-workflows':
      return [
        { label: t('area.system') },
        { label: t('group.resources') },
        { label: t('nav.ai-workflows') },
      ]
    case 'changelog':
      return [
        { label: t('area.system') },
        { label: t('group.resources') },
        { label: t('nav.changelog') },
      ]
    case 'page': {
      const p = pages.find((x) => x.slug === route.slug)
      return [
        { label: t('area.mindback') },
        { label: t('group.live-samples') },
        { label: p?.name ?? route.slug },
      ]
    }
    case 'writing': {
      const w = writings.find((x) => x.slug === route.slug)
      return [
        { label: t('area.writing') },
        { label: t('group.articles') },
        { label: w?.title ?? route.slug },
      ]
    }
    case 'not-found':
      // 404 页本身有居中 hero + suggestions，不需要面包屑（路径已在 lead 里）
      return []
  }
  // TS 不会自动从 union 推断穷尽，给个兜底返回
  return []
}

export function Breadcrumb({ route }: { route: DocsRoute }) {
  const t = useT()
  const crumbs = buildCrumbs(route, t)
  if (crumbs.length === 0) return null

  return (
    <nav className="docs-breadcrumb" aria-label="breadcrumb">
      {crumbs.map((c, i) => {
        const isLast = i === crumbs.length - 1
        return (
          <span key={i} className="docs-breadcrumb__item">
            {!isLast && c.href ? (
              <button
                className="docs-breadcrumb__link"
                onClick={() => navigate(c.href!)}
              >
                {c.label}
              </button>
            ) : (
              <span
                className={`docs-breadcrumb__label ${isLast ? 'is-current' : ''}`}
                aria-current={isLast ? 'page' : undefined}
              >
                {c.label}
              </span>
            )}
            {!isLast && (
              <span className="docs-breadcrumb__sep" aria-hidden>
                <Icon.ChevronRight size={11} />
              </span>
            )}
          </span>
        )
      })}
    </nav>
  )
}
