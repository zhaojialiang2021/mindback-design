---
name: Slider
status: complete
last_updated: 2026-04-30
used_by: [ai-preferences]
---

# Slider

连续值滑块控件，用于 AI 人格维度调节。

## 规格

| 属性 | 值 | 设计备注 |
|------|------|------|
| 轨道高度 | 48px | 包含内边距，实际可视轨道更窄 |
| 轨道宽度 | 跟随容器，最大 345px | 卡片内边距后剩余宽度 |
| 轨道圆角 | Radius-Full (9999px) | 胶囊形 |
| 轨道背景 | Fill-Quaternary | 极弱填充 |
| 滑块尺寸 | 36×36px | 圆形 |
| 滑块颜色 | BG-0 (白色) | 白色滑块在品牌色填充上清晰 |
| 填充色 | Brand-Blue `#78AAFA` | 品牌色做点缀，填充区是合法的点缀场景 |
| 中线标记 | 2px 宽，8px 高，Fill-Secondary | 标示中点位置 |

## 标签

| 属性 | 值 |
|------|------|
| 标题字体 | Subhead (14px/400)，Label-Primary |
| 两端文字 | Caption-1 (12px/400)，Label-Tertiary |
| 标题与轨道间距 | Space-2 (8px) |
| 轨道与两端文字间距 | Space-2 (8px) |

## 交互

| 交互 | 行为 | 触觉 |
|------|------|------|
| 拖拽 | 实时更新填充和值 | tick（拖拽过程中） |
| 释放 | 停止更新 | light |

## 多宽度适配

| 断点 | 变化 | 说明 |
|------|------|------|
| Mobile | 无变化 | 标准体验 |
| Tablet | 无变化 | 标准体验 |
| Desktop | 无变化 | 标准体验 |
