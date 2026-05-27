import { useCallback, useEffect, useState } from 'react'

export type Theme = 'system' | 'light' | 'dark'
const KEY = 'mindback-docs-theme'

function applyTheme(t: Theme) {
  if (typeof document === 'undefined') return
  // system 模式下解析为真实值再写入 data-theme，
  // 这样 [data-theme='dark'] 选择器（logo / stage 等）能正确生效
  if (t === 'system') {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    document.documentElement.dataset.theme = prefersDark ? 'dark' : 'light'
  } else {
    document.documentElement.dataset.theme = t
  }
}

function readInitial(): Theme {
  if (typeof window === 'undefined') return 'system'
  try {
    const stored = window.localStorage.getItem(KEY)
    if (stored === 'light' || stored === 'dark' || stored === 'system') return stored
  } catch {
    /* ignore */
  }
  return 'system'
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(readInitial)

  useEffect(() => {
    applyTheme(theme)
    try {
      window.localStorage.setItem(KEY, theme)
    } catch {
      /* ignore */
    }
  }, [theme])

  // 跟随系统时同步系统变化
  useEffect(() => {
    if (theme !== 'system') return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => applyTheme('system')
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [theme])

  const setTheme = useCallback((t: Theme) => setThemeState(t), [])

  return { theme, setTheme }
}
