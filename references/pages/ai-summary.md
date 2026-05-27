# AISummary 智能总结详情页

> status: draft

AI 生成的结构化总结内容展示。

---

## 页面结构

```
智能总结页 (393×1877)
├── StatusBar (白色文字，深色 Header 上)
├── Header 区 (深色背景, 200px 高度)
│   ├── 时间戳 (14px, Label-Tertiary)
│   ├── 品牌蓝竖线装饰 (4px × 26px / 28px, 品牌蓝)
│   ├── 标题 "你的8月回顾" (28px Semibold, 两行)
│   ├── 智能总结标签 (图标 + "智能总结" 14px, #7A8EDF → 统一为 Brand-Blue-Text)
│   └── 右上角关闭/更多按钮
├── 内容区 (白色背景, 圆角 24px 顶部)
│   ├── 分割线
│   └── 结构化内容
│       ├── 段落文本 (Body-Primary, text-justify)
│       ├── 小节标题 (20px Medium, Headline-H3)
│       ├── 列表项 (圆点 6px + 文字, Body-Primary)
│       │   └── 加粗关键词 (Medium 字重)
│       ├── 编号列表 ("1." + 标题, Medium)
│       └── 缩进子列表 (pl 20px)
├── 底部引用区 (BG-1 背景, 上边框 Line-NonOpaque)
│   ├── 引用图标 (28px)
│   ├── "引用 3 条相关内容" (16px Medium)
│   ├── 来源列表
│   │   ├── 来源图标 (16px) + 来源名 + 分隔 + 标题 (Caption-1, Label-Secondary)
│   │   └── MindBack 内部引用 / 外部链接 / 语音引用
│   └── "内容由 AI 生成" (12px, Label-Quaternary, 居中)
└── HomeIndicator
```

---

## 视觉规格

- Header 背景：黑色，带装饰图形
- 内容区：白色，顶部圆角 24px 覆盖在 Header 上
- 品牌蓝竖线：4px 宽，在标题左侧，两段不等高（26px / 28px）
- 列表圆点：6px 实心圆，左右 padding 4px/10px
- 缩进列表：左侧增加 20px padding
- 链接文字：Link 令牌色
- 底部引用区间距：pt 32px，pb 64px，px 24px

---

## 间距

| 场景 | 值 | 令牌 |
|------|------|------|
| 内容区水平边距 | 24px | Space-6 |
| 段落间间距 | 12px | Space-3 |
| 小节间间距 | 24px | Space-6 |
| 小节标题与内容间距 | 12px | Space-3 |
| 列表项间距 | 6px | Space-1 + Space-2 之间 |

---

## 触觉反馈

| 交互 | 意图 |
|------|------|
| 点击引用来源 | light |
| 点击链接文字 | light |

---

## 依赖组件

| 组件 | 状态 |
|------|------|
| NavBar | placeholder |
| Divider | placeholder |

---

## 多宽度适配

| 屏幕 | 行为 |
|------|------|
| Mobile | 全屏 |
| Tablet/Desktop | 居中最大 680px |
