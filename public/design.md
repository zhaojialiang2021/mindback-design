# MindBack Design Tokens (machine-readable)

> 自动生成自 `tokens/*.json`。AI 在生成 MindBack 风格 UI 时，所有数值必须从此处取，禁止 hardcoded hex / px。

**约束**：
- 颜色只能引用下表令牌名。Light/Dark 双模式下，dark 值见每条的 `(dark: ...)` 后缀。
- 间距、圆角是封闭枚举，禁止自定义中间值（不能写 `14px`，只能用 `space.4` = 16px）。
- 字体仅 PingFang SC，禁止其他字体。

## Color

| 令牌 | 值 | 说明 |
|---|---|---|
| `color.label.primary` | `#212121` (dark: `#F8F9F9`) | 标题、正文主文本 |
| `color.label.secondary` | `rgba(60,60,67,0.6)` (dark: `rgba(235,235,245,0.6)`) | 辅助说明、副标题 |
| `color.label.tertiary` | `rgba(60,60,67,0.3)` (dark: `rgba(235,235,245,0.3)`) | 占位符、禁用态文本 |
| `color.label.quaternary` | `rgba(60,60,67,0.22)` (dark: `rgba(235,235,245,0.22)`) | 极弱提示、水印 |
| `color.bg.0` | `#FFFFFF` (dark: `#101010`) | 卡片、弹窗、输入框 |
| `color.bg.1` | `#F5F5F5` (dark: `#1A1A1A`) | 页面底色 |
| `color.bg.2` | `#EBEBEB` (dark: `#242424`) | 导航选中态、分组背景 |
| `color.bg.3` | `#D8D8D8` (dark: `#2C2C2C`) | 底部安全区、分割带 |
| `color.bg.4` | `#E6E6E6` (dark: `#333333`) | 极深层级背景 |
| `color.fill.primary` | `rgba(120,120,128,0.2)` (dark: `rgba(120,120,128,0.36)`) | 开关关闭态、滑块轨道 |
| `color.fill.secondary` | `rgba(120,120,128,0.16)` (dark: `rgba(120,120,128,0.32)`) | 进度条底色 |
| `color.fill.tertiary` | `rgba(120,120,128,0.12)` (dark: `rgba(120,120,128,0.24)`) | 占位图底色 |
| `color.fill.quaternary` | `rgba(120,120,128,0.08)` (dark: `rgba(120,120,128,0.18)`) | 极弱填充 |
| `color.fill.inverted-primary` | `rgba(255,255,255,0.32)` | 深色上的白填充 |
| `color.fill.inverted-secondary` | `rgba(255,255,255,0.24)` | 深色上的弱白填充 |
| `color.fill.inverted-tertiary` | `rgba(255,255,255,0.16)` | 深色上的极弱白填充 |
| `color.fill.inverted-quaternary` | `rgba(255,255,255,0.08)` | 深色上的微弱白填充 |
| `color.line.opaque` | `#C5C5C7` (dark: `#545458`) | 强分割（约 10% 场景） |
| `color.line.non-opaque` | `rgba(0,0,0,0.08)` (dark: `rgba(255,255,255,0.08)`) | 默认分割（约 90% 场景） |
| `color.brand.blue` | `#78AAFA` | 品牌蓝，只做点缀 |
| `color.brand.blue-light` | `rgba(120,170,250,0.08)` | AI 回应气泡背景 |
| `color.brand.blue-border` | `rgba(120,170,250,0.2)` | AI 回应气泡边框 |
| `color.brand.blue-text` | `#4184EF` | AI 回应文本色 |
| `color.accent.blue` | `#78AAFA` | 智能总结标签 |
| `color.accent.yellow` | `#FFCC00` | 待办事项标签 |
| `color.accent.green` | `#34C759` | 日记标签 |
| `color.accent.pink` | `#FF6482` | 持续月录标签 |
| `color.accent.brown` | `#916964` | 文件标签 |
| `color.accent.event-blue` | `#5B9BDB` | 事件追踪标签 |
| `color.link` | `#133667` (dark: `#C6D9EF`) | 可点击链接 |
| `color.backdrop` | `rgba(0,0,0,0.32)` | Modal / Sheet 背后的遮罩底色 |
| `color.deco.teal` | `#81D5CA` | Live 图功能图标背景 |
| `color.deco.sky` | `#84B1EB` | Web 端 / 时间碎片图标背景 |
| `color.deco.lavender` | `#9F8CCF` | AI 溯源图标背景 |
| `color.deco.sage` | `#A0C484` | 频道数量图标背景 |
| `color.deco.rose` | `#AA7D78` | 音视频解析图标背景 |

