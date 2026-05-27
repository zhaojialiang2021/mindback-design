// 理论合规 sample —— 文件上传，状态完整覆盖
// 真实 AI 输出粘到这里替换即可

import { useState } from 'react'

type UploadState = 'empty' | 'loading' | 'error' | 'success'

export function FileUpload() {
  const [state, setState] = useState<UploadState>('empty')
  const [progress, setProgress] = useState(0)
  const [filename, setFilename] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSelect = () => {
    setState('loading')
    setFilename('design-tokens.json')
    let p = 0
    const timer = setInterval(() => {
      p += 10
      setProgress(p)
      if (p >= 100) {
        clearInterval(timer)
        setState('success')
      }
    }, 100)
  }

  return (
    <div
      style={{
        background: 'var(--bg-0)',
        border: '0.5px solid var(--line-non-opaque)',
        borderRadius: 'var(--radius-large)',
        padding: 'var(--space-5)',
      }}
    >
      {state === 'empty' && (
        <EmptyView onSelect={handleSelect} />
      )}
      {state === 'loading' && (
        <LoadingView filename={filename} progress={progress} onCancel={() => setState('empty')} />
      )}
      {state === 'error' && (
        <ErrorView message={errorMsg} onRetry={handleSelect} />
      )}
      {state === 'success' && (
        <SuccessView filename={filename} onRemove={() => setState('empty')} />
      )}
    </div>
  )
}

function EmptyView({ onSelect }: { onSelect: () => void }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'var(--space-3)',
        padding: 'var(--space-7)',
        cursor: 'pointer',
      }}
      onClick={onSelect}
    >
      <div
        style={{
          fontSize: 'var(--callout-size)',
          fontWeight: 'var(--callout-weight)',
          color: 'var(--label-primary)',
        }}
      >
        把文件拖到这里
      </div>
      <div
        style={{
          fontSize: 'var(--footnote-size)',
          color: 'var(--label-secondary)',
        }}
      >
        或点击选择
      </div>
    </div>
  )
}

function LoadingView({
  filename,
  progress,
  onCancel,
}: {
  filename: string
  progress: number
  onCancel: () => void
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span
          style={{
            fontSize: 'var(--body-secondary-size)',
            color: 'var(--label-primary)',
          }}
        >
          {filename}
        </span>
        <button
          className="mb-button mb-button--ghost mb-button--compact"
          onClick={onCancel}
        >
          取消
        </button>
      </div>
      <div
        style={{
          height: 'var(--space-1)',
          background: 'var(--fill-quaternary)',
          borderRadius: 'var(--radius-full)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: '100%',
            background: 'var(--brand-blue)',
            transition: 'width var(--duration-fast) var(--curve-default)',
          }}
        />
      </div>
    </div>
  )
}

function ErrorView({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-3)',
        padding: 'var(--space-4)',
      }}
    >
      <div
        style={{
          fontSize: 'var(--callout-size)',
          color: 'var(--accent-pink)',
        }}
      >
        上传失败
      </div>
      <div
        style={{
          fontSize: 'var(--footnote-size)',
          color: 'var(--label-secondary)',
        }}
      >
        {message || '网络好像断了一下，再试一次。'}
      </div>
      <button
        className="mb-button mb-button--primary mb-button--compact"
        onClick={onRetry}
      >
        重试
      </button>
    </div>
  )
}

function SuccessView({
  filename,
  onRemove,
}: {
  filename: string
  onRemove: () => void
}) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 'var(--space-3)',
      }}
    >
      <span
        style={{
          fontSize: 'var(--body-secondary-size)',
          color: 'var(--label-primary)',
        }}
      >
        {filename}
      </span>
      <button className="mb-button mb-button--ghost mb-button--compact" onClick={onRemove}>
        移除
      </button>
    </div>
  )
}
