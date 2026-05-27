import { useEffect, useState, type ReactNode } from 'react'
import { components, pages, patterns } from './manifest'
import { navigate, type DocsRoute, type Area, getRouteArea } from './router'
import { Icon } from './icons'
import { useT } from './useLocale'
import { CommandPalette } from './CommandPalette'
import { FloatingControls } from './FloatingControls'
import { PageFooter } from './PageFooter'
import logoLight from './assets/logo-light.svg'
import logoDark from './assets/logo-dark.svg'
import './docs.css'

type Props = {
  route: DocsRoute
  children: ReactNode
}

const AREAS: Array<{ id: Area; key: 'area.system' | 'area.writing' }> = [
  { id: 'system', key: 'area.system' },
  { id: 'writing', key: 'area.writing' },
]

export function DocsLayout({ route, children }: Props) {
  const t = useT()
  const area = getRouteArea(route)
  const [drawerOpen, setDrawerOpen] = useState(false)
  // 用 ref-like state 检测 route 变化，避免 effect 里 setState
  const [lastRouteKey, setLastRouteKey] = useState<string>(() => routeKey(route))
  const currentKey = routeKey(route)
  if (currentKey !== lastRouteKey) {
    setLastRouteKey(currentKey)
    if (drawerOpen) setDrawerOpen(false)
  }

  // 抽屉打开时锁滚动
  useEffect(() => {
    if (drawerOpen) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = prev
      }
    }
  }, [drawerOpen])

  const openSearch = () => {
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))
  }

  return (
    <div
      className={`docs-shell ${drawerOpen ? 'docs-shell--drawer-open' : ''} ${
        area === 'writing' || area === 'landing' ? 'docs-shell--no-sidebar' : ''
      } ${area === 'landing' ? 'docs-shell--landing' : ''}`}
    >
      {/* a11y：跳到主内容（仅键盘 focus 时可见） */}
      <a href="#docs-main" className="docs-skip-link">
        {t('a11y.skip')}
      </a>

      {/* 顶部 nav：logo · area tabs · search（横排框架） */}
      <header className="docs-topnav">
        <button
          className="docs-topnav__menu"
          onClick={() => setDrawerOpen(true)}
          aria-label="menu"
        >
          <Icon.Grid size={18} />
        </button>
        <button
          className="docs-topnav__brand"
          onClick={() => navigate('/docs')}
          aria-label="MindBack"
        >
          <img className="docs-brand__logo docs-brand__logo--light" src={logoLight} alt="MindBack" />
          <img className="docs-brand__logo docs-brand__logo--dark" src={logoDark} alt="MindBack" />
        </button>
        <nav className="docs-topnav__areas" role="tablist" aria-label="area">
          {AREAS.map((a) => (
            <button
              key={a.id}
              role="tab"
              aria-selected={a.id === area}
              className={`docs-topnav__tab ${a.id === area ? 'is-active' : ''}`}
              onClick={() => navigate(areaHome(a.id))}
            >
              {t(a.key)}
            </button>
          ))}
        </nav>
        <span className="docs-topnav__spacer" />
        <button
          className="docs-topnav__search"
          onClick={openSearch}
          aria-label={`${t('cmdk.search')} (Cmd+K)`}
        >
          <Icon.Search size={13} />
          <span>{t('cmdk.search')}</span>
          <kbd>⌘K</kbd>
        </button>
        <button
          className="docs-topnav__search-icon"
          onClick={openSearch}
          aria-label={t('cmdk.search')}
        >
          <Icon.Search size={16} />
        </button>
      </header>

      {drawerOpen && area === 'system' && (
        <button
          className="docs-drawer-backdrop"
          onClick={() => setDrawerOpen(false)}
          aria-label="Close"
        />
      )}

      {area === 'system' && (
        <aside className="docs-sidebar" aria-hidden={!drawerOpen ? undefined : 'false'}>
          {/* 移动端：抽屉打开时也能切换 area */}
          <div className="docs-sidebar__head docs-sidebar__head--mobile">
            <div className="docs-areas" role="tablist" aria-label="area">
              {AREAS.map((a) => (
                <button
                  key={a.id}
                  role="tab"
                  aria-selected={a.id === area}
                  className={`docs-areas__tab ${a.id === area ? 'is-active' : ''}`}
                  onClick={() => navigate(areaHome(a.id))}
                >
                  {t(a.key)}
                </button>
              ))}
            </div>
          </div>

          <nav className="docs-sidebar__nav">
            {area === 'system' && <SystemNav route={route} />}
          </nav>

          <SidebarFoot />
        </aside>
      )}

      <main className="docs-main" id="docs-main">
        <div className="docs-main__inner">
          {children}
          <PageFooter route={route} />
        </div>
      </main>

      <CommandPalette />
      <FloatingControls />
    </div>
  )
}

function routeKey(r: DocsRoute): string {
  // 序列化路由身份，用于检测变化
  if ('slug' in r && r.slug !== undefined) return `${r.kind}:${r.slug}`
  if ('sub' in r) return `${r.kind}:${r.sub}`
  if ('path' in r) return `${r.kind}:${r.path}`
  return r.kind
}

