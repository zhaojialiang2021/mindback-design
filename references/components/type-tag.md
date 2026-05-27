---
name: TypeTag
status: complete
last_updated: 2026-04-30
used_by: [home, card, search, filter, memory-review]
---

# TypeTag

内容类型标签，用于标识卡片分类和筛选。有两种形态：Inline（行内标签）和 Filter（筛选标签）。

## Inline 标签（行内）

用于卡片内标注内容类型。

| 属性 | 值 | 设计备注 |
|------|------|------|
| 形状 | Pill（Radius-Full: 9999px） | Pill 是品牌语言 |
| 高度 | 24px | 比 Tab 小，视觉层级低 |
| 水平内边距 | Space-2 (8px) | 两侧对称 |
| 字体 | Caption-1 (12px/400) | 标签用最小字号 |
| 字色 | 对应 accent 色 | — |
| 背景 | 对应 accent 色 opacity 0.12 | 低饱和度底色 |

## Filter 标签（筛选）

用于记忆回顾页等场景的时间/类型筛选。

| 属性 | Active | Inactive |
|------|--------|----------|
| 形状 | 圆角矩形 (Radius-Medium: 8px) | 圆角矩形 (Radius-Medium: 8px) |
| 背景 | Brand-Blue (`#78AAFA`) | BG-2 (`#F8F8F8`) |
| 字色 | 白色 | #BFBFC1 (Label-Tertiary 近似) |
| 字体 | Subhead (14px/Semibold) | Subhead (14px/Medium) |
| 内边距 | 8px 上下, 8px 左右 | 8px 上下, 8px 左右 |

## Inline 颜色映射

| 类型 | Accent 色 | 标签字色 | 标签背景 |
|------|-----------|---------|---------|
| 智能总结 | Brand-Blue `#78AAFA` | `#78AAFA` | `rgba(120,170,250,0.12)` |
| 事件追踪 | Accent-EventBlue `#5B9BDB` | `#5B9BDB` | `rgba(91,155,219,0.12)` |
| 待办事项 | Accent-Yellow `#FFCC00` | `#B8960A` | `rgba(255,204,0,0.12)` |
| 日记 | Accent-Green `#34C759` | `#34C759` | `rgba(52,199,89,0.12)` |
| 持续月录 | Accent-Pink `#FF6482` | `#FF6482` | `rgba(255,100,130,0.12)` |
| 文件 | Accent-Brown `#916964` | `#916964` | `rgba(145,105,100,0.12)` |

设计备注：待办事项的黄色在白底上对比度不足，字色降为深棕 `#B8960A`。

## 交互

| 交互 | 行为 | 触觉 |
|------|------|------|
| 点击 Inline | 切换筛选 | tick |
| 点击 Filter | 切换选中态 | tick |

Inline Active 态：背景 opacity 从 0.12 提升至 0.24。
Filter 切换动画：背景色 Duration-Fast (150ms) 过渡。
