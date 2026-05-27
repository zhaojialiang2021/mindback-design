import { AnatomyFrame, Annotation } from './_AnatomyFrame'

export function CardAnatomy() {
  return (
    <AnatomyFrame width={720} height={320}>
      <g transform="translate(200, 50)">
        {/* container */}
        <rect
          x="0"
          y="0"
          width="320"
          height="220"
          rx="16"
          fill="var(--bg-0)"
          stroke="currentColor"
          strokeOpacity="0.15"
          strokeWidth="1"
        />

        {/* header */}
        <text
          x="20"
          y="40"
          fontSize="18"
          fontFamily="-apple-system, 'PingFang SC', system-ui, sans-serif"
          fontWeight="500"
          fill="currentColor"
        >
          能力卡
        </text>

        {/* divider 提示分隔 */}
        <line
          x1="20"
          y1="56"
          x2="300"
          y2="56"
          stroke="currentColor"
          strokeOpacity="0.1"
        />

        {/* body */}
        <text
          x="20"
          y="84"
          fontSize="14"
          fontFamily="-apple-system, 'PingFang SC', system-ui, sans-serif"
          fill="currentColor"
          opacity="0.7"
        >
          AI 帮你把零碎想法整理成
        </text>
        <text
          x="20"
          y="106"
          fontSize="14"
          fontFamily="-apple-system, 'PingFang SC', system-ui, sans-serif"
          fill="currentColor"
          opacity="0.7"
        >
          可被回溯的记忆。
        </text>

        {/* footer 区按钮 */}
        <g transform="translate(20, 160)">
          <rect width="100" height="34" rx="17" fill="var(--label-primary)" />
          <text
            x="50"
            y="22"
            fontSize="12"
            fontFamily="-apple-system, 'PingFang SC', system-ui, sans-serif"
            fontWeight="500"
            fill="var(--bg-0)"
            textAnchor="middle"
          >
            打开
          </text>
        </g>
      </g>

      <Annotation x={200} y={56} label="container" index={1} align="left" />
      <Annotation x={520} y={40} label="header" index={2} align="right" />
      <Annotation x={520} y={94} label="body" index={3} align="right" />
      <Annotation x={520} y={210} label="footer" index={4} align="right" />

      <text
        x="360"
        y="295"
        fontSize="11"
        fontFamily="'SF Mono', ui-monospace, Menlo, monospace"
        fill="currentColor"
        opacity="0.4"
        textAnchor="middle"
      >
        Card · variant=default · padding=standard
      </text>
    </AnatomyFrame>
  )
}
