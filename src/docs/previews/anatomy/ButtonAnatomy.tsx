import { AnatomyFrame, Annotation, Guide } from './_AnatomyFrame'

export function ButtonAnatomy() {
  return (
    <AnatomyFrame width={720} height={260}>
      {/* 中心放置一个 medium filled 按钮（不可缩放，固定 SVG 几何） */}
      <g transform="translate(282, 106)">
        {/* 容器 */}
        <rect
          x="0"
          y="0"
          width="156"
          height="36"
          rx="18"
          fill="var(--brand-blue)"
        />
        {/* 图标 */}
        <g transform="translate(18, 8) scale(0.83)">
          <path
            d="M12 4v16M4 12h16"
            stroke="var(--always-white)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
        {/* 文字 */}
        <text
          x="50"
          y="24"
          fontSize="14"
          fontFamily="-apple-system, 'PingFang SC', system-ui, sans-serif"
          fontWeight="500"
          fill="var(--always-white)"
        >
          点击操作
        </text>
      </g>

      {/* 引线和标号 */}
      <Annotation x={282} y={124} label="container" index={1} align="left" />
      <Annotation x={300} y={124} label="icon" index={2} align="left" />
      <Annotation x={438} y={124} label="label" index={3} align="right" />

      {/* 高度尺寸标注（左下） */}
      <Guide x1={272} y1={106} x2={272} y2={142} />
      <text
        x="262"
        y="126"
        fontSize="11"
        fontFamily="'SF Mono', ui-monospace, Menlo, monospace"
        fill="currentColor"
        opacity="0.5"
        textAnchor="end"
      >
        36px
      </text>
      {/* padding 标注（顶部） */}
      <Guide x1={282} y1={94} x2={298} y2={94} />
      <text
        x="290"
        y="86"
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
        Button · variant=filled · size=medium · icon=leading
      </text>
    </AnatomyFrame>
  )
}
