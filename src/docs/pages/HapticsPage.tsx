import { DocsPageHeader } from '../PageHeader'

type HapticIntent = 'tick' | 'light' | 'medium' | 'warning' | 'success'

type HapticDef = {
  intent: HapticIntent
  desc: string
  scenarios: string
  /** navigator.vibrate 模式（数组形式表示模式） */
  pattern: number | number[]
}

const haptics: HapticDef[] = [
  { intent: 'tick', desc: '极轻一点，几乎只是提示', scenarios: 'Tab 切换、选择器滚动、到达边界', pattern: 8 },
  { intent: 'light', desc: '轻而清脆的一下', scenarios: '按钮点击、开关切换、收藏', pattern: 15 },
  { intent: 'medium', desc: '明确的一击，有重量感', scenarios: '长按菜单、拖拽放置', pattern: 25 },
  { intent: 'warning', desc: '两下短促连击', scenarios: '删除确认、操作受阻', pattern: [18, 62, 20] },
  { intent: 'success', desc: '三下渐弱，完成感', scenarios: '保存完成、提交成功', pattern: [18, 40, 16, 40, 14] },
]

const componentMap: Array<{ component: string; interaction: string; intent: HapticIntent }> = [
  { component: 'Button', interaction: '点击', intent: 'light' },
  { component: 'TabBar', interaction: '切换 Tab', intent: 'tick' },
  { component: 'Switch', interaction: '切换', intent: 'light' },
  { component: 'Card', interaction: '长按', intent: 'medium' },
  { component: 'TypeTag', interaction: '点击筛选', intent: 'tick' },
  { component: 'Modal', interaction: '弹出', intent: 'light' },
  { component: '删除操作', interaction: '确认', intent: 'warning' },
  { component: '保存/提交', interaction: '完成', intent: 'success' },
]

function play(pattern: number | number[]) {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    navigator.vibrate(pattern)
  }
}

const intentColor: Record<HapticIntent, string> = {
  tick: 'var(--label-tertiary)',
  light: 'var(--brand-blue)',
  medium: 'var(--accent-event-blue)',
  warning: 'var(--accent-yellow)',
  success: 'var(--accent-green)',
}

export function HapticsPage() {
  const supported = typeof navigator !== 'undefined' && 'vibrate' in navigator

  return (
    <>
      <DocsPageHeader
        title="触觉反馈"
        subtitle="5 级意图，全平台一致。点击播放可在支持 vibrate 的设备（多数移动浏览器）上感受。"
      />

      {!supported && (
        <p className="docs-hint" style={{ marginBottom: 24 }}>
          当前浏览器不支持 navigator.vibrate（多数桌面浏览器）。在手机上访问可体验真实反馈。
        </p>
      )}

      <section className="docs-section-block">
        <h2 className="docs-section-block__heading">意图分级</h2>
        <div className="docs-card">
          {/* token-lint-disable-line grid 最小列宽是几何尺寸 */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 'var(--space-4)' }}>
            {haptics.map((h) => (
              <div
                key={h.intent}
                onClick={() => play(h.pattern)}
                style={{
                  background: 'var(--bg-1)',
                  borderRadius: 'var(--radius-large)',
                  padding: 'var(--space-4)',
                  cursor: 'pointer',
                  border: '0.5px solid var(--line-non-opaque)',
                  transition: 'transform var(--duration-fast) var(--curve-default)',
                }}
                onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.98)')}
                onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                  <span
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      background: intentColor[h.intent],
                    }}
                  />
                  <strong className="docs-text--body-primary">{h.intent}</strong>
                </div>
                <div
                  className="docs-text--subhead docs-text--secondary"
                  style={{ marginBottom: 'var(--space-2)' }}
                >
                  {h.desc}
                </div>
                <div className="docs-text--caption-1 docs-text--tertiary">{h.scenarios}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="docs-section-block">
        <h2 className="docs-section-block__heading">组件触觉映射</h2>
        <div className="docs-card">
          <table className="docs-table">
            <thead>
              <tr>
                <th>组件</th>
                <th>交互</th>
                <th>意图</th>
                <th>试一试</th>
              </tr>
            </thead>
            <tbody>
              {componentMap.map((m, i) => (
                <tr key={i}>
                  <td>{m.component}</td>
                  <td style={{ color: 'var(--label-secondary)' }}>{m.interaction}</td>
                  <td>
                    {/* token-lint-disable-line 紧凑 chip 几何 */}
                    <span
                      className="docs-text--caption-1"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 'var(--space-1)',
                        padding: '2px 8px',
                        background: 'var(--fill-quaternary)',
                        borderRadius: 'var(--radius-full)',
                      }}
                    >
                      <span
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          background: intentColor[m.intent],
                        }}
                      />
                      {m.intent}
                    </span>
                  </td>
                  <td>
                    {/* token-lint-disable-line 迷你按钮几何 */}
                    <button
                      className="docs-text--caption-1"
                      onClick={() => play(haptics.find((h) => h.intent === m.intent)!.pattern)}
                      style={{
                        background: 'var(--fill-tertiary)',
                        border: 0,
                        padding: '4px 10px',
                        borderRadius: 'var(--radius-medium)',
                        cursor: 'pointer',
                      }}
                    >
                      播放 {m.intent}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}
