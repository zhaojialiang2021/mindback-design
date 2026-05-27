---
name: Divider
status: placeholder
last_updated: 2026-05-12
used_by: [card, home, memory-review, sidebar, tab-architecture]
---

# Divider

分割线。用于列表项之间、卡片内分组、区域分隔。

## 规格

| 属性 | 值 | 设计备注 |
|------|------|------|
| 厚度 | 0.5px | Retina 屏上为 1 物理像素，与 design-principles 一致 |
| 颜色 | Line-NonOpaque | 已有令牌，不需新增；半透明随主题自动适配 |
| 方向 | 水平 | 垂直分割线在本设计系统中不使用（用 Space 间距替代） |

## 变体

| 变体 | Inset 规则 | 用途 |
|------|------|------|
| List | 左 52px (Space-4 + 图标 24px + Space-3 = 16+24+12)，右 0 | 列表项之间，从文字起点开始（iOS 经典做法，让图标列连续） |
| Section | 左右各 Space-4 (16px) | 卡片内分组分隔 |
| FullWidth | inset 0 | 大区域分隔（如 NavBar 与内容、Tab 与内容） |

设计备注：List 变体的 52px 来自列表项规格（左右 Space-4 + 左图标 24px + 图标右边距 Space-3），与 sidebar.md 列表项规格一致。

## 使用场景

- NavBar 底部分割线（FullWidth，仅滚动后显示）→ 见 nav-bar.md
- Tab 容器顶部分割线（FullWidth）→ 见 tab-architecture.md
- 列表项之间（List）→ 见 sidebar.md, card.md
- 卡片内分组（Section）→ 见 card.md

## 交互

不可交互。

## 多宽度适配

无差异。Inset 数值在所有断点保持不变。
