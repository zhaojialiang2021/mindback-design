// 理论合规 sample —— 频道首次进入的空状态（first-time / fullscreen）
// 真实 AI 输出粘到这里替换即可

export function EmptyChannelPage({ onCreate }: { onCreate: () => void }) {
  return (
    <div
      style={{
        minHeight: '100svh',
        background: 'var(--bg-1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-7)',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          maxWidth: 'var(--space-10)',
          gap: 'var(--space-3)',
        }}
      >
        {/* spot illustration —— first-time 用 spot 大小（120px），引导式而非提醒式 */}
        <SpotIllustration />

        <div
          style={{
            fontSize: 'var(--headline-h3-size)',
            fontWeight: 'var(--headline-h3-weight)',
            lineHeight: 'var(--headline-h3-line-height)',
            color: 'var(--label-primary)',
            marginTop: 'var(--space-3)',
          }}
        >
          建一个频道，把同类想法收到一起
        </div>
        <div
          style={{
            fontSize: 'var(--body-secondary-size)',
            lineHeight: 'var(--body-secondary-line-height)',
            color: 'var(--label-secondary)',
            marginBottom: 'var(--space-3)',
          }}
        >
          AI 会自动给频道里的内容生成总结、连接、回顾。
          你只管丢，整理交给它。
        </div>

        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <button
            className="mb-button mb-button--primary mb-button--standard"
            onClick={onCreate}
          >
            新建频道
          </button>
          <button className="mb-button mb-button--ghost mb-button--standard">
            了解什么是频道
          </button>
        </div>
      </div>
    </div>
  )
}

// 占位 spot illustration —— 实际项目用真插画或 SVG
function SpotIllustration() {
  return (
    <div
      role="presentation"
      style={{
        width: 'var(--space-10)',
        height: 'var(--space-10)',
        borderRadius: 'var(--radius-x-large)',
        background: 'var(--brand-blue-light)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--brand-blue-text)',
      }}
    >
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 4l8 4v8l-8 4-8-4V8l8-4z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}