## Spacing

| 令牌 | 值 | 说明 |
|---|---|---|
| `space.1` | `4px` | 图标与文字间距、紧凑内边距 |
| `space.2` | `8px` | 导航项圆角、小元素间距 |
| `space.3` | `12px` | 卡片间距、列表项间距 |
| `space.4` | `16px` | 卡片内边距、标准组件内间距 |
| `space.5` | `20px` | 区块间距、表单项间距 |
| `space.6` | `24px` | 页面边距（紧凑） |
| `space.7` | `32px` | 页面边距（标准） |
| `space.8` | `40px` | 大区块间距 |
| `space.9` | `48px` | 页面顶部留白 |
| `space.10` | `64px` | 最大留白 |

## Radius

| 令牌 | 值 | 说明 |
|---|---|---|
| `radius.small` | `6px` | 图片、缩略图 |
| `radius.medium` | `8px` | 导航项、输入框 |
| `radius.large` | `12px` | 内容卡、弹窗 |
| `radius.xlarge` | `20px` | 消息气泡、能力卡片、侧边栏信息卡 |
| `radius.full` | `9999px` | Pill 按钮、标签、头像 |

## Motion · Duration

| 令牌 | 值 | 说明 |
|---|---|---|
| `duration.fast` | `150ms` | 开关切换、选中态变化 |
| `duration.normal` | `250ms` | 页面切换、展开收起 |
| `duration.slow` | `350ms` | 弹窗出入场 |

## Motion · Curve

| 令牌 | 值 | 说明 |
|---|---|---|
| `curve.default` | `cubic-bezier(0.25, 0.1, 0.25, 1)` | 标准缓动 |
| `curve.spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | 弹性效果（极少使用） |
| `curve.ease-out` | `cubic-bezier(0, 0, 0.2, 1)` | 元素退出 |

## Shadow

| 令牌 | 值 | 说明 |
|---|---|---|
| `shadow.modal` | `0 8px 32px rgba(0,0,0,0.12)` (dark: `0 8px 32px rgba(0,0,0,0.48)`) | 弹窗投影 |

## Font Family

| 令牌 | 值 | 说明 |
|---|---|---|
| `font.family` | `PingFang SC, -apple-system, BlinkMacSystemFont, 'Helvetica Neue', system-ui, sans-serif` | 唯一字体族 |

## Typography

| 令牌 | size | weight | line-height | 说明 |
|---|---|---|---|---|
| `typography.headline-h1` | 32px | 500 | 1.2 | 页面主标题（极少使用） |
| `typography.headline-h2` | 24px | 500 | 1.3 | 区块标题 |
| `typography.headline-h3` | 20px | 500 | 1.35 | 卡片标题 |
| `typography.body-primary` | 17px | 400 | 1.5 | 正文主文本 |
| `typography.body-secondary` | 15px | 400 | 1.45 | 辅助正文 |
| `typography.callout` | 16px | 500 | 1.4 | 强调文本、按钮内文字 |
| `typography.subhead` | 14px | 400 | 1.4 | 副标题、列表项 |
| `typography.footnote` | 13px | 400 | 1.38 | 脚注、来源标注 |
| `typography.caption-1` | 12px | 400 | 1.3 | 标签、辅助标记 |
| `typography.caption-2` | 11px | 400 | 1.2 | 极小标注 |
