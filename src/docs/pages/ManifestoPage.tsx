import { Icon } from '../icons'
import { DocsHero } from '../PageHeader'

const DIFFS: { dim: string; old: string; native: string }[] = [
  { dim: '读者', old: '设计师 + 前端', native: '+ AI agent（高频、无记忆）' },
  { dim: '文档形态', old: 'Markdown 散文 + 截图', native: 'JSON / YAML 机器层 + Markdown 人读层' },
  { dim: 'Token 性质', old: '命名建议', native: '封闭契约（lint 强制）' },
  { dim: '规则形态', old: '散文描述', native: '可执行逻辑（条件 → token 覆盖）' },
  { dim: '设计师角色', old: '制作者 (maker)', native: '策展人 / 审校 (curator)' },
]

export function ManifestoPage() {
  return (
    <>
      <DocsHero
        title={
          <>
            给 AI 也设计的<em>设计系统</em>
          </>
        }
        lead="传统设计系统是「给人看的约定」，AI-native 设计系统是「给机器读的契约」。约定可以靠经验和上下文补救；契约一旦违反，AI 立即开始幻觉——这是整套工程取舍的根。"
      />

      <section className="docs-section-block">
        <h2 className="docs-section-block__heading">五个根本差异</h2>
        <p className="docs-section-block__subheading">
          AI agent 是新读者：高频、无记忆、不会读截图、不会自己脑补。设计系统的每一层都得为这个新读者重设。
        </p>
        <div className="docs-diff-table">
          <div className="docs-diff-row docs-diff-row--head">
            <div>维度</div>
            <div>传统设计系统</div>
            <div>AI-native 设计系统</div>
          </div>
          {DIFFS.map((d) => (
            <div key={d.dim} className="docs-diff-row">
              <div className="docs-diff-row__dim">{d.dim}</div>
              <div className="docs-diff-row__old">{d.old}</div>
              <div className="docs-diff-row__new">
                <Icon.Sparkles size={12} />
                <span>{d.native}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="docs-section-block">
        <h2 className="docs-section-block__heading">具体对照：destructive 按钮的颜色</h2>
        <p className="docs-section-block__subheading">
          一个例子讲清楚区别——同一个需求，传统写法 vs AI-native 写法的差距在哪。
        </p>
        <div className="docs-diff-pair">
          <div className="docs-diff-pair__col docs-diff-pair__col--bad">
            <div className="docs-diff-pair__label">传统设计系统</div>
            <pre className="docs-codeblock" style={{ marginTop: 12 }}>
              <code>{`# Button

## destructive 变体
用于删除、退出登录等不可逆动作。
颜色取自我们的 error 色系，
具体值见 Figma 主组件。`}</code>
            </pre>
            <ul className="docs-diff-pair__notes">
              <li>"error 色系"是哪个？AI 不知道</li>
              <li>"具体值见 Figma"——AI 看不到 Figma</li>
              <li>"不可逆动作"约束没法被自动检查</li>
            </ul>
          </div>
          <div className="docs-diff-pair__col docs-diff-pair__col--good">
            <div className="docs-diff-pair__label">AI-native 设计系统</div>
            <pre className="docs-codeblock" style={{ marginTop: 12 }}>
              <code>{`{
  "intent": "destructive",
  "tokens": {
    "bg": "color.accent.pink",
    "fg": "color.bg.0"
  },
  "constraints": [{
    "rule": "destructive_requires",
    "value": "irreversible_action"
  }]
}`}</code>
            </pre>
            <ul className="docs-diff-pair__notes">
              <li>token 名是封闭枚举，AI 必须命中</li>
              <li>规则是机器可读，违反 = lint 报错</li>
              <li>同样一份契约同时驱动文档站、Figma、代码生成</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="docs-section-block">
        <h2 className="docs-section-block__heading">验收标准</h2>
        <p className="docs-section-block__subheading">
          KPI 不是 PV，不是 GitHub stars。是<strong style={{ color: 'var(--label-primary)' }}>零样本 AI 生成合规率</strong>——把这套系统喂给一个未见过它的 Claude / Cursor，让它生成新页面，看产出有多少能直接用。
        </p>
        <div className="docs-stat-grid">
          <div className="docs-stat">
            <div className="docs-stat__label">合法 token 使用率</div>
            <div className="docs-stat__value">≥ 95%</div>
            <div className="docs-stat__hint">所有颜色 / 间距 / 圆角必须命中令牌名，hardcoded 字面量 lint 直接报错</div>
          </div>
          <div className="docs-stat">
            <div className="docs-stat__label">Props 命中率</div>
            <div className="docs-stat__value">100%</div>
            <div className="docs-stat__hint">组件 props 必须命中 schema enum，错一个就是错</div>
          </div>
          <div className="docs-stat">
            <div className="docs-stat__label">状态完整性</div>
            <div className="docs-stat__value">5/5</div>
            <div className="docs-stat__hint">empty / loading / disabled / error / focus 必须全覆盖，AI 最容易漏</div>
          </div>
        </div>
      </section>

      <section className="docs-section-block">
        <h2 className="docs-section-block__heading">从这里开始</h2>
        <p className="docs-section-block__subheading">
          按你的角色挑入口。
        </p>
        <div className="docs-explore__grid">
          <button
            className="docs-explore__item"
            onClick={() => (window.location.hash = '#/docs/ai-workflows')}
          >
            <div className="docs-explore__label">
              我是 AI agent
              <Icon.ChevronRight size={14} />
            </div>
            <div className="docs-explore__desc">
              拉 /skill.md 当系统提示，或接入 MCP server 实时查询
            </div>
          </button>
          <button
            className="docs-explore__item"
            onClick={() => (window.location.hash = '#/docs/foundations/color')}
          >
            <div className="docs-explore__label">
              我是设计师
              <Icon.ChevronRight size={14} />
            </div>
            <div className="docs-explore__desc">
              先看 Foundations 4 子页 + Manifesto，理解契约位在哪
            </div>
          </button>
          <button
            className="docs-explore__item"
            onClick={() => (window.location.hash = '#/docs/components/button')}
          >
            <div className="docs-explore__label">
              我是开发
              <Icon.ChevronRight size={14} />
            </div>
            <div className="docs-explore__desc">
              5 个深度组件每页都有 Copy for AI 按钮，直接复制 LLM spec 即可
            </div>
          </button>
        </div>
      </section>
    </>
  )
}
