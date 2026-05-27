import { useCallback, useEffect, useState } from 'react'

export type Locale = 'zh' | 'en'
const KEY = 'mindback-docs-locale'

function readInitial(): Locale {
  if (typeof window === 'undefined') return 'zh'
  try {
    const stored = window.localStorage.getItem(KEY)
    if (stored === 'zh' || stored === 'en') return stored
  } catch {
    /* ignore */
  }
  // 浏览器语言推断
  const lang = navigator.language?.toLowerCase() ?? ''
  if (lang.startsWith('en')) return 'en'
  return 'zh'
}

let _locale: Locale = readInitial()
const listeners = new Set<(l: Locale) => void>()

function setLocaleGlobal(l: Locale) {
  _locale = l
  try {
    window.localStorage.setItem(KEY, l)
  } catch {
    /* ignore */
  }
  document.documentElement.lang = l === 'en' ? 'en' : 'zh-CN'
  listeners.forEach((cb) => cb(l))
}

// 初始化时同步 lang 属性
if (typeof document !== 'undefined') {
  document.documentElement.lang = _locale === 'en' ? 'en' : 'zh-CN'
}

export function useLocale() {
  const [locale, setLocale] = useState<Locale>(_locale)

  useEffect(() => {
    const cb = (l: Locale) => setLocale(l)
    listeners.add(cb)
    return () => {
      listeners.delete(cb)
    }
  }, [])

  const change = useCallback((l: Locale) => {
    setLocaleGlobal(l)
  }, [])

  return { locale, setLocale: change }
}

// === 词表 ===
type Dict = Record<string, { zh: string; en: string }>

