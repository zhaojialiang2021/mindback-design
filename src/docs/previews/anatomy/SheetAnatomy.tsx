import { AnatomyFrame, Annotation } from './_AnatomyFrame'

export function SheetAnatomy() {
  return (
    <AnatomyFrame width={720} height={360}>
      {/* phone mockup */}
      <g transform="translate(220, 30)">
        {/* phone outline */}
        <rect
          x="0"
          y="0"
          width="280"
          height="320"
          rx="28"
          fill="var(--bg-1)"
          stroke="currentColor"
          strokeOpacity="0.15"
          strokeWidth="1"
        />

        {/* backdrop（半透明遮罩） */}
        <rect
          x="0"
          y="0"
          width="280"
          height="320"
          rx="28"
          fill="var(--backdrop)"
        />

        {/* sheet container（从底部滑入） */}
        <g>
          <path
            d="M 0 130 Q 0 110 20 110 L 260 110 Q 280 110 280 130 L 280 320 L 0 320 Z"
            fill="var(--bg-0)"
          />

          {/* drag handle */}
          <rect x="122" y="122" width="36" height="4" rx="2" fill="currentColor" fillOpacity="0.2" />

          {/* header */}
          <text
            x="140"
            y="160"
            fontSize="14"
            fontFamily="-apple-system, 'PingFang SC', system-ui, sans-serif"
            fontWeight="500"
            fill="currentColor"
            textAnchor="middle"
          >
            选择频道
          </text>

          {/* content */}
          <text
            x="140"
            y="190"
            fontSize="11"
            fontFamily="-apple-system, 'PingFang SC', system-ui, sans-serif"
            fill="currentColor"
            opacity="0.5"
            textAnchor="middle"
          >
            可滚动主体内容区
          </text>

          {/* footer area */}
          <line x1="20" y1="280" x2="260" y2="280" stroke="currentColor" strokeOpacity="0.1" />
          <text
            x="140"
            y="300"
            fontSize="11"
            fontFamily="-apple-system, 'PingFang SC', system-ui, sans-serif"
            fill="currentColor"
            opacity="0.5"
            textAnchor="middle"
          >
            sticky footer（可选）
          </text>
        </g>
      </g>

      <Annotation x={220} y={70} label="backdrop" index={1} align="left" />
      <Annotation x={220} y={150} label="container" index={2} align="left" />
      <Annotation x={362} y={130} label="drag-handle" index={3} align="right" />
      <Annotation x={500} y={160} label="header" index={4} align="right" />
      <Annotation x={500} y={195} label="content" index={5} align="right" />
      <Annotation x={500} y={295} label="footer" index={6} align="right" />

      <text
        x="360"
        y="340"
        fontSize="11"
        fontFamily="'SF Mono', ui-monospace, Menlo, monospace"
        fill="currentColor"
        opacity="0.4"
        textAnchor="middle"
      >
        Sheet · side=bottom · size=standard · modal=true
      </text>
    </AnatomyFrame>
  )
}
