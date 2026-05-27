# MindBack 设计令牌

> 本文档是视觉规格的真相源。所有组件和页面必须引用令牌名称，禁止硬编码数值。
> 令牌变更只需改此文档，通过构建脚本同步到所有平台。

---

## 颜色

### Label（文本）

| 令牌名 | Light | Dark | 用途 |
|--------|-------|------|------|
| Label-Primary | `#212121` | `#F8F9F9` | 标题、正文主文本 |
| Label-Secondary | `rgba(60,60,67,0.6)` | `rgba(235,235,245,0.6)` | 辅助说明、副标题 |
| Label-Tertiary | `rgba(60,60,67,0.3)` | `rgba(235,235,245,0.3)` | 占位符、禁用态文本 |
| Label-Quaternary | `rgba(60,60,67,0.22)` | `rgba(235,235,245,0.22)` | 极弱提示、水印 |

### Background（背景）

| 令牌名 | Light | Dark | 用途 |
|--------|-------|------|------|
| BG-0 | `#FFFFFF` | `#101010` | 卡片、弹窗、输入框 |
| BG-1 | `#F5F5F5` | `#1A1A1A` | 页面底色 |
| BG-2 | `#EBEBEB` | `#242424` | 导航选中态、分组背景 |
| BG-3 | `#D8D8D8` | `#2C2C2C` | 底部安全区、分割带 |
| BG-4 | `#E6E6E6` | `#333333` | 极深层级背景 |

### Fill（填充）

| 令牌名 | Light | Dark | 用途 |
|--------|-------|------|------|
| Fill-Primary | `rgba(120,120,128,0.2)` | `rgba(120,120,128,0.36)` | 开关关闭态、滑块轨道 |
| Fill-Secondary | `rgba(120,120,128,0.16)` | `rgba(120,120,128,0.32)` | 进度条底色 |
| Fill-Tertiary | `rgba(120,120,128,0.12)` | `rgba(120,120,128,0.24)` | 占位图底色 |
| Fill-Quaternary | `rgba(120,120,128,0.08)` | `rgba(120,120,128,0.18)` | 极弱填充 |
| Fill-Inverted-Primary | `rgba(255,255,255,0.32)` | `rgba(255,255,255,0.32)` | 深色上的白填充 |
| Fill-Inverted-Secondary | `rgba(255,255,255,0.24)` | `rgba(255,255,255,0.24)` | 深色上的弱白填充 |
| Fill-Inverted-Tertiary | `rgba(255,255,255,0.16)` | `rgba(255,255,255,0.16)` | 深色上的极弱白填充 |
| Fill-Inverted-Quaternary | `rgba(255,255,255,0.08)` | `rgba(255,255,255,0.08)` | 深色上的微弱白填充 |

### Line（线条）

| 令牌名 | Light | Dark | 用途 |
|--------|-------|------|------|
| Line-Opaque | `#C5C5C7` | `#545458` | 强分割（约 10% 场景） |
| Line-NonOpaque | `rgba(0,0,0,0.08)` | `rgba(255,255,255,0.08)` | 默认分割（约 90% 场景） |

### Brand / Accent

| 令牌名 | 值 | 用途 |
|--------|------|------|
| Brand-Blue | `#78AAFA` | 品牌蓝，只做点缀 |
| Brand-Blue-Light | `rgba(120,170,250,0.08)` | AI 回应气泡背景 |
| Brand-Blue-Border | `rgba(120,170,250,0.2)` | AI 回应气泡边框 |
| Brand-Blue-Text | `#4184EF` | AI 回应文本色 |
| Accent-Blue | `#78AAFA` | 智能总结标签 |
| Accent-Yellow | `#FFCC00` | 待办事项标签 |
| Accent-Green | `#34C759` | 日记标签 |
| Accent-Pink | `#FF6482` | 持续月录标签 |
| Accent-Brown | `#916964` | 文件标签 |
| Accent-EventBlue | `#5B9BDB` | 事件追踪标签 |
| Link | `#133667` / Dark: `#C6D9EF` | 可点击链接 |

设计备注：Brand-Blue 半透明变体用于区分 AI 产出内容和用户内容，是唯一允许品牌色"大面积"出现的场景。Brand-Blue-Text 是从 #78AAFA 降饱和度而来，保证在浅底上的可读性。Figma 中出现的 #6277de 和 #7a8edf 是旧版设计遗留，统一到 #78AAFA 体系。

### Decorative（装饰色）

| 令牌名 | 值 | 用途 |
|--------|------|------|
| Deco-Teal | `#81D5CA` | Live 图功能图标背景 |
| Deco-Sky | `#84B1EB` | Web 端 / 时间碎片图标背景 |
| Deco-Lavender | `#9F8CCF` | AI 溯源图标背景 |
| Deco-Sage | `#A0C484` | 频道数量图标背景 |
| Deco-Rose | `#AA7D78` | 音视频解析图标背景 |

设计备注：装饰色只用于功能图标底色（32×32px 圆角方块），不用于文字、背景或任何大面积场景。不新增。

---

## 字号

仅使用 PingFang SC，禁止其他字体。

