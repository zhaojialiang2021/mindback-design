import { useState } from 'react'
import { Icon } from '../icons'

type Form = 'sheet' | 'centered'

export function ModalPreview() {
  const [form, setForm] = useState<Form>('sheet')
  const [open, setOpen] = useState(true)

  return (
    <div>
      <div className="docs-segmented">
        {(['sheet', 'centered'] as Form[]).map((f) => (
          <button
            key={f}
            className={`docs-segmented__btn ${form === f ? 'is-active' : ''}`}
            onClick={() => setForm(f)}
          >
            {f === 'sheet' ? 'Mobile Sheet' : 'Tablet+ 居中'}
          </button>
        ))}
        <button
          className="docs-segmented__btn"
          onClick={() => setOpen((o) => !o)}
          style={{ marginLeft: 8 }}
        >
          {open ? '关闭' : '展开'}
        </button>
      </div>

      <div className="docs-stage">
        <div className="docs-stage__caption">Modal · {form === 'sheet' ? 'Mobile Sheet 下拉关闭' : 'Tablet+ 居中卡片'}</div>
        <div
          className="docs-stage__inner"
          style={{ height: 480, alignItems: 'flex-end', position: 'relative' }}
        >
          {/* 模拟设备框 */}
          <div
            style={{
              position: 'relative',
              width: form === 'sheet' ? 393 : 560,
              height: 480,
              background: 'var(--bg-1)',
              borderRadius: 'var(--radius-x-large)',
              overflow: 'hidden',
              border: '0.5px solid var(--line-non-opaque)',
            }}
          >
            {/* 蒙层 */}
            <div
              onClick={() => setOpen(false)}
              style={{
                position: 'absolute',
                inset: 0,
                background: open ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0)',
                transition: 'background var(--duration-normal) var(--curve-default)',
                pointerEvents: open ? 'auto' : 'none',
              }}
            />
            {/* Sheet */}
            {form === 'sheet' && (
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'var(--bg-0)',
                  borderTopLeftRadius: 'var(--radius-x-large)',
                  borderTopRightRadius: 'var(--radius-x-large)',
                  transform: open ? 'translateY(0)' : 'translateY(100%)',
                  transition: 'transform var(--duration-normal) var(--curve-ease-out)',
                  padding: '8px 0 24px',
                }}
              >
                <Handle />
                <ModalNav onClose={() => setOpen(false)} />
                <Body />
              </div>
            )}
            {/* Centered */}
            {form === 'centered' && (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  pointerEvents: 'none',
                }}
              >
                <div
                  style={{
                    width: 480,
                    background: 'var(--bg-0)',
                    borderRadius: 'var(--radius-x-large)',
                    transform: open ? 'scale(1)' : 'scale(0.95)',
                    opacity: open ? 1 : 0,
                    transition: 'transform var(--duration-normal) var(--curve-ease-out), opacity var(--duration-normal)',
                    pointerEvents: open ? 'auto' : 'none',
                  }}
                >
                  <ModalNav onClose={() => setOpen(false)} />
                  <Body />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function Handle() {
  return (
    <div
      style={{
        width: 36,
        height: 4,
        borderRadius: 4,
        background: 'var(--fill-primary)',
        margin: '0 auto 8px',
      }}
    />
  )
}

function ModalNav({ onClose }: { onClose: () => void }) {
  return (
    <div
      style={{
        height: 48,
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        borderBottom: '0.5px solid var(--line-non-opaque)',
      }}
    >
      <button
        onClick={onClose}
        aria-label="关闭"
        style={{
          background: 'transparent',
          border: 0,
          cursor: 'pointer',
          width: 44,
          height: 44,
          marginLeft: -12,
          color: 'var(--label-primary)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          paddingLeft: 4,
        }}
      >
        <Icon.Close size={20} />
      </button>
      <div style={{ flex: 1, textAlign: 'center', fontWeight: 500 }}>编辑碎片</div>
      <button
        style={{
          background: 'transparent',
          border: 0,
          color: 'var(--brand-blue)',
          fontWeight: 500,
          fontSize: 15,
          cursor: 'pointer',
          width: 44,
          textAlign: 'right',
        }}
      >
        完成
      </button>
    </div>
  )
}

function Body() {
  return (
    <div style={{ padding: 16, color: 'var(--label-secondary)', fontSize: 14 }}>
      <p>这里是 Modal 内容区。</p>
      <p>Sheet 形态可下拉关闭，居中形态点击蒙层关闭。</p>
    </div>
  )
}
