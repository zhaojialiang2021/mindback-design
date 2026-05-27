import { useState } from 'react'
import { DemoFrame, DemoControl, PropPicker } from './_DemoStub'

const VARIANTS = ['default', 'tinted', 'elevated'] as const
const PADDINGS = ['compact', 'standard', 'comfortable'] as const

const PAD_MAP: Record<(typeof PADDINGS)[number], string> = {
  compact: 'var(--space-3)',
  standard: 'var(--space-4)',
  comfortable: 'var(--space-5)',
}

export function CardDemo() {
  const [variant, setVariant] = useState<(typeof VARIANTS)[number]>('default')
  const [padding, setPadding] = useState<(typeof PADDINGS)[number]>('standard')
  const [interactive, setInteractive] = useState(false)

  const styleByVariant: Record<(typeof VARIANTS)[number], React.CSSProperties> = {
    default: {
      background: 'transparent',
      border: '0.5px solid var(--line-non-opaque)',
    },
    tinted: { background: 'var(--bg-1)', border: '0.5px solid transparent' },
    elevated: {
      background: 'var(--bg-0)',
      border: '0.5px solid transparent',
      boxShadow: 'var(--shadow-modal)',
    },
  }

  const code = `<Card variant="${variant}" padding="${padding}"${interactive ? ' interactive' : ''}>\n  <h3>能力卡</h3>\n  <p>最近 6 条输入里，有 4 条都提到记录后没有后续动作。</p>\n</Card>`

  return (
    <DemoFrame
      caption="Card · Live"
      code={code}
      stage={
        <div
          role={interactive ? 'button' : undefined}
          tabIndex={interactive ? 0 : undefined}
          style={{
            ...styleByVariant[variant],
            borderRadius: 'var(--radius-large)',
            padding: PAD_MAP[padding],
            width: 360,
            cursor: interactive ? 'pointer' : 'default',
            transition: 'background var(--duration-fast) var(--curve-default)',
          }}
          onMouseEnter={(e) => {
            if (interactive) e.currentTarget.style.background = 'var(--fill-quaternary)'
          }}
          onMouseLeave={(e) => {
            if (interactive) e.currentTarget.style.background = styleByVariant[variant].background as string
          }}
        >
          <div className="docs-text--body-primary" style={{ fontWeight: 500, marginBottom: 'var(--space-2)' }}>
            能力卡
          </div>
          <div className="docs-text--subhead docs-text--secondary">
            最近 6 条输入里，有 4 条都提到记录后没有后续动作。
          </div>
        </div>
      }
      controls={
        <>
          <DemoControl label="variant">
            <PropPicker options={VARIANTS} value={variant} onChange={setVariant} />
          </DemoControl>
          <DemoControl label="padding">
            <PropPicker options={PADDINGS} value={padding} onChange={setPadding} />
          </DemoControl>
          <DemoControl label="interactive">
            <PropPicker
              options={[false, true] as const}
              value={interactive}
              onChange={setInteractive}
            />
          </DemoControl>
        </>
      }
    />
  )
}
