# MemoryReview 记忆回顾页

> status: draft

按时间维度浏览历史记录，支持筛选和搜索。

---

## 页面结构

```
记忆回顾页 (393×滚动)
├── StatusBar + NavBar (毛玻璃)
│   ├── 返回按钮 (左)
│   ├── 标题 "记忆回顾" (居中, 16px Medium)
│   └── 更多按钮 (右, 24px)
├── 搜索栏 (16px 边距)
│   └── 圆角搜索框 (40px高, BG-2 背景, Radius-Large 12px)
│       ├── 搜索图标 (20px)
│       └── Placeholder "搜索你的回忆"
├── 推荐标签区 (横向滚动)
│   └── 推荐卡片 × N (168×58px, 带渐变背景和阴影)
│       ├── 标题 (14px Medium, #6277DE → 统一为 Brand-Blue)
│       └── 副标题 (12px, Label-Secondary)
├── 筛选标签栏 (横向)
│   ├── "全部" (选中态: Brand-Blue 背景, 白色文字)
│   ├── "年" / "月" / "周" (未选中: BG-2 背景, Label-Tertiary 文字)
│   └── 圆角 8px, 内边距 8px 上下
├── 记忆卡片列表 (16px 边距, 12px 卡片间距)
│   └── 记忆卡片 × N
│       ├── 时间戳 (12px SF Mono, Label-Tertiary)
│       ├── 正文 (16px/400, Label-Primary, 完整展示)
│       ├── 附加内容（可选）
│       │   ├── 语音条 (半透明背景, 时长 + 语音图标)
│       │   ├── 链接摘要 + 缩略图 (68px)
│       │   └── 来源标记 (14px favicon + 来源名, Label-Tertiary)
│       └── 背景 BG-0 (白色) 或 BG-1 (#FCFCFC)
└── HomeIndicator
```

---

## 视觉规格

- 页面背景白色 (BG-0)
- 顶部 NavBar 有毛玻璃效果 (backdrop-blur: 40px)
- 推荐卡片有渐变背景 + 微阴影，这是特殊场景，遵循"品牌展示区可豁免渐变"的约定
- 记忆卡片背景：当前设计中有白色和 #FCFCFC 两种，统一为 BG-0 (白色)
- 筛选标签选中态背景：Brand-Blue (#78AAFA)，文字白色
- 筛选标签未选中态背景：BG-2，文字 #BFBFC1

---

## 触觉反馈

| 交互 | 意图 |
|------|------|
| 点击记忆卡片 | light |
| 点击筛选标签 | tick |
| 点击搜索框 | light |
| 长按记忆卡片 | medium |

---

## 依赖组件

| 组件 | 状态 |
|------|------|
| NavBar | placeholder |
| Card | draft |
| TypeTag | draft |
| Divider | placeholder |

---

## 多宽度适配

| 屏幕 | 行为 |
|------|------|
| Mobile | 全屏 |
| Tablet/Desktop | 居中最大 680px |
