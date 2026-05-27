import { type ReactNode } from 'react'
import { DocsPageHeader } from '../PageHeader'

type ReleaseEntry = {
  version: string
  date: string
  tag: 'alpha' | 'beta' | 'release'
  summary: string
  sections: { title: string; items: string[] }[]
}

const RELEASES: ReleaseEntry[] = [
  {
    version: 'v1.0.0-alpha',
    date: '2026-05-15',
    tag: 'alpha',
    summary:
      'AI-native 设计系统首个可用版本。Token 真相源迁移到 W3C DTCG 格式；5 个深度组件契约就位；6 个 AI 端点 + MCP server 上线；零样本测试集起步。',
    sections: [
      {
        title: '基础层（Tokens）',
        items: [
          'Token 真相源从 markdown 表格迁移到 5 份 W3C DTCG 格式 JSON（color / typography / dimension / motion / shadow）',
          '68 个令牌全量入库，含 Light / Dark 双模式覆盖',
          'build pipeline 输出：tokens.css / tailwind.preset.cjs / DESIGN.md / tokens.flat.json',
          'token-lint 脚本 + npm run lint:tokens 命令，扫硬编码 hex / rgba / px 字面量',
        ],
      },
      {
        title: '组件层（Schema）',
        items: [
          '5 个深度组件 schema 契约：Button / Input / Card / Sheet / Empty State',
          '每个 schema 含 props enum / states / constraints / anatomy / tokens / do-dont',
          'ComponentPage 重写为 schema-driven 固定结构（Live Demo / Props / States / Anatomy / Constraints / Do-Don\'t）',
          '每个深度组件页带「Copy for AI」按钮，一键复制 LLM-spec markdown',
        ],
      },
      {
        title: '站点结构',
        items: [
          'IA 重组为顶部三组：System（方法论）/ MindBack（活样本）/ Writing（思考）',
          'Foundations 拆 5 子页：Color / Typography / Spacing / Radius / Motion',
          '新增 Manifesto / AI Workflows / Patterns / Changelog 四页',
          '侧边栏分组：深度组件（5）+ 其他组件（11）+ Patterns（4）',
        ],
      },
      {
        title: 'AI 资产',
        items: [
          '6 个 HTTP 端点：/skill.md /design.md /tokens.json /components.md /components.json /llms.txt',
          '最小 MCP server（mcp/server.mjs，~200 行），5 个工具：list_tokens / get_token / list_components / get_component / get_skill',
          'AI Workflows 页：三步接入指南 + 端点表 + MCP 配置 + 4 个 prompt 示例',
        ],
      },
      {
        title: '校验',
        items: [
          '零样本测试集起步：5 个固定 prompt + 评分脚本（scripts/zero-shot-eval.mjs）',
          '评分维度：token 使用率、组件覆盖、状态完整性、props 命中率',
          'KPI 目标：token 使用率 ≥ 95% · props 命中 100% · 状态完整 100%',
          '基线 sample (01-login-page) 三大核心 KPI 全 100%',
        ],
      },
      {
        title: '视觉',
        items: [
          'docs 站迁到 Apple Developer 风格：单一品牌色、hairline 分割、HIG segmented 控件',
          '侧栏配色 #FAFBFC / dark #161719，logo 吸顶、主题切换吸底',
          '取消所有装饰彩色（mistakes 6 色循环、pipeline 彩条、principle 蓝软底）',
        ],
      },
    ],
  },
]

export function ChangelogPage() {
  return (
    <>
      <DocsPageHeader
        title="版本变更记录"
        subtitle="semver 标注每次 token / 组件 schema 的变化。v1 不做版本 diff 影响面图谱（v2 再做），但保证 git diff 可读。"
      />

      {RELEASES.map((r) => (
        <Release key={r.version} release={r} />
      ))}
    </>
  )
}

function Release({ release: r }: { release: ReleaseEntry }) {
  return (
    <section className="docs-section-block docs-release">
      <div className="docs-release__head">
        <div className="docs-release__version">{r.version}</div>
        <div className="docs-release__meta">
          <span className={`docs-release__tag docs-release__tag--${r.tag}`}>{r.tag}</span>
          <span className="docs-release__date">{r.date}</span>
        </div>
      </div>
      <p className="docs-release__summary">{r.summary}</p>

      <div className="docs-release__body">
        {r.sections.map((s) => (
          <ReleaseSection key={s.title} title={s.title}>
            <ul>
              {s.items.map((it, i) => (
                <li key={i}>{it}</li>
              ))}
            </ul>
          </ReleaseSection>
        ))}
      </div>
    </section>
  )
}

function ReleaseSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="docs-release-section">
      <div className="docs-release-section__title">{title}</div>
      <div className="docs-release-section__body">{children}</div>
    </div>
  )
}