| 令牌名 | 大小 | 字重 | 行高 | 用途 |
|--------|------|------|------|------|
| Headline-H1 | 32px | 500 | 1.2 | 页面主标题（极少使用） |
| Headline-H2 | 24px | 500 | 1.3 | 区块标题 |
| Headline-H3 | 20px | 500 | 1.35 | 卡片标题 |
| Body-Primary | 17px | 400 | 1.5 | 正文主文本 |
| Body-Secondary | 15px | 400 | 1.45 | 辅助正文 |
| Callout | 16px | 500 | 1.4 | 强调文本、按钮内文字 |
| Subhead | 14px | 400 | 1.4 | 副标题、列表项 |
| Footnote | 13px | 400 | 1.38 | 脚注、来源标注 |
| Caption-1 | 12px | 400 | 1.3 | 标签、辅助标记 |
| Caption-2 | 11px | 400 | 1.2 | 极小标注 |

### Number 变体

数字场景使用 `font-variant-numeric: tabular-nums`，保证等宽对齐。

---

## 间距

10 级间距梯度，所有间距必须是以下值之一，禁止自定义中间值。

| 令牌名 | 值 | 典型用途 |
|--------|------|------|
| Space-1 | 4px | 图标与文字间距、紧凑内边距 |
| Space-2 | 8px | 导航项圆角、小元素间距 |
| Space-3 | 12px | 卡片间距、列表项间距 |
| Space-4 | 16px | 卡片内边距、标准组件内间距 |
| Space-5 | 20px | 区块间距、表单项间距 |
| Space-6 | 24px | 页面边距（紧凑） |
| Space-7 | 32px | 页面边距（标准） |
| Space-8 | 40px | 大区块间距 |
| Space-9 | 48px | 页面顶部留白 |
| Space-10 | 64px | 最大留白 |

---

## 圆角

5 级圆角，用途固定，不新增。

| 令牌名 | 值 | 用途 |
|--------|------|------|
| Radius-Small | 6px | 图片、缩略图 |
| Radius-Medium | 8px | 导航项、输入框 |
| Radius-Large | 12px | 内容卡、弹窗 |
| Radius-XLarge | 20px | 消息气泡、能力卡片、侧边栏信息卡 |
| Radius-Full | 9999px | Pill 按钮、标签、头像 |

设计备注：20px 在 Figma 设计稿中出现频率极高（消息气泡、侧边栏分组、能力卡片等），是仅次于 12px 的核心圆角值。与其让所有这些场景退回 12px，不如承认它的存在并纳入令牌体系。

---

## 阴影

原则上禁用阴影。唯一例外：弹窗/模态框需要投影来区分层级。

| 令牌名 | Light | Dark | 用途 |
|--------|-------|------|------|
| Shadow-Modal | `0 8px 32px rgba(0,0,0,0.12)` | `0 8px 32px rgba(0,0,0,0.48)` | 弹窗投影 |

设计备注：Dark 模式下背景深色，阴影透明度需增加才能达到同等视觉强度。规则：主阴影透明度 +0.04，边缘层透明度 +0.04。

---

## 动效

| 令牌名 | 值 | 用途 |
|--------|------|------|
| Duration-Fast | 150ms | 开关切换、选中态变化 |
| Duration-Normal | 250ms | 页面切换、展开收起 |
| Duration-Slow | 350ms | 弹窗出入场 |
| Curve-Default | `cubic-bezier(0.25, 0.1, 0.25, 1)` | 标准缓动 |
| Curve-Spring | `cubic-bezier(0.34, 1.56, 0.64, 1)` | 弹性效果（极少使用） |
| Curve-EaseOut | `cubic-bezier(0, 0, 0.2, 1)` | 元素退出 |

---

## 令牌导出格式

本文档的结构化程度足以被工具链消费。以下是导出格式说明。

### JSON 中间层

每个令牌表可转为一个 JSON 对象，用于接入 Style Dictionary 等工具：

```json
{
  "color": {
    "label": {
      "primary": { "light": "#212121", "dark": "#F8F9F9" },
      "secondary": { "light": "rgba(60,60,67,0.6)", "dark": "rgba(235,235,245,0.6)" }
    },
    "background": {
      "0": { "light": "#FFFFFF", "dark": "#101010" },
      "1": { "light": "#F5F5F5", "dark": "#1A1A1A" }
    }
  },
  "space": {
    "1": "4px",
    "2": "8px",
    "3": "12px",
    "4": "16px"
  },
  "radius": {
    "small": "6px",
    "medium": "8px",
    "large": "12px",
    "xlarge": "20px",
    "full": "9999px"
  }
}
```

### 目标输出

| 平台 | 输出格式 | 工具 |
|------|---------|------|
| Web CSS | CSS Custom Properties | Style Dictionary |
| Web Tailwind | Tailwind v4 @theme | CSS-first 兼容 |
| iOS Swift | SwiftUI Color / CGFloat 常量 | 解析脚本 |
| Android Kotlin | Compose Color / Dp 常量 | 解析脚本 |

构建脚本：`scripts/build-tokens.sh`（待实现）。从本文档 Markdown 表格提取 → JSON 中间层 → 多平台输出。

原则上，设计师在本文档中修改一个值，CI 自动重新生成所有平台的令牌常量。git diff 直接显示"改了什么"。
