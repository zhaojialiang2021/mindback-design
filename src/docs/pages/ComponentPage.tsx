import type { ComponentSlug } from '../manifest'
import { components } from '../manifest'
import { renderMarkdown, getFrontmatter } from '../markdown'
import { getComponentSchema, schemaToLLMSpec, type ComponentSchema } from '../component-schema'
import { useToast } from '../useToast'
import { Icon } from '../icons'
import { NotFoundPage } from './NotFoundPage'
import { useT } from '../useLocale'
import { DocsPageHeader } from '../PageHeader'
import { NavBarPreview } from '../previews/NavBarPreview'
import { SidebarPreview } from '../previews/SidebarPreview'
import { SwitchPreview } from '../previews/SwitchPreview'
import { InputPreview } from '../previews/InputPreview'
import { ModalPreview } from '../previews/ModalPreview'
import { DividerPreview } from '../previews/DividerPreview'
import { ToastPreview } from '../previews/ToastPreview'
import { ActionBarPreview } from '../previews/ActionBarPreview'
// 5 个深度组件 live demo —— Day 4 逐个实现
import { ButtonDemo } from '../previews/ButtonDemo'
import { InputDemo } from '../previews/InputDemo'
import { CardDemo } from '../previews/CardDemo'
import { SheetDemo } from '../previews/SheetDemo'
import { EmptyStateDemo } from '../previews/EmptyStateDemo'
// Anatomy SVG 图解 —— Day 10
import { ButtonAnatomy } from '../previews/anatomy/ButtonAnatomy'
import { InputAnatomy } from '../previews/anatomy/InputAnatomy'
import { CardAnatomy } from '../previews/anatomy/CardAnatomy'
import { SheetAnatomy } from '../previews/anatomy/SheetAnatomy'
import { EmptyStateAnatomy } from '../previews/anatomy/EmptyStateAnatomy'

