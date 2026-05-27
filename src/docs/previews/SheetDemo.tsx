import { useState } from 'react'
import { DemoFrame, DemoControl, PropPicker } from './_DemoStub'

const SIDES = ['bottom', 'right'] as const
const SIZES = ['compact', 'standard', 'full'] as const

const SIZE_PCT: Record<(typeof SIZES)[number], number> = {
  compact: 40,
  standard: 65,
  full: 95,
}

export function SheetDemo() {
  const [side, setSide] = useState<(typeof SIDES)[number]>('bottom')
  const [size, setSize] = useState<(typeof SIZES)[number]>('standard')
  const [open, setOpen] = useState(true)

  const phoneStyle: React.CSSProperties = {
    width: 280,
    height: 480,
    background: 'var(--bg-1)',
    borderRadius: 28,
    border: '0.5px solid var(--line-non-opaque)',
    position: 'relative',
    overflow: 'hidden',
  }

  const sheetCommon: React.CSSProperties = {
    position: 'absolute',
    background: 'var(--bg-0)',
    // token-lint-disable-line Sheet 的非对称定向阴影，shadow-modal 是对称值不适用
    boxShadow: '0 -8px 32px rgba(0,0,0,0.12)',
    transition: 'all var(--duration-normal) var(--curve-default)',
    padding: 'var(--space-5)',
  }

  const sheetByPos: Record<typeof side, React.CSSProperties> = {
    bottom: {
      ...sheetCommon,
      left: 0,
      right: 0,
      bottom: 0,
      height: open ? `${SIZE_PCT[size]}%` : 0,
      borderRadius: 'var(--radius-x-large) var(--radius-x-large) 0 0',
    },
    right: {
      ...sheetCommon,
      top: 0,
      bottom: 0,
      right: 0,
      width: open ? `${SIZE_PCT[size]}%` : 0,
      borderRadius: 'var(--radius-x-large) 0 0 var(--radius-x-large)',
    },
  }

  const code = `<Sheet\n  side="${side}"\n  size="${size}"\n  open={${open}}\n  onClose={() => setOpen(false)}\n>\n  <h3>选择频道</h3>\n  <p>把这条想法归到合适的频道</p>\n</Sheet>`

  return (
    <DemoFrame
      caption="Sheet · Live"
      code={code}
      stage={
        <div style={phoneStyle}>
          {/* backdrop */}
          {open && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'var(--backdrop)',
                transition: 'opacity var(--duration-normal) var(--curve-ease-out)',
              }}
              onClick={() => setOpen(false)}
            />
          )}
          <div style={sheetByPos[side]}>
            {open && (
              <>
                {side === 'bottom' && (
                  <div
                    style={{
                      width: 36,
                      height: 4,
                      background: 'var(--fill-tertiary)',
                      borderRadius: 2,
                      margin: '0 auto var(--space-4)',
                    }}
                  />
                )}
                <div className="docs-text--body-primary" style={{ fontWeight: 500, marginBottom: 'var(--space-2)' }}>
                  选择频道
                </div>
                <div className="docs-text--subhead docs-text--secondary">
                  把这条想法归到合适的频道
                </div>
              </>
            )}
          </div>
        </div>
      }
      controls={
        <>
          <DemoControl label="side">
            <PropPicker options={SIDES} value={side} onChange={setSide} />
          </DemoControl>
          <DemoControl label="size">
            <PropPicker options={SIZES} value={size} onChange={setSize} />
          </DemoControl>
          <DemoControl label="open">
            <PropPicker options={[true, false] as const} value={open} onChange={setOpen} />
          </DemoControl>
        </>
      }
    />
  )
}
