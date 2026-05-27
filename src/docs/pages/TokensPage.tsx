import { useState } from 'react'
import { DocsPageHeader } from '../PageHeader'
import {
  colorGroups,
  motionTokens,
  radiusTokens,
  spacingTokens,
  typographyTokens,
  type TokenItem,
} from '../tokens-data'
import { useToast } from '../useToast'
import { Icon } from '../icons'

function readVar(name: string): string {
  if (typeof window === 'undefined') return ''
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim()
}

function copy(text: string, onDone: (msg: string) => void) {
  navigator.clipboard
    .writeText(text)
    .then(() => onDone(`已复制 ${text}`))
    .catch(() => onDone('复制失败'))
}

// === Color section（独立可用，Foundations/color 引用） ===
export function ColorSection() {
  const { show, node } = useToast()
  return (
    <>
      {colorGroups.map((g) => (
        <div className="docs-card" key={g.title} style={{ marginBottom: 16 }}>
          <div className="docs-card__title">{g.title}</div>
          {g.desc && (
            <div className="docs-hint" style={{ marginBottom: 16 }}>
              <Icon.Sparkles size={14} />
              {g.desc}
            </div>
          )}
          <div className="docs-swatch-grid">
            {g.tokens.map((t) => (
              <Swatch key={t.name} token={t} onCopy={(s) => copy(s, show)} />
            ))}
          </div>
        </div>
      ))}
      {node}
    </>
  )
}

export function TypographySection() {
  return (
    <div className="docs-card">
      {typographyTokens.map((t) => (
        <div key={t.name} className="docs-type-row">
          <code className="docs-text--caption-1 docs-text--secondary docs-text--mono">{t.name}</code>
          <span
            style={{
              fontSize: t.size,
              fontWeight: Number(t.weight),
              lineHeight: t.lineHeight,
              letterSpacing: '-0.01em',
            }}
          >
            MindBack 持续记录 静候回响
          </span>
          <span className="docs-text--caption-2 docs-text--tertiary" style={{ textAlign: 'right' }}>
            {t.size} · {t.weight} · {t.lineHeight} · {t.usage}
          </span>
        </div>
      ))}
    </div>
  )
}

export function SpacingSection() {
  const { show, node } = useToast()
  return (
    <>
      <div className="docs-card">
        {spacingTokens.map((t) => (
          <SpacingRow key={t.name} token={t} onCopy={(s) => copy(s, show)} />
        ))}
      </div>
      {node}
    </>
  )
}

export function RadiusSection() {
  const { show, node } = useToast()
  return (
    <>
      <div className="docs-card">
        <div className="docs-radius-grid">
          {radiusTokens.map((t) => (
            <RadiusChip key={t.name} token={t} onCopy={(s) => copy(s, show)} />
          ))}
        </div>
      </div>
      {node}
    </>
  )
}

export function MotionSection() {
  const { show, node } = useToast()
  return (
    <>
      <div className="docs-card">
        <table className="docs-table">
          <thead>
            <tr>
              <th>令牌</th>
              <th>值</th>
              <th>用途</th>
              <th style={{ width: 240 }}>预览</th>
            </tr>
          </thead>
          <tbody>
            {motionTokens.map((t) => (
              <MotionRow key={t.name} token={t} onCopy={(s) => copy(s, show)} />
            ))}
          </tbody>
        </table>
      </div>
      {node}
    </>
  )
}

// 旧 TokensPage 保留作总览（兼容 #/docs/tokens 旧链接 → router 已重定向到 foundations/color）
// 但仍可被访问到 -- 五段全展示。
export function TokensPage() {
  return (
    <>
      <DocsPageHeader
        title="设计令牌"
        subtitle="点击任意令牌复制 CSS 变量名。"
      />

      <section className="docs-section-block">
        <h2 className="docs-section-block__heading">颜色</h2>
        <p className="docs-section-block__subheading">
          按用途分组。色块带半透明棋盘底，方便观察 alpha 通道
        </p>
        <ColorSection />
      </section>

      <section className="docs-section-block">
        <h2 className="docs-section-block__heading">字号</h2>
        <p className="docs-section-block__subheading">尺寸阶梯遵循 SF Pro / iOS Type Ramp</p>
        <TypographySection />
      </section>

      <section className="docs-section-block">
        <h2 className="docs-section-block__heading">间距</h2>
        <p className="docs-section-block__subheading">
          基于 4px 栅格，--space-4（16px）是最常用
        </p>
        <SpacingSection />
      </section>

      <section className="docs-section-block">
        <h2 className="docs-section-block__heading">圆角</h2>
        <RadiusSection />
      </section>

      <section className="docs-section-block">
        <h2 className="docs-section-block__heading">动效</h2>
        <p className="docs-section-block__subheading">
          点击播放观察曲线。Duration 控时间，Curve 控加速度
        </p>
        <MotionSection />
      </section>
    </>
  )
}

