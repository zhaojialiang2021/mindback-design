import { AnatomyFrame, Annotation, Guide } from './_AnatomyFrame'

export function InputAnatomy() {
  return (
    <AnatomyFrame width={720} height={320}>
      <g transform="translate(200, 60)">
        {/* label */}
        <text
          x="0"
          y="0"
          fontSize="14"
          fontFamily="-apple-system, 'PingFang SC', system-ui, sans-serif"
          fill="currentColor"
          opacity="0.6"
        >
          输入名称
        </text>

        {/* container (focus state) */}
        <rect
          x="0"
          y="14"
          width="320"
          height="44"
          rx="8"
          fill="var(--bg-0)"
          stroke="var(--brand-blue)"
          strokeWidth="1.5"
        />

        {/* leading icon */}
        <g transform="translate(12, 28) scale(0.83)">
          <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.5" />
          <path d="M16 16l4 4" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.5" strokeLinecap="round" />
        </g>

        {/* value */}
        <text
          x="44"
          y="42"
          fontSize="15"
          fontFamily="-apple-system, 'PingFang SC', system-ui, sans-serif"
          fill="currentColor"
        >
          我的第一个想法
        </text>

        {/* placeholder hint (掏空，仅引线) */}

        {/* trailing action */}
        <g transform="translate(290, 28)">
          <circle cx="0" cy="0" r="11" fill="var(--fill-quaternary)" />
          <path
            d="M-4-4L4 4M4-4L-4 4"
            stroke="currentColor"
            strokeOpacity="0.5"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </g>

        {/* error message (在容器下方) */}
        <text
          x="0"
          y="80"
          fontSize="13"
          fontFamily="-apple-system, 'PingFang SC', system-ui, sans-serif"
          fill="var(--accent-pink)"
        >
          内容不能为空
        </text>
      </g>

      <Annotation x={200} y={60} label="label" index={1} align="left" />
      <Annotation x={200} y={36 + 50} label="container" index={2} align="left" />
      <Annotation x={212} y={88} label="leading-icon" index={3} align="right" />
      <Annotation x={400} y={102} label="value / placeholder" index={4} align="right" />
      <Annotation x={490} y={88} label="trailing-action" index={5} align="right" />
      <Annotation x={200} y={140} label="error-message" index={6} align="left" />

      {/* 高度尺寸 */}
      <Guide x1={190} y1={74} x2={190} y2={118} />
      <text
        x="180"
        y="100"
        fontSize="11"
        fontFamily="'SF Mono', ui-monospace, Menlo, monospace"
        fill="currentColor"
        opacity="0.5"
        textAnchor="end"
      >
        44px
      </text>

      <text
        x="360"
        y="280"
        fontSize="11"
        fontFamily="'SF Mono', ui-monospace, Menlo, monospace"
        fill="currentColor"
        opacity="0.4"
        textAnchor="middle"
      >
        Input · state=focus · trailingAction=clear · error 文案占位展示
      </text>
    </AnatomyFrame>
  )
}
