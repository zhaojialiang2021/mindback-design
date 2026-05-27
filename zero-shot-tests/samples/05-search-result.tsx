// 理论合规 sample —— 搜索结果页：empty / loading / no-result / has-result
// 真实 AI 输出粘到这里替换即可

import { useState } from 'react'

type SearchState = 'empty' | 'loading' | 'no-result' | 'has-result'

type Memory = { id: string; title: string; snippet: string; date: string }

const mockResults: Memory[] = [
  { id: '1', title: '上周三的产品想法', snippet: 'AI 整理可能是 zero-shot 测试的核心...', date: '2026-05-12' },
  { id: '2', title: '关于设计系统的笔记', snippet: '令牌不只是名字，是契约...', date: '2026-05-10' },
]

export function SearchResultPage() {
  const [query, setQuery] = useState('')
  const [state, setState] = useState<SearchState>('empty')
  const [results, setResults] = useState<Memory[]>([])

  const handleSearch = (q: string) => {
    setQuery(q)
    if (!q) {
      setState('empty')
      return
    }
    setState('loading')
    setTimeout(() => {
      if (q.includes('找不到')) {
        setResults([])
        setState('no-result')
      } else {
        setResults(mockResults)
        setState('has-result')
      }
    }, 600)
  }

  return (
    <div
      style={{
        minHeight: '100svh',
        background: 'var(--bg-1)',
        padding: 'var(--space-5)',
      }}
    >
      {/* search bar */}
      <input
        type="search"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="搜索你的记忆"
        style={{
          width: '100%',
          height: 'var(--space-9)',
          padding: '0 var(--space-4)',
          fontSize: 'var(--body-secondary-size)',
          background: 'var(--bg-0)',
          border: '0.5px solid var(--line-non-opaque)',
          borderRadius: 'var(--radius-medium)',
          marginBottom: 'var(--space-5)',
          fontFamily: 'inherit',
        }}
      />

      {state === 'empty' && <EmptyHint />}
      {state === 'loading' && <SkeletonList />}
      {state === 'no-result' && <NoResultView query={query} onClear={() => handleSearch('')} />}
      {state === 'has-result' && <ResultList results={results} />}
    </div>
  )
}

function EmptyHint() {
  return (
    <div
      style={{
        textAlign: 'center',
        padding: 'var(--space-7)',
        color: 'var(--label-tertiary)',
        fontSize: 'var(--footnote-size)',
      }}
    >
      输入关键词开始搜索
    </div>
  )
}

function SkeletonList() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            background: 'var(--bg-0)',
            border: '0.5px solid var(--line-non-opaque)',
            borderRadius: 'var(--radius-large)',
            padding: 'var(--space-4)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-2)',
          }}
        >
          <Skeleton width="60%" />
          <Skeleton width="100%" />
          <Skeleton width="40%" />
        </div>
      ))}
    </div>
  )
}

function Skeleton({ width }: { width: string }) {
  return (
    <div
      style={{
        height: 'var(--space-3)',
        width,
        background: 'var(--fill-tertiary)',
        borderRadius: 'var(--radius-small)',
        animation: 'pulse var(--duration-slow) var(--curve-default) infinite',
      }}
    />
  )
}

function NoResultView({ query, onClear }: { query: string; onClear: () => void }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: 'var(--space-7)',
        gap: 'var(--space-3)',
      }}
    >
      <div
        style={{
          fontSize: 'var(--headline-h3-size)',
          fontWeight: 'var(--headline-h3-weight)',
          color: 'var(--label-primary)',
        }}
      >
        没找到「{query}」相关的内容
      </div>
      <div
        style={{
          fontSize: 'var(--body-secondary-size)',
          color: 'var(--label-secondary)',
          marginBottom: 'var(--space-3)',
        }}
      >
        换个关键词试试，或者清除筛选
      </div>
      <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
        <button className="mb-button mb-button--primary mb-button--compact" onClick={onClear}>
          清除筛选
        </button>
        <button className="mb-button mb-button--ghost mb-button--compact">修改关键词</button>
      </div>
    </div>
  )
}

function ResultList({ results }: { results: Memory[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
      {results.map((r) => (
        <div
          key={r.id}
          style={{
            background: 'var(--bg-0)',
            border: '0.5px solid var(--line-non-opaque)',
            borderRadius: 'var(--radius-large)',
            padding: 'var(--space-4)',
            cursor: 'pointer',
            transition: 'background var(--duration-fast) var(--curve-default)',
          }}
        >
          <div
            style={{
              fontSize: 'var(--callout-size)',
              fontWeight: 'var(--callout-weight)',
              color: 'var(--label-primary)',
              marginBottom: 'var(--space-1)',
            }}
          >
            {r.title}
          </div>
          <div
            style={{
              fontSize: 'var(--footnote-size)',
              color: 'var(--label-secondary)',
              marginBottom: 'var(--space-2)',
              lineHeight: 'var(--footnote-line-height)',
            }}
          >
            {r.snippet}
          </div>
          <div
            style={{
              fontSize: 'var(--caption-1-size)',
              color: 'var(--label-tertiary)',
            }}
          >
            {r.date}
          </div>
        </div>
      ))}
    </div>
  )
}
