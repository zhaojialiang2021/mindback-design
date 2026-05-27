import { type ReactNode } from 'react'
import { useTheme, type Theme } from './useTheme'
import { useLocale, useT, type Locale } from './useLocale'
import { Icon } from './icons'

/**
 * 右下角悬浮胶囊：主题切换 + 语言切换。
 * 跟侧栏脱钩，所有页面都看到，移动端也好操作。
 */
export function FloatingControls() {
  const { theme, setTheme } = useTheme()
  const { locale, setLocale } = useLocale()
  const t = useT()

  return (
    <div className="docs-floating" role="region" aria-label={t('cmdk.search')}>
      <div className="docs-floating__group" role="radiogroup" aria-label={t('theme.label')}>
        <FloatBtn
          active={theme === 'system'}
          onClick={() => setTheme('system')}
          ariaLabel={t('theme.system')}
        >
          <Icon.Layers size={14} />
        </FloatBtn>
        <FloatBtn
          active={theme === 'light'}
          onClick={() => setTheme('light')}
          ariaLabel={t('theme.light')}
        >
          <Icon.Sun size={14} />
        </FloatBtn>
        <FloatBtn
          active={theme === 'dark'}
          onClick={() => setTheme('dark')}
          ariaLabel={t('theme.dark')}
        >
          <Icon.Moon size={14} />
        </FloatBtn>
      </div>

      <div className="docs-floating__divider" />

      <div className="docs-floating__group" role="radiogroup" aria-label={t('locale.label')}>
        <FloatBtn
          active={locale === 'zh'}
          onClick={() => setLocale('zh')}
          ariaLabel="中文"
          textOnly
        >
          中
        </FloatBtn>
        <FloatBtn
          active={locale === 'en'}
          onClick={() => setLocale('en')}
          ariaLabel="English"
          textOnly
        >
          EN
        </FloatBtn>
      </div>
    </div>
  )
}

function FloatBtn({
  active,
  onClick,
  ariaLabel,
  children,
  textOnly,
}: {
  active: boolean
  onClick: () => void
  ariaLabel: string
  children: ReactNode
  textOnly?: boolean
}) {
  return (
    <button
      role="radio"
      aria-checked={active}
      aria-label={ariaLabel}
      title={ariaLabel}
      className={`docs-floating__btn ${active ? 'is-active' : ''} ${textOnly ? 'docs-floating__btn--text' : ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

// 单纯导出 Theme / Locale 类型方便外部使用（保留）
export type { Theme, Locale }
