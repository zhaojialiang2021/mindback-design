---
name: ActionBar
status: placeholder
last_updated: 2026-05-12
used_by: [home, memory-review, time-fragment]
---

# ActionBar

页面操作栏。承载页面级主操作或多操作组合，与顶部 NavBar 形成"导航 / 操作"对位关系。

## 规格

通用属性：

| 属性 | 值 | 设计备注 |
|------|------|------|
| 背景 | BG-0 | 与 NavBar 同层 |
| 水平内边距 | Space-4 (16px) | 与 NavBar 对齐 |
| 垂直内边距 | Space-3 (12px) | 紧凑 |
| 按钮间距 | Space-3 (12px) | 与列表项图标间距一致 |

形态差异：

| 形态 | 用途 | 高度 | 位置 | 圆角 | 顶部分割线 |
|------|------|------|------|------|------|
| Fixed | 多按钮固定底栏 | 64px + 安全区 | 紧贴底部，全宽 | 0 | 0.5px Line-NonOpaque FullWidth |
| Floating | 单一主操作浮动按钮 | 56px | 距底 Space-6，水平居中 | Radius-XLarge (20px) | 无 |

设计备注：ActionBar 与 NavBar 是镜像关系——一个在顶部承载导航，一个在底部承载操作。home 现有的"录入"按钮是 Floating 形态。

## 变体

| 变体 | 形态 | 关键差异 |
|------|------|------|
| FixedSingle | Fixed | 一个 Button Primary 全宽（calc(100% - Space-4×2)） |
| FixedMulti | Fixed | 2-3 个按钮并列，主操作 Button Primary 占剩余宽度，次操作 Button Secondary 紧凑（最少 88px） |
| FloatingPrimary | Floating | 单一 Button Primary 圆角矩形，宽度自适应文字 + Space-4 ×2 padding |
| FloatingActions | Floating | 多操作合成的浮动卡片（home 录入入口形态），内含图标按钮组 |

## 交互

| 交互 | 行为 | 触觉 |
|------|------|------|
| 点击次操作 | 触发对应动作 | light |
| 点击主操作（提交类） | 提交并反馈 | success |
| 点击主操作（导航类） | 跳转 | light |

设计备注：触觉规则继承 Button 组件——按钮自身决定触觉，ActionBar 只是容器。

## 多宽度适配

| 断点 | 变化 | 说明 |
|------|------|------|
| Mobile | Fixed 全宽，Floating 居中（不超过 calc(100% - Space-4×2)） | 标准移动体验 |
| Tablet | Fixed 内容区最大 540px 居中（背景仍全宽以贴边）；Floating 位置不变 | 与内容区对齐 |
| Desktop | 桌面端 ActionBar 通常被 Sidebar 内的常驻操作替代，慎用 | 桌面布局优先用 Sidebar |

设计备注：Desktop 上 ActionBar 出现的场景较少——侧边栏已能承载操作。仅在内容流式页面（如 home 的录入入口）保留 Floating 形态。
