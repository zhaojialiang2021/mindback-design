import { useState } from 'react'
import { Icon } from '../icons'

type Variant = 'list' | 'section' | 'fullwidth'

export function DividerPreview() {
  const [variant, setVariant] = useState<Variant>('list')

  return (
    <div>
      <div className="docs-segmented">
        {(['list', 'section', 'fullwidth'] as Variant[]).map((v) => (
          <button
            key={v}
            className={`docs-segmented__btn ${variant === v ? 'is-active' : ''}`}
            onClick={() => setVariant(v)}
          >
            {v}
          </button>
        ))}
      </div>

      <div className="docs-stage">
        <div className="docs-stage__caption">Divider · {variant}</div>
        <div className="docs-stage__inner">
          <div
            style={{
              width: 320,
              background: 'var(--bg-0)',
              borderRadius: 'var(--radius-x-large)',
              overflow: 'hidden',
              border: '0.5px solid var(--line-non-opaque)',
            }}
          >
            <Row first label="选项一" />
            <DividerLine variant={variant} />
            <Row label="选项二" />
            <DividerLine variant={variant} />
            <Row label="选项三" />
          </div>
        </div>
      </div>
    </div>
  )
}

function Row({ label, first }: { label: string; first?: boolean }) {
  return (
    <div
      style={{
        height: 48,
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        gap: 12,
        marginTop: first ? 0 : 0,
      }}
    >
      <span style={{ width: 28, height: 28, borderRadius: 7, background: 'var(--fill-quaternary)' }} />
      <span style={{ flex: 1, fontSize: 15, letterSpacing: '-0.005em' }}>{label}</span>
      <span style={{ color: 'var(--label-tertiary)', display: 'inline-flex' }}>
        <Icon.ChevronRight size={16} />
      </span>
    </div>
  )
}

function DividerLine({ variant }: { variant: Variant }) {
  let inset: React.CSSProperties = {}
  if (variant === 'list') inset = { marginLeft: 52, marginRight: 0 }
  if (variant === 'section') inset = { marginLeft: 16, marginRight: 16 }
  if (variant === 'fullwidth') inset = {}
  return <div style={{ height: 0.5, background: 'var(--line-non-opaque)', ...inset }} />
}
