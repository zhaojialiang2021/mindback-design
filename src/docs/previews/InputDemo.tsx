import { useState } from 'react'
import { DemoFrame, DemoControl, PropPicker } from './_DemoStub'

const STATES = ['empty', 'focus', 'filled', 'error', 'disabled'] as const

export function InputDemo() {
  const [state, setState] = useState<(typeof STATES)[number]>('empty')
  const [withLabel, setWithLabel] = useState(true)

  const isError = state === 'error'
  const isDisabled = state === 'disabled'
  const filled = state === 'filled' || state === 'error'

  const code = `<Input\n  ${withLabel ? 'label="输入名称"\n  ' : ''}state="${state}"\n  placeholder="输入想法..."\n/>`

  return (
    <DemoFrame
      caption="Input · Live"
      code={code}
      stage={
        <div style={{ width: 320, display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          {withLabel && (
            <label className="mb-input__label docs-text--subhead docs-text--secondary">
              输入名称
            </label>
          )}
          <div
            className="mb-input__container"
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '0 var(--space-3)',
              height: 'var(--space-9)',
              background: state === 'focus' ? 'var(--bg-0)' : 'var(--fill-quaternary)',
              borderRadius: 'var(--radius-medium)',
              border: `1px solid ${
                isError
                  ? 'var(--accent-pink)'
                  : state === 'focus'
                  ? 'var(--brand-blue)'
                  : 'transparent'
              }`,
              opacity: isDisabled ? 0.5 : 1,
              transition: 'all var(--duration-fast) var(--curve-default)',
            }}
          >
            <span
              className="docs-text--body-secondary"
              style={{
                color: filled ? 'var(--label-primary)' : 'var(--label-tertiary)',
              }}
            >
              {filled ? '我的第一个想法' : '输入想法...'}
            </span>
          </div>
          {isError && (
            <div className="docs-text--footnote" style={{ color: 'var(--accent-pink)' }}>
              内容不能为空
            </div>
          )}
        </div>
      }
      controls={
        <>
          <DemoControl label="state">
            <PropPicker options={STATES} value={state} onChange={setState} />
          </DemoControl>
          <DemoControl label="withLabel">
            <PropPicker options={[true, false] as const} value={withLabel} onChange={setWithLabel} />
          </DemoControl>
        </>
      }
    />
  )
}
