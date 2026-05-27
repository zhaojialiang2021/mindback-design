import { type ReactNode } from 'react'

/**
 * Anatomy SVG 共用骨架。每个深度组件的 anatomy 用一张手画 SVG，
 * 通过引线 + 标号将"实际渲染"和 schema.anatomy 数组的 part 名字关联起来。
 *
 * 设计意图：让 AI 一眼看懂"label / container / icon"对应视觉哪一块，
 * 不用自己去推。schema 表格 + SVG 图解 = 完整契约。
 */
export function AnatomyFrame({
  width = 720,
  height = 320,
  children,
}: {
  width?: number
  height?: number
  children: ReactNode
}) {
  return (
    <div className="docs-anatomy-frame">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        style={{ display: 'block', maxWidth: width }}
        role="img"
      >
        {children}
      </svg>
    </div>
  )
}

/**
 * 标号 + 文字：左侧短引线 + 圆形数字 + 标签。
 * 在 SVG 里用 <Annotation> 引用即可。
 */
export function Annotation({
  x,
  y,
  label,
  index,
  align = 'left',
}: {
  x: number
  y: number
  label: string
  index: number
  align?: 'left' | 'right'
}) {
  const dir = align === 'left' ? -1 : 1
  return (
    <g>
      <line
        x1={x}
        y1={y}
        x2={x + dir * 16}
        y2={y}
        stroke="currentColor"
        strokeOpacity="0.3"
        strokeWidth="1"
      />
      <circle
        cx={x + dir * 24}
        cy={y}
        r={9}
        fill="var(--bg-0)"
        stroke="currentColor"
        strokeOpacity="0.4"
        strokeWidth="1"
      />
      <text
        x={x + dir * 24}
        y={y + 3}
        fontSize="10"
        fontFamily="'SF Mono', ui-monospace, Menlo, monospace"
        fontWeight="600"
        fill="currentColor"
        textAnchor="middle"
      >
        {index}
      </text>
      <text
        x={x + dir * 38}
        y={y + 4}
        fontSize="12"
        fontFamily="-apple-system, 'PingFang SC', system-ui, sans-serif"
        fill="currentColor"
        opacity="0.85"
        textAnchor={align === 'left' ? 'end' : 'start'}
      >
        {label}
      </text>
    </g>
  )
}

/**
 * Hairline guide：虚线辅助线，标距离 / 边界。
 */
export function Guide({
  x1,
  y1,
  x2,
  y2,
}: {
  x1: number
  y1: number
  x2: number
  y2: number
}) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="currentColor"
      strokeOpacity="0.2"
      strokeWidth="1"
      strokeDasharray="3 3"
    />
  )
}
