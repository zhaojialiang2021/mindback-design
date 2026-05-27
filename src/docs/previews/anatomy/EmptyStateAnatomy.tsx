import { AnatomyFrame, Annotation } from './_AnatomyFrame'

export function EmptyStateAnatomy() {
  return (
    <AnatomyFrame width={720} height={360}>
      <g transform="translate(260, 40)">
        {/* illustration spot —— 圆形容器 + 简易图形 */}
        <g transform="translate(80, 0)">
          <rect
            x="0"
            y="0"
            width="64"
            height="64"
            rx="16"
            fill="var(--brand-blue-light)"
          />
          <g transform="translate(20, 20)">
            <path
              d="M12 4l8 4v8l-8 4-8-4V8l8-4z"
              stroke="var(--brand-blue)"
              strokeWidth="1.5"
              fill="none"
              strokeLinejoin="round"
            />
          </g>
        </g>

        {/* title */}
        <text
          x="100"
          y="100"
          fontSize="20"
          fontFamily="-apple-system, 'PingFang SC', system-ui, sans-serif"
          fontWeight="500"
          fill="currentColor"
          textAnchor="middle"
        >
          建一个频道
        </text>
        <text
          x="100"
          y="124"
          fontSize="20"
          fontFamily="-apple-system, 'PingFang SC', system-ui, sans-serif"
          fontWeight="500"
          fill="currentColor"
          textAnchor="middle"
        >
          把同类想法收到一起
        </text>

        {/* description */}
        <text
          x="100"
          y="156"
          fontSize="13"
          fontFamily="-apple-system, 'PingFang SC', system-ui, sans-serif"
          fill="currentColor"
          opacity="0.6"
          textAnchor="middle"
        >
          AI 会自动生成总结和回顾
        </text>

        {/* primary action */}
        <g transform="translate(40, 190)">
          <rect width="120" height="40" rx="20" fill="var(--label-primary)" />
          <text
            x="60"
            y="26"
            fontSize="14"
            fontFamily="-apple-system, 'PingFang SC', system-ui, sans-serif"
            fontWeight="500"
            fill="var(--bg-0)"
            textAnchor="middle"
          >
            新建频道
          </text>
        </g>

        {/* secondary action */}
        <text
          x="100"
          y="260"
          fontSize="14"
          fontFamily="-apple-system, 'PingFang SC', system-ui, sans-serif"
          fill="currentColor"
          opacity="0.5"
          textAnchor="middle"
        >
          了解什么是频道
        </text>
      </g>

      <Annotation x={340} y={32} label="illustration" index={1} align="left" />
      <Annotation x={340} y={112} label="title" index={2} align="left" />
      <Annotation x={340} y={156} label="description" index={3} align="left" />
      <Annotation x={400} y={210} label="primary-action" index={4} align="right" />
      <Annotation x={400} y={260} label="secondary-action" index={5} align="right" />

      <text
        x="360"
        y="340"
        fontSize="11"
        fontFamily="'SF Mono', ui-monospace, Menlo, monospace"
        fill="currentColor"
        opacity="0.4"
        textAnchor="middle"
      >
        Empty State · kind=first-time · size=fullscreen · illustration=spot
      </text>
    </AnatomyFrame>
  )
}
