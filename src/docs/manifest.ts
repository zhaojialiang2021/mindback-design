// 文档站资产清单 —— 单一真相源
// 增删组件/页面，先改这里再加路由配置

export type ComponentSlug =
  | 'button'
  | 'input'
  | 'card'
  | 'sheet'
  | 'empty-state'
  | 'nav-bar'
  | 'sidebar'
  | 'switch'
  | 'modal'
  | 'divider'
  | 'toast'
  | 'action-bar'
  | 'message-bubble'
  | 'slider'
  | 'tab-bar'
  | 'type-tag'

export type PageSlug =
  | 'splash'
  | 'home'
  | 'ai-preferences'
  | 'ai-summary'
  | 'time-fragment'

export type ComponentMeta = {
  slug: ComponentSlug
  name: string
  status: 'placeholder' | 'draft' | 'complete'
  /** brief §5.3 选定的 5 个深度组件，做 schema-driven 完整结构。其余 9 个保留作 backlog */
  depth?: 'deep' | 'shallow'
  filledInBatch?: 1 | 2 | 3 | null
}

export type PageMeta = {
  slug: PageSlug
  name: string
  subtitle: string
  /** 在主 App 里对应的 ScreenId */
  screenId: string
  /** 这个页面用到了哪些深度组件（活样本锚点，brief §3.2） */
  uses?: ComponentSlug[]
}

export const components: ComponentMeta[] = [
  // 5 个深度组件 —— brief §5.3
  { slug: 'button', name: 'Button', status: 'draft', depth: 'deep' },
  { slug: 'input', name: 'Input', status: 'placeholder', depth: 'deep' },
  { slug: 'card', name: 'Card', status: 'draft', depth: 'deep' },
  { slug: 'sheet', name: 'Sheet', status: 'placeholder', depth: 'deep' },
  { slug: 'empty-state', name: 'Empty State', status: 'placeholder', depth: 'deep' },
  // 其余浅组件 —— backlog
  { slug: 'nav-bar', name: 'NavBar', status: 'placeholder', depth: 'shallow' },
  { slug: 'sidebar', name: 'Sidebar', status: 'placeholder', depth: 'shallow' },
  { slug: 'switch', name: 'Switch', status: 'placeholder', depth: 'shallow' },
  { slug: 'modal', name: 'Modal', status: 'placeholder', depth: 'shallow' },
  { slug: 'divider', name: 'Divider', status: 'placeholder', depth: 'shallow' },
  { slug: 'toast', name: 'Toast', status: 'placeholder', depth: 'shallow' },
  { slug: 'action-bar', name: 'ActionBar', status: 'placeholder', depth: 'shallow' },
  { slug: 'message-bubble', name: 'MessageBubble', status: 'draft', depth: 'shallow' },
  { slug: 'slider', name: 'Slider', status: 'draft', depth: 'shallow' },
  { slug: 'tab-bar', name: 'TabBar', status: 'draft', depth: 'shallow' },
  { slug: 'type-tag', name: 'TypeTag', status: 'draft', depth: 'shallow' },
]

export const pages: PageMeta[] = [
  {
    slug: 'splash',
    name: '登录页',
    subtitle: '手机号登录入口',
    screenId: 'splash',
    uses: ['button', 'input'],
  },
  {
    slug: 'home',
    name: '首页',
    subtitle: '聊天式记忆流',
    screenId: 'home',
    uses: ['message-bubble', 'button', 'input'],
  },
  {
    slug: 'ai-preferences',
    name: '个人页',
    subtitle: '我的数据 · 主入口',
    screenId: 'ai-preferences',
    uses: ['card', 'switch', 'tab-bar'],
  },
  {
    slug: 'ai-summary',
    name: '智能总结',
    subtitle: '结构化回顾',
    screenId: 'ai-summary',
    uses: ['card', 'type-tag'],
  },
  {
    slug: 'time-fragment',
    name: '时间碎片',
    subtitle: '能力资产',
    screenId: 'time-fragment',
    uses: ['card', 'button', 'type-tag', 'modal'],
  },
]

// === Patterns（v1 四个）===
export type PatternMeta = {
  slug: 'empty' | 'loading' | 'permission' | 'error'
  name: string
  desc: string
  status: 'placeholder' | 'draft' | 'complete'
}

export const patterns: PatternMeta[] = [
  { slug: 'empty', name: '空状态', desc: '没有内容时怎么呈现 —— AI 最容易忘记的状态', status: 'placeholder' },
  { slug: 'loading', name: '加载态', desc: '骨架屏 / 加载条 / 占位 —— 决定首屏感知速度', status: 'placeholder' },
  { slug: 'permission', name: '权限态', desc: '没登录 / 没付费 / 缺权限 —— 必须留有出口', status: 'placeholder' },
  { slug: 'error', name: '错误态', desc: '网络断 / 接口挂 / 数据脏 —— 给用户能动的下一步', status: 'placeholder' },
]

// === Writing（4 篇思考）===
export type WritingMeta = {
  slug: 'manifesto' | 'when-making-is-not-scarce' | 'when-ai-takes-the-wheel' | 'how-i-fed-my-design-system-to-ai'
  title: string
  desc: string
  status: 'placeholder' | 'draft' | 'published'
}

export const writings: WritingMeta[] = [
  {
    slug: 'manifesto',
    title: '也是给 AI 设计的 Design System',
    desc: 'AI-native 设计系统的理念与方法论',
    status: 'draft',
  },
  {
    slug: 'how-i-fed-my-design-system-to-ai',
    title: '我是怎么把自己的设计系统接进 AI 的',
    desc: 'MindBack 的实操路径：从 markdown 到 schema 到 MCP',
    status: 'draft',
  },
  {
    slug: 'when-making-is-not-scarce',
    title: '当"做出来"不再稀缺',
    desc: '当 AI 让"做出来"不再昂贵，设计师真正稀缺的能力是什么',
    status: 'published',
  },
  {
    slug: 'when-ai-takes-the-wheel',
    title: '当 AI 坐进驾驶位',
    desc: '从 Copilot 到 Driving：在驾驶位上工作的四个变化和一个核心能力',
    status: 'published',
  },
]