function areaHome(area: Area): string {
  switch (area) {
    case 'system':
      return '/docs/intro'
    case 'writing':
      return '/docs/writing'
    case 'landing':
      return '/docs'
  }
}

// ---------- 侧栏底部：版本徽章（点击跳 Changelog） ----------
function SidebarFoot() {
  return (
    <div className="docs-sidebar__foot">
      <button
        className="docs-sidebar__version-btn"
        onClick={() => navigate('/docs/changelog')}
        title="Changelog"
        aria-label="Changelog"
      >
        v1.0.0-alpha
      </button>
    </div>
  )
}

// ---------- System 区导航 ----------
// IA 重构 v2：5 个分组结构，无顶级裸项
//   入门 · 基础 · 规则 · 组件 / Patterns · 资源
function SystemNav({ route }: { route: DocsRoute }) {
  const t = useT()
  const foundationsActive = route.kind === 'foundations'
  const deepComponents = components.filter((c) => c.depth === 'deep')
  const shallowComponents = components.filter((c) => c.depth !== 'deep')

  return (
    <>
      <Section title={t('group.start')}>
        <NavItem href="/docs/intro" active={route.kind === 'intro'}>
          {t('nav.intro')}
        </NavItem>
        <NavItem href="/docs/manifesto" active={route.kind === 'manifesto'}>
          {t('nav.manifesto')}
        </NavItem>
        <NavItem href="/docs/workflow" active={route.kind === 'workflow'}>
          {t('nav.workflow')}
        </NavItem>
      </Section>

      <Section title={t('group.foundations')}>
        <NavItem
          href="/docs/foundations/color"
          active={foundationsActive && route.sub === 'color'}
        >
          {t('foundation.color')}
        </NavItem>
        <NavItem
          href="/docs/foundations/typography"
          active={foundationsActive && route.sub === 'typography'}
        >
          {t('foundation.typography')}
        </NavItem>
        <NavItem
          href="/docs/foundations/spacing"
          active={foundationsActive && route.sub === 'spacing'}
        >
          {t('foundation.spacing')}
        </NavItem>
        <NavItem
          href="/docs/foundations/radius"
          active={foundationsActive && route.sub === 'radius'}
        >
          {t('foundation.radius')}
        </NavItem>
        <NavItem
          href="/docs/foundations/motion"
          active={foundationsActive && route.sub === 'motion'}
        >
          {t('foundation.motion')}
        </NavItem>
      </Section>

      <Section title={t('group.guidelines')}>
        <NavItem href="/docs/principles" active={route.kind === 'principles'}>
          {t('nav.principles')}
        </NavItem>
        <NavItem href="/docs/haptics" active={route.kind === 'haptics'}>
          {t('nav.haptics')}
        </NavItem>
      </Section>

      <Section title={`${t('group.components')} · ${components.length}`}>
        {deepComponents.map((c) => (
          <NavItem
            key={c.slug}
            href={`/docs/components/${c.slug}`}
            active={route.kind === 'component' && route.slug === c.slug}
            badge={t('badge.deep')}
          >
            {c.name}
          </NavItem>
        ))}
        {shallowComponents.length > 0 && (
          <div className="docs-nav-divider" aria-hidden />
        )}
        {shallowComponents.map((c) => (
          <NavItem
            key={c.slug}
            href={`/docs/components/${c.slug}`}
            active={route.kind === 'component' && route.slug === c.slug}
          >
            {c.name}
          </NavItem>
        ))}
      </Section>

      <Section title={`${t('group.patterns')} · ${patterns.length}`}>
        {patterns.map((p) => (
          <NavItem
            key={p.slug}
            href={`/docs/patterns/${p.slug}`}
            active={route.kind === 'patterns' && route.slug === p.slug}
          >
            {p.name}
          </NavItem>
        ))}
      </Section>

      <Section title={`${t('group.live-samples')} · ${pages.length}`}>
        {pages.map((p) => (
          <NavItem
            key={p.slug}
            href={`/docs/pages/${p.slug}`}
            active={route.kind === 'page' && route.slug === p.slug}
          >
            {p.name}
          </NavItem>
        ))}
      </Section>

      <Section title={t('group.resources')}>
        <NavItem href="/docs/ai-workflows" active={route.kind === 'ai-workflows'}>
          {t('nav.ai-workflows')}
        </NavItem>
        <NavItem href="/docs/pitch" active={route.kind === 'pitch'}>
          {'项目汇报'}
        </NavItem>
        <NavItem href="/docs/changelog" active={route.kind === 'changelog'}>
          {t('nav.changelog')}
        </NavItem>
      </Section>
    </>
  )
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="docs-section">
      <div className="docs-section__title">{title}</div>
      <div className="docs-section__list">{children}</div>
    </div>
  )
}

function NavItem({
  href,
  active,
  top,
  badge,
  children,
}: {
  href: string
  active?: boolean
  top?: boolean
  badge?: string
  children: ReactNode
}) {
  return (
    <button
      className={`docs-nav-item ${active ? 'is-active' : ''} ${top ? 'docs-nav-item--top' : ''}`}
      onClick={() => navigate(href)}
    >
      <span className="docs-nav-item__label">{children}</span>
      {badge && <span className="docs-nav-item__badge">{badge}</span>}
    </button>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export { parseDocsRoute } from './router'
