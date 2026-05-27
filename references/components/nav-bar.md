---
name: NavBar
status: placeholder
last_updated: 2026-05-12
used_by: [ai-preferences, ai-summary, home, memory-review, time-fragment]
---

# NavBar

页面顶部导航栏，承载页面标题、返回入口、次要操作。

## 规格

| 属性 | 值 | 设计备注 |
|------|------|------|
| 高度 | 48px | 紧凑，与 home 现有 Head 一致 |
| 背景 | BG-0 | 与页面 BG-1 形成层级 |
| 水平内边距 | Space-4 (16px) | 两侧对齐内容区 |
| 底部分割线 | 0.5px Line-NonOpaque | 仅在内容滚动后显示，与内容区无缝时隐藏 |

设计备注：home.md 明确说明首页与内容区"无缝衔接"，但二级页面通常需要分割。统一规则是：滚动偏移 > 0 时显示分割线，否则隐藏。

## 布局区

| 区域 | 宽度 | 内容 |
|------|------|------|
| Leading | 44px | 返回按钮（arrow-back, 24px）/ 关闭按钮（close, 24px）/ Logo（首页） |
| Title | flex-1 | 居中，Headline-H3 (20px/500)，单行省略 |
| Trailing | 44px | 单图标 24px，或多图标按 Space-3 间距 |

## 变体

| 变体 | 用途 | 关键差异 |
|------|------|------|
| Standard | 二级页面（ai-preferences、ai-summary、time-fragment、memory-review） | Leading=arrow-back，Title=页面名 |
| Modal | 弹层页面 | Leading=close，Trailing=完成（Button Compact） |
| Logo | 首页 | Leading=Logo（104px 宽，覆盖 Leading 区域），无 Title，Trailing=star |

## 交互

| 交互 | 行为 | 触觉 |
|------|------|------|
| 点击返回 | 路由后退 | light |
| 点击 Trailing 图标 | 触发对应操作 | light |
| 点击关闭 | 关闭模态 | light |

## 多宽度适配

| 断点 | 变化 | 说明 |
|------|------|------|
| Mobile | 全宽 | 标准体验 |
| Tablet | 全宽，Title 最大 540px 居中 | 与内容区对齐 |
| Desktop | 隐藏（被左侧导航替代） | 桌面端走 Sidebar 模式 |