function Swatch({ token, onCopy }: { token: TokenItem; onCopy: (s: string) => void }) {
  // 直接读 computed style 当初始值；token.name 变化时 React 自然重渲染，
  // 不需要 useEffect + setState（react-hooks/set-state-in-effect）。
  const val = readVar(token.name)

  return (
    <div
      className="docs-swatch"
      onClick={() => onCopy(`var(${token.name})`)}
      style={{ ['--swatch-color' as string]: `var(${token.name})` } as React.CSSProperties}
    >
      <span className="docs-swatch__chip" />
      <div style={{ minWidth: 0 }}>
        <div className="docs-swatch__name">{token.name}</div>
        <div className="docs-swatch__usage">{token.usage}</div>
      </div>
      <div className="docs-swatch__value">{val || '...'}</div>
    </div>
  )
}

function SpacingRow({ token, onCopy }: { token: TokenItem; onCopy: (s: string) => void }) {
  return (
    <div className="docs-spacing-row" onClick={() => onCopy(`var(${token.name})`)}>
      <code className="docs-text--caption-1 docs-text--secondary docs-text--mono">{token.name}</code>
      <div className="docs-spacing-row__bar" style={{ width: `var(${token.name})` }} />
      <span className="docs-text--caption-1 docs-text--tertiary">{token.usage}</span>
    </div>
  )
}

function RadiusChip({ token, onCopy }: { token: TokenItem; onCopy: (s: string) => void }) {
  return (
    <div className="docs-radius-chip" onClick={() => onCopy(`var(${token.name})`)}>
      <div className="docs-radius-chip__shape" style={{ borderRadius: `var(${token.name})` }} />
      <code className="docs-text--caption-1 docs-text--mono">{token.name}</code>
      <span
        className="docs-text--caption-2 docs-text--tertiary"
        style={{ textAlign: 'center' }}
      >
        {token.usage}
      </span>
    </div>
  )
}

function MotionRow({ token, onCopy }: { token: TokenItem; onCopy: (s: string) => void }) {
  const val = readVar(token.name)
  const [playing, setPlaying] = useState(0)
  const isDuration = token.name.startsWith('--duration')
  const isCurve = token.name.startsWith('--curve')
  return (
    <tr>
      <td>
        <code onClick={() => onCopy(`var(${token.name})`)} style={{ cursor: 'pointer' }}>
          {token.name}
        </code>
      </td>
      <td className="docs-text--caption-1 docs-text--secondary docs-text--mono">{val}</td>
      <td style={{ color: 'var(--label-secondary)' }}>{token.usage}</td>
      <td>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          {/* token-lint-disable-line 迷你按钮几何 */}
          <button
            className="docs-text--caption-1"
            onClick={() => setPlaying((p) => p + 1)}
            style={{
              background: 'var(--fill-quaternary)',
              border: 0,
              padding: '4px 10px',
              borderRadius: 'var(--radius-medium)',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-1)',
              color: 'var(--label-primary)',
              fontFamily: 'inherit',
            }}
          >
            <Icon.Play size={11} />
            播放
          </button>
          <div
            style={{
              flex: 1,
              height: 2,
              background: 'var(--line-non-opaque)',
              borderRadius: 1,
              position: 'relative',
            }}
          >
            <span
              key={playing}
              style={{
                position: 'absolute',
                top: -4,
                left: 0,
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: 'var(--brand-blue)',
                /* token-lint-disable-line 动画轨道宽度 */
                transform: playing % 2 === 0 ? 'translateX(0)' : 'translateX(140px)',
                transition: isDuration
                  ? `transform var(${token.name}) var(--curve-default)`
                  : isCurve
                  ? `transform var(--duration-slow) var(${token.name})`
                  : 'none',
              }}
            />
          </div>
        </div>
      </td>
    </tr>
  )
}
