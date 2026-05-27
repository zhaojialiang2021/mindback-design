---
name: Switch
status: placeholder
last_updated: 2026-05-12
used_by: [ai-preferences, notifications, sidebar, tab-architecture]
---

# Switch

二元开关控件，用于设置项的开/关切换。

## 规格

| 属性 | 值 | 设计备注 |
|------|------|------|
| 尺寸 | 51×31px | iOS 标准规格，与系统设置视觉一致 |
| 圆角 | Radius-Full | 胶囊形 |
| 滑块 | 27×27px 圆形 | 上下各留 2px 空隙；无投影（保持扁平，与 design-principles "无渐变" 对齐） |
| 滑块颜色 | `--always-white` (#FFFFFF) | 开/关态都用白色，保持对比 |

## 状态

| 状态 | 轨道色 | 滑块位置 |
|------|------|------|
| 开 (on) | Brand-Blue | 右侧（距右边 2px） |
| 关 (off) | Fill-Primary | 左侧（距左边 2px） |
| 禁用 (disabled) | 透明度 0.4 | 不响应交互 |

设计备注：开态用 Brand-Blue 而非 Accent，统一品牌强调。关态用 Fill-Primary 让控件在 BG-0 / BG-1 上都可见。

## 动效

| 属性 | 值 |
|------|------|
| 滑块位移 | Duration-Fast (150ms) Curve-Default |
| 轨道色 | Duration-Fast (150ms) Curve-Default |

## 交互

| 交互 | 行为 | 触觉 |
|------|------|------|
| 点击 | 切换开/关 | light |
| 拖动滑块 | 跨过中线则切换 | light（仅在状态翻转瞬间） |

设计备注：触觉只在状态真正翻转时触发一次，避免拖动过程反复震动。

## 多宽度适配

无差异。Switch 是原子控件，所有断点保持 51×31px。
