import { components, pages } from '../manifest'
import { navigate } from '../router'
import { Icon } from '../icons'
import { DocsHero } from '../PageHeader'

/**
 * DocsHome —— MindBack 设计系统门面页。
 * 讲清楚：这套设计系统是什么、由什么构成、几条根本原则，
 * 再把读者引到各个子页（令牌 / 原则 / 组件 / 页面 / 工作流）。
 */
export function DocsHome() {
  return (
    <>
      <DocsHero
        title={
          <>
            一套<em>文档驱动</em>的设计系统
          </>
        }
        lead="这里是 MindBack App 的设计真相源。令牌、原则、组件、页面统一用 markdown 文档定义，画板做视觉验证，agent 按文档执行。设计师写规则、agent 写画板、开发取参数——三方共用一套语言。"
        meta={
          <>
            <span>iOS · 聊天式记忆助手</span>
            <span className="docs-hero__dot" />
            <span>{components.length} 个组件 · {pages.length} 个页面</span>
            <span className="docs-hero__dot" />
            <span>v1 · 2026</span>
          </>
        }
      />

      <section className="docs-section-block">
        <h2 className="docs-section-block__heading">这套系统由什么构成</h2>
        <p className="docs-section-block__subheading">
          四层结构：底层是不可拆分的原子，往上每一层都用下面的层组合而来。
        </p>
        <div className="docs-problem-grid">
          <div className="docs-problem">
            <div className="docs-problem__num">令牌 Tokens</div>
            <p className="docs-problem__text">
              颜色、字号、间距、圆角、动效。所有视觉决策的最小单位，禁止硬编码。改一个令牌，全站跟随变化。
            </p>
          </div>
          <div className="docs-problem">
            <div className="docs-problem__num">原则 Principles</div>
            <p className="docs-problem__text">
              12 条视觉与交互规则，每条都附「为什么」。组件和页面遇到取舍时，回这里查规则——不是听某个人的偏好。
            </p>
          </div>
          <div className="docs-problem">
            <div className="docs-problem__num">组件 Components</div>
            <p className="docs-problem__text">
              {components.length} 个 UI 单元，规格 + 多状态 + 实时预览。每个组件文档同时是设计稿和开发规约。
            </p>
          </div>
          <div className="docs-problem">
            <div className="docs-problem__num">页面 Pages</div>
            <p className="docs-problem__text">
              {pages.length} 个 base case 页面，多设备宽度切换。展示组件如何被组合、信息架构如何落地。
            </p>
          </div>
        </div>
      </section>

      <section className="docs-section-block">
        <h2 className="docs-section-block__heading">三条根本原则</h2>
        <p className="docs-section-block__subheading">
          这套设计系统的所有决策都从这三条推导。它们决定了为什么 MindBack 的视觉是这个样子。
        </p>

        <Principle
          num="01"
          title="文档是真相源"
          rule="规格写在 markdown 文档里。Figma、Paper 画板、源代码都是文档的下游产物，不是反过来。改规格先改文档，再生成画板和代码。"
          why="设计稿和代码各自演化，半年后没人知道哪个是对的——这是大多数设计系统失败的原因。把真相绑定到一个可读、可 diff、可被 agent 执行的载体上，三方才能持续对齐。"
        />
        <Principle
          num="02"
          title="令牌优先于具体值"
          rule="所有颜色、字号、间距、圆角、动效都从令牌表取值。组件文档和代码里禁止出现 hex、px 字面量。"
          why="令牌是设计意图的命名（label-primary、space-3、radius-2），不是数值。命名让一致性可追溯——看到两个地方都叫 label-primary，就知道它们注定一样深。直接写 #212121 时，一致性是巧合。"
        />
        <Principle
          num="03"
          title="agent 与人各司其职"
          rule="数值合规、引用完整性、多宽度适配——agent 自己判。视觉氛围、情感弧线、两个接近选项哪个更好——人判。"
          why="agent 擅长执行规则但不擅长审美裁定，人擅长审美裁定但不擅长重复执行。把可被规则化的工作交给 agent（让它批量做、不出错），把需要主观经验的部分留给人（让人不被低层细节淹没）。"
        />
      </section>

      <section className="docs-section-block">
        <h2 className="docs-section-block__heading">从哪里开始</h2>
        <p className="docs-section-block__subheading">
          按你想做的事挑一个入口。每个页面都是独立可读的，不必从头看到尾。
        </p>
        <div className="docs-explore__grid">
          <ExploreLink
            label="设计工作流"
            desc="协作管线 · skill 路由 · 状态机"
            onClick={() => navigate('/docs/workflow')}
          />
          <ExploreLink
            label="设计令牌"
            desc="颜色 · 字号 · 间距 · 圆角 · 动效"
            onClick={() => navigate('/docs/tokens')}
          />
          <ExploreLink
            label="设计原则"
            desc="12 条规则 + 视觉气质的根"
            onClick={() => navigate('/docs/principles')}
          />
          <ExploreLink
            label={`组件库 · ${components.length}`}
            desc="规格 + 实时预览 + 状态机"
            onClick={() => navigate(`/docs/components/${components[0].slug}`)}
          />
          <ExploreLink
            label={`页面 base case · ${pages.length}`}
            desc="多设备宽度切换、可分享链接"
            onClick={() => navigate(`/docs/pages/${pages[0].slug}`)}
          />
          <ExploreLink
            label="触觉反馈"
            desc="5 级意图，可在手机上预览波形"
            onClick={() => navigate('/docs/haptics')}
          />
          <ExploreLink
            label="项目汇报 PPT"
            desc="设计系统卖点演示，键盘翻页"
            onClick={() => navigate('/docs/pitch')}
          />
        </div>
      </section>
    </>
  )
}

function Principle({
  num,
  title,
  rule,
  why,
}: {
  num: string
  title: string
  rule: string
  why: string
}) {
  return (
    <div className="docs-principle">
      <div className="docs-principle__num">{num}</div>
      <div className="docs-principle__body">
        <h3 className="docs-principle__title">{title}</h3>
        <p className="docs-principle__text">{rule}</p>
        <blockquote className="docs-principle__why">{why}</blockquote>
      </div>
    </div>
  )
}

function ExploreLink({
  label,
  desc,
  onClick,
}: {
  label: string
  desc: string
  onClick: () => void
}) {
  return (
    <button className="docs-explore__item" onClick={onClick}>
      <div className="docs-explore__label">
        {label}
        <Icon.ChevronRight size={14} />
      </div>
      <div className="docs-explore__desc">{desc}</div>
    </button>
  )
}
