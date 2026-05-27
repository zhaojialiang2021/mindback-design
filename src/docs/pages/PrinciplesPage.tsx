import { renderMarkdown } from '../markdown'
import { DocsPageHeader } from '../PageHeader'
// Vite 支持 ?raw 后缀直接把文件作为字符串导入
import principlesSrc from '../../../references/design-principles.md?raw'

export function PrinciplesPage() {
  return (
    <>
      <DocsPageHeader
        title="设计原则"
        subtitle="从 references/design-principles.md 直接渲染。每条规则都附设计备注，解释“为什么”。"
      />
      <div className="docs-card">{renderMarkdown(principlesSrc)}</div>
    </>
  )
}
