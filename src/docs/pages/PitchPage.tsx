import { useState, useEffect, useCallback } from 'react'

const slides = [
  {
    title: 'MindBack 设计系统',
    subtitle: '当画板不再是终点，而是起点',
    tagline: '一套让设计师回到设计师岗位的设计系统',
  },
  {
    title: '设计到开发的链路，断在三处',
    lines: [
      '1. 设计稿改了，代码不知道。开发对着旧图写，上线的和设计不一样。',
      '2. 代码改了，设计稿不知道。技术债在代码里，Figma 看起来还是干净的。',
      '3. 一句话的需求，设计先画半天像素。反复调间距、调颜色、重导出。',
    ],
    conclusion: '结果：设计师变成画图工，开发变成翻译机。两周迭代，六周才出得去。',
  },
  {
    title: '核心洞察',
    leadline: '设计系统不是 UI Kit，不是组件库。',
    leadline2: '设计系统是一份「机器可读的契约」。',
    lines: [
      '人在设计系统里看到：按钮长什么样、间距多少、颜色是什么。',
      'AI 在设计系统里读到：props 只能从枚举中选、states 必须全覆盖、constraints 不能违反。',
      '违反 = 幻觉。必须拦在生成这一步。',
    ],
    conclusion: '设计师的工作从「画图」变成「定义规则」。',
  },
  {
    title: '系统架构',
    items: [
      { label: '令牌层', desc: '68 个 W3C DTCG 设计令牌 → 自动生成 CSS 变量 + JSON。亮暗双模式一站式。' },
      { label: '组件层', desc: '16 个组件契约 (JSON Schema) → AI 生成时 props 不能越界。' },
      { label: '页面层', desc: 'Markdown 页面规格 → 直接渲染 React 组件。同一份代码，预览即生产。' },
      { label: 'AI 端点', desc: '/skill.md curl 给任何 AI agent 当系统提示。/tokens.json 实时查询令牌值。' },
    ],
  },
  {
    title: '卖点① 去画板',
    leadline: '画板不再是「终点」，而是「起点」',
    lines: [
      '旧流程：Figma 画板 → 标注 → 开发对图 → 手工实现 → 视觉质检 → 修像素 → 上线。',
      '新流程：Figma 探索方向 → 参数写入 tokens.json → 脚本生成整个站 → 刷新浏览器，所有页面更新。',
    ],
    conclusion: 'Figma 画完方向即可丢弃。一个 token 改动，60 秒内所有页面自动更新。',
  },
  {
    title: '卖点② AI 吃设计系统',
    leadline: '不是「让 AI 帮忙画 UI」，而是「让 AI 遵守设计规则」',
    lines: [
      'curl https://docs.mindback.com/skill.md → 粘到 Cursor / Claude 系统提示',
      '→ AI 当场知道 68 个 token、16 个组件方案、5 个页面规格',
      '→ 生成代码引用 var(--token)，props 不越界，状态全覆盖',
    ],
    conclusion: '零样本合规率 ≥ 80%。生成完跑 npm run lint:tokens，违规自动报。',
  },
  {
    title: '卖点③ 一个链接，三种视角',
    leadline: '同一个 URL，既是预览，也是规格，也是开发 API。',
    items: [
      { label: '产品经理', desc: '浏览器打开 → 可交互的高保真页面。不装 Figma、不等加载。' },
      { label: '设计师', desc: '改 Markdown 规格 → 刷新看效果。像素是代码保证的，不对图。' },
      { label: '开发', desc: 'F12 看 var(--token-name)。curl /skill.md → AI 当场写组件。' },
    ],
  },
  {
    title: '和市面上的设计系统，差在哪',
    sections: [
      {
        heading: 'Ant Design / Material / Shadcn',
        lines: [
          '给人看的文档 + 给人用的代码库。设计师和开发仍然是两个角色、两套动作。',
          'Token → Storybook → 对齐 → 差异 → 返工。所谓同步只是手动流程的自动化包装。',
        ],
      },
      {
        heading: 'MindBack',
        lines: [
          '给机器读的契约。Token 是唯一真相源。组件 = JSON Schema（枚举 + 状态 + 约束）。',
          '画板 = 生成的 HTML。不存在同步问题，因为不存在两份需要同步的东西。',
        ],
      },
    ],
  },
  {
    title: '下一步',
    lines: [
      '① 补全 16 个组件 schema → 让 AI 能完整生成所有组件',
      '② 页面生成脚本 → Markdown spec 自动拼装成 React 组件',
      '③ 接入 CI → token 改动自动重新生成全站，画板可以从 Figma 删掉',
      '④ MCP 对外开放 → 任何 AI agent 都能实时读取设计契约',
    ],
    conclusion: '不必一次做完。每走一步，设计师少一点低价值操作，多一点真正做设计的空间。',
  },
]

