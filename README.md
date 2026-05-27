# MindBack

聊天气泡形态的 AI 记忆助手 + AI-native 设计系统。

仓库内含两件东西：
1. **MindBack App**——iOS 形态的 AI 记忆助手（src/、产品本体）
2. **MindBack Design System**——给 AI 也设计的设计系统（tokens/ + components/ + mcp/ + src/docs/）

第二件是这个仓库的核心创新点。详细阐述见 [Manifesto](https://docs.mindback.com/#/docs/writing/manifesto)。

## 一句话

> 传统设计系统是「给人看的约定」，AI-native 设计系统是「给机器读的契约」。约定可以靠经验补救；契约一旦违反，AI 立即开始幻觉。

## 仓库结构

```
mindback/
├── tokens/                  设计令牌真相源（W3C DTCG 格式 JSON）
│   ├── color.json           颜色（含 light/dark 双模式）
│   ├── typography.json      字号字重行高
│   ├── dimension.json       间距、圆角
│   ├── motion.json          duration、curve
│   ├── shadow.json          阴影
│   └── build/               构建产物（不要手改）
├── components/              组件 schema（5 个深度组件契约）
│   ├── button.schema.json
│   ├── input.schema.json
│   ├── card.schema.json
│   ├── sheet.schema.json
│   └── empty-state.schema.json
├── mcp/                     MCP server（让 Cursor / Claude 实时查 token 和 component）
│   ├── server.mjs           ~200 行，0 npm 依赖
│   └── README.md            接入指南
├── public/                  AI HTTP 端点静态产物（生产部署后可访问）
│   ├── skill.md             一站式 Skill 包
│   ├── design.md            Token 紧凑 markdown
│   ├── tokens.json          扁平 token 列表
│   ├── components.md        组件契约 markdown
│   ├── components.json      组件契约 JSON
│   └── llms.txt             给 AI agent 用的入口索引
├── scripts/
│   ├── build-tokens.mjs     真相源 → CSS / Tailwind preset / DESIGN.md
│   ├── build-components.mjs schema → AI markdown
│   ├── token-lint.mjs       硬编码字面量扫描
│   └── zero-shot-eval.mjs   零样本合规率评分
├── zero-shot-tests/         brief §2.3 KPI：5 个固定 prompt
│   ├── prompts/             5 个 prompt
│   ├── samples/             AI 输出（粘进来评分）
│   └── results/             历次评分快照
├── references/              历史 markdown 文档（部分仍在引用，长期看会被 schema 取代）
│   ├── components/          14 个组件 md
│   ├── pages/               5 个页面 md
│   └── writings/            4 篇思考长文
├── src/
│   ├── App.tsx              MindBack App（iOS Showcase + 5 页面 base case）
│   ├── tokens.css           由 build-tokens.mjs 生成，不要手改
│   └── docs/                设计系统 docs 站（25 条路由）
└── DEPLOY.md                部署指南（Vercel 一键）
```

## 三件事，一个仓库

### 1. App（产品本身）

```bash
npm install
npm run dev          # http://localhost:5173/
```

打开 `#/preview/home` 看 5 个页面 base case。

### 2. Design System Docs（设计系统站）

```bash
npm run dev
# 打开 http://localhost:5173/#/docs
```

顶部三组：System（方法论）/ MindBack（活样本案例）/ Writing（思考）。

### 3. AI 接入（Cursor / Claude / 任何 agent）

**最快路径**：

```bash
curl https://docs.mindback.com/skill.md
```

把内容粘到 Cursor `.cursorrules` 或 Claude Code `CLAUDE.md`。AI 接下来生成的所有 UI 都会被这套契约约束。

**MCP 接入**（Cursor / Claude Desktop）：

```json
{
  "mcpServers": {
    "mindback-design": {
      "command": "node",
      "args": ["./mcp/server.mjs"]
    }
  }
}
```

详见 [mcp/README.md](mcp/README.md) 和 [/docs/ai-workflows](https://docs.mindback.com/#/docs/ai-workflows)。

## 命令清单

```bash
npm run dev              # dev server (port 5173)
npm run build            # 生产 build → dist/
npm run preview          # 本地预览生产 build
npm run tokens           # 重建 token / component 产物
npm run lint             # ESLint
npm run lint:tokens      # token-lint：扫硬编码字面量
npm run eval:zero-shot   # 跑零样本合规率评分
```

## KPI

不是 PV，不是 stars，是**零样本 AI 生成合规率**：

```bash
npm run eval:zero-shot
```

理论合规 sample 平均综合分 79.5%。三个核心 KPI（token 使用 / 组件 props / 状态完整）全 100%。真实 AI 跑下来的基线由你接入 Cursor / Claude 后填充。

## 工程栈

- **Frontend**: Vite + React 19 + TypeScript (strict)
- **Token**: W3C Design Tokens (DTCG) 格式
- **MCP**: 自写 stdio + JSON-RPC 2.0，0 依赖
- **样式**: CSS 变量，所有数值禁止硬编码

详见 [Manifesto](https://docs.mindback.com/#/docs/writing/manifesto) 和 [实操路径](https://docs.mindback.com/#/docs/writing/how-i-fed-my-design-system-to-ai)。

## 协作分工

| 谁 | 做什么 |
|---|---|
| 赵家亮（人） | 设计决策、Writing 内容、Figma、最终验收 |
| AI agent | 工程实现、代码生成、文档转换、跑测试 |
| 设计契约（这个仓库） | 让两边对齐 |

遇到设计取舍要先问人；工程取舍可以先实现。详见 [agent-persona.md](references/agent-persona.md)。

## License

私有仓库，未授权使用。
