// 理论合规 sample —— 用于回归评分脚本。真实 AI 输出粘到这里替换即可。
// 验证：所有颜色、间距、圆角都引用令牌；组件 props 命中 schema enum；状态完整。

import { useState } from 'react'

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailState, setEmailState] = useState<'empty' | 'focus' | 'error' | 'disabled'>('empty')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  return (
    <div
      style={{
        minHeight: '100svh',
        background: 'var(--bg-1)',
        padding: 'var(--space-7)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* 品牌区 */}
      <div style={{ marginTop: 'var(--space-9)', marginBottom: 'var(--space-8)' }}>
        <div
          style={{
            fontSize: 'var(--headline-h1-size)',
            fontWeight: 'var(--headline-h1-weight)',
            lineHeight: 'var(--headline-h1-line-height)',
            color: 'var(--label-primary)',
            marginBottom: 'var(--space-3)',
          }}
        >
          MindBack
        </div>
        <div
          style={{
            fontSize: 'var(--body-secondary-size)',
            color: 'var(--label-secondary)',
            lineHeight: 'var(--body-secondary-line-height)',
          }}
        >
          回到你刚刚的那个想法
        </div>
      </div>

      {/* 表单 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        <Input
          label="邮箱"
          value={email}
          onChange={setEmail}
          state={emailState}
          onFocus={() => setEmailState('focus')}
          onBlur={() => setEmailState('empty')}
        />
        <Input
          label="密码"
          value={password}
          onChange={setPassword}
          state="empty"
          type="password"
        />
      </div>

      {/* 错误反馈 */}
      {error && (
        <EmptyState
          kind="error"
          title="登录失败"
          description={error}
          primaryAction={{ label: '重试', onClick: () => setError(null) }}
        />
      )}

      {/* 主 CTA */}
      <div style={{ marginTop: 'var(--space-7)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        <button
          className="mb-button mb-button--primary mb-button--large"
          style={{ width: '100%' }}
          disabled={loading}
        >
          {loading ? '登录中…' : '登录'}
        </button>
        <button className="mb-button mb-button--ghost mb-button--standard" style={{ width: '100%' }}>
          忘记密码
        </button>
      </div>
    </div>
  )
}

// 简化的 Input / EmptyState 引用（实际项目从设计系统导入）
function Input(props: {
  label: string
  value: string
  onChange: (v: string) => void
  state: 'empty' | 'focus' | 'error' | 'disabled'
  type?: 'text' | 'password'
  onFocus?: () => void
  onBlur?: () => void
}) {
  const isError = props.state === 'error'
  const isFocus = props.state === 'focus'
  const isDisabled = props.state === 'disabled'
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
      <span style={{ fontSize: 'var(--subhead-size)', color: 'var(--label-secondary)' }}>
        {props.label}
      </span>
      <input
        type={props.type ?? 'text'}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
        disabled={isDisabled}
        style={{
          height: 'var(--space-9)',
          padding: '0 var(--space-3)',
          fontSize: 'var(--body-secondary-size)',
          color: 'var(--label-primary)',
          background: isFocus ? 'var(--bg-0)' : 'var(--fill-quaternary)',
          border: isError
            ? '1px solid var(--accent-pink)'
            : isFocus
            ? '1px solid var(--brand-blue)'
            : '1px solid transparent',
          borderRadius: 'var(--radius-medium)',
          opacity: isDisabled ? 0.5 : 1,
          fontFamily: 'inherit',
          outline: 'none',
          transition: 'all var(--duration-fast) var(--curve-default)',
        }}
      />
    </label>
  )
}

function EmptyState(props: {
  kind: 'empty' | 'no-result' | 'no-permission' | 'error' | 'first-time'
  title: string
  description: string
  primaryAction: { label: string; onClick: () => void }
}) {
  return (
    <div
      style={{
        padding: 'var(--space-5)',
        background: 'var(--bg-0)',
        borderRadius: 'var(--radius-large)',
        marginTop: 'var(--space-4)',
        border: '0.5px solid var(--line-non-opaque)',
      }}
    >
      <div style={{ fontSize: 'var(--callout-size)', fontWeight: 500, color: 'var(--label-primary)' }}>
        {props.title}
      </div>
      <div
        style={{
          fontSize: 'var(--footnote-size)',
          color: 'var(--label-secondary)',
          marginTop: 'var(--space-2)',
        }}
      >
        {props.description}
      </div>
      <button
        className="mb-button mb-button--primary mb-button--compact"
        onClick={props.primaryAction.onClick}
        style={{ marginTop: 'var(--space-3)' }}
      >
        {props.primaryAction.label}
      </button>
    </div>
  )
}
