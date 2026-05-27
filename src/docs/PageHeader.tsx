import { type ReactNode } from 'react'

/**
 * 页面顶部标题统一组件
 *
 * 两种用法（按 page 类型选）：
 *
 * 1. <DocsPageHeader>      —— 详情页用。h1 = 28-30px，subtitle 15px。
 *    Foundations / Components / Patterns 子页 / AI Workflows / Changelog / Tokens / Pages / Writing
 *
 * 2. <DocsHero>            —— 入口页用。h1 = 36-44px，subtitle 17px。
 *    DocsHome / Manifesto / Patterns 索引 / 404
 *
 * 选用规则：详情页用 PageHeader，引导/概览页用 Hero。两者字号梯度有意拉开。
 */

type Props = {
  eyebrow?: ReactNode
  title: ReactNode
  subtitle?: ReactNode
  actions?: ReactNode
  meta?: ReactNode
}

export function DocsPageHeader({ eyebrow, title, subtitle, actions, meta }: Props) {
  return (
    <header className="docs-page-header">
      <div>
        {eyebrow && <div className="docs-page-header__eyebrow">{eyebrow}</div>}
        <h1 className="docs-page-header__title">{title}</h1>
        {subtitle && <p className="docs-page-header__subtitle">{subtitle}</p>}
      </div>
      {actions && <div className="docs-page-header__actions">{actions}</div>}
      {meta && <div className="docs-page-header__meta">{meta}</div>}
    </header>
  )
}

export function DocsHero({
  eyebrow,
  title,
  lead,
  meta,
  align = 'left',
}: {
  eyebrow?: ReactNode
  title: ReactNode
  lead?: ReactNode
  meta?: ReactNode
  align?: 'left' | 'center'
}) {
  return (
    <section className={`docs-hero ${align === 'center' ? 'docs-hero--center' : ''}`}>
      {eyebrow && <div className="docs-hero__eyebrow">{eyebrow}</div>}
      <h1 className="docs-hero__title">{title}</h1>
      {lead && <p className="docs-hero__lead">{lead}</p>}
      {meta && <div className="docs-hero__meta">{meta}</div>}
    </section>
  )
}
