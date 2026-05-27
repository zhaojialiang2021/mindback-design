import { useEffect, useMemo, useRef, useState } from 'react'
import { components, pages, patterns, writings } from './manifest'
import { navigate, useHash } from './router'
import { Icon } from './icons'
import { useT } from './useLocale'

const HISTORY_KEY = 'mindback-docs-history'
const HISTORY_MAX = 5

function readHistory(): string[] {
  try {
    const v = localStorage.getItem(HISTORY_KEY)
    if (!v) return []
    const arr = JSON.parse(v)
    return Array.isArray(arr) ? arr.slice(0, HISTORY_MAX) : []
  } catch {
    return []
  }
}


type Item = {
  href: string
  label: string
  group: string
  hint?: string
  keywords?: string
}

const STATIC: Item[] = [
  { href: '/docs', label: '首页 · Landing', group: 'System', keywords: 'home landing' },
  { href: '/docs/intro', label: '关于 MindBack', group: 'System', keywords: 'intro about' },
  { href: '/docs/manifesto', label: 'Manifesto', group: 'System', keywords: 'why ai-native' },
  { href: '/docs/workflow', label: '设计工作流', group: 'System', keywords: 'workflow agent skill' },
  { href: '/docs/foundations/color', label: 'Color', group: 'Foundations', keywords: 'tokens color label brand accent' },
  { href: '/docs/foundations/typography', label: 'Typography', group: 'Foundations', keywords: 'font type pingfang' },
  { href: '/docs/foundations/spacing', label: 'Spacing', group: 'Foundations', keywords: 'space gap padding' },
  { href: '/docs/foundations/radius', label: 'Radius', group: 'Foundations', keywords: 'border-radius rounded' },
  { href: '/docs/foundations/motion', label: 'Motion', group: 'Foundations', keywords: 'duration curve animation' },
  { href: '/docs/principles', label: '设计原则', group: 'Foundations', keywords: 'principles 12 rules' },
  { href: '/docs/haptics', label: '触觉反馈', group: 'Foundations', keywords: 'haptics vibrate touch' },
  { href: '/docs/ai-workflows', label: 'AI Workflows', group: 'AI', keywords: 'cursor claude mcp skill prompt' },
  { href: '/docs/pitch', label: '项目汇报', group: 'AI', keywords: 'pitch slides' },
  { href: '/docs/changelog', label: 'Changelog', group: 'AI', keywords: 'version semver release' },
]

function buildItems(): Item[] {
  const items: Item[] = [...STATIC]
  for (const c of components) {
    items.push({
      href: `/docs/components/${c.slug}`,
      label: c.name,
      group: c.depth === 'deep' ? '深度组件' : '其他组件',
      hint: c.depth === 'deep' ? 'deep' : undefined,
      keywords: c.slug,
    })
  }
  for (const p of patterns) {
    items.push({
      href: `/docs/patterns/${p.slug}`,
      label: p.name,
      group: 'Patterns',
      keywords: p.slug + ' ' + p.desc,
    })
  }
  for (const p of pages) {
    items.push({
      href: `/docs/pages/${p.slug}`,
      label: p.name,
      group: 'MindBack 活样本',
      keywords: p.slug + ' ' + p.subtitle,
    })
  }
  for (const w of writings) {
    items.push({
      href: `/docs/writing/${w.slug}`,
      label: w.title,
      group: 'Writing',
      keywords: w.slug + ' ' + w.desc,
    })
  }
  return items
}

function score(item: Item, q: string): number {
  if (!q) return 0
  const ql = q.toLowerCase()
  const haystack = (item.label + ' ' + (item.keywords ?? '') + ' ' + item.group).toLowerCase()
  // 子串命中 + 起始位置加权（越靠前越好）
  const idx = haystack.indexOf(ql)
  if (idx === -1) {
    // 模糊：每个字符按序出现也算
    let lastFound = -1
    let gaps = 0
    for (const ch of ql) {
      const k = haystack.indexOf(ch, lastFound + 1)
      if (k === -1) return -1
      if (lastFound >= 0) gaps += k - lastFound - 1
      lastFound = k
    }
    return 100 - gaps * 0.5
  }
  // 起始位置加权 + label 优先
  const inLabel = item.label.toLowerCase().indexOf(ql)
  return 1000 - idx + (inLabel >= 0 ? 500 - inLabel : 0)
}