type SlideData = (typeof slides)[number]

export function PitchPage() {
  const [index, setIndex] = useState(0)
  const total = slides.length

  const next = useCallback(() => setIndex((i) => Math.min(i + 1, total - 1)), [total])
  const prev = useCallback(() => setIndex((i) => Math.max(i - 1, 0)), [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next()
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev])

  // 切换 slide 时更新 page title
  useEffect(() => {
    document.title = `MindBack 设计系统 · 汇报`
  }, [])

  // 汇报模式下隐藏文档壳侧栏和顶栏
  useEffect(() => {
    document.body.classList.add('pitch-mode')
    return () => document.body.classList.remove('pitch-mode')
  }, [])

  return (
    <div className="pitch">
      <SlideContent data={slides[index]} />
      <div className="pitch__nav">
        <button className="pitch__arrow" onClick={prev} disabled={index === 0} aria-label="上一页">
          ←
        </button>
        <span className="pitch__indicator">
          {index + 1} / {total}
        </span>
        <button className="pitch__arrow" onClick={next} disabled={index === total - 1} aria-label="下一页">
          →
        </button>
      </div>
      <div className="pitch__dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`pitch__dot${i === index ? ' pitch__dot--active' : ''}`}
            onClick={() => setIndex(i)}
            aria-label={`第 ${i + 1} 页`}
          />
        ))}
      </div>
    </div>
  )
}

function SlideContent({ data }: { data: SlideData }) {
  return (
    <div className="pitch-slide">
      <h1 className="pitch-slide__title">{data.title}</h1>

      {'subtitle' in data && data.subtitle && (
        <p className="pitch-slide__subtitle">{data.subtitle}</p>
      )}
      {'tagline' in data && data.tagline && (
        <p className="pitch-slide__tagline">{data.tagline}</p>
      )}
      {'leadline' in data && data.leadline && (
        <p className="pitch-slide__lead">{data.leadline}</p>
      )}
      {'leadline2' in data && data.leadline2 && (
        <p className="pitch-slide__lead">{data.leadline2}</p>
      )}

      {'lines' in data && data.lines && (
        <div className="pitch-slide__lines">
          {data.lines.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      )}

      {'items' in data && data.items && (
        <div className="pitch-slide__items">
          {data.items.map((item, i) => (
            <div key={i} className="pitch-slide__item">
              <span className="pitch-slide__item-label">{item.label}</span>
              <span className="pitch-slide__item-desc">{item.desc}</span>
            </div>
          ))}
        </div>
      )}

      {'sections' in data && data.sections && (
        <div className="pitch-slide__sections">
          {data.sections.map((sec, i) => (
            <div key={i} className="pitch-slide__section">
              <h3>{sec.heading}</h3>
              {sec.lines.map((line, j) => (
                <p key={j}>{line}</p>
              ))}
            </div>
          ))}
        </div>
      )}

      {'conclusion' in data && data.conclusion && (
        <p className="pitch-slide__conclusion">{data.conclusion}</p>
      )}
    </div>
  )
}