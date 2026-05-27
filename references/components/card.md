---
name: Card
status: complete
last_updated: 2026-04-30
used_by: [home, memory-review, time-fragment, detail, search]
---

# Card

内容卡片是 MindBack 的核心组件，承载所有信息流条目。

## 圆角分级

Card 有两种圆角，按容器语义区分：

| 类型 | 圆角 | 用途 |
|------|------|------|
| Content | Radius-Large (12px) | 记忆回顾页的内容条目卡片 |
| Container | Radius-XLarge (20px) | 侧边栏分组、能力卡片、用户信息卡、邀请码卡 |

设计备注：Content 卡片承载具体内容（文字+来源），视觉上应该"安静"；Container 卡片是分组容器，更大的圆角传达"这是一个独立区域"。

## 通用规格

| 属性 | 值 | 设计备注 |
|------|------|------|
| 背景 | BG-0 | 白色卡片，不用灰色填充 |
| 内边距 | Space-4 (16px) | 四边对称 |
| 间距 | Space-3 (12px) | 卡片与卡片之间 |
| 阴影 | 无 | 用背景层级差异表达深度，不用投影 |
| 边框 | 无 或 0.5px Line-NonOpaque | 带边框用于白底上的白色卡片区分 |

## 内容卡 (Content) 结构

```
┌──────────────────────────┐
│ 时间戳 (Caption-1, SF Mono) │
│ 正文 (Body-Primary, 完整展示) │
│ [附加内容区]              │ ← 可选
│ [来源标记]                │ ← 可选
└──────────────────────────┘
```

附加内容区按内容类型：

| 类型 | 附加内容 |
|------|---------|
| 纯文字 | 无 |
| 带语音 | 语音条 (半透明背景, 时长 + 图标, 18px) |
| 带链接 | 摘要文字 + 缩略图 (68px, Radius-Medium 8px) |
| 带图片 | 缩略图 (68px, Radius-Small 4px) |

来源标记：14×14px favicon + 来源名 (Caption-1, Label-Tertiary)

## 容器卡 (Container) 结构

```
┌──────────────────────────┐
│ [图标 32px] [标题]        │
│                           │
│ [数量 22px] [单位 12px]   │
│                           │
│ 左侧 4px 彩色竖条         │
└──────────────────────────┘
```

- 图标：32×32px，装饰色圆角背景 (Radius-Medium 10px)
- 标题：Subhead (14px/500)，Label-Primary + 右侧 12px 箭头
- 数量：22px Google Sans Flex SemiBold
- 单位：Caption-1 (12px)，Label-Secondary
- 左侧竖条：4px 宽，28px 高，与图标装饰色对应

## 交互

| 交互 | 行为 | 触觉 |
|------|------|------|
| 点击 | 进入详情 / 执行操作 | light |
| 长按 | 弹出操作菜单 | medium |

Active 态：背景从 BG-0 变为 BG-2，Duration-Fast (150ms) 过渡。

## 多宽度适配

| 断点 | 变化 | 说明 |
|------|------|------|
| Mobile | 全宽 | 标准体验 |
| Tablet | 最大宽度 680px | 居中显示 |
| Desktop | 最大宽度 680px，缩略图移至右侧 | 横向布局 |
