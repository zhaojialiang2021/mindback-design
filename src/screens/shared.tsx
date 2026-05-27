import type { ReactNode } from 'react'

// === 类型 ===

export type TypeTagTone = 'brand' | 'brown' | 'sky' | 'sage'

export type AbilityCardItem = {
  title: string
  value: string
  unit: string
  state: string
  tone: TypeTagTone
}

export type ScreenId = 'splash' | 'home' | 'ai-preferences' | 'ai-summary' | 'time-fragment'

// === 数据常量 ===

export const tagToneClassName: Record<TypeTagTone, string> = {
  brand: 'mb-type-tag--brand',
  brown: 'mb-type-tag--brown',
  sky: 'mb-type-tag--sky',
  sage: 'mb-type-tag--sage',
}

export const abilities: AbilityCardItem[] = [
  { title: '音视频解析', value: '6', unit: '次', state: '待使用', tone: 'brown' },
  { title: '时间碎片', value: '12', unit: '枚', state: '待使用', tone: 'sky' },
  { title: '频道数量', value: '2', unit: '个', state: '待创建', tone: 'sage' },
  { title: 'AI 溯源', value: '180', unit: '天', state: '有效期', tone: 'brand' },
  { title: 'Web 端内测', value: '1', unit: '个', state: '邀请好友获取', tone: 'sky' },
  { title: 'Live 图发送', value: '0', unit: '次', state: '即将上线', tone: 'sage' },
]

// === 共享布局组件 ===

export function MobileShell({
  children,
  darkStatus = false,
  className = '',
}: {
  children: ReactNode
  darkStatus?: boolean
  className?: string
}) {
  return (
    <div className={`mobile-shell ${className}`.trim()}>
      <StatusBar dark={darkStatus} />
      {children}
      <div className="mobile-shell__home-indicator" aria-hidden="true" />
    </div>
  )
}

export function StatusBar({ dark = false }: { dark?: boolean }) {
  return (
    <div className={`status-bar${dark ? ' status-bar--dark' : ''}`}>
      <div className="status-bar__time">9:41</div>
      <div className="status-bar__icons" aria-hidden="true">
        <SignalIcon />
        <WifiIcon />
        <BatteryIcon />
      </div>
    </div>
  )
}

export function TopNav({
  title,
  trailing,
  light = false,
}: {
  title: string
  trailing?: ReactNode
  light?: boolean
}) {
  return (
    <div className={`top-nav${light ? ' top-nav--light' : ''}`}>
      <button className="top-nav__back" type="button" aria-label="返回">
        <ChevronLeftIcon />
      </button>
      <div className="top-nav__title">{title}</div>
      <div className="top-nav__trailing">{trailing ?? <span className="top-nav__ghost" />}</div>
    </div>
  )
}

export function TypeTag({ tone, children }: { tone: TypeTagTone; children: ReactNode }) {
  return <div className={`mb-type-tag ${tagToneClassName[tone]}`}>{children}</div>
}

export function BrandButton({
  children,
  variant = 'primary',
  size = 'standard',
}: {
  children: ReactNode
  variant?: 'primary' | 'soft' | 'light'
  size?: 'compact' | 'standard' | 'large'
}) {
  return <button className={`mb-button mb-button--${variant} mb-button--${size}`}>{children}</button>
}

export function DateMarker({ children }: { children: ReactNode }) {
  return <div className="date-marker">{children}</div>
}

export function UserBubble({ children }: { children: ReactNode }) {
  return <div className="message-bubble message-bubble--user">{children}</div>
}

export function AiBubble({ children }: { children: ReactNode }) {
  return <div className="message-bubble message-bubble--ai">{children}</div>
}

export function AbilityCard({ item }: { item: AbilityCardItem }) {
  return (
    <button className="ability-card" type="button">
      <span className={`ability-card__bar ability-card__bar--${item.tone}`} />
      <div className={`ability-card__icon ability-card__icon--${item.tone}`}>
        <SparkIcon />
      </div>
      <div className="ability-card__title-row">
        <span className="ability-card__title">{item.title}</span>
        <ChevronRightIcon />
      </div>
      <div className="ability-card__value-line">
        <span className="ability-card__value">{item.value}</span>
        <span className="ability-card__unit">{item.unit}</span>
      </div>
      <div className="ability-card__state">{item.state}</div>
    </button>
  )
}

