# 我是怎么把自己的设计系统接进 AI 的

> 草稿 · 案例文 · 2026-05-15
> 这是 [为什么是给 AI 也设计的设计系统](manifesto) 那篇的姊妹篇。前一篇讲 why，这篇讲 how——每一步、每个文件、每个坑。

## 起点：把 Markdown 表格扔进 ChatGPT

我做 MindBack 的设计系统时，最初的真相源是一份 markdown 文档：

```markdown
| 令牌名 | Light | Dark | 用途 |
|--------|-------|------|------|
| Label-Primary | #212121 | #F8F9F9 | 标题、正文主文本 |
| Label-Secondary | rgba(60,60,67,0.6) | rgba(235,235,245,0.6) | 辅助说明 |
```

我以为 AI 能直接读这个。结果它读完只能复述。让它写一个新组件，它依然在用 `#666666`。

原因后来我才想清楚：**markdown 表格对 AI 来说是文本，不是契约。**它不知道我列出的这些值是封闭枚举，它把表格理解成「示例」，不是「全集」。

第一个改动：把 markdown 转成 W3C DTCG 格式 JSON。

## 第一步：tokens.json 是真相源

W3C Design Tokens Community Group 的格式（DTCG）2024 年开始稳定。它的关键点是 `$value` `$type` `$description` 三个保留字段，工具链都认。

我把 markdown 表拆成 5 份 JSON：

```
tokens/
├── color.json
├── typography.json
├── dimension.json
├── motion.json
└── shadow.json
```

每条令牌长这样：

```json
"primary": {
  "$value": "#212121",
  "$type": "color",
  "$description": "标题、正文主文本",
  "$extensions": { "modes": { "dark": "#F8F9F9" } }
}
```

`$extensions.modes.dark` 是社区惯例——DTCG 主规范没正式定 light/dark，但工具默认走这条路径。

为什么不直接用 Tailwind config / theme.js？因为它们是 web-only。DTCG 是平台无关的——同一份 JSON 同时驱动 web、iOS、Android、Figma Variables。MindBack 是 iOS App，将来要给 Swift 出常量，提前选对格式比之后迁省事。

## 第二步：build pipeline 不用 style-dictionary

brief 推荐 Style Dictionary。我装了一下，发现两件事：

1. 复合令牌（typography 含 size + weight + lineHeight）默认不直接处理，要写 custom transform
2. `$extensions.modes` 它也不认，要写 custom format

写 transform 的代码量已经接近自己写 build pipeline。索性直接 80 行 node：

```js
// 加载 5 份 JSON → 扁平化 → 输出多平台
function flatten(node, path = []) {
  if (node?.$value) return [{ name: path.join('.'), value: node.$value, ... }]
  // 递归
}
```

输出 4 份产物：
- `tokens.css` — :root 含 light，`@media (prefers-color-scheme: dark)` 和 `[data-theme='dark']` 各一份
- `tailwind.preset.cjs` — Tailwind v3 preset（之后 fork shadcn 直接 plug）
- `DESIGN.md` — 给 AI 喂的紧凑 markdown
- `tokens.flat.json` — 给程序读的扁平列表

为什么"不引入新依赖"是底线：每加一个 npm 依赖，AI 就多一份"它需要懂这个工具"的负担。维护成本和心智成本永远比代码行数贵。

## 第三步：组件不只是 props，是契约

第二个让 AI 错得最多的地方是组件 props。我让 AI 给登录页生成一个删除按钮：

```tsx
<Button color="red" size="big">删除</Button>
```

每个字都看起来对，每个字都不在我的系统里。我的 Button 没有 `color` prop——只有 `intent: "destructive"`；没有 `size: "big"`——只有 `compact / standard / large`。

我开始写 component schema：

```json
{
  "Button": {
    "props": {
      "intent": {
        "values": ["primary", "secondary", "soft", "ghost", "destructive"],
        "default": "primary"
      },
      "size": {
        "values": ["compact", "standard", "large"]
      }
    },
    "states": ["idle", "hover", "active", "loading", "disabled"],
    "constraints": [
      { "rule": "max_primary_per_view", "value": 1 },
      { "rule": "destructive_requires", "value": "irreversible_action" }
    ]
  }
}
```

注意 `constraints`。这是经典文档里写在散文里的规则——「不要在同一视图放两个 primary 按钮」——现在它是一个**可被检查的字段**。

我没真的写规则引擎跑约束（v1 不做），但这份 schema 直接被两件事消费：
1. ComponentPage 渲染时用 schema 生成 props 表 + 状态矩阵
2. 「Copy for AI」按钮一键复制 LLM-spec markdown

