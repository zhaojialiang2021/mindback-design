---
name: TabBar
status: complete
last_updated: 2026-04-30
used_by: [home, memory-review, search, settings]
---

# TabBar

水平滚动的筛选标签栏。Figma 中出现两种风格：Feed 页用黑底 Pill，记忆回顾页用品牌蓝底圆角矩形。统一为以下规格。

## 规格

| 属性 | 值 | 设计备注 |
|------|------|------|
| 高度 | 40px | 紧凑，不占太多纵向空间 |
| 背景 | 透明 | 无底色，与页面融合 |
| 间距 | Space-2 (8px) | Tab 之间 |
| 水平内边距 | Space-4 (16px) | 两侧与内容对齐 |

## Tab 项

| 属性 | Active | Inactive |
|------|--------|----------|
| 形状 | Pill（Radius-Full） | Pill（Radius-Full） |
| 背景 | `#212121` / Dark: `#F8F9F9` | 透明 |
| 字色 | `#FFFFFF` / Dark: `#101010` | Label-Secondary |
| 字体 | Subhead (14px/500) | Subhead (14px/400) |
| 水平内边距 | Space-3 (12px) | Space-3 (12px) |

设计备注：记忆回顾页的筛选标签（全部/年/月/周）使用了品牌蓝底 + 8px 圆角的样式，那属于 TypeTag 的 Filter 形态，不是 TabBar。TabBar 统一用黑底 Pill 风格。

## 交互

| 交互 | 行为 | 触觉 |
|------|------|------|
| 点击 | 切换选中态 | tick |

切换动画：背景色 Duration-Fast (150ms) 过渡，无缩放。

## 多宽度适配

| 断点 | 变化 | 说明 |
|------|------|------|
| Mobile | 水平滚动 | 超出时可滑动 |
| Tablet | 水平滚动或全部展示 | 空间足够时全部显示 |
| Desktop | 全部展示，居中 | 无需滚动 |
