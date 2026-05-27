import { useEffect, useState, type ReactNode } from 'react'
import { Icon } from '../icons'

type Variant = 'default' | 'success' | 'warning' | 'error' | 'with-action'

const variants: Variant[] = ['default', 'success', 'warning', 'error', 'with-action']

export function ToastPreview() {
  const [active, setActive] = useState<Variant | null>('success')

  // 自动循环演示
  useEffect(() => {
    if (!active) return
    const t = setTimeout(() => setActive(null), 4000)
    return () => clearTimeout(t)
  }, [active])

  return (
    <div>
      <div className="docs-segmented">
        {variants.map((v) => (
          <button
            key={v}
            className={`docs-segmented__btn ${active === v ? 'is-active' : ''}`}
            onClick={() => setActive(v)}
          >
            {v}
          </button>
        ))}
      </div>

      <div className="docs-stage" style={{ minHeight: 280 }}>
        <div className="docs-stage__caption">Toast · 浮于内容上方，居中显示</div>
        <div
          className="docs-stage__inner"
          style={{ alignItems: 'flex-end', paddingBottom: 32, height: 240 }}
        >
          <div style={{ height: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
            {active && <Toast variant={active} />}
          </div>
        </div>
      </div>
    </div>
  )
}

function Toast({ variant }: { variant: Variant }) {
  const conf: Record<Variant, { icon: ReactNode | null; iconColor: string; text: string }> = {
    default: { icon: null, iconColor: '', text: '提示信息' },
    success: { icon: <Icon.Check size={16} />, iconColor: 'var(--accent-green)', text: '已保存' },
    warning: { icon: <Icon.Warning size={16} />, iconColor: 'var(--accent-yellow)', text: '即将达到上限' },
    error: { icon: <Icon.Close size={16} />, iconColor: 'var(--accent-pink)', text: '保存失败' },
    'with-action': { icon: null, iconColor: '', text: '已删除' },
  }
  const c = conf[variant]
  return (
    <div
      key={variant}
      style={{
        background: 'var(--label-primary)',
        color: 'var(--bg-0)',
        padding: '12px 18px',
        borderRadius: 9999,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        fontSize: 14.5,
        fontWeight: 500,
        letterSpacing: '-0.005em',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.16)',
        animation: 'docs-toast-in 240ms cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}
    >
      {c.icon && (
        <span style={{ color: c.iconColor, display: 'inline-flex', alignItems: 'center' }}>
          {c.icon}
        </span>
      )}
      <span>{c.text}</span>
      {variant === 'with-action' && (
        <button
          style={{
            background: 'transparent',
            border: 0,
            color: 'var(--brand-blue)',
            fontSize: 14.5,
            fontWeight: 600,
            cursor: 'pointer',
            padding: 0,
            marginLeft: 4,
            fontFamily: 'inherit',
          }}
        >
          撤销
        </button>
      )}
    </div>
  )
}
