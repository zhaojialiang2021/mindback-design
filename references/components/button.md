---
name: Button
status: complete
last_updated: 2026-06-25
used_by: [home, ai-preferences, settings, time-fragment, splash, dotted-task-demo]
---

# Button

## 规格

Button 是用户主动触发动作的最小单元。新版 Button 只使用 `variant` 表达视觉层级，只使用 `size` 表达几何尺寸；旧版意图字段和旧版尺寸字段已删除，不再作为兼容写法。

| 属性 | 值 | 默认 | 设计备注 |
|------|------|------|------|
| variant | `filled` / `outline` / `neutral` / `ghost` | `filled` | 视觉层级，不承载业务语义 |
| size | `xLarge` / `large` / `medium` / `small` / `mini` / `micro` | `medium` | 几何尺寸，按位置选择 |
| icon | `none` / `leading` / `trailing` / `only` | `none` | `only` 必须提供 `aria-label` |
| fullWidth | `false` / `true` | `false` | 表单底部主操作常用 |
| selected | `false` / `true` | `false` | 仅用于可保持状态的筛选/选择控件 |

## 尺寸

| size | 高度 | 最小宽度 | 水平内边距 | 字体 | 用途 |
|------|------|----------|------------|------|------|
| xLarge | 48px | 96px | Space-5 | Callout | 页面级 CTA、底部提交 |
| large | 44px | 88px | Space-4 | Callout | 表单提交、主要确认 |
| medium | 36px | 72px | Space-4 | Subhead | 卡片外普通操作、空状态按钮 |
| small | 28px | 56px | Space-3 | Caption-1 | 卡片内操作 |
| mini | 24px | 48px | Space-2 | Caption-1 | 紧凑行内操作 |
| micro | 20px | 40px | Space-2 | Caption-2 | 极小标签式操作 |

所有尺寸圆角固定为 `Radius-Full`。`icon=only` 时按钮宽度等于高度，不能只靠文字按钮压缩成图标按钮。

## 颜色变体

| variant | 背景 | 字色 | 边框 | 用途 |
|---------|------|------|------|------|
| filled | Brand-Blue | BG-0 | 无 | 当前视图唯一主操作 |
| outline | 透明 | Label-Primary | Label-Primary 1px | 强次级操作 |
| neutral | Fill-Quaternary | Label-Primary | 无 | 普通次级操作、外部演示控制 |
| ghost | 透明 | Label-Primary | 无 | 弱操作，必须依附在明确容器或列表上下文里 |

`selected=true` 时使用 Label-Primary 背景和 BG-0 字色，用于筛选、分段选择等可保持状态的控件；一次性提交按钮不使用 selected。

## 场景规则

| 场景 | 推荐组合 | 说明 |
|------|----------|------|
| 页面或表单底部主操作 | `variant=filled` + `size=large` + `fullWidth=true` | 同一视图最多一个 |
| 空状态行动 | `variant=neutral` + `size=medium` | 让动作可见但不抢内容 |
| 卡片内部确认 | `variant=filled` + `size=medium/small` | 卡片内不使用 xLarge |
| 卡片内部次级操作 | `variant=neutral/ghost` + `size=small/mini` | 避免把卡片撑大 |
| 图标按钮 | `icon=only` + 对应 size | 必须提供 `aria-label` |

## 交互状态

| 状态 | 变化 | 触觉 |
|------|------|------|
| Default | 按 variant / size 渲染 | — |
| Active | opacity 降至 0.7，Duration-Fast 过渡 | light |
| Selected | Label-Primary 背景，BG-0 字色 | tick |
| Disabled | opacity 0.3，不可点击 | 无 |
| Loading | 保持按钮尺寸，label 可替换为 loading indicator | 无 |

## 合规清单

- 不再使用旧版意图字段、旧版变体名或旧版尺寸名。
- 同一视图最多一个 `variant=filled`。
- `ghost` 不能漂在空白背景上，必须有清晰上下文。
- `icon=only` 必须提供 `aria-label`。
- 卡片里的按钮大小优先 `medium`、`small`、`mini`，不使用页面级 `xLarge`。

## 多宽度适配

| 宽度 | 规则 |
|------|------|
| Mobile | 根据场景全宽或内容宽，底部主操作可 fullWidth |
| Tablet | fullWidth 按容器宽度，不超过内容区 |
| Desktop | 按内容宽度优先，避免横向过长 |
