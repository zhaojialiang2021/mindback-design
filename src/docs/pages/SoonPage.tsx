import { type ReactNode } from 'react'
import { DocsHero } from '../PageHeader'

/**
 * 占位页：路由可达 + IA 就位但内容暂未填的页面。
 * 走 DocsHero 共用样式，跟其他 hero 入口字阶一致。
 */
export function SoonPage({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow?: string
  title: string
  lead: string
  children?: ReactNode
}) {
  return (
    <>
      <DocsHero eyebrow={eyebrow} title={title} lead={lead} />
      {children ? <div className="docs-soon-body">{children}</div> : null}
    </>
  )
}
