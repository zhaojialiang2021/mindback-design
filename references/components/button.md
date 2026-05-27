---
name: Button
status: complete
last_updated: 2026-04-30
used_by: [home, ai-preferences, settings, time-fragment, splash]
---

# Button

## 规格

| 属性 | 值 | 设计备注 |
|------|------|------|
| 形状 | Pill 或 Rounded Rect（见尺寸变体） | 品牌调性：柔和、友好 |
| 高度 | Standard 48px / Compact 34px / Large 51px | 按场景选择 |
| 水平内边距 | Standard: Space-4 (16px) / Compact: Space-3 (12px) | 两侧对称 |
| 字体 | Standard: Callout (16px/500) / Compact: Caption-1 (12px/500) | 500 字重 |
| 字色 | 见变体表 | — |
| 背景 | 见变体表 | — |

## 尺寸变体

| 尺寸 | 高度 | 圆角 | 用途 |
|------|------|------|------|
| Standard | 48px | Radius-Full (9999px) 或 Radius-XLarge (20px) | 主要操作、CTA |
| Compact | 34px | Radius-Full (9999px) | 标签按钮、内联操作（如"填写领取"） |
| Large | 51px | Radius-XLarge (18px) | 启动页"开启记录"等全宽 CTA |

## 颜色变体

| 变体 | 背景色 | 字色 | 边框 | 用途 |
|------|--------|------|------|------|
| Primary | `#212121` / Dark: `#F8F9F9` | `#FFFFFF` / Dark: `#101010` | 无 | 主要操作（提交、确认、邀请好友） |
| Secondary | 透明 | Label-Primary | 1px solid Label-Secondary | 次要操作（取消） |
| Brand-Soft | Brand-Blue-Light (`rgba(120,170,250,0.1)`) | Brand-Blue | 无 | 品牌色辅助操作（填写领取） |
| Light | BG-0 (`#F6F6F6`) | Label-Primary | 无 | 深色背景上的浅色按钮（启动页） |
| Disabled | 同 Primary | 同 Primary | 无 | opacity: 0.3 |

## 带图标按钮

| 变体 | 图标位置 | 图标尺寸 | 间距 |
|------|---------|---------|------|
| Icon-Left | 文字左侧 | 20px | 6px (图标与文字) |
| Icon-Only | 无文字，图标居中 | 20px | — |

示例：邀请好友按钮 = [icon 20px] "邀请好友" "获得限时奖励"（主文字白色 + 辅助文字 Fill-Inverted-Secondary）

## 交互状态

| 状态 | 变化 | 触觉 |
|------|------|------|
| Default | 无 | — |
| Active | 背景 opacity 降至 0.7，Duration-Fast (150ms) 过渡 | light |
| Disabled | 整体 opacity 0.3，不可点击 | 无 |

## 多宽度适配

| 断点 | 变化 | 说明 |
|------|------|------|
| Mobile | 全宽或内联 | 根据场景决定 |
| Tablet | 最大宽度 320px | 居中显示 |
| Desktop | 最大宽度 280px | 不超过内容区 |