第二件事是关键。我点一个按钮，剪贴板里就是这样：

```markdown
# Component: Button
## Props
- **intent** (["primary","secondary","soft","ghost","destructive"], default: "primary")
- **size** (["compact","standard","large"], default: "standard")
...
```

粘到 Cursor 系统提示，AI 接下来生成的所有 Button 都命中我的 enum。

## 第四步：HTTP 端点 + MCP Server

Copy for AI 解决了"启动一个新会话"的场景。但生成过程中 AI 想确认「Button destructive 用什么 token」时，它没法每次都回到文档站点一次。

我做了两件事：

**a) 6 个 HTTP 端点**

把构建产物 expose 成静态资源，挂在 `mindback.design`：

| 端点 | 用途 |
|---|---|
| `/skill.md` | 一站式 Skill 包（design + components + 用法） |
| `/design.md` | Token 紧凑 markdown |
| `/tokens.json` | 扁平 token 列表 |
| `/components.md` | 组件契约 markdown |
| `/components.json` | 组件契约 JSON |
| `/llms.txt` | 站点入口索引 |

任何 fetch / curl 都能拉。无需 clone 仓库。

**b) 最小 MCP server**

200 行 node，5 个工具：

```
list_tokens / get_token / list_components / get_component / get_skill
```

纯 stdio + JSON-RPC 2.0，不引 npm 依赖。Cursor / Claude Desktop 配置一下就接进来：

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

接进来之后，AI 在生成过程中可以问：「`color.brand.blue` 的 dark 模式值是什么？」MCP 直接返。

## 第五步：lint 是契约能成立的最后一道墙

写完上面这些，我做了一个不严谨的实验：我故意用 hardcoded `#FF0000` 写了几行代码，问 AI："这段对不对？"

它说："对的，符合你的设计系统。"

它没真的检查。它只是看到了我写的"看起来很设计系统"的代码，然后顺着我说。

人靠规则约束自己，AI 靠 lint 约束自己。

我写了 `token-lint.mjs`——扫源码里的 hex / rgba / px 字面量，命中就报错。基线跑下来 73 处违规，多数在浅组件 preview（v1 backlog）；core 路径 0 违规。

```bash
$ npm run lint:tokens
✓ token-lint 通过：未发现硬编码字面量
```

CI 跑这个，0 违规才能 merge。这是 brief §2.3 那个"零样本合规率"KPI 真正能落地的前提。

## 第六步：测试不是测代码，是测契约

最后一步，零样本测试集。

5 个固定 prompt 跑 AI，看它的产出有多合规：

1. 用这个设计系统做一个登录页
2. 做一个文件上传组件，empty / loading / error 状态完整
3. 做一个删除确认弹窗
4. 频道首次进入的空状态
5. 搜索结果页（empty / loading / no-result / has-result）

AI 输出粘到 `zero-shot-tests/samples/*.tsx`，跑评分脚本：

```
01-login-page
  综合分 80.0%
  Token 使用率 100% (40/40 valid)
  组件覆盖 100%
  状态完整性 100%
  Props 命中 100%
```

每周跑一次，记录基线。AI 模型迭代 / 我改契约 / 提示词变化，三个变量任何一个动，分数会立刻反映。

## 没做的事（v1 不做）

写完上面这些，我清楚地知道**还有两件事我没做**：

1. **Generative Rules 引擎**——schema 里 `constraints` 已经写了，但没有 runtime 跑去检查「这个视图有几个 primary 按钮」。v1 靠 lint 抓 token，靠 review 抓约束。
2. **跨平台输出**——iOS Swift / Android Kotlin 还没接。等 MindBack iOS native 团队真要用时再做。

延期的理由不是技术不够。是**没必要**。设计系统的失败模式从来不是"功能不够"，是"维护它的成本超过用它的收益"。每一项功能都得拷问："不做这个，会有什么具体的事垮掉？"答得上来才做。

## 总结：把契约写下来 = 把 AI 变成员工

最终产出：一个仓库 + 6 个 HTTP 端点 + 1 个 MCP server。

Cursor / Claude 接进来之后，AI 不再是猜谜的旁观者，而是有规则约束的"员工"。它和团队里的其他成员看同一份契约，违反规则同样会被 lint 拦下。

这没什么神秘的。**把约定写成契约**——五年前我们只对人这么做，现在该对 AI 也这么做。

---

下一步：[运行零样本测试集](https://docs.mindback.com/#/docs/ai-workflows) · [接入指南](https://docs.mindback.com/#/docs/ai-workflows)