const sources = import.meta.glob('../../../references/components/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

function loadSpec(slug: ComponentSlug): string | null {
  const path = Object.keys(sources).find((p) => p.endsWith(`/${slug}.md`))
  return path ? sources[path] : null
}

const shallowPreviewMap: Partial<Record<ComponentSlug, () => React.ReactNode>> = {
  'nav-bar': () => <NavBarPreview />,
  sidebar: () => <SidebarPreview />,
  switch: () => <SwitchPreview />,
  input: () => <InputPreview />,
  modal: () => <ModalPreview />,
  divider: () => <DividerPreview />,
  toast: () => <ToastPreview />,
  'action-bar': () => <ActionBarPreview />,
}

const deepDemoMap: Partial<Record<ComponentSlug, React.ComponentType>> = {
  button: ButtonDemo,
  input: InputDemo,
  card: CardDemo,
  sheet: SheetDemo,
  'empty-state': EmptyStateDemo,
}

const anatomyMap: Partial<Record<ComponentSlug, React.ComponentType>> = {
  button: ButtonAnatomy,
  input: InputAnatomy,
  card: CardAnatomy,
  sheet: SheetAnatomy,
  'empty-state': EmptyStateAnatomy,
}

export function ComponentPage({ slug }: { slug: string }) {
  const meta = components.find((c) => c.slug === slug)
  if (!meta) return <NotFound slug={slug} />

  if (meta.depth === 'deep') {
    const schema = getComponentSchema(meta.slug)
    if (!schema) return <NotFound slug={slug} note="schema 缺失" />
    const Demo = deepDemoMap[meta.slug]
    const Anatomy = anatomyMap[meta.slug]
    return <DeepComponentPage meta={meta} schema={schema} Demo={Demo} Anatomy={Anatomy} />
  }

  // 浅组件：保留旧渲染（兼容 backlog）
  const src = loadSpec(meta.slug)
  const Preview = shallowPreviewMap[meta.slug]
  const fm = src ? getFrontmatter(src) : {}
  return (
    <>
      <DocsPageHeader
        title={meta.name}
        meta={
          <>
            {fm.last_updated && <span>更新于 <strong>{fm.last_updated}</strong></span>}
            {fm.used_by && <span>用于 <strong>{fm.used_by}</strong></span>}
          </>
        }
      />
      <section className="docs-section-block">
        <h2 className="docs-section-block__heading">实时预览</h2>
        {Preview ? (
          Preview()
        ) : (
          <div className="docs-card">
            <p className="docs-hint">该组件还未接入实时预览。属于 backlog 浅组件。</p>
          </div>
        )}
      </section>
      <section className="docs-section-block">
        <h2 className="docs-section-block__heading">规格文档</h2>
        <div className="docs-card">
          {src ? renderMarkdown(src) : <p className="docs-hint">未找到规格文档。</p>}
        </div>
      </section>
    </>
  )
}

// ===== 深度组件固定结构（brief §5.3） =====
function DeepComponentPage({
  schema,
  Demo,
  Anatomy,
}: {
  meta: { slug: ComponentSlug; name: string }
  schema: ComponentSchema
  Demo?: React.ComponentType
  Anatomy?: React.ComponentType
}) {
  const t = useT()
  const { show, node: toastNode } = useToast()
  const handleCopyForAI = () => {
    const md = schemaToLLMSpec(schema)
    navigator.clipboard.writeText(md).then(
      () => show(t('common.copied') + ' · LLM spec'),
      () => show(t('common.copy-failed')),
    )
  }
  const handleCopySchema = () => {
    navigator.clipboard.writeText(JSON.stringify(schema, null, 2)).then(
      () => show(t('common.copied') + ' · Schema JSON'),
      () => show(t('common.copy-failed')),
    )
  }

  const sections: Array<[string, string]> = [
    ['live-demo', t('component.live-demo')],
    ['props', t('component.props')],
    ['states', t('component.states')],
    ['anatomy', t('component.anatomy')],
    ['constraints', t('component.constraints')],
    ['do-dont', t('component.do-dont')],
  ]

  return (
    <>
      <DocsPageHeader
        eyebrow={`${schema.category} · ${t('component.deep-tag')}`}
        title={schema.name}
        subtitle={schema.description}
        actions={
          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            <button className="docs-copy-btn docs-copy-btn--primary" onClick={handleCopyForAI}>
              <Icon.Sparkles size={13} />
              {t('component.copy-ai')}
            </button>
            <button className="docs-copy-btn" onClick={handleCopySchema}>
              <Icon.FileJson size={13} />
              {t('component.copy-schema')}
            </button>
          </div>
        }
      />

      {/* 段落锚点：让用户直接跳到 Props / States / Anatomy 等 */}
      <nav className="docs-component-anchors" aria-label="page sections">
        {sections.map(([id, label]) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={(e) => {
              e.preventDefault()
              document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }}
          >
            {label}
          </a>
        ))}
      </nav>

      <section className="docs-section-block" id="live-demo">
        <h2 className="docs-section-block__heading">{t('component.live-demo')}</h2>
        <p className="docs-section-block__subheading">{t('component.live-demo.lead')}</p>
        {Demo ? (
          <Demo />
        ) : (
          <div className="docs-card">
            <p className="docs-hint">Live demo 待实现 —— Day 4 交付。</p>
          </div>
        )}
      </section>

      <section className="docs-section-block" id="props">
        <h2 className="docs-section-block__heading">{t('component.props')}</h2>
        <p className="docs-section-block__subheading">{t('component.props.lead')}</p>
        <div className="docs-card" style={{ padding: 0 }}>
          <table className="docs-table">
            <thead>
              <tr>
                <th>Prop</th>
                <th>Values</th>
                <th>Default</th>
                <th>说明</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(schema.props).map(([name, def]) => (
                <tr key={name}>
                  <td>
                    <code>{name}</code>
                  </td>
                  <td>
                    {def.values.map((v, i) => (
                      <code key={i} style={{ marginRight: 4 }}>
                        {JSON.stringify(v)}
                      </code>
                    ))}
                  </td>
                  <td>
                    <code>{JSON.stringify(def.default)}</code>
                  </td>
                  <td style={{ color: 'var(--label-secondary)' }}>{def.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="docs-section-block" id="states">
        <h2 className="docs-section-block__heading">{t('component.states')}</h2>
        <p className="docs-section-block__subheading">{t('component.states.lead')}</p>
        <div className="docs-state-row">
          {schema.states.map((s) => (
            <code key={s} className="docs-state-chip">
              {s}
            </code>
          ))}
        </div>
      </section>

      <section className="docs-section-block" id="anatomy">
        <h2 className="docs-section-block__heading">{t('component.anatomy')}</h2>
        <p className="docs-section-block__subheading">{t('component.anatomy.lead')}</p>
        {Anatomy && (
          <div className="docs-card" style={{ marginBottom: 'var(--space-4)' }}>
            <Anatomy />
          </div>
        )}
        <div className="docs-card">
          <table className="docs-table">
            <thead>
              <tr>
                <th>Part</th>
                <th>Tokens / 说明</th>
              </tr>
            </thead>
            <tbody>
              {schema.anatomy.map((a) => (
                <tr key={a.part}>
                  <td>
                    <code>{a.part}</code>
                  </td>
                  <td style={{ color: 'var(--label-secondary)' }}>
                    {a.description ??
                      a.tokens?.map((t) => (
                        <code key={t} style={{ marginRight: 4 }}>
                          {t}
                        </code>
                      ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="docs-section-block" id="constraints">
        <h2 className="docs-section-block__heading">{t('component.constraints')}</h2>
        <p className="docs-section-block__subheading">{t('component.constraints.lead')}</p>
        <div className="docs-card" style={{ padding: 0 }}>
          <table className="docs-table">
            <thead>
              <tr>
                <th>Rule</th>
                <th>说明</th>
              </tr>
            </thead>
            <tbody>
              {schema.constraints.map((c) => (
                <tr key={c.rule}>
                  <td>
                    <code>{c.rule}</code>
                  </td>
                  <td style={{ color: 'var(--label-secondary)' }}>{c.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="docs-section-block" id="do-dont">
        <h2 className="docs-section-block__heading">{t('component.do-dont')}</h2>
        <div className="docs-do-dont">
          <div className="docs-do-dont__col docs-do-dont__col--do">
            <div className="docs-do-dont__title">{t('component.do')}</div>
            <ul>
              {schema.doDont.do.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          </div>
          <div className="docs-do-dont__col docs-do-dont__col--dont">
            <div className="docs-do-dont__title">{t('component.dont')}</div>
            <ul>
              {schema.doDont.dont.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {toastNode}
    </>
  )
}

function NotFound({ slug }: { slug: string; note?: string }) {
  return <NotFoundPage path={`components/${slug}`} />
}
