import { Component, useEffect, useSyncExternalStore, type ReactNode } from 'react'
import './App.css'
import { DocsApp } from './docs/DocsApp'
import {
  SplashScreen,
  HomeScreen,
  AIPreferencesScreen,
  AISummaryScreen,
  TimeFragmentScreen,
  DottedDemoScreen,
  type ScreenId,
} from './screens'

// 顶层错误边界：避免渲染挂掉只剩黑屏，把真实报错打到页面上
class AppErrorBoundary extends Component<
  { children: ReactNode },
  { error: Error | null }
> {
  state = { error: null as Error | null }
  static getDerivedStateFromError(error: Error) {
    return { error }
  }
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // eslint-disable-next-line no-console
    console.error('[AppErrorBoundary]', error, info)
  }
  render() {
    if (this.state.error) {
      return (
        <pre
          style={{
            margin: 0,
            padding: 24,
            minHeight: '100vh',
            background: '#fff',
            color: '#c0392b',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
            fontSize: 13,
            lineHeight: 1.5,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}
        >
          {String(this.state.error.stack || this.state.error.message || this.state.error)}
        </pre>
      )
    }
    return this.props.children
  }
}

function subscribeHash(cb: () => void) {
  window.addEventListener('hashchange', cb)
  return () => window.removeEventListener('hashchange', cb)
}
function readHash() {
  return typeof window === 'undefined' ? '' : window.location.hash
}

const screenBySlug: Record<ScreenId, React.FC> = {
  'splash': SplashScreen,
  'home': HomeScreen,
  'ai-preferences': AIPreferencesScreen,
  'ai-summary': AISummaryScreen,
  'time-fragment': TimeFragmentScreen,
  'dotted-demo': DottedDemoScreen,
}

function AppInner() {
  const hash = useSyncExternalStore(subscribeHash, readHash, readHash)

  // /preview/<slug> 仍保留：画板预览 iframe 用
  const previewMatch = /^#\/preview\/([\w-]+)/.exec(hash)
  if (previewMatch) {
    const slug = previewMatch[1] as ScreenId
    const ScreenComponent = screenBySlug[slug]
    if (!ScreenComponent) return null
    return <PreviewOnly slug={slug} ScreenComponent={ScreenComponent} />
  }

  // 其他所有路径都直接进文档站
  return <DocsApp />
}

function App() {
  return (
    <AppErrorBoundary>
      <AppInner />
    </AppErrorBoundary>
  )
}

function PreviewOnly({
  ScreenComponent,
}: {
  slug: ScreenId
  ScreenComponent: React.FC
}) {
  // 给 iframe 内 body 加 is-preview，配合 App.css 隐藏滚动条 + 清 margin
  useEffect(() => {
    document.body.classList.add('is-preview')
    return () => document.body.classList.remove('is-preview')
  }, [])

  // 所有页面统一 393×852，整页不滚（个别页内部允许滚动，由各自样式决定）
  return (
    <div
      style={{
        height: '100svh',
        overflow: 'hidden',
        background: 'var(--bg-1)',
      }}
    >
      <ScreenComponent />
    </div>
  )
}

export default App
