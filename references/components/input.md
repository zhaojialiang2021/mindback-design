---
name: Input
status: placeholder
last_updated: 2026-05-12
used_by: [ai-preferences, home, memory-review, onboarding, time-fragment]
---

# Input

文本输入控件。

## 规格

| 属性 | 值 | 设计备注 |
|------|------|------|
| 高度 | 48px（单行）/ 自适应（多行最少 88px） | 与列表项 48px 对齐，触达友好 |
| 圆角 | Radius-Medium (12px) | 与 Card Compact 一致，不抢视觉 |
| 背景 | Fill-Primary | 在 BG-0 / BG-1 上都有微弱浮起感 |
| 水平内边距 | Space-4 (16px) | 与正文边距对齐 |
| 垂直内边距 | Space-3 (12px) | 文字垂直居中 |
| 文字样式 | Body-Primary (17px) | 主输入正文 |
| 占位符 | Body-Primary，Label-Tertiary | 弱化但可读 |

## 状态

| 状态 | 关键差异 |
|------|------|
| Default | 背景 Fill-Primary，无边框 |
| Focus | 1px Brand-Blue inset 边框 |
| Error | 1px Accent-EventRed inset 边框 + 下方 Caption-1 错误文字（Accent-EventRed） |
| Disabled | 透明度 0.4，不响应交互 |

设计备注：聚焦边框用 inset 而非外扩，避免布局抖动；错误文字与边框同色，关联清晰。

## 变体

| 变体 | 用途 | 关键差异 |
|------|------|------|
| Standard | 单行输入（搜索除外） | 基础形态 |
| Multiline | 多行输入（碎片记录、AI 偏好详情） | 高度自适应，最少 88px，最多 240px 后内部滚动 |
| Search | 搜索场景 | 左图标 search 24px（Space-3 右边距），右图标 close 24px（有内容时显示，点击清除） |

## 交互

| 交互 | 行为 | 触觉 |
|------|------|------|
| 聚焦 / 失焦 | 切换 Default / Focus 状态 | 无 |
| 点击搜索清除按钮 | 清空输入 | light |
| 输入达到字数上限 | 阻止继续输入 | warning |

设计备注：聚焦/失焦不出触觉，避免输入流中的多余反馈。

## 多宽度适配

| 断点 | 变化 | 说明 |
|------|------|------|
| Mobile | 全宽 | 占满父容器 |
| Tablet | 全宽，最大 540px 居中（位于内容区时） | 与内容区对齐 |
| Desktop | 同 Tablet | 与内容区对齐 |
