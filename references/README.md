# references — 设计系统真相源

> 这里的每份文档都是某个层面的"真相"。Figma 画板、`src/` 代码、`demo/` 画板都是下游产物。
> 改规格先改这里，再重新生成下游。

## 阅读顺序（任何任务都按此顺序）

1. [`strategy.md`](strategy.md) — 任务属于哪个 Track、影响什么指标
2. [`agent-persona.md`](agent-persona.md) — AI 协作者的能力边界和常见错误
3. [`design-tokens.md`](design-tokens.md) — 颜色/字号/间距/圆角/阴影/动效令牌
4. [`design-principles.md`](design-principles.md) — 13 条设计规则（含"为什么"）
5. [`haptics.md`](haptics.md) — 5 级触觉意图和波形参数
6. 目标组件/页面文档（`components/` 或 `pages/`）
7. 相关已 complete 的组件文档（用于推导一致性）

## 目录角色

### 顶层文件

| 文件 | 角色 | 谁会改 |
|------|------|--------|
| `strategy.md` | 战略层：要解决的问题、关键指标、Track 划分、待决策 | 季度策略访谈后由产品负责人更新 |
| `agent-persona.md` | 元规则：AI 代理在系统中的行为契约 | 引入新工具/发现新错误模式时更新 |
| `design-principles.md` | 13 条设计规则 + 每条的"设计备注"（为什么） | 设计 Lead；新增规则需团队对齐 |
| `design-tokens.md` | 视觉令牌：颜色/字号/间距/圆角/阴影/动效 | 设计 Lead；改动会通过构建脚本同步到代码 |
| `haptics.md` | 触觉令牌：5 级意图 + 多平台波形参数 | 设计 Lead |
| `figma-component-ids.md` | Figma 组件/图标 node ID 索引（Figma → 真相源的桥接） | 同步 Figma 后由脚本/人工更新 |

### 子目录

| 目录 | 内容 |
|------|------|
| `frameworks/` | 跨页面的交互框架（如 `framework-a.md` 聊天流），多个页面共同依赖 |
| `components/` | 14 个组件文档，状态机：`placeholder` → `draft` → `complete` |
| `pages/` | 9 个页面文档，每份页面文档声明依赖了哪些组件 |

## 组件文档前置元数据

每份组件/页面文档头部必须有 frontmatter：

```yaml
---
name: ComponentName
status: placeholder | draft | complete
last_updated: YYYY-MM-DD
used_by: [page-1, page-2]
---
```

`status` 只能由 `/component` 流程推进。`used_by` 用于 `/preflight` 检查依赖是否就绪。

## 当前状态速览（截至 2026-05-12）

- 组件：4 complete · 1 draft · 9 placeholder（共 14）
- 页面：0 complete · 9 draft · 0 placeholder（共 9）
- Framework：1 draft（framework-a 聊天流）

详细看板可用 `/audit` 生成。
