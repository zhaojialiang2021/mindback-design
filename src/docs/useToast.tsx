import { useCallback, useState, type ReactNode } from 'react'

export function useToast() {
  const [msg, setMsg] = useState<string | null>(null)

  const show = useCallback((m: string) => {
    setMsg(m)
    window.setTimeout(() => setMsg(null), 1800)
  }, [])

  const node: ReactNode = msg ? <div className="docs-toast">{msg}</div> : null

  return { show, node }
}
