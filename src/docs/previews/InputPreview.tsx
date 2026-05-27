import { useState } from 'react'
import { Icon } from '../icons'

type Variant = 'standard' | 'multiline' | 'search'
type State = 'default' | 'focus' | 'error' | 'disabled'

export function InputPreview() {
  const [variant, setVariant] = useState<Variant>('standard')
  const [state, setState] = useState<State>('default')
  const [val, setVal] = useState('')

  return (
    <div>
      <div className="docs-segmented-group">
        <div className="docs-segmented">
          {(['standard', 'multiline', 'search'] as Variant[]).map((v) => (
            <button
              key={v}
              className={`docs-segmented__btn ${variant === v ? 'is-active' : ''}`}
              onClick={() => setVariant(v)}
            >
              {v}
            </button>
          ))}
        </div>
        <div className="docs-segmented">
          {(['default', 'focus', 'error', 'disabled'] as State[]).map((s) => (
            <button
              key={s}
              className={`docs-segmented__btn ${state === s ? 'is-active' : ''}`}
              onClick={() => setState(s)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="docs-stage">
        <div className="docs-stage__caption">Input · {variant} / {state}</div>
        <div className="docs-stage__inner">
          <div style={{ width: 320 }}>
            <Field variant={variant} state={state} value={val} onChange={setVal} />
            {state === 'error' && (
              <div style={{ color: 'var(--accent-pink)', fontSize: 12, marginTop: 6, paddingLeft: 4 }}>
                请输入有效内容
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function Field({
  variant,
  state,
  value,
  onChange,
}: {
  variant: Variant
  state: State
  value: string
  onChange: (v: string) => void
}) {
  const baseBorder =
    state === 'focus'
      ? 'inset 0 0 0 1px var(--brand-blue)'
      : state === 'error'
      ? 'inset 0 0 0 1px var(--accent-pink)'
      : 'none'

  const baseStyle: React.CSSProperties = {
    width: '100%',
    background: 'var(--fill-primary)',
    border: 0,
    borderRadius: 'var(--radius-large)',
    padding: '12px 16px',
    fontSize: 17,
    color: 'var(--label-primary)',
    outline: 'none',
    boxShadow: baseBorder,
    opacity: state === 'disabled' ? 0.4 : 1,
  }

  if (variant === 'multiline') {
    return (
      <textarea
        style={{ ...baseStyle, minHeight: 88, resize: 'vertical', fontFamily: 'inherit' }}
        placeholder="多行输入…"
        disabled={state === 'disabled'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    )
  }

  if (variant === 'search') {
    return (
      <div style={{ position: 'relative' }}>
        <span
          style={{
            position: 'absolute',
            left: 14,
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--label-tertiary)',
            pointerEvents: 'none',
            display: 'inline-flex',
          }}
        >
          <Icon.Search size={16} />
        </span>
        <input
          style={{ ...baseStyle, paddingLeft: 48, paddingRight: value ? 48 : 16, height: 48 }}
          placeholder="搜索…"
          disabled={state === 'disabled'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        {value && (
          <button
            onClick={() => onChange('')}
            aria-label="清除"
            style={{
              position: 'absolute',
              right: 12,
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'var(--fill-tertiary)',
              color: 'var(--label-secondary)',
              border: 0,
              width: 20,
              height: 20,
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon.Close size={11} />
          </button>
        )}
      </div>
    )
  }

  return (
    <input
      style={{ ...baseStyle, height: 48 }}
      placeholder="单行输入…"
      disabled={state === 'disabled'}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}
