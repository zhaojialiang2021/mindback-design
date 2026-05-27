import { useState } from 'react'

type State = 'on' | 'off' | 'disabled-on' | 'disabled-off'

const states: { id: State; label: string }[] = [
  { id: 'on', label: '开 (on)' },
  { id: 'off', label: '关 (off)' },
  { id: 'disabled-on', label: '禁用·开' },
  { id: 'disabled-off', label: '禁用·关' },
]

export function SwitchPreview() {
  const [state, setState] = useState<State>('off')
  const on = state === 'on' || state === 'disabled-on'
  const disabled = state.startsWith('disabled')

  return (
    <div>
      <div className="docs-segmented">
        {states.map((s) => (
          <button
            key={s.id}
            className={`docs-segmented__btn ${state === s.id ? 'is-active' : ''}`}
            onClick={() => setState(s.id)}
          >
            {s.label}
          </button>
        ))}
      </div>
      <div className="docs-stage docs-stage--compact">
        <div className="docs-stage__caption">Switch · 51×31 iOS 标准</div>
        <div className="docs-stage__inner">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <Switch
              on={on}
              disabled={disabled}
              onToggle={() => {
                if (disabled) return
                setState(on ? 'off' : 'on')
                if ('vibrate' in navigator) navigator.vibrate(15)
              }}
            />
            <div style={{ fontSize: 12, color: 'var(--label-secondary)' }}>
              {disabled ? '不可交互' : '点击切换（手机会触发 light 触觉）'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Switch({
  on,
  disabled,
  onToggle,
}: {
  on: boolean
  disabled: boolean
  onToggle: () => void
}) {
  return (
    <button
      onClick={onToggle}
      disabled={disabled}
      style={{
        width: 51,
        height: 31,
        borderRadius: 9999,
        background: on ? 'var(--brand-blue)' : 'var(--fill-primary)',
        border: 0,
        position: 'relative',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.4 : 1,
        transition: 'background var(--duration-fast) var(--curve-default)',
        padding: 0,
      }}
    >
      <span
        style={{
          position: 'absolute',
          top: 2,
          left: on ? 22 : 2,
          width: 27,
          height: 27,
          borderRadius: '50%',
          background: '#fff',
          boxShadow: '0 2px 4px rgba(0,0,0,0.15), 0 0 0 0.5px rgba(0,0,0,0.04)',
          transition: 'left var(--duration-fast) var(--curve-default)',
        }}
      />
    </button>
  )
}