const DICT: Dict = {
  // 顶部两组（MindBack 已合并进 System）
  'area.system': { zh: '设计系统', en: 'System' },
  'area.writing': { zh: '构建的思考', en: 'Notes on Building' },

  // 入门组
  'group.start': { zh: '入门', en: 'Getting Started' },
  'nav.intro': { zh: '介绍', en: 'Introduction' },
  'nav.manifesto': { zh: '宣言', en: 'Manifesto' },

  // 基础组
  'group.foundations': { zh: '基础', en: 'Foundations' },
  'foundation.color': { zh: '颜色', en: 'Color' },
  'foundation.typography': { zh: '字体', en: 'Typography' },
  'foundation.spacing': { zh: '间距', en: 'Spacing' },
  'foundation.radius': { zh: '圆角', en: 'Radius' },
  'foundation.motion': { zh: '动效', en: 'Motion' },

  // 规则组
  'group.guidelines': { zh: '规则', en: 'Guidelines' },
  'nav.principles': { zh: '设计原则', en: 'Principles' },
  'nav.haptics': { zh: '触觉反馈', en: 'Haptics' },
  'nav.workflow': { zh: '设计工作流', en: 'Workflow' },

  // 组件 + Patterns
  'group.components': { zh: '组件', en: 'Components' },
  'group.patterns': { zh: '模式', en: 'Patterns' },
  'badge.deep': { zh: '深度', en: 'deep' },

  // 资源组
  'group.resources': { zh: '资源', en: 'Resources' },
  'nav.ai-workflows': { zh: 'AI 工作流', en: 'AI Workflows' },
  'nav.changelog': { zh: '更新日志', en: 'Changelog' },

  // 页面 base case（合并进 System）
  'group.live-samples': { zh: '页面', en: 'Live Samples' },
  'group.articles': { zh: '构建的思考', en: 'Notes on Building' },

  // Theme + locale 切换
  'theme.system': { zh: '系统', en: 'System' },
  'theme.light': { zh: '浅色', en: 'Light' },
  'theme.dark': { zh: '深色', en: 'Dark' },
  'theme.label': { zh: '主题', en: 'Theme' },
  'locale.label': { zh: '语言', en: 'Language' },
  'locale.zh': { zh: '中', en: '中' },
  'locale.en': { zh: 'EN', en: 'EN' },

  // CMDK
  'cmdk.search': { zh: '搜索', en: 'Search' },
  'cmdk.placeholder': {
    zh: '搜索页面、组件、思考…',
    en: 'Search pages, components, notes…',
  },
  'cmdk.empty': { zh: '没有匹配项', en: 'No matches' },
  'cmdk.move': { zh: '移动', en: 'navigate' },
  'cmdk.go': { zh: '跳转', en: 'open' },
  'cmdk.invoke': { zh: '唤起', en: 'invoke' },

  // SoonPage 通用
  'soon.tba': { zh: '内容稍后到位。', en: 'Content coming soon.' },

  // CMDK 底栏
  'cmdk.kbd.move': { zh: '移动', en: 'navigate' },
  'cmdk.kbd.go': { zh: '跳转', en: 'open' },
  'cmdk.kbd.invoke': { zh: '唤起', en: 'invoke' },
  'cmdk.recent': { zh: '最近访问', en: 'Recent' },

  // ComponentPage 各 section 标题
  'component.live-demo': { zh: 'Live Demo', en: 'Live Demo' },
  'component.live-demo.lead': {
    zh: '可调 props 实时预览。所有数值来自 tokens / schema，不可硬编码。',
    en: 'Live preview with adjustable props. All values come from tokens / schema; no hardcoding allowed.',
  },
  'component.props': { zh: 'Props', en: 'Props' },
  'component.props.lead': {
    zh: '所有 prop 都是封闭枚举，AI 必须从 values 中选择。',
    en: 'All props are closed enums; AI must pick from listed values.',
  },
  'component.states': { zh: 'States', en: 'States' },
  'component.states.lead': {
    zh: '完整状态矩阵 —— 渲染时必须每个状态都有定义，否则 AI 会瞎补。',
    en: 'Full state matrix. Every state must be explicitly defined; otherwise the AI will improvise.',
  },
  'component.anatomy': { zh: 'Anatomy', en: 'Anatomy' },
  'component.anatomy.lead': {
    zh: '每个组成部分用什么 token、约束在哪。SVG 图解中的标号对应下表 part。',
    en: 'Which token each part uses and its constraint. Numbers in the SVG match the table below.',
  },
  'component.constraints': { zh: 'Constraints', en: 'Constraints' },
  'component.constraints.lead': {
    zh: 'AI 生成时违反这些约束 = 幻觉。可被 lint 抓出来。',
    en: 'Violating these constraints during AI generation = hallucination. Caught by lint.',
  },
  'component.do-dont': { zh: "Do / Don't", en: "Do / Don't" },
  'component.do': { zh: 'Do', en: 'Do' },
  'component.dont': { zh: "Don't", en: "Don't" },
  'component.copy-ai': { zh: 'Copy for AI', en: 'Copy for AI' },
  'component.copy-schema': { zh: 'Schema JSON', en: 'Schema JSON' },
  'component.deep-tag': { zh: '深度组件', en: 'deep' },

  // 内容文案 - 通用
  'common.copied': { zh: '已复制', en: 'Copied' },
  'common.copy-failed': { zh: '复制失败', en: 'Copy failed' },
  'a11y.skip': { zh: '跳到主内容', en: 'Skip to content' },

  // 页脚 prev / next
  'footer.prev': { zh: '上一页', en: 'Previous' },
  'footer.next': { zh: '下一页', en: 'Next' },

  // AI Workflows 页 UI 文案
  'aiw.title': {
    zh: '把这套设计系统接进 AI',
    en: 'Plug this design system into your AI',
  },
  'aiw.lead': {
    zh: '三种接入路径：HTTP 端点 / Skill 包 / MCP server。目标是让任何 AI agent 拿到 MindBack 的契约后，零样本生成的合规率 ≥ 80%。',
    en: 'Three integration paths: HTTP endpoints, Skill bundle, MCP server. The goal: any AI agent that has the MindBack contract reaches ≥ 80% zero-shot compliance.',
  },
  'aiw.step.title': {
    zh: '三步接入 Cursor / Claude Code',
    en: 'Three steps to plug into Cursor / Claude Code',
  },
  'aiw.step.lead': {
    zh: '最快路径：拉一份 skill.md 当系统提示。所有 token 和 component 契约都在这一份文件里。',
    en: 'Fastest path: pull skill.md and use it as the system prompt. All tokens and component contracts live in that single file.',
  },
  'aiw.step1.title': { zh: '拉取 Skill 包', en: 'Fetch the Skill bundle' },
  'aiw.step2.title': { zh: '粘进系统提示', en: 'Paste into system prompt' },
  'aiw.step2.body.before': { zh: '把 skill.md 内容塞到 Cursor 的 ', en: 'Paste skill.md into Cursor ' },
  'aiw.step2.body.middle': {
    zh: ' 或 Claude Code 的 ',
    en: ' or Claude Code ',
  },
  'aiw.step2.body.after': {
    zh: '，AI 看到的所有生成都会被这套契约约束。',
    en: '; everything the AI generates afterwards is bound by this contract.',
  },
  'aiw.step3.title': { zh: '写需求 + 跑 lint', en: 'Write the spec + run lint' },
  'aiw.step3.body.before': {
    zh: '正常向 AI 描述需求即可。生成完跑 ',
    en: 'Describe the spec to the AI as usual. After generation run ',
  },
  'aiw.step3.body.after': {
    zh: '，0 违规才算合格。',
    en: '. Zero violations = pass.',
  },
  'aiw.endpoints.title': { zh: 'HTTP 端点', en: 'HTTP Endpoints' },
  'aiw.endpoints.lead': {
    zh: '构建产物直接 expose 为 HTTP 路由。任何 fetch / curl 都能拉到当前最新契约，无需 clone 仓库。',
    en: 'Build artifacts are exposed as HTTP routes. Any fetch / curl returns the current contract — no need to clone the repo.',
  },
  'aiw.endpoints.col.method': { zh: 'Method', en: 'Method' },
  'aiw.endpoints.col.path': { zh: 'Path', en: 'Path' },
  'aiw.endpoints.col.desc': { zh: '说明', en: 'Description' },
  'aiw.mcp.title': { zh: 'MCP Server', en: 'MCP Server' },
  'aiw.mcp.lead': {
    zh: '让 AI 在生成过程中实时查询：「Button 的 destructive intent 用什么 token？」「space.4 是多少？」而不是把全量契约塞进上下文。',
    en: 'Let the AI query at generation time — "Which token does the destructive intent use?" "What\'s space.4?" — instead of stuffing the full contract into context.',
  },
  'aiw.mcp.tools-title': { zh: '5 个工具', en: '5 tools' },
  'aiw.mcp.config-title': { zh: 'Cursor / Claude Code 配置', en: 'Cursor / Claude Code config' },
  'aiw.prompts.title': { zh: 'Prompt 示例库', en: 'Prompt Library' },
  'aiw.prompts.lead': {
    zh: '点击复制 prompt 直接粘到 Cursor / Claude。所有 prompt 都已包含「用令牌名、不许 hardcode」的约束。',
    en: 'Copy a prompt and paste it into Cursor / Claude. Every prompt already contains the "use token names, no hardcoding" constraint.',
  },

  // 404
  'nf.eyebrow': { zh: '404 · 没找到', en: '404 · Not Found' },
  'nf.title': { zh: '没找到这一页', en: 'Page not found' },
  'nf.lead.before': { zh: '路径 ', en: 'The path ' },
  'nf.lead.after': {
    zh: ' 不在路由表里。可能是链接拼错了，或者这个页面已经被移除。',
    en: ' is not in the route table. The link may be mistyped, or the page has been removed.',
  },
  'nf.back': { zh: '回首页', en: 'Home' },
  'nf.explore': { zh: '逛逛深度组件', en: 'Browse components' },
  'nf.suggestions': { zh: '你可能想找的', en: 'You might be looking for' },
}

export function t(key: keyof typeof DICT, locale?: Locale): string {
  const entry = DICT[key]
  if (!entry) return String(key)
  return entry[locale ?? _locale] ?? entry.zh
}

/** 在 hook 内拿 t 函数，自动跟随当前 locale */
export function useT() {
  const { locale } = useLocale()
  return useCallback((key: keyof typeof DICT) => t(key, locale), [locale])
}
