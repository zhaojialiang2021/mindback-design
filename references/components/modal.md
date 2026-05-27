---
name: Modal
status: placeholder
last_updated: 2026-05-12
used_by: [ai-preferences, home, memory-review, time-fragment]
---

# Modal

模态弹层。Mobile 形态为底部 Sheet，Tablet+ 居中弹窗。

## 规格

| 属性 | 值 | 设计备注 |
|------|------|------|
| 形态 | Mobile: 底部 Sheet（从下滑入）/ Tablet+: 居中卡片 | 移动端首选 Sheet，与 iOS 系统一致 |
| 宽度 | Mobile: 100% / Tablet+: 540px | 桌面端不全屏，避免压迫 |
| 圆角 | Mobile: 顶部 Radius-XLarge (20px)、底部 0 / Tablet+: 全 Radius-XLarge | Mobile Sheet 视觉特征：贴底圆顶 |
| 背景 | BG-0 | 与 NavBar 同层 |
| 顶部把手 | 36×4px Fill-Primary 胶囊形，居中，距顶 Space-2 (8px) | 暗示可拖动关闭（仅 Mobile Sheet） |
| 顶部 NavBar | 复用 NavBar Modal 变体（Leading=close，Title 居中，Trailing=完成） | 入口动作明确 |
| 蒙层 | rgba(0,0,0,0.4) | 突出焦点，与 design-principles "无渐变" 兼容（纯色） |

## 动效

| 阶段 | 参数 |
|------|------|
| 入场（Sheet） | 内容从下方 100% 偏移滑入，Duration-Normal Curve-EaseOut；蒙层透明度 0 → 1 同步 |
| 入场（居中弹窗） | 内容从 scale 0.95 + opacity 0 → scale 1 + opacity 1，Duration-Normal Curve-EaseOut |
| 退场 | 与入场对称，Duration-Normal Curve-EaseIn |

## 交互

| 交互 | 行为 | 触觉 |
|------|------|------|
| 点击蒙层 | 关闭 | light |
| 下拉手势（Sheet） | 拖过阈值（高度 30%）释放则关闭，否则回弹 | medium（关闭瞬间） |
| 点击 Leading close | 关闭 | light |
| 点击 Trailing 完成 | 提交并关闭 | success |

设计备注：success 触觉只在确认提交瞬间触发，"关闭=取消" 用 light，不混用。

## 多宽度适配

| 断点 | 变化 | 说明 |
|------|------|------|
| Mobile | 底部 Sheet，全宽，贴底 | 标准移动体验 |
| Tablet | 居中卡片 540px，全 Radius-XLarge，无把手 | 不再是 Sheet 形态 |
| Desktop | 居中卡片 540px | 与 Tablet 一致 |

设计备注：Tablet 起切换到居中卡片，把手随之去掉——把手是 Sheet 专属语言。
