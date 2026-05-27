# MindBack 项目指令

## 文档驱动原则

文档是真相源，画板是视觉验证。改规格先改 `references/` 下的对应文档，再重新生成画板。

## 读取顺序

处理任何组件或页面时，必须按以下顺序读取文档，不允许凭记忆：

1. `references/strategy.md` — 确认任务属于哪个 Track、要影响什么指标
2. `references/agent-persona.md` — 了解 agent 能力边界和常见错误
3. `references/design-tokens.md` — 所有令牌定义
4. `references/design-principles.md` — 设计规则和设计备注（每条规则的"为什么"）
5. `references/haptics.md` — 触觉反馈意图和波形参数
6. 目标组件/页面文档
7. 相关的已 complete 组件文档（用于推导一致性）

视觉规则和合规清单以 `references/` 下的文件为准，CLAUDE.md 不再重复。

## Figma 绘制规范

- 画板宽度固定 393px，高度至少 852px（内容多时可超出，最终设 `height: "fit-content"`）
- iOS 状态栏严格遵循原生样式：SF Pro Semibold 17px，时间 9:41，信号/WiFi/电池图标组
- 默认浅色模式（Light Mode），颜色取令牌表 Light 列
- 禁止用渐变色做背景或兜底填充
- 图标和组件优先复用已有 Figma 组件（从 `references/figma-component-ids.md` 查找 node ID）
- 每个画板旁边必须有设计标注（页面名 + 2-4 条关键决策 + 交互行为说明）
- 每画完一个区域截图检查

## Skill 路由

用户请求匹配到 skill 时，优先调用对应 skill：

| 用户意图 | Skill |
|---------|-------|
| 构思新功能 / 提需求 / 描述改动 | `/shape` |
| 取参数、查规格（开发） | `/spec` |
| 定义/补全组件规格 | `/component` 或 `/fill` |
| 画页面 | 先 `/preflight` 再 `/draw` |
| 设计审查 | `/review` |
| 代码实现 | `/build` |
| 视觉质检 | `/inspect` |
| 代码健康度 | `/health` |
| 排查问题 | `/debug` |
| 发货、建 PR | `/ship` |
| 系统健康报告 | `/audit` |
| 保存/恢复上下文 | `/checkpoint` |
| 周回顾 | `/retro` |
| 归档画板代码 | `/archive` |

产品设计管线（统一角色）：`/shape` → `/component` → `/fill` → `/preflight` → `/draw` → `/review` → `/build` → `/inspect` → `/ship`

开发管线：`/spec` → `/build` → `/inspect` → `/ship`

## 组件状态流转

```
placeholder → draft → complete
```

- placeholder：只有名字，无规格
- draft：核心规格已定义，可有待补充
- complete：规格完整，Paper 代码已归档

只有 `/component` 流程可以把 status 推进到下一级。

## 代码规范

- TypeScript strict 模式
- CSS 中颜色必须用 `var(--token-name)` 引用令牌，禁止硬编码 hex/rgba
- 间距用 `var(--space-N)` 引用，圆角用 `var(--radius-N)`
- 组件 CSS 文件使用 BEM-like 命名
- 无 `!important`、无 `any` 类型除非有充分理由
- 不引入新依赖，优先用项目已有的库

## Git 提交规范

- commit message 用中文，简短，一行说清楚
- 不带 emoji、不带 type 前缀
- 每次推进组件状态、更新令牌、归档画板都单独提交
