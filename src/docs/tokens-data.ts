// 基于 design-tokens.md 的展示分组与用途说明
// 实际值通过 getComputedStyle 从 :root 读取，保持单一真相

export type TokenGroup = {
  title: string
  desc?: string
  tokens: TokenItem[]
}

export type TokenItem = {
  /** CSS 变量名（含 --） */
  name: string
  /** 用途说明 */
  usage: string
}

export const colorGroups: TokenGroup[] = [
  {
    title: 'Label · 文本',
    tokens: [
      { name: '--label-primary', usage: '标题、正文主文本' },
      { name: '--label-secondary', usage: '辅助说明、副标题' },
      { name: '--label-tertiary', usage: '占位符、禁用态' },
      { name: '--label-quaternary', usage: '极弱提示、水印' },
    ],
  },
  {
    title: 'Background · 背景',
    tokens: [
      { name: '--bg-0', usage: '卡片、弹窗、输入框' },
      { name: '--bg-1', usage: '页面底色' },
      { name: '--bg-2', usage: '导航选中态' },
      { name: '--bg-3', usage: '底部安全区' },
      { name: '--bg-4', usage: '极深层级' },
    ],
  },
  {
    title: 'Fill · 填充',
    tokens: [
      { name: '--fill-primary', usage: '开关关闭态、滑块轨道' },
      { name: '--fill-secondary', usage: '进度条底色' },
      { name: '--fill-tertiary', usage: '占位图底色' },
      { name: '--fill-quaternary', usage: '极弱填充' },
    ],
  },
  {
    title: 'Line · 线条',
    tokens: [
      { name: '--line-opaque', usage: '强分割（约 10% 场景）' },
      { name: '--line-non-opaque', usage: '默认分割（约 90% 场景）' },
    ],
  },
  {
    title: 'Brand / Accent',
    tokens: [
      { name: '--brand-blue', usage: '品牌蓝，只做点缀' },
      { name: '--brand-blue-light', usage: 'AI 回应气泡背景' },
      { name: '--brand-blue-text', usage: 'AI 回应文本色' },
      { name: '--accent-yellow', usage: '待办标签' },
      { name: '--accent-green', usage: '日记标签' },
      { name: '--accent-pink', usage: '持续月录标签' },
      { name: '--accent-brown', usage: '文件标签' },
      { name: '--accent-event-blue', usage: '事件追踪标签' },
      { name: '--link', usage: '可点击链接' },
    ],
  },
  {
    title: 'Decorative · 装饰',
    desc: '只用于功能图标底色（32×32px 圆角方块）',
    tokens: [
      { name: '--deco-teal', usage: 'Live 图' },
      { name: '--deco-sky', usage: 'Web 端 / 时间碎片' },
      { name: '--deco-lavender', usage: 'AI 溯源' },
      { name: '--deco-sage', usage: '频道数量' },
      { name: '--deco-rose', usage: '音视频解析' },
    ],
  },
]

export const spacingTokens: TokenItem[] = [
  { name: '--space-1', usage: '4px · 微调' },
  { name: '--space-2', usage: '8px · 紧凑' },
  { name: '--space-3', usage: '12px · 标准小' },
  { name: '--space-4', usage: '16px · 标准（最常用）' },
  { name: '--space-5', usage: '20px · 标准大' },
  { name: '--space-6', usage: '24px · 段间距' },
  { name: '--space-7', usage: '32px · 区块间距' },
  { name: '--space-8', usage: '40px · 大区块' },
  { name: '--space-9', usage: '48px · 极大' },
  { name: '--space-10', usage: '64px · 极大（章节）' },
]

export const radiusTokens: TokenItem[] = [
  { name: '--radius-small', usage: '6px · code 标签' },
  { name: '--radius-medium', usage: '8px · 输入框' },
  { name: '--radius-large', usage: '12px · 卡片紧凑' },
  { name: '--radius-x-large', usage: '20px · 卡片容器、Modal' },
  { name: '--radius-full', usage: '胶囊 · Switch / Toast' },
]

export const motionTokens: TokenItem[] = [
  { name: '--duration-fast', usage: '150ms · 状态切换' },
  { name: '--duration-normal', usage: '250ms · 模态进出' },
  { name: '--duration-slow', usage: '350ms · 大幅位移' },
  { name: '--curve-default', usage: '默认缓动' },
  { name: '--curve-spring', usage: '弹性' },
  { name: '--curve-ease-out', usage: '减速进入' },
]

export type TypographyItem = {
  name: string
  size: string
  weight: string
  lineHeight: string
  usage: string
}

export const typographyTokens: TypographyItem[] = [
  { name: 'Headline-H1', size: '32px', weight: '500', lineHeight: '1.2', usage: '页面标题' },
  { name: 'Headline-H2', size: '24px', weight: '500', lineHeight: '1.3', usage: '区块标题' },
  { name: 'Headline-H3', size: '20px', weight: '500', lineHeight: '1.35', usage: 'NavBar 标题' },
  { name: 'Body-Primary', size: '17px', weight: '400', lineHeight: '1.5', usage: '正文主文' },
  { name: 'Body-Secondary', size: '15px', weight: '400', lineHeight: '1.45', usage: '正文次文' },
  { name: 'Callout', size: '16px', weight: '500', lineHeight: '1.4', usage: '强调文本' },
  { name: 'Subhead', size: '14px', weight: '400', lineHeight: '1.4', usage: '副标题' },
  { name: 'Footnote', size: '13px', weight: '400', lineHeight: '1.38', usage: '脚注' },
  { name: 'Caption-1', size: '12px', weight: '400', lineHeight: '1.3', usage: '说明、分组标题' },
  { name: 'Caption-2', size: '11px', weight: '400', lineHeight: '1.2', usage: '极小说明' },
]
