import { useState } from 'react'
import { useToast } from '../useToast'
import { Icon } from '../icons'
import { useT } from '../useLocale'
import { DocsPageHeader } from '../PageHeader'

const ENDPOINTS: { method: string; path: string; desc: string }[] = [
  { method: 'GET', path: '/skill.md', desc: '一站式 Skill 包：design + components + 使用约定（推荐 AI 直接拉这个）' },
  { method: 'GET', path: '/design.md', desc: 'Token 紧凑 markdown' },
  { method: 'GET', path: '/tokens.json', desc: '扁平 token 列表（含 dark 模式覆盖）' },
  { method: 'GET', path: '/components.md', desc: '5 个深度组件契约 markdown' },
  { method: 'GET', path: '/components.json', desc: '组件契约 JSON' },
  { method: 'GET', path: '/llms.txt', desc: '站点入口索引（给 AI agent 当 robots.txt 用）' },
]

const PROMPTS: { title: string; body: string }[] = [
  {
    title: '生成一个登录页',
    body: `参考 https://docs.mindback.com/skill.md 的设计契约，给 MindBack 生成一个登录页：
- 顶部品牌区（logo + 一句标语）
- 邮箱输入 + 密码输入（用 Input 组件 schema，状态完整覆盖 empty/focus/error/disabled）
- 主 CTA（Button variant=filled, size=large, fullWidth=true）
- 次要操作"忘记密码"（Button variant=ghost, size=medium）
- 加载中 / 错误反馈用 Empty State kind=error
要求所有颜色、间距、字号、圆角必须用令牌名，禁止 hardcoded hex/px。`,
  },
  {
    title: '做一个文件上传组件',
    body: `按 MindBack 设计系统做一个文件上传组件，状态完整：
- empty：拖拽提示 + 点击选择
- loading：进度条 + 取消按钮
- error：错误信息 + 重试按钮
- success：文件名 + 移除按钮
不能漏任何状态。所有 token 必须命中 https://docs.mindback.com/tokens.json。`,
  },
  {
    title: '做一个删除确认弹窗',
    body: `按 MindBack 契约做一个删除确认弹窗：
- 用 Modal（不是 Sheet —— 删除是不可逆操作，必须强制选择）
- 主 CTA "删除" variant=filled, size=large
- 次 CTA "取消" variant=neutral, size=large
- 配 light haptic
所有间距用 var(--space-N)。`,
  },
  {
    title: '检查我的代码是否合规',
    body: `检查这段代码是否符合 MindBack 设计系统：
1. 所有颜色是否引用 var(--<token-name>)
2. 所有间距是否引用 var(--space-N)
3. 圆角是否在 5 级枚举内
4. 组件 props 是否命中 schema values
5. 状态是否完整（特别是 empty / error / loading）

[贴你的代码]`,
  },
]

export function AIWorkflowsPage() {
  const t = useT()
  const { show, node: toastNode } = useToast()

  function copy(text: string) {
    navigator.clipboard.writeText(text).then(
      () => show(t('common.copied')),
      () => show(t('common.copy-failed')),
    )
  }

  return (
    <>
      <DocsPageHeader title={t('aiw.title')} subtitle={t('aiw.lead')} />

      <SectionThreeStep onCopy={copy} />
      <SectionEndpoints onCopy={copy} />
      <SectionMcp onCopy={copy} />
      <SectionPromptLibrary onCopy={copy} />

      {toastNode}
    </>
  )
}

function SectionThreeStep({ onCopy }: { onCopy: (s: string) => void }) {
  const t = useT()
  const cmd = `curl https://docs.mindback.com/skill.md`
  return (
    <section className="docs-section-block">
      <h2 className="docs-section-block__heading">{t('aiw.step.title')}</h2>
      <p className="docs-section-block__subheading">{t('aiw.step.lead')}</p>

      <ol className="docs-step-list">
        <li>
          <div className="docs-step__main">
            <div className="docs-step__title">{t('aiw.step1.title')}</div>
            <div className="docs-step__body">
              <pre className="docs-codeblock">
                <code>{cmd}</code>
                <button className="docs-codeblock__copy" onClick={() => onCopy(cmd)}>
                  <Icon.Copy size={13} />
                </button>
              </pre>
            </div>
          </div>
        </li>
        <li>
          <div className="docs-step__main">
            <div className="docs-step__title">{t('aiw.step2.title')}</div>
            <div className="docs-step__body">
              {t('aiw.step2.body.before')}
              <code>.cursorrules</code>
              {t('aiw.step2.body.middle')}
              <code>CLAUDE.md</code>
              {t('aiw.step2.body.after')}
            </div>
          </div>
        </li>
        <li>
          <div className="docs-step__main">
            <div className="docs-step__title">{t('aiw.step3.title')}</div>
            <div className="docs-step__body">
              {t('aiw.step3.body.before')}
              <code>npm run lint:tokens</code>
              {t('aiw.step3.body.after')}
            </div>
          </div>
        </li>
      </ol>
    </section>
  )
}

