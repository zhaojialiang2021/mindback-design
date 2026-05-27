// 深度组件 live demo 共用骨架：上方 stage（实际渲染），下方控件区（调 props），底部代码 + 复制按钮
import { type ReactNode } from 'react'
import { useToast } from '../useToast'
import { useT } from '../useLocale'
import { Icon } from '../icons'

export function DemoFrame({
  stage,
  controls,
  caption,
  code,
}: {
  stage: ReactNode
  controls: ReactNode
  caption?: string
  /** 当前 props 序列化的 JSX 字符串。提供时显示「复制 JSX」按钮 */
  code?: string
}) {
  const t = useT()
  const { show, node: toastNode } = useToast()

  function copy() {
    if (!code) return
    navigator.clipboard.writeText(code).then(
      () => show(t('common.copied') + ' · JSX'),
      () => show(t('common.copy-failed')),
    )
  }

  return (
    <>
      <div className="docs-demo">
        <div className="docs-demo__stage">
          {caption ? <div className="docs-stage__caption">{caption}</div> : null}
          <div className="docs-stage__inner">{stage}</div>
        </div>
        <div className="docs-demo__controls">{controls}</div>
      </div>
      {code && (
        <div className="docs-demo__code-wrap">
          <pre className="docs-codeblock docs-demo__code">
            <code>{code}</code>
            <button className="docs-codeblock__copy" onClick={copy}>
              <Icon.Copy size={13} /> JSX
            </button>
          </pre>
        </div>
      )}
      {toastNode}
    </>
  )
}

export function DemoControl({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <div className="docs-demo__control">
      <div className="docs-demo__label">{label}</div>
      <div className="docs-demo__field">{children}</div>
    </div>
  )
}

export function PropPicker<T extends string | boolean>({
  options,
  value,
  onChange,
}: {
  options: readonly T[]
  value: T
  onChange: (v: T) => void
}) {
  return (
    <div className="docs-segmented" style={{ marginBottom: 0 }}>
      {options.map((o) => (
        <button
          key={String(o)}
          className={`docs-segmented__btn ${o === value ? 'is-active' : ''}`}
          onClick={() => onChange(o)}
        >
          {String(o)}
        </button>
      ))}
    </div>
  )
}