export function Wordmark() {
  return (
    <div className="wordmark" aria-label="MindBack">
      <span className="wordmark__dot" />
      <span className="wordmark__text">MindBack</span>
    </div>
  )
}

// === 内联 SVG 图标 ===

function SvgIcon({
  children,
  className,
  viewBox = '0 0 24 24',
}: {
  children: ReactNode
  className?: string
  viewBox?: string
}) {
  return (
    <svg className={className} viewBox={viewBox} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {children}
    </svg>
  )
}

export function ChevronLeftIcon() {
  return (
    <SvgIcon className="icon icon--nav">
      <path d="M14.5 5.5L8 12L14.5 18.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </SvgIcon>
  )
}

export function ChevronRightIcon() {
  return (
    <SvgIcon className="icon icon--small">
      <path d="M9.5 5.5L16 12L9.5 18.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </SvgIcon>
  )
}

export function DotsIcon() {
  return (
    <SvgIcon className="icon icon--small">
      <circle cx="5" cy="12" r="1.7" fill="currentColor" />
      <circle cx="12" cy="12" r="1.7" fill="currentColor" />
      <circle cx="19" cy="12" r="1.7" fill="currentColor" />
    </SvgIcon>
  )
}

export function SparkIcon() {
  return (
    <SvgIcon className="icon icon--small">
      <path d="M12 3L14.7 9.3L21 12L14.7 14.7L12 21L9.3 14.7L3 12L9.3 9.3L12 3Z" fill="currentColor" />
    </SvgIcon>
  )
}

export function PlusIcon() {
  return (
    <SvgIcon className="icon icon--small">
      <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </SvgIcon>
  )
}

export function MicIcon() {
  return (
    <SvgIcon className="icon icon--small">
      <path d="M12 15.5A3.5 3.5 0 0 0 15.5 12V7A3.5 3.5 0 1 0 8.5 7V12A3.5 3.5 0 0 0 12 15.5Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M6.5 11.5A5.5 5.5 0 0 0 17.5 11.5M12 17V20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </SvgIcon>
  )
}

export function ArrowUpIcon() {
  return (
    <SvgIcon className="icon icon--small">
      <path d="M12 17V7M12 7L8 11M12 7L16 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </SvgIcon>
  )
}

export function QuoteIcon() {
  return (
    <SvgIcon className="icon icon--small">
      <path d="M9 8H5.5L5 14H9V8ZM19 8H15.5L15 14H19V8Z" fill="currentColor" />
    </SvgIcon>
  )
}

export function InfoIcon() {
  return (
    <SvgIcon className="icon icon--tiny">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 10V16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="12" cy="7.2" r="1" fill="currentColor" />
    </SvgIcon>
  )
}

export function CloseIcon() {
  return (
    <SvgIcon className="icon icon--tiny">
      <path d="M7 7L17 17M17 7L7 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </SvgIcon>
  )
}

function SignalIcon() {
  return (
    <SvgIcon className="icon icon--status" viewBox="0 0 20 14">
      <path d="M1 12.5H3.5V10H1V12.5ZM5.25 12.5H7.75V7.5H5.25V12.5ZM9.5 12.5H12V5H9.5V12.5ZM13.75 12.5H16.25V2.5H13.75V12.5Z" fill="currentColor" />
    </SvgIcon>
  )
}

function WifiIcon() {
  return (
    <SvgIcon className="icon icon--status" viewBox="0 0 18 14">
      <path d="M1.6 5.3C6.1 1.6 11.9 1.6 16.4 5.3M4.5 8.2C7.2 6.1 10.8 6.1 13.5 8.2M7.4 11.1C8.3 10.4 9.7 10.4 10.6 11.1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </SvgIcon>
  )
}

function BatteryIcon() {
  return (
    <SvgIcon className="icon icon--battery" viewBox="0 0 28 14">
      <rect x="1" y="1.5" width="22" height="11" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <rect x="3.5" y="4" width="15" height="6" rx="2" fill="currentColor" />
      <rect x="24.5" y="4.5" width="2.5" height="5" rx="1.2" fill="currentColor" />
    </SvgIcon>
  )
}