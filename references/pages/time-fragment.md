# TimeFragment 时间碎片详情

> status: draft

展示用户的能力资产和记忆点。

---

## 页面结构

```
时间碎片详情 (393×1119)
├── StatusBar (50px)
├── NavBar (48px)
│   ├── 返回按钮
│   ├── 标题 "记录事务所"
│   └── 占位图标 (opacity: 0)
├── Header 卡片 (361×245px, 距顶 104px, 居中 16px 边距)
│   ├── 品牌装饰区 (渐变背景 + 散落圆点)
│   ├── "记忆点" 标签 + Info 图标 (16px, 白色文字)
│   └── 点数展示 (46px 数字 + "点" 单位)
├── 提示行 (12px, "每日记录三条可获得 1 个记忆点")
├── "我的能力" 标题 (带品牌蓝竖线 3px)
├── 能力卡片网格 (2列, gap 16px)
│   ├── 音视频解析能力 (Deco-Rose 图标, "6 次待使用")
│   ├── 时间碎片 (Deco-Sky 图标, "12 枚待使用")
│   ├── 频道数量 (Deco-Sage 图标, "2 个待创建")
│   ├── AI 溯源 (Deco-Lavender 图标, "180 天")
│   ├── Web 端内测 (Deco-Sky 图标, "邀请好友获取")
│   └── Live 图发送 (Deco-Teal 图标, "即将上线")
├── 底部渐变 + CTA 按钮
│   └── "邀请好友 获得限时奖励" (黑色按钮, Radius-XLarge 20px)
└── 邀请码卡片 (白色, 0.5px 边框, Radius-XLarge 20px)
    ├── 标题 "填写邀请码，获得新人礼包 🎁"
    ├── 副标题 "可领取时间碎片、音视频解析等能力"
    ├── "填写领取" 按钮 (品牌蓝 0.1 透明度背景, 品牌蓝文字)
    └── 关闭图标
```

---

## 能力卡片规格

- 高度 148px，Radius-XLarge (20px)
- 图标：32×32px，圆角 10px，装饰色背景
- 标题：14px Medium，Label-Primary
- 右侧箭头：12px
- 数据：22px SemiBold (Google Sans Flex) + 12px 单位文字，Label-Secondary
- 左侧 4px 宽的彩色竖条（装饰色，与图标对应）
- 待使用/即将上线等状态文字：12px，Label-Secondary

---

## Header 卡片特殊处理

- 品牌 Blue 渐变背景，带散落圆形装饰和投影
- 这是品牌展示区，允许渐变和投影，作为"禁止装饰性渐变和阴影"的豁免场景
- 点数使用 Google Sans Flex 字体（数字等宽对齐），46px SemiBold，白色
- "点" 使用 PingFang SC Medium，20px，白色 60% 透明度

---

## 间距

| 场景 | 值 | 令牌 |
|------|------|------|
| 页面水平边距 | 16px | Space-4 |
| Header 卡片距 NavBar | 6px | — |
| 能力卡片间距 | 16px | Space-4 |
| 能力卡片内边距 | 16px | Space-4 |
| 能力网格距标题 | 42px | — |
| 底部 CTA 区域 padding | 32px 64px | Space-7 Space-8 |

---

## 触觉反馈

| 交互 | 意图 |
|------|------|
| 点击能力卡片 | light |
| 点击邀请按钮 | light |
| 点击填写领取 | light |

---

## 依赖组件

| 组件 | 状态 |
|------|------|
| NavBar | placeholder |
| Card | draft |

---

## 多宽度适配

仅 Mobile 端。
