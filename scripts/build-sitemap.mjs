#!/usr/bin/env node
// build-sitemap.mjs —— 从 router/manifest 真相源生成 sitemap.xml + robots.txt
// 部署后：https://docs.mindback.com/sitemap.xml /robots.txt 可被搜索引擎和 AI 爬虫发现
//
// 用法：node scripts/build-sitemap.mjs

import { writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const SITE = 'https://docs.mindback.com'

// 跟 manifest.ts 保持同步（无法直接 import .ts，列举一份）
const COMPONENTS = [
  'button', 'input', 'card', 'sheet', 'empty-state',
  'nav-bar', 'sidebar', 'switch', 'modal', 'divider', 'toast', 'action-bar',
  'message-bubble', 'slider', 'tab-bar', 'type-tag',
]
const PAGES = ['splash', 'home', 'ai-preferences', 'ai-summary', 'time-fragment']
const WRITINGS = [
  'manifesto',
  'how-i-fed-my-design-system-to-ai',
  'when-making-is-not-scarce',
  'when-ai-takes-the-wheel',
]
const PATTERNS = ['empty', 'loading', 'permission', 'error']
const FOUNDATIONS = ['color', 'typography', 'spacing', 'radius', 'motion']

function buildRoutes() {
  const routes = [
    { path: '/', priority: 1.0 },
    { path: '/#/docs', priority: 1.0 },
    { path: '/#/docs/manifesto', priority: 0.9 },
    { path: '/#/docs/workflow', priority: 0.8 },
    { path: '/#/docs/principles', priority: 0.7 },
    { path: '/#/docs/haptics', priority: 0.6 },
    { path: '/#/docs/patterns', priority: 0.7 },
    { path: '/#/docs/ai-workflows', priority: 0.9 },
    { path: '/#/docs/changelog', priority: 0.5 },
  ]
  for (const sub of FOUNDATIONS) {
    routes.push({ path: `/#/docs/foundations/${sub}`, priority: 0.7 })
  }
  for (const slug of COMPONENTS) {
    routes.push({ path: `/#/docs/components/${slug}`, priority: 0.8 })
  }
  for (const slug of PATTERNS) {
    routes.push({ path: `/#/docs/patterns/${slug}`, priority: 0.6 })
  }
  for (const slug of PAGES) {
    routes.push({ path: `/#/docs/pages/${slug}`, priority: 0.7 })
  }
  for (const slug of WRITINGS) {
    routes.push({ path: `/#/docs/writing/${slug}`, priority: 0.9 })
  }
  return routes
}

function buildSitemap(routes) {
  const today = new Date().toISOString().slice(0, 10)
  const urls = routes
    .map(
      (r) =>
        `  <url>
    <loc>${SITE}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <priority>${r.priority.toFixed(1)}</priority>
  </url>`,
    )
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
}

function buildRobots() {
  return `# MindBack Design System
# 给爬虫和 AI agent 用：欢迎抓全站。AI 优先看 /llms.txt
User-agent: *
Allow: /

# AI agent 友好端点
# /llms.txt        站点入口索引
# /skill.md        一站式 Skill 包
# /design.md       设计令牌 markdown
# /tokens.json     令牌 JSON
# /components.md   组件契约 markdown
# /components.json 组件契约 JSON

Sitemap: ${SITE}/sitemap.xml
`
}

function main() {
  const routes = buildRoutes()
  const sitemap = buildSitemap(routes)
  const robots = buildRobots()
  const pub = join(ROOT, 'public')
  writeFileSync(join(pub, 'sitemap.xml'), sitemap)
  writeFileSync(join(pub, 'robots.txt'), robots)
  console.log(`✓ sitemap.xml （${routes.length} 路由）+ robots.txt 写入 public/`)
}

main()
