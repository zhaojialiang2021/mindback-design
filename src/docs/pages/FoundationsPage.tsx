import { type ReactNode } from 'react'
import { type FoundationSub } from '../router'
import { DocsPageHeader } from '../PageHeader'
import {
  ColorSection,
  TypographySection,
  SpacingSection,
  RadiusSection,
  MotionSection,
} from './TokensPage'

const META: Record<
  FoundationSub,
  { title: string; subtitle: string; render: () => ReactNode }
> = {
  color: {
    title: 'Color',
    subtitle: '按用途分组。色块带半透明棋盘底，方便观察 alpha 通道。',
    render: () => <ColorSection />,
  },
  typography: {
    title: 'Typography',
    subtitle: '尺寸阶梯遵循 SF Pro / iOS Type Ramp。仅 PingFang SC，禁止其他字体。',
    render: () => <TypographySection />,
  },
  spacing: {
    title: 'Spacing',
    subtitle: '10 级封闭枚举，基于 4px 栅格。--space-4 (16px) 最常用。禁止自定义中间值。',
    render: () => <SpacingSection />,
  },
  radius: {
    title: 'Radius',
    subtitle: '5 级封闭枚举。20px 是 MindBack 的核心圆角，使用频率仅次于 12px。',
    render: () => <RadiusSection />,
  },
  motion: {
    title: 'Motion',
    subtitle: '点击播放观察曲线。Duration 控时间，Curve 控加速度。',
    render: () => <MotionSection />,
  },
}

export function FoundationsPage({ sub }: { sub: FoundationSub }) {
  const meta = META[sub]
  return (
    <>
      <DocsPageHeader title={meta.title} subtitle={meta.subtitle} />
      <section className="docs-section-block" style={{ marginBottom: 0 }}>
        {meta.render()}
      </section>
    </>
  )
}
