import { useState } from 'react'
import { DemoFrame, DemoControl, PropPicker } from './_DemoStub'
import { Icon } from '../icons'

const KINDS = ['empty', 'no-result', 'no-permission', 'error', 'first-time'] as const
const ILLUS = ['icon', 'spot', 'none'] as const

const COPY: Record<
  (typeof KINDS)[number],
  { title: string; desc: string; primary: string; secondary?: string }
> = {
  empty: { title: '还没有内容', desc: '开始添加你的第一条记录吧', primary: '去创建' },
  'no-result': {
    title: '没找到结果',
    desc: '换个关键词试试，或者清除筛选',
    primary: '清除筛选',
    secondary: '修改关键词',
  },
  'no-permission': {
    title: '需要登录后查看',
    desc: '此页面只对登录用户开放',
    primary: '去登录',
    secondary: '回到首页',
  },
  error: {
    title: '加载失败',
    desc: '网络好像断了一下，再试一次',
    primary: '重试',
    secondary: '查看详情',
  },
  'first-time': {
    title: '记下你的第一个想法',
    desc: 'AI 会替你整理、归档、在合适的时候推回来。',
    primary: '马上开始',
  },
}

const ICON_SIZE: Record<(typeof ILLUS)[number], number> = { icon: 64, spot: 96, none: 0 }

export function EmptyStateDemo() {
  const [kind, setKind] = useState<(typeof KINDS)[number]>('first-time')
  const [illustration, setIllustration] = useState<(typeof ILLUS)[number]>('icon')
  const c = COPY[kind]

  const code = `<EmptyState\n  kind="${kind}"\n  illustration="${illustration}"\n  title="${c.title}"\n  description="${c.desc}"\n  primaryAction={{ label: "${c.primary}", onClick }}\n${c.secondary ? `  secondaryAction={{ label: "${c.secondary}", onClick }}\n` : ''}/>`

  return (
    <DemoFrame
      caption="Empty State · Live"
      code={code}
      stage={
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            padding: 'var(--space-7)',
            maxWidth: 360,
          }}
        >
          {illustration !== 'none' && (
            <div
              style={{
                width: ICON_SIZE[illustration],
                height: ICON_SIZE[illustration],
                color: 'var(--label-tertiary)',
                marginBottom: 'var(--space-5)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon.Sparkles size={ICON_SIZE[illustration]} />
            </div>
          )}
          <div className="docs-text--h3" style={{ marginBottom: 'var(--space-3)' }}>
            {c.title}
          </div>
          <div
            className="docs-text--body-secondary docs-text--secondary"
            style={{ marginBottom: 'var(--space-5)' }}
          >
            {c.desc}
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <button className="mb-button mb-button--primary mb-button--standard">{c.primary}</button>
            {c.secondary && (
              <button className="mb-button mb-button--ghost mb-button--standard">{c.secondary}</button>
            )}
          </div>
        </div>
      }
      controls={
        <>
          <DemoControl label="kind">
            <PropPicker options={KINDS} value={kind} onChange={setKind} />
          </DemoControl>
          <DemoControl label="illustration">
            <PropPicker options={ILLUS} value={illustration} onChange={setIllustration} />
          </DemoControl>
        </>
      }
    />
  )
}
