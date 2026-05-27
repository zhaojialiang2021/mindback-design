---
name: Toast
status: placeholder
last_updated: 2026-05-12
used_by: [ai-preferences, home, memory-review, time-fragment]
---

# Toast

轻量提示条，承载非阻塞反馈（保存成功、操作撤销提示等）。不接管焦点，自动消失。

## 规格

| 属性 | 值 | 设计备注 |
|------|------|------|
| 形态 | 胶囊条幅 | 与 Switch 同语言，区别于 Modal/Card |
| 位置 | 底部居中（默认）/ 顶部居中（Modal Sheet 展开时） | 避免遮挡当前操作焦点 |
| 距边距离 | 距底 Space-6 (32px) / 距顶 Space-6 | 留出系统手势区 |
| 宽度 | Mobile: 内容自适应，最大 calc(100% - Space-4×2) / Tablet+: 最大 360px | 不强占整行 |
| 高度 | 自适应内容，最少 44px | 与 NavBar 区分 |
| 圆角 | Radius-Full | 胶囊感 |
| 背景 | BG-Inverse（Light）/ BG-0 + 1px Line-NonOpaque inset 边框（Dark） | 反色让提示明显但不喧宾夺主 |
| 文字 | Body-Primary (17px)，颜色 Label-Inverse | 主文 |
| 水平内边距 | Space-4 (16px) | 紧凑但不挤 |
| 垂直内边距 | Space-3 (12px) | 与 Input 一致 |
| 左图标 | 可选，24px，Space-3 右边距 | 用于状态提示 |

## 变体

| 变体 | 关键差异 | 触觉 |
|------|------|------|
| Default | 仅文字 | 无 |
| Success | 左图标 ✓（Accent-EventGreen） | success |
| Warning | 左图标 ⚠（Accent-EventOrange） | warning |
| Error | 左图标 ✕（Accent-EventRed） | warning |
| WithAction | 右侧文字按钮（如"撤销"，颜色 Brand-Blue） | 操作按钮点击 light |

设计备注：Error 用 warning 触觉而非更强反馈，避免恐吓——错误已是负面信号，触觉只需提醒。

## 动效

| 阶段 | 参数 |
|------|------|
| 入场 | 从对应边缘偏移 100% 滑入 + 透明度 0 → 1，Duration-Normal Curve-EaseOut |
| 退场 | 对称，Duration-Normal Curve-EaseIn |

## 显示时长

| 类型 | 时长 |
|------|------|
| 短（Default / Success） | 3s |
| 长（Warning / Error / WithAction） | 5s |
| 永久 | 用户主动关闭或点击操作按钮 |

## 行为约束

- Toast 不接管焦点（与 Modal 区分）
- 同时只显示一个，新 Toast 替换旧 Toast（旧的立即退场，新的入场）
- 用户滚动或交互不影响计时

## 多宽度适配

| 断点 | 变化 | 说明 |
|------|------|------|
| Mobile | 内容自适应，最大 calc(100% - Space-4×2)，居中 | 紧凑 |
| Tablet | 最大 360px，居中 | 不随内容区拉伸 |
| Desktop | 同 Tablet | 与 Tablet 一致 |
