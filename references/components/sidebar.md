---
name: Sidebar
status: placeholder
last_updated: 2026-05-12
used_by: [notifications, sidebar, tab-architecture]
---

# Sidebar

设置/导航类页面的左侧或全屏抽屉，承载分组列表项。

## 规格

| 属性 | 值 | 设计备注 |
|------|------|------|
| 宽度 | Mobile: 100% / Tablet+: 320px | 桌面参考 design-principles "侧边栏 ~200px" 但需容纳分组卡，调宽 |
| 背景 | BG-1 | 页面底色，让分组卡（BG-0）浮起来 |
| 内边距 | Space-4 (16px) 水平 | 与正文一致 |

## 分组卡（Container Card 形态）

复用 Card 组件 Container 形态：背景 BG-0，圆角 Radius-XLarge (20px)，内边距 Space-4。

| 元素 | 规格 |
|------|------|
| 分组标题 | Caption-1 (12px)，Label-Secondary，Space-3 上下边距 |
| 列表项 | 高度 48px，左右 Space-4，分隔用 Divider 组件 |
| 列表项左图标 | 24px，Space-3 右边距 |
| 列表项标题 | Body-Primary (17px) |
| 列表项右尾 | 文字（Label-Secondary）/ Switch / 右箭头 24px |

设计备注：与 tab-architecture.md 对齐——Tab 3 "我"页面是设置入口的合并版，Sidebar 主要服务于 Tab 3 的子页面（如通知设置、AI 偏好详情）。

## 交互

| 交互 | 行为 | 触觉 |
|------|------|------|
| 点击列表项 | 进入对应页面 / 触发动作 | light |
| 切换 Switch | 改变设置 | light |

## 多宽度适配

| 断点 | 变化 | 说明 |
|------|------|------|
| Mobile | 全屏抽屉，从左滑入，Duration-Normal | 移动端不常驻 |
| Tablet | 320px 固定侧栏，与内容区并列 | 与内容区共存 |
| Desktop | 320px 固定侧栏，常驻 | 替代 NavBar |