export function CommandPalette() {
  const t = useT()
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  // 用一个统一的 setOpen wrapper 在打开时清状态，避免 effect 里 setState
  const toggleOpen = (next: boolean) => {
    if (next) {
      setQ('')
      setActive(0)
    }
    setOpen(next)
  }

  const items = useMemo(() => buildItems(), [])
  const hash = useHash()
  // open 切换时（每次重新打开）从 localStorage 读最新的访问历史
  const recent = useMemo(() => {
    if (!open) return []
    const hist = readHistory()
    const map = new Map(items.map((it) => [it.href, it]))
    return hist
      .map((href) => map.get(href))
      .filter((x): x is NonNullable<typeof x> => !!x)
      .map((it) => ({ ...it, group: t('cmdk.recent') }))
    // 依赖 open 触发刷新；hash 引入只是为了 reload 时能追到最新
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, hash])
  const filtered = useMemo(() => {
    if (!q.trim()) {
      // 空 query 时：先列最近访问（去重），再列默认
      const recentHrefs = new Set(recent.map((r) => r.href))
      return [...recent, ...items.filter((it) => !recentHrefs.has(it.href))].slice(0, 30)
    }
    return items
      .map((it) => ({ it, s: score(it, q) }))
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 30)
      .map((x) => x.it)
  }, [items, q, recent])

  // 全局快捷键：Cmd+K / Ctrl+K 打开；/ 也打开（聚焦在 input、textarea 时不响应）
  useEffect(() => {
    function handle(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement)?.tagName
      const isInputContext = tag === 'INPUT' || tag === 'TEXTAREA'
      if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        toggleOpen(!open)
        return
      }
      if (e.key === '/' && !isInputContext && !open) {
        e.preventDefault()
        toggleOpen(true)
        return
      }
      if (e.key === 'Escape' && open) {
        toggleOpen(false)
      }
    }
    window.addEventListener('keydown', handle)
    return () => window.removeEventListener('keydown', handle)
  }, [open])

  // 打开后聚焦（仅 DOM 副作用，不再 setState）
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 30)
      return () => clearTimeout(t)
    }
  }, [open])

  // 上下键 + Enter
  useEffect(() => {
    if (!open) return
    function handle(e: KeyboardEvent) {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActive((a) => Math.min(filtered.length - 1, a + 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActive((a) => Math.max(0, a - 1))
      } else if (e.key === 'Enter') {
        e.preventDefault()
        const it = filtered[active]
        if (it) {
          navigate(it.href)
          toggleOpen(false)
        }
      }
    }
    window.addEventListener('keydown', handle)
    return () => window.removeEventListener('keydown', handle)
  }, [open, filtered, active])

  if (!open) return null

  return (
    <div
      className="docs-cmdk-overlay"
      onClick={() => setOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="搜索"
    >
      <div className="docs-cmdk" onClick={(e) => e.stopPropagation()}>
        <div className="docs-cmdk__head">
          <Icon.Search size={16} />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => {
              setQ(e.target.value)
              setActive(0)
            }}
            placeholder={t('cmdk.placeholder')}
            className="docs-cmdk__input"
          />
          <kbd className="docs-cmdk__esc">esc</kbd>
        </div>
        <div className="docs-cmdk__list">
          {filtered.length === 0 ? (
            <div className="docs-cmdk__empty">{t('cmdk.empty')}</div>
          ) : (
            filtered.map((it, i) => (
              <button
                key={it.href}
                className={`docs-cmdk__item ${i === active ? 'is-active' : ''}`}
                onMouseEnter={() => setActive(i)}
                onClick={() => {
                  navigate(it.href)
                  toggleOpen(false)
                }}
              >
                <span className="docs-cmdk__group">{it.group}</span>
                <span className="docs-cmdk__label">{it.label}</span>
                {it.hint && <span className="docs-cmdk__hint">{it.hint}</span>}
              </button>
            ))
          )}
        </div>
        <div className="docs-cmdk__foot">
          <span>
            <kbd>↑</kbd>
            <kbd>↓</kbd> {t('cmdk.kbd.move')}
          </span>
          <span>
            <kbd>↵</kbd> {t('cmdk.kbd.go')}
          </span>
          <span>
            <kbd>⌘</kbd>
            <kbd>K</kbd> / <kbd>/</kbd> {t('cmdk.kbd.invoke')}
          </span>
        </div>
      </div>
    </div>
  )
}
