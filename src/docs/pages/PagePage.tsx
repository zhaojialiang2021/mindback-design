import type { FC } from 'react'
import { pages, components } from '../manifest'
import { renderMarkdown, getFrontmatter } from '../markdown'
import { navigate } from '../router'
import { Icon } from '../icons'
import { NotFoundPage } from './NotFoundPage'
import { DocsPageHeader } from '../PageHeader'
import { SplashScreen } from '../../screens/SplashScreen'
import { HomeScreen } from '../../screens/HomeScreen'
import { AIPreferencesScreen } from '../../screens/AIPreferencesScreen'
import { AISummaryScreen } from '../../screens/AISummaryScreen'
import { TimeFragmentScreen } from '../../screens/TimeFragmentScreen'
import { DottedDemoScreen } from '../../screens/DottedDemoScreen'

const sources = import.meta.glob('../../../references/pages/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

function loadSpec(slug: string): string | null {
  const path = Object.keys(sources).find((p) => p.endsWith(`/${slug}.md`))
  return path ? sources[path] : null
}

const screenBySid: Record<string, FC> = {
  'splash': SplashScreen,
  'home': HomeScreen,
  'ai-preferences': AIPreferencesScreen,
  'ai-summary': AISummaryScreen,
  'time-fragment': TimeFragmentScreen,
  'dotted-demo': DottedDemoScreen,
}

export function PagePage({ slug }: { slug: string }) {
  const meta = pages.find((p) => p.slug === slug)

  if (!meta) {
    return <NotFoundPage path={`pages/${slug}`} />
  }

  const src = loadSpec(meta.slug)
  const fm = src ? getFrontmatter(src) : {}
  const ScreenComponent = screenBySid[meta.screenId]

  return (
    <>
      <DocsPageHeader
        title={meta.name}
        subtitle={meta.subtitle}
        meta={
          <>
            {fm.status && <span>状态 <strong>{fm.status}</strong></span>}
            {fm.last_updated && <span>更新于 <strong>{fm.last_updated}</strong></span>}
          </>
        }
      />

      <section className="docs-section-block">
        <h2 className="docs-section-block__heading">实时预览</h2>
        <p className="docs-section-block__subheading">
          下方是直接从设计系统组件渲染的页面，不是截图、不是 Figma 导出，是生产代码。
        </p>

        <div className="docs-device-frame">
          {ScreenComponent ? (
            <div className="docs-device-screen">
              <ScreenComponent />
            </div>
          ) : (
            <p>组件未注册</p>
          )}
        </div>
      </section>

      {meta.uses && meta.uses.length > 0 && (
        <section className="docs-section-block">
          <h2 className="docs-section-block__heading">用到的组件</h2>
          <p className="docs-section-block__subheading">
            点击锚点直接跳到对应组件页（活样本：证明这套设计系统不只是文档，是真在跑的）。
          </p>
          <div className="docs-uses-grid">
            {meta.uses.map((slug) => {
              const c = components.find((x) => x.slug === slug)
              if (!c) return null
              return (
                <button
                  key={slug}
                  className="docs-uses-chip"
                  onClick={() => navigate(`/docs/components/${slug}`)}
                >
                  <span className="docs-uses-chip__name">{c.name}</span>
                  {c.depth === 'deep' && (
                    <span className="docs-uses-chip__badge">deep</span>
                  )}
                  <Icon.ChevronRight size={12} />
                </button>
              )
            })}
          </div>
        </section>
      )}

      {src && (
        <section className="docs-section-block">
          <h2 className="docs-section-block__heading">页面规格</h2>
          <div className="docs-card">{renderMarkdown(src)}</div>
        </section>
      )}
    </>
  )
}
