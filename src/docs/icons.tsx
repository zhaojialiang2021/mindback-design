// SF Symbols 风格 line icon 集合
// 24px viewBox / stroke 1.5 / linecap round

import type { SVGProps } from 'react'

type Props = SVGProps<SVGSVGElement> & { size?: number }

// eslint-disable-next-line react-refresh/only-export-components
function Base({ size = 20, children, ...rest }: Props & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      {children}
    </svg>
  )
}

export const Icon = {
  Search: (p: Props) => (
    <Base {...p}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16l4 4" />
    </Base>
  ),
  Close: (p: Props) => (
    <Base {...p}>
      <path d="M6 6l12 12M18 6L6 18" />
    </Base>
  ),
  Back: (p: Props) => (
    <Base {...p}>
      <path d="M15 6l-6 6 6 6" />
    </Base>
  ),
  ChevronRight: (p: Props) => (
    <Base {...p}>
      <path d="M9 6l6 6-6 6" />
    </Base>
  ),
  Star: (p: Props) => (
    <Base {...p}>
      <path d="M12 3l2.5 6 6.5.5-5 4.5 1.5 6.5L12 17l-5.5 3.5L8 14 3 9.5l6.5-.5L12 3z" />
    </Base>
  ),
  Bell: (p: Props) => (
    <Base {...p}>
      <path d="M6 9a6 6 0 1112 0v4l1.5 3h-15L6 13V9z" />
      <path d="M10.5 19a1.5 1.5 0 003 0" />
    </Base>
  ),
  Lock: (p: Props) => (
    <Base {...p}>
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 018 0v3" />
    </Base>
  ),
  User: (p: Props) => (
    <Base {...p}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c1-4.5 4-7 8-7s7 2.5 8 7" />
    </Base>
  ),
  Sparkles: (p: Props) => (
    <Base {...p}>
      <path d="M12 4v4M12 16v4M4 12h4M16 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6" />
    </Base>
  ),
  Robot: (p: Props) => (
    <Base {...p}>
      <rect x="4" y="8" width="16" height="11" rx="2.5" />
      <circle cx="9" cy="13" r="1" />
      <circle cx="15" cy="13" r="1" />
      <path d="M12 4v4M9 4h6" />
    </Base>
  ),
  Check: (p: Props) => (
    <Base {...p}>
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </Base>
  ),
  Warning: (p: Props) => (
    <Base {...p}>
      <path d="M12 4l9.5 16h-19L12 4z" />
      <path d="M12 10v4M12 17.5v.01" />
    </Base>
  ),
  Camera: (p: Props) => (
    <Base {...p}>
      <rect x="3" y="7" width="18" height="13" rx="2.5" />
      <circle cx="12" cy="13.5" r="3.5" />
      <path d="M8 7l1.5-2.5h5L16 7" />
    </Base>
  ),
  Mic: (p: Props) => (
    <Base {...p}>
      <rect x="9" y="3" width="6" height="12" rx="3" />
      <path d="M5 11a7 7 0 0014 0M12 18v3" />
    </Base>
  ),
  Pen: (p: Props) => (
    <Base {...p}>
      <path d="M16 4l4 4-12 12H4v-4L16 4z" />
    </Base>
  ),
  Plus: (p: Props) => (
    <Base {...p}>
      <path d="M12 5v14M5 12h14" />
    </Base>
  ),
  Sun: (p: Props) => (
    <Base {...p}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.5 5.5l1.5 1.5M17 17l1.5 1.5M5.5 18.5L7 17M17 7l1.5-1.5" />
    </Base>
  ),
  Moon: (p: Props) => (
    <Base {...p}>
      <path d="M20 14a8 8 0 11-10-10 6 6 0 0010 10z" />
    </Base>
  ),
  Layers: (p: Props) => (
    <Base {...p}>
      <path d="M12 3l9 5-9 5-9-5 9-5z" />
      <path d="M3 13l9 5 9-5" />
    </Base>
  ),
  Grid: (p: Props) => (
    <Base {...p}>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </Base>
  ),
  Target: (p: Props) => (
    <Base {...p}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </Base>
  ),
  Bolt: (p: Props) => (
    <Base {...p}>
      <path d="M13 3L4 14h7l-1 7 9-11h-7l1-7z" />
    </Base>
  ),
  External: (p: Props) => (
    <Base {...p}>
      <path d="M14 5h5v5M19 5l-9 9M9 5H5v14h14v-4" />
    </Base>
  ),
  Copy: (p: Props) => (
    <Base {...p}>
      <rect x="8" y="8" width="12" height="12" rx="2" />
      <path d="M16 8V6a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2h2" />
    </Base>
  ),
  Play: (p: Props) => (
    <Base {...p}>
      <path d="M7 4l13 8-13 8V4z" fill="currentColor" stroke="none" />
    </Base>
  ),
  Phone: (p: Props) => (
    <Base {...p}>
      <rect x="6" y="3" width="12" height="18" rx="2.5" />
      <path d="M11 18h2" />
    </Base>
  ),
  Tablet: (p: Props) => (
    <Base {...p}>
      <rect x="3" y="4" width="18" height="16" rx="2.5" />
      <path d="M11 18h2" />
    </Base>
  ),
  Desktop: (p: Props) => (
    <Base {...p}>
      <rect x="2" y="4" width="20" height="13" rx="2" />
      <path d="M9 21h6M12 17v4" />
    </Base>
  ),
  FileJson: (p: Props) => (
    <Base {...p}>
      <path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8l-5-5z" />
      <path d="M14 3v5h5" />
      <path d="M9 13c0 1.5-1 1.5-1 2.5s1 1 1 2.5M15 13c0 1.5 1 1.5 1 2.5s-1 1-1 2.5" />
    </Base>
  ),
}