function SectionEndpoints({ onCopy }: { onCopy: (s: string) => void }) {
  const t = useT()
  return (
    <section className="docs-section-block">
      <h2 className="docs-section-block__heading">{t('aiw.endpoints.title')}</h2>
      <p className="docs-section-block__subheading">{t('aiw.endpoints.lead')}</p>
      <div className="docs-card" style={{ padding: 0 }}>
        <table className="docs-table">
          <thead>
            <tr>
              <th>{t('aiw.endpoints.col.method')}</th>
              <th>{t('aiw.endpoints.col.path')}</th>
              <th>{t('aiw.endpoints.col.desc')}</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {ENDPOINTS.map((e) => (
              <tr key={e.path}>
                <td>
                  <code>{e.method}</code>
                </td>
                <td>
                  <code>{e.path}</code>
                </td>
                <td style={{ color: 'var(--label-secondary)' }}>{e.desc}</td>
                <td>
                  <button
                    className="docs-copy-btn docs-copy-btn--small"
                    onClick={() => onCopy(`curl ${location.origin}${e.path}`)}
                  >
                    <Icon.Copy size={11} /> curl
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

function SectionMcp({ onCopy }: { onCopy: (s: string) => void }) {
  const t = useT()
  const config = `{
  "mcpServers": {
    "mindback-design": {
      "command": "node",
      "args": ["./mcp/server.mjs"]
    }
  }
}`
  return (
    <section className="docs-section-block">
      <h2 className="docs-section-block__heading">{t('aiw.mcp.title')}</h2>
      <p className="docs-section-block__subheading">{t('aiw.mcp.lead')}</p>

      <div className="docs-card" style={{ marginBottom: 16 }}>
        <div className="docs-card__title">{t('aiw.mcp.tools-title')}</div>
        <ul className="docs-text--subhead docs-text--secondary" style={{ margin: 0, paddingLeft: 'var(--space-5)', lineHeight: 1.75 }}>
          <li>
            <code>list_tokens</code> · 列出全部令牌（可按 category 过滤）
          </li>
          <li>
            <code>get_token</code> · 根据令牌名取详情（含 dark 模式覆盖）
          </li>
          <li>
            <code>list_components</code> · 列出 5 个深度组件简表
          </li>
          <li>
            <code>get_component</code> · 取组件完整契约
          </li>
          <li>
            <code>get_skill</code> · 拉一站式 Skill markdown
          </li>
        </ul>
      </div>

      <div className="docs-card">
        <div className="docs-card__title">{t('aiw.mcp.config-title')}</div>
        <pre className="docs-codeblock">
          <code>{config}</code>
          <button className="docs-codeblock__copy" onClick={() => onCopy(config)}>
            <Icon.Copy size={13} />
          </button>
        </pre>
      </div>
    </section>
  )
}

function SectionPromptLibrary({ onCopy }: { onCopy: (s: string) => void }) {
  const t = useT()
  const [active, setActive] = useState(0)
  return (
    <section className="docs-section-block">
      <h2 className="docs-section-block__heading">{t('aiw.prompts.title')}</h2>
      <p className="docs-section-block__subheading">{t('aiw.prompts.lead')}</p>
      <div className="docs-prompt-tabs">
        {PROMPTS.map((p, i) => (
          <button
            key={i}
            className={`docs-prompt-tab ${i === active ? 'is-active' : ''}`}
            onClick={() => setActive(i)}
          >
            {p.title}
          </button>
        ))}
      </div>
      <div className="docs-card">
        <pre className="docs-codeblock docs-codeblock--prompt">
          <code>{PROMPTS[active].body}</code>
          <button
            className="docs-codeblock__copy"
            onClick={() => onCopy(PROMPTS[active].body)}
          >
            <Icon.Copy size={13} /> Copy
          </button>
        </pre>
      </div>
    </section>
  )
}
