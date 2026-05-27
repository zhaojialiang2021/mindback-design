import { AnatomyFrame, Annotation, Guide } from './_AnatomyFrame'

export function ButtonAnatomy() {
  return (
    <AnatomyFrame width={720} height={260}>
      {/* 中心放置一个 standard primary 按钮（不可缩放，固定 SVG 几何） */}
      <g transform="translate(260, 100)">
        {/* 容器 */}
        <rect
          x="0"
          y="0"
          width="200"
          height="48"
          rx="24"
          fill="var(--label-primary)"
        />
        {/* 图标 */}
        <g transform="translate(20, 14) scale(0.83)">
          <path
            d="M12 4v16M4 12h16"
            stroke="var(--bg-0)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
        {/* 文字 */}
        <text
          x="56"
          y="30"
          fontSize="16"
          fontFamily="-apple-system, 'PingFang SC', system-ui, sans-serif"
          fontWeight="500"
          fill="var(--bg-0)"
        >
          点击操作
        </text>
      </g>

      {/* 引线和标号 */}
      <Annotation x={260} y={124} label="container" index={1} align="left" />
      <Annotation x={280} y={124} label="icon" index={2} align="left" />
      <Annotation x={460} y={124} label="label" index={3} align="right" />

      {/* 高度尺寸标注（左下） */}
      <Guide x1={250} y1={100} x2={250} y2={148} />
      <text
        x="240"
        y="128"
        fontSize="11"
        fontFamily="'SF Mono', ui-monospace, Menlo, monospace"
        fill="currentColor"
        opacity="0.5"
        textAnchor="end"
      >
        48px
      </text>
      {/* padding 标注（顶部） */}
      <Guide x1={260} y1={88} x2={280} y2={88} />
      <text
        x="270"
        y="80"
        fontSize="11"
        fontFamily="'SF Mono', ui-monospace, Menlo, monospace"
        fill="currentColor"
        opacity="0.5"
        textAnchor="middle"
      >
        space-4
      </text>

      {/* 底部说明 */}
      <text
        x="360"
        y="220"
        fontSize="11"
        fontFamily="'SF Mono', ui-monospace, Menlo, monospace"
        fill="currentColor"
        opacity="0.4"
        textAnchor="middle"
      >
        Button · intent=primary · size=standard · icon=leading
      </text>
    </AnatomyFrame>
  )
}
