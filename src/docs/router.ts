// 极简 hash 路由 —— 文档站独立用，避免引入额外依赖
import { useSyncExternalStore } from 'react'

function subscribe(callback: () => void) {
  window.addEventListener('hashchange', callback)
  return () => window.removeEventListener('hashchange', callback)
}

function getHash() {
  return window.location.hash || '#/'
}

export function useHash(): string {
  return useSyncExternalStore(subscribe, getHash, getHash)
}

export function navigate(path: string) {
  window.location.hash = path
}

export type Area = 'system' | 'writing' | 'landing'

export type FoundationSub = 'color' | 'typography' | 'spacing' | 'radius' | 'motion'

export type DocsRoute =
  // Landing 区（首页）
  | { kind: 'home' }
  // System 区
  | { kind: 'intro' }
  | { kind: 'manifesto' }
  | { kind: 'foundations'; sub: FoundationSub }
  | { kind: 'principles' }
  | { kind: 'haptics' }
  | { kind: 'component'; slug: string }
  | { kind: 'patterns'; slug?: string }
  | { kind: 'ai-workflows' }
  | { kind: 'workflow' }
  | { kind: 'pitch' }
  | { kind: 'changelog' }
  // MindBack 区
  | { kind: 'page'; slug: string }
  // Writing 区
  | { kind: 'writing-index' }
  | { kind: 'writing'; slug: string }
  // 兜底
  | { kind: 'not-found'; path: string }

export function getRouteArea(route: DocsRoute): Area {
  switch (route.kind) {
    case 'home':
      return 'landing'
    case 'writing':
    case 'writing-index':
      return 'writing'
    case 'not-found':
    default:
      return 'system'
  }
}

// hash 形态：
//   #/docs                              → home
//   #/docs/manifesto                    → manifesto
//   #/docs/foundations/color            → foundations sub
//   #/docs/principles                   → principles
//   #/docs/haptics                      → haptics
//   #/docs/components/<slug>            → component
//   #/docs/patterns                     → patterns 索引
//   #/docs/patterns/<slug>              → patterns 子页
//   #/docs/ai-workflows                 → ai-workflows
//   #/docs/workflow                     → workflow (协作管线)
//   #/docs/changelog                    → changelog
//   #/docs/pages/<slug>                 → mindback 案例页
//   #/docs/writing/<slug>               → writing 文章
//   #/docs/tokens                       → 兼容旧链接 → foundations/color
export function parseDocsRoute(hash: string): DocsRoute {
  // 兼容三种入口：无 hash、`#/`、`#/docs`，都视为首页
  const m = hash.replace(/^#\/?(docs\/?)?/, '')
  if (!m) return { kind: 'home' }
  const parts = m.split('/').filter(Boolean)
  const [head, sub] = parts

  if (head === 'intro') return { kind: 'intro' }
  if (head === 'manifesto') return { kind: 'manifesto' }
  if (head === 'foundations') {
    const valid: FoundationSub[] = ['color', 'typography', 'spacing', 'radius', 'motion']
    const s = (valid.includes(sub as FoundationSub) ? sub : 'color') as FoundationSub
    return { kind: 'foundations', sub: s }
  }
  if (head === 'tokens') return { kind: 'foundations', sub: 'color' } // 旧链接兼容
  if (head === 'principles') return { kind: 'principles' }
  if (head === 'haptics') return { kind: 'haptics' }
  if (head === 'components' && sub) return { kind: 'component', slug: sub }
  if (head === 'patterns') return { kind: 'patterns', slug: sub }
  if (head === 'ai-workflows') return { kind: 'ai-workflows' }
  if (head === 'workflow') return { kind: 'workflow' }
  if (head === 'pitch') return { kind: 'pitch' }
  if (head === 'changelog') return { kind: 'changelog' }
  if (head === 'pages' && sub) return { kind: 'page', slug: sub }
  if (head === 'writing' && sub) return { kind: 'writing', slug: sub }
  if (head === 'writing') return { kind: 'writing-index' }
  return { kind: 'not-found', path: m }
}
