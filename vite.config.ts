import type { IncomingMessage, ServerResponse } from 'node:http'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * AI 资产端点：把构建出的 token / schema 暴露成 HTTP 路由。
 * 设计意图：让任何 AI agent / Cursor / Claude 用 fetch('https://docs.mindback.com/skill.md')
 * 就能拿到当前最新的设计契约 + 组件契约，不用 clone 仓库。
 *
 * 端点地图：
 *   GET /llms.txt        站点入口索引
 *   GET /design.md       Token 紧凑 markdown
 *   GET /tokens.json     Token 扁平 JSON
 *   GET /components.md   组件契约 markdown
 *   GET /components.json 组件契约 JSON
 *   GET /skill.md        一站式 Skill 包：design + components + 使用约定
 */
function aiEndpointsPlugin(): Plugin {
  const file = (rel: string) => resolve(__dirname, rel)

  function serveFile(rel: string, contentType: string, fallback: string) {
    return (_req: IncomingMessage, res: ServerResponse) => {
      try {
        res.setHeader('Content-Type', contentType)
        res.setHeader('Cache-Control', 'no-cache')
        res.end(readFileSync(file(rel), 'utf-8'))
      } catch {
        res.statusCode = 404
        res.end(fallback)
      }
    }
  }

  return {
    name: 'mindback-ai-endpoints',
    configureServer(server) {
      server.middlewares.use(
        '/design.md',
        serveFile(
          'tokens/build/DESIGN.md',
          'text/markdown; charset=utf-8',
          'DESIGN.md 未生成，请先跑 npm run tokens',
        ),
      )
      server.middlewares.use(
        '/tokens.json',
        serveFile(
          'tokens/build/tokens.flat.json',
          'application/json; charset=utf-8',
          '{"error":"tokens.flat.json 未生成"}',
        ),
      )
      server.middlewares.use(
        '/components.md',
        serveFile(
          'tokens/build/components.md',
          'text/markdown; charset=utf-8',
          'components.md 未生成',
        ),
      )
      server.middlewares.use(
        '/components.json',
        serveFile(
          'tokens/build/components.json',
          'application/json; charset=utf-8',
          '{"error":"components.json 未生成"}',
        ),
      )

      // /skill.md —— 一站式 Skill 包：design + components + 用法说明（给 AI 喂 prompt 用）
      server.middlewares.use('/skill.md', (_req, res) => {
        try {
          const design = readFileSync(file('tokens/build/DESIGN.md'), 'utf-8')
          const components = readFileSync(file('tokens/build/components.md'), 'utf-8')
          const intro = [
            '# MindBack Design System Skill',
            '',
            '> 把这份内容粘到 Cursor / Claude Code 的系统提示里，再开始生成 UI。',
            '> AI-native 设计系统：给机器读的契约。约束被违反 = 幻觉。',
            '',
            '## 使用约定',
            '- **颜色**：仅引用 `var(--<token-name>)`（见下方 Tokens 段），禁止 hex/rgba 字面量。',
            '- **间距**：仅用 `var(--space-1)` ~ `var(--space-10)`，禁止自定义 px。',
            '- **圆角**：5 级封闭枚举 `radius-small / medium / large / x-large / full`。',
            '- **字号**：从 typography 令牌挑（headline-h1/h2/h3, body-primary/secondary, callout, subhead, footnote, caption-1/2）。',
            '- **组件**：见下方 Component Contracts。props 必须命中 values 枚举；states 必须全覆盖；constraints 不能违反。',
            '- **校验**：生成完跑 `npm run lint:tokens`，0 违规才算合格。',
            '',
            '---',
            '',
          ].join('\n')
          res.setHeader('Content-Type', 'text/markdown; charset=utf-8')
          res.setHeader('Cache-Control', 'no-cache')
          res.end(intro + design + '\n\n---\n\n' + components)
        } catch {
          res.statusCode = 404
          res.end('skill.md 未生成，请先跑 npm run tokens')
        }
      })

      server.middlewares.use('/llms.txt', (_req, res) => {
        res.setHeader('Content-Type', 'text/plain; charset=utf-8')
        res.end(
          [
            '# MindBack Design System',
            '',
            'AI-native 设计系统：给机器读的契约，不是给人看的约定。',
            'Brief: https://github.com/zhaojialiang/mindback (private)',
            '',
            '## 关键端点',
            '- /skill.md         一站式 Skill 包（推荐 AI 直接拉这个）',
            '- /design.md        Token 紧凑 markdown',
            '- /tokens.json      Token 扁平 JSON（含 dark 模式覆盖）',
            '- /components.md    组件契约 markdown',
            '- /components.json  组件契约 JSON',
            '',
            '## 使用方式',
            '`curl https://docs.mindback.com/skill.md` 把内容粘到 Cursor / Claude 系统提示。',
            '所有颜色、间距、字号、圆角必须引用令牌名，禁止 hardcoded 字面量。',
            '生成完跑 `npm run lint:tokens` 检查，0 违规才算合格。',
            '',
          ].join('\n'),
        )
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), aiEndpointsPlugin()],
})
