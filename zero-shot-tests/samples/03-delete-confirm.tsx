// 理论合规 sample —— 删除确认弹窗（用 Modal，不是 Sheet）
// 真实 AI 输出粘到这里替换即可

import { useState } from 'react'

export function DeleteConfirmModal({
  itemName,
  onCancel,
  onConfirm,
}: {
  itemName: string
  onCancel: () => void
  onConfirm: () => void
}) {
  const [confirming, setConfirming] = useState(false)

  const handleConfirm = async () => {
    setConfirming(true)
    try {
      await onConfirm()
      // light haptic on tap
      if ('vibrate' in navigator) navigator.vibrate(10)
    } finally {
      setConfirming(false)
    }
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'var(--backdrop)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-5)',
        transition: 'opacity var(--duration-normal) var(--curve-default)',
      }}
      onClick={onCancel}
    >
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--bg-0)',
          borderRadius: 'var(--radius-x-large)',
          padding: 'var(--space-6)',
          maxWidth: 'var(--space-10)',
          width: '100%',
          boxShadow: 'var(--shadow-modal)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-4)',
        }}
      >
        <div
          style={{
            fontSize: 'var(--headline-h3-size)',
            fontWeight: 'var(--headline-h3-weight)',
            lineHeight: 'var(--headline-h3-line-height)',
            color: 'var(--label-primary)',
          }}
        >
          删除「{itemName}」？
        </div>
        <div
          style={{
            fontSize: 'var(--body-secondary-size)',
            lineHeight: 'var(--body-secondary-line-height)',
            color: 'var(--label-secondary)',
          }}
        >
          这条记录将被永久删除，且无法恢复。
        </div>
        <div
          style={{
            display: 'flex',
            gap: 'var(--space-3)',
            justifyContent: 'flex-end',
            marginTop: 'var(--space-2)',
          }}
        >
          <button
            className="mb-button mb-button--secondary mb-button--standard"
            onClick={onCancel}
            disabled={confirming}
          >
            取消
          </button>
          <button
            className="mb-button mb-button--destructive mb-button--standard"
            onClick={handleConfirm}
            disabled={confirming}
          >
            {confirming ? '删除中…' : '删除'}
          </button>
        </div>
      </div>
    </div>
  )
}
