#!/usr/bin/env node
// MindBack MCP Server (stdio transport, MCP 1.0 protocol)
// 让 Cursor / Claude Code / 任何 MCP client 直接查 token 和 component 契约。
//
// 工具：
//   - list_tokens       列出全部令牌（可按类目过滤）
//   - get_token         根据令牌名取详情（含 dark 模式覆盖）
//   - list_components   列出全部组件
//   - get_component     根据 slug 取组件契约（schema）
//   - get_skill         拉取一站式 Skill markdown（design + components + 用法）
//
// 不引入 npm 依赖，纯 stdio + JSON-RPC 2.0 + MCP 协议消息格式。
// MCP 规范：https://spec.modelcontextprotocol.io/specification/

import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const BUILD = join(ROOT, 'tokens', 'build')

function loadJson(file) {
  return JSON.parse(readFileSync(join(BUILD, file), 'utf-8'))
}
function loadText(file) {
  return readFileSync(join(BUILD, file), 'utf-8')
}

// === MCP 工具定义 ===
const TOOLS = [
  {
    name: 'list_tokens',
    description: '列出 MindBack 设计令牌。可按类目过滤（color / typography / space / radius / duration / curve / shadow）。',
    inputSchema: {
      type: 'object',
      properties: {
        category: {
          type: 'string',
          enum: ['color', 'typography', 'space', 'radius', 'duration', 'curve', 'shadow'],
          description: '令牌类目，留空返回全部',
        },
      },
    },
  },
  {
    name: 'get_token',
    description: '根据令牌名取详情。如 "color.label.primary"、"space.4"、"radius.x-large"。',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: '令牌完整名称（点分）' },
      },
      required: ['name'],
    },
  },
  {
    name: 'list_components',
    description: '列出 MindBack 5 个深度组件 (Button / Input / Card / Sheet / Empty State)，含简短描述。',
    inputSchema: { type: 'object', properties: {} },
  },
  {
    name: 'get_component',
    description: '根据 slug 取组件完整契约（props / states / constraints / anatomy / tokens / do-dont）。',
    inputSchema: {
      type: 'object',
      properties: {
        slug: {
          type: 'string',
          enum: ['button', 'input', 'card', 'sheet', 'empty-state'],
        },
      },
      required: ['slug'],
    },
  },
  {
    name: 'get_skill',
    description: '拉取一站式 Skill markdown：design tokens + 5 个组件契约 + 使用约定。粘进系统提示直接生效。',
    inputSchema: { type: 'object', properties: {} },
  },
]

// === 工具实现 ===
function runTool(name, args) {
  switch (name) {
    case 'list_tokens': {
      const all = loadJson('tokens.flat.json').tokens
      const filtered = args?.category
        ? all.filter((t) => t.name.startsWith(args.category + '.'))
        : all
      return {
        content: [
          { type: 'text', text: JSON.stringify({ count: filtered.length, tokens: filtered }, null, 2) },
        ],
      }
    }
    case 'get_token': {
      const all = loadJson('tokens.flat.json').tokens
      const found = all.find((t) => t.name === args.name)
      if (!found) {
        return {
          content: [{ type: 'text', text: `未找到令牌 "${args.name}"。提示：试 list_tokens 看全表。` }],
          isError: true,
        }
      }
      return { content: [{ type: 'text', text: JSON.stringify(found, null, 2) }] }
    }
    case 'list_components': {
      const all = loadJson('components.json').components
      const summary = all.map((c) => ({
        slug: c.slug,
        name: c.name,
        category: c.category,
        description: c.description,
        propCount: Object.keys(c.props).length,
        stateCount: c.states.length,
      }))
      return { content: [{ type: 'text', text: JSON.stringify(summary, null, 2) }] }
    }
    case 'get_component': {
      const all = loadJson('components.json').components
      const found = all.find((c) => c.slug === args.slug)
      if (!found) {
        return {
          content: [{ type: 'text', text: `未找到组件 "${args.slug}"。可用：button / input / card / sheet / empty-state` }],
          isError: true,
        }
      }
      return { content: [{ type: 'text', text: JSON.stringify(found, null, 2) }] }
    }
    case 'get_skill': {
      // 复用 vite middleware 同一份生成逻辑（这里直接拼）
      const design = loadText('DESIGN.md')
      const components = loadText('components.md')
      const intro = [
        '# MindBack Design System Skill',
        '',
        '> AI-native 设计系统：给机器读的契约。约束被违反 = 幻觉。',
        '',
        '## 使用约定',
        '- 颜色：仅引用 var(--<token-name>)，禁止 hex/rgba 字面量',
        '- 间距：仅用 var(--space-1) ~ var(--space-10)',
        '- 圆角：5 级封闭枚举 radius-small/medium/large/x-large/full',
        '- 组件：props 必须命中 values 枚举；states 必须全覆盖；constraints 不能违反',
        '- 校验：`npm run lint:tokens`，0 违规才算合格',
        '',
        '---',
        '',
      ].join('\n')
      return {
        content: [{ type: 'text', text: intro + design + '\n\n---\n\n' + components }],
      }
    }
    default:
      return {
        content: [{ type: 'text', text: `Unknown tool: ${name}` }],
        isError: true,
      }
  }
}

// === MCP 协议处理（最小可用） ===
function makeResponse(id, result) {
  return { jsonrpc: '2.0', id, result }
}
function makeError(id, code, message) {
  return { jsonrpc: '2.0', id, error: { code, message } }
}

function handleMessage(msg) {
  const { id, method, params } = msg

  if (method === 'initialize') {
    return makeResponse(id, {
      protocolVersion: '2025-06-18',
      capabilities: { tools: {} },
      serverInfo: { name: 'mindback-design', version: '1.0.0-alpha' },
    })
  }
  if (method === 'tools/list') {
    return makeResponse(id, { tools: TOOLS })
  }
  if (method === 'tools/call') {
    const { name, arguments: args } = params
    try {
      return makeResponse(id, runTool(name, args))
    } catch (e) {
      return makeError(id, -32603, `Tool error: ${e.message}`)
    }
  }
  if (method === 'notifications/initialized' || method?.startsWith('notifications/')) {
    return null // 不回响应
  }
  return makeError(id, -32601, `Method not found: ${method}`)
}

// === stdio 主循环 ===
let buffer = ''
process.stdin.setEncoding('utf-8')
process.stdin.on('data', (chunk) => {
  buffer += chunk
  const lines = buffer.split('\n')
  buffer = lines.pop() || ''
  for (const line of lines) {
    if (!line.trim()) continue
    try {
      const msg = JSON.parse(line)
      const reply = handleMessage(msg)
      if (reply) process.stdout.write(JSON.stringify(reply) + '\n')
    } catch (e) {
      process.stderr.write(`[mcp-server] parse error: ${e.message}\n`)
    }
  }
})

process.stderr.write('[mcp-server] MindBack MCP server running on stdio\n')
