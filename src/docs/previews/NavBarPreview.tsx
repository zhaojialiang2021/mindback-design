import { useState } from 'react'

type Variant = 'standard' | 'modal' | 'logo'

const variants: { id: Variant; label: string }[] = [
  { id: 'standard', label: 'Standard' },
  { id: 'modal', label: 'Modal' },
  { id: 'logo', label: 'Logo' },
]

export function NavBarPreview() {
  const [variant, setVariant] = useState<Variant>('standard')

  return (
    <div>
      <Segmented value={variant} onChange={setVariant} options={variants} />
      <Stage>
        <NavBar variant={variant} />
      </Stage>
    </div>
  )
}

function Segmented<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T
  onChange: (v: T) => void
  options: { id: T; label: string }[]
}) {
  return (
    <div className="docs-segmented">
      {options.map((o) => (
        <button
          key={o.id}
          className={`docs-segmented__btn ${value === o.id ? 'is-active' : ''}`}
          onClick={() => onChange(o.id)}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

function Stage({ children }: { children: React.ReactNode }) {
  return (
    <div className="docs-stage">
      <div className="docs-stage__caption">NavBar · 393×48 顶部导航</div>
      <div className="docs-stage__inner">
        <div
          style={{
            width: 393,
            background: 'var(--bg-1)',
            borderRadius: 'var(--radius-x-large)',
            overflow: 'hidden',
            border: '0.5px solid var(--line-non-opaque)',
          }}
        >
          {children}
          {/* 内容占位 —— 让分割线下方有视觉重量 */}
          <div style={{ height: 220, padding: 16, color: 'var(--label-tertiary)', fontSize: 13 }}>
            页面内容…
          </div>
        </div>
      </div>
    </div>
  )
}

export function NavBar({ variant }: { variant: Variant }) {
  return (
    <div
      style={{
        height: 48,
        display: 'flex',
        alignItems: 'center',
        background: 'var(--bg-0)',
        padding: '0 var(--space-4)',
        borderBottom: '0.5px solid var(--line-non-opaque)',
        gap: 'var(--space-2)',
      }}
    >
      {/* Leading */}
      <div style={{ width: 44, display: 'flex', justifyContent: 'flex-start' }}>
        {variant === 'standard' && <Icon name="back" />}
        {variant === 'modal' && <Icon name="close" />}
        {variant === 'logo' && <LogoMark />}
      </div>

      {/* Title */}
      <div
        style={{
          flex: 1,
          textAlign: 'center',
          fontSize: 'var(--headline-h3-size)',
          fontWeight: 500,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {variant === 'standard' && 'AI 偏好'}
        {variant === 'modal' && '编辑碎片'}
        {variant === 'logo' && ''}
      </div>

      {/* Trailing */}
      <div style={{ width: 44, display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
        {variant === 'standard' && null}
        {variant === 'modal' && (
          <button
            style={{
              background: 'transparent',
              border: 0,
              color: 'var(--brand-blue)',
              fontWeight: 500,
              fontSize: 15,
              cursor: 'pointer',
              padding: 0,
            }}
          >
            完成
          </button>
        )}
        {variant === 'logo' && <Icon name="star" />}
      </div>
    </div>
  )
}

function Icon({ name }: { name: 'back' | 'close' | 'star' }) {
  const common = { width: 24, height: 24, stroke: 'currentColor', fill: 'none', strokeWidth: 1.5 }
  return (
    <span style={{ display: 'inline-flex', color: 'var(--label-primary)' }}>
      {name === 'back' && (
        <svg viewBox="0 0 24 24" {...common}>
          <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
      {name === 'close' && (
        <svg viewBox="0 0 24 24" {...common}>
          <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
        </svg>
      )}
      {name === 'star' && (
        <svg viewBox="0 0 24 24" {...common}>
          <path
            d="M12 3l2.5 6 6.5.5-5 4.5 1.5 6.5L12 17l-5.5 3.5L8 14 3 9.5l6.5-.5L12 3z"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </span>
  )
}

function LogoMark() {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        fontSize: 17,
        fontWeight: 600,
      }}
    >
      <span
        style={{
          width: 24,
          height: 24,
          borderRadius: 6,
          background: 'var(--brand-blue)',
        }}
      />
      MindBack
    </div>
  )
}
