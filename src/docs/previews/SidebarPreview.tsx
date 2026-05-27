import type { ReactNode } from 'react'
import { Icon } from '../icons'

export function SidebarPreview() {
  return (
    <div className="docs-stage">
      <div className="docs-stage__caption">Sidebar · 设置页分组列表</div>
      <div className="docs-stage__inner">
        <div
          style={{
            width: 320,
            background: 'var(--bg-1)',
            borderRadius: 'var(--radius-x-large)',
            border: '0.5px solid var(--line-non-opaque)',
            padding: 16,
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06)',
          }}
        >
          <GroupCard
            title="账户"
            items={[
              { icon: <Icon.User size={18} />, title: '个人资料', tail: 'chevron' },
              { icon: <Icon.Bell size={18} />, title: '通知', tail: 'switch-on' },
              { icon: <Icon.Lock size={18} />, title: '隐私', tail: 'chevron' },
            ]}
          />
          <GroupCard
            title="AI"
            items={[
              { icon: <Icon.Robot size={18} />, title: 'AI 偏好', tail: 'chevron' },
              { icon: <Icon.Sparkles size={18} />, title: '智能总结', tail: 'switch-off' },
            ]}
          />
        </div>
      </div>
    </div>
  )
}

type Item = { icon: ReactNode; title: string; tail: 'chevron' | 'switch-on' | 'switch-off' | string }

function GroupCard({ title, items }: { title: string; items: Item[] }) {
  return (
    <div>
      <div
        style={{
          fontSize: 11,
          fontWeight: 500,
          color: 'var(--label-tertiary)',
          padding: '4px 12px 8px',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
        }}
      >
        {title}
      </div>
      <div
        style={{
          background: 'var(--bg-0)',
          borderRadius: 12,
          overflow: 'hidden',
          border: '0.5px solid var(--line-non-opaque)',
        }}
      >
        {items.map((it, i) => (
          <Row key={i} item={it} divider={i < items.length - 1} />
        ))}
      </div>
    </div>
  )
}

function Row({ item, divider }: { item: Item; divider: boolean }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        height: 48,
        padding: '0 14px',
        gap: 12,
        position: 'relative',
      }}
    >
      <span
        style={{
          width: 28,
          height: 28,
          borderRadius: 7,
          background: 'var(--fill-quaternary)',
          color: 'var(--label-secondary)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        {item.icon}
      </span>
      <span style={{ flex: 1, fontSize: 15, letterSpacing: '-0.005em' }}>{item.title}</span>
      <Tail tail={item.tail} />
      {divider && (
        <div
          style={{
            position: 'absolute',
            left: 54,
            right: 0,
            bottom: 0,
            height: 0.5,
            background: 'var(--line-non-opaque)',
          }}
        />
      )}
    </div>
  )
}

function Tail({ tail }: { tail: Item['tail'] }) {
  if (tail === 'chevron') {
    return (
      <span style={{ color: 'var(--label-tertiary)', display: 'inline-flex' }}>
        <Icon.ChevronRight size={16} />
      </span>
    )
  }
  if (tail === 'switch-on' || tail === 'switch-off') {
    return <Switch on={tail === 'switch-on'} />
  }
  return <span style={{ color: 'var(--label-secondary)', fontSize: 14 }}>{tail}</span>
}

function Switch({ on }: { on: boolean }) {
  return (
    <div
      style={{
        width: 51,
        height: 31,
        borderRadius: 9999,
        background: on ? 'var(--brand-blue)' : 'var(--fill-primary)',
        position: 'relative',
        transition: 'background var(--duration-fast) var(--curve-default)',
        flexShrink: 0,
      }}
    >
      <div
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
    </div>
  )
}
