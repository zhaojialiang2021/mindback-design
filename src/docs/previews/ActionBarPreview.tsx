import { useState, type ReactNode } from 'react'
import { Icon } from '../icons'

type Variant = 'fixed-single' | 'fixed-multi' | 'floating-primary' | 'floating-actions'

const variants: { id: Variant; label: string }[] = [
  { id: 'fixed-single', label: 'FixedSingle' },
  { id: 'fixed-multi', label: 'FixedMulti' },
  { id: 'floating-primary', label: 'FloatingPrimary' },
  { id: 'floating-actions', label: 'FloatingActions' },
]

export function ActionBarPreview() {
  const [variant, setVariant] = useState<Variant>('fixed-single')

  return (
    <div>
      <div className="docs-segmented">
        {variants.map((v) => (
          <button
            key={v.id}
            className={`docs-segmented__btn ${variant === v.id ? 'is-active' : ''}`}
            onClick={() => setVariant(v.id)}
          >
            {v.label}
          </button>
        ))}
      </div>

      <div className="docs-stage">
        <div className="docs-stage__caption">ActionBar · {variant}</div>
        <div className="docs-stage__inner">
          <div
            style={{
              position: 'relative',
              width: 393,
              height: 320,
              background: 'var(--bg-1)',
              borderRadius: 'var(--radius-x-large)',
              overflow: 'hidden',
              border: '0.5px solid var(--line-non-opaque)',
              boxShadow: '0 12px 40px rgba(0, 0, 0, 0.06)',
            }}
          >
            <div style={{ padding: '16px 20px', color: 'var(--label-tertiary)', fontSize: 13 }}>
              页面内容…
            </div>
            <Bar variant={variant} />
          </div>
        </div>
      </div>
    </div>
  )
}

function Bar({ variant }: { variant: Variant }) {
  if (variant === 'fixed-single') {
    return (
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          background: 'var(--bg-0)',
          borderTop: '0.5px solid var(--line-non-opaque)',
          padding: '12px 16px',
        }}
      >
        <button style={primaryBtn}>提交</button>
      </div>
    )
  }
  if (variant === 'fixed-multi') {
    return (
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          background: 'var(--bg-0)',
          borderTop: '0.5px solid var(--line-non-opaque)',
          padding: '12px 16px',
          display: 'flex',
          gap: 12,
        }}
      >
        <button style={secondaryBtn}>取消</button>
        <button style={{ ...primaryBtn, flex: 1 }}>保存</button>
      </div>
    )
  }
  if (variant === 'floating-primary') {
    return (
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 24,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <button style={{ ...primaryBtn, width: 'auto', padding: '0 24px', borderRadius: 'var(--radius-x-large)' }}>
          + 记录
        </button>
      </div>
    )
  }
  // floating-actions
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 24,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          background: 'var(--bg-0)',
          borderRadius: 'var(--radius-x-large)',
          padding: '10px 14px',
          display: 'flex',
          gap: 10,
          border: '0.5px solid var(--line-non-opaque)',
          boxShadow: '0 6px 20px rgba(0, 0, 0, 0.08)',
        }}
      >
        <CircleBtn icon={<Icon.Camera size={20} />} />
        <CircleBtn icon={<Icon.Mic size={20} />} />
        <CircleBtn icon={<Icon.Pen size={20} />} />
      </div>
    </div>
  )
}

function CircleBtn({ icon }: { icon: ReactNode }) {
  return (
    <button
      style={{
        width: 44,
        height: 44,
        borderRadius: '50%',
        background: 'var(--fill-quaternary)',
        color: 'var(--label-primary)',
        border: 0,
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {icon}
    </button>
  )
}

const primaryBtn: React.CSSProperties = {
  width: '100%',
  height: 56,
  border: 0,
  borderRadius: 12,
  background: 'var(--brand-blue)',
  color: '#fff',
  fontSize: 17,
  fontWeight: 500,
  cursor: 'pointer',
}

const secondaryBtn: React.CSSProperties = {
  height: 56,
  border: 0,
  borderRadius: 12,
  background: 'var(--fill-tertiary)',
  color: 'var(--label-primary)',
  fontSize: 17,
  fontWeight: 500,
  cursor: 'pointer',
  padding: '0 24px',
}
