# MindBack Design System Skill

> 把这份内容粘到 Cursor / Claude Code 的系统提示里，再开始生成 UI。
> AI-native 设计系统：给机器读的契约。约束被违反 = 幻觉。

## 使用约定
- **颜色**：仅引用 `var(--<token-name>)`（见下方 Tokens 段），禁止 hex/rgba 字面量。
- **间距**：仅用 `var(--space-1)` ~ `var(--space-10)`，禁止自定义 px。
- **圆角**：5 级封闭枚举 `radius-small / medium / large / x-large / full`。
- **字号**：从 typography 令牌挑（headline-h1/h2/h3, body-primary/secondary, callout, subhead, footnote, caption-1/2）。
- **组件**：见下方 Component Contracts。props 必须命中 values 枚举；states 必须全覆盖；constraints 不能违反。
- **校验**：生成完跑 `npm run lint:tokens`，0 违规才算合格。

---
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


---

# MindBack Component Contracts (machine-readable)

> 自动生成自 `components/*.schema.json`。AI 在生成 MindBack 风格 UI 时，组件 props 必须从 values 枚举中选；states 必须全覆盖；constraints 不能违反。

## Button (`button`)

**Category**: action

用户主动触发的动作单元。MindBack 风格：Pill / Rounded Rect 形态、品牌色克制使用、单视图最多一个 primary。

### Props
- `intent`: "primary" | "secondary" | "soft" | "ghost" | "destructive" _(default: `"primary"`)_
  意图层级。primary 主操作（CTA、提交）；secondary 次要操作（取消）；soft 品牌色辅助（小红点击操作如「填写领取」）；ghost 极弱（链接状）；destructive 不可逆动作（删除/退出）
- `size`: "compact" | "standard" | "large" _(default: `"standard"`)_
  compact 34px / standard 48px / large 51px
- `icon`: "none" | "leading" | "only" _(default: `"none"`)_
  图标位置。leading 文字左侧 20px 图标；only 图标按钮，无文字
- `fullWidth`: false | true _(default: `false`)_
  是否占满容器宽度（启动页 CTA 等场景）

### States
`idle`, `hover`, `active`, `loading`, `disabled`

### Constraints
- **max_primary_per_view**: 同一页面最多一个 primary 按钮，避免主次失焦
- **destructive_requires**: destructive 仅用于不可逆动作（删除、退出登录、清空）
- **icon_only_requires_aria_label**: icon=only 时必须提供 aria-label

### Anatomy
- **container**: bg, radius, padding-x, height
- **icon**: fg, size:20px, gap:space-1
- **label**: fg, font

### Do
- 在 CTA 位置使用 size=large + fullWidth=true
- destructive 配合二次确认弹层使用
- icon=only 时按钮宽高都是 size 的高度，正方形

### Don't
- 不要在同一视图放两个 intent=primary 的按钮
- 不要把 destructive 用在「保存」「确认」这种正向动作
- 不要在 button 内嵌 button 或链接

---

## Card (`card`)

**Category**: container

组合容器。承载相关信息的最小单元，是 patterns 的起点。MindBack 风格：hairline 边框、20px / 12px 圆角、不滥用阴影。

### Props
- `variant`: "default" | "tinted" | "elevated" _(default: `"default"`)_
  default 透明 + hairline；tinted 浅灰底 (bg-1) 不带边；elevated 仅用于弹层卡，带 shadow-modal
- `padding`: "compact" | "standard" | "comfortable" _(default: `"standard"`)_
  compact space-3 / standard space-4 / comfortable space-5
- `interactive`: false | true _(default: `false`)_
  是否可点击。true 时 hover 加 fill-quaternary 背景，cursor=pointer

### States
`idle`, `hover`, `pressed`, `disabled`

### Constraints
- **no_nested_card**: Card 内不嵌套 Card —— 用分隔区或 List 替代
- **elevated_only_for_modal**: elevated（带阴影）只用于 Modal / Sheet 的容器，普通页面禁用
- **interactive_requires_role**: interactive=true 时必须设 role=button 并支持键盘

### Anatomy
- **container**: bg, border, shadow?, radius, padding
- **header (optional)**: 标题区，用 typography.headline-h3
- **body**: 正文区
- **footer (optional)**: 动作区，常含 Button

### Do
- 信息密集的列表用 default + 12px 圆角
- AI 回应卡 / 能力卡用 tinted 或 default + 20px 圆角
- interactive 卡片整块响应点击，不要让用户找小按钮

### Don't
- 不要在 Card 里再嵌 Card
- 不要给非弹层卡片加阴影
- 不要让 Card 边框和 Card 内 Divider 视觉上混淆

---

## Empty State (`empty-state`)

**Category**: feedback

AI 最容易忘记的状态。空容器不是 bug，是产品的一个 view —— 必须给图、给话、给下一步。

### Props
- `kind`: "empty" | "no-result" | "no-permission" | "error" | "first-time" _(default: `"empty"`)_
  empty：本来就没数据；no-result：搜索/筛选未命中；no-permission：受限；error：加载失败；first-time：用户首次进入，引导创建
- `size`: "inline" | "centered" | "fullscreen" _(default: `"centered"`)_
  inline 嵌入 list；centered 占当前容器中心；fullscreen 占整页
- `illustration`: "icon" | "spot" | "scene" | "none" _(default: `"icon"`)_
  icon 单图标 64x64；spot 中型插图 120x120；scene 大插图 200+；none 仅文字

### States
`idle`, `loading-action`

### Constraints
- **always_has_action**: 除 size=inline 外，必须给至少一个动作按钮（创建、刷新、返回、了解更多）
- **first_time_must_explain_value**: first-time 必须说明使用价值，不只说「还没有内容」
- **error_must_be_actionable**: error 必须给「重试」或「查看详情」，不留死路

### Anatomy
- **illustration**: icon.color, icon.size.*
- **title**: title.font, title.color
- **description (optional)**: description.font, description.color
- **primary-action**: Button intent=primary, size=standard
- **secondary-action (optional)**: Button intent=ghost

### Do
- first-time 用积极语言：「记下你的第一条想法」而不是「这里空空如也」
- no-result 给「清除筛选」或「修改关键词」的明确出口
- error 给重试按钮 + 简短错误描述，不要堆栈

### Don't
- 不要只显示一个灰色的 emoji + 「没有数据」就完事
- 不要在 fullscreen 空状态里让用户找返回键
- 不要把 loading 当 empty 渲染（先转 spinner，超时后才进 empty）

---

## Input (`input`)

**Category**: form

单行文字输入。状态最多的组件——empty / focus / error / disabled / loading 必须全覆盖，否则 AI 生成时会随机漏。

### Props
- `size`: "compact" | "standard" _(default: `"standard"`)_
  compact 36px / standard 44px
- `kind`: "text" | "search" | "password" _(default: `"text"`)_
  类型。search 左侧带搜索图标；password 右侧带 eye 切换
- `leadingIcon`: false | true _(default: `false`)_
  是否显示前置图标位
- `trailingAction`: "none" | "clear" | "submit" _(default: `"none"`)_
  尾部动作。clear 已输入时显示叉号；submit 显示发送按钮

### States
`empty`, `focus`, `filled`, `error`, `disabled`, `loading`

### Constraints
- **error_requires_message**: error 状态必须配文案，不能只让边框变红
- **loading_disables_input**: loading 时输入框不可编辑（disabled 视觉），右侧显示菊花
- **placeholder_not_label**: placeholder 不能替代 label，必须有独立的 label 或 aria-label

### Anatomy
- **label**: label.font, label.color
- **container**: container.bg, container.border.*, container.radius, container.height.*
- **leading-icon**: icon.size, icon.color
- **value**: value.font, value.color
- **placeholder**: placeholder.color
- **trailing-action**: icon.size
- **error-message**: error.font, error.color

### Do
- label 写在输入框上方，不要和 placeholder 二选一
- error 状态同时改边框 + 显示文案 + 触发 haptic light
- loading 用菊花替代 trailingAction，禁用输入

### Don't
- 不要用 placeholder 当 label
- 不要让 disabled 看起来像 idle（区别于 read-only）
- 不要把验证错误悄悄塞在角落，必须显式占行

---

## Sheet (`sheet`)

**Category**: overlay

弹层 / 抽屉的语义统一。很多团队把 Sheet / Drawer / Modal / Action Sheet 混着用，MindBack 强制语义区分：Sheet 是从屏幕边缘滑入的临时上下文，Modal 是中央对齐的强制选择。

### Props
- `side`: "bottom" | "right" _(default: `"bottom"`)_
  滑入方向。bottom 移动端常用（高度 50–90%），right 桌面常用（宽 320–480px）
- `size`: "compact" | "standard" | "full" _(default: `"standard"`)_
  compact 占屏 40%，standard 65%，full 95%（保留状态栏）
- `modal`: true | false _(default: `true`)_
  是否屏蔽背景点击。modal=true 时点遮罩外才关闭；false 时 sheet 像 popover
- `dragToDismiss`: true | false _(default: `true`)_
  是否允许下拉 / 右滑关闭。仅 side=bottom 且 size != full 生效

### States
`entering`, `open`, `closing`, `closed`

### Constraints
- **not_for_critical_choice**: 需要用户做不可逆决策时用 Modal，不用 Sheet（Sheet 容易被滑掉）
- **single_sheet_at_a_time**: 同一时刻只允许一个 Sheet 打开，禁止 Sheet 上叠 Sheet
- **drag_handle_required**: side=bottom 且 dragToDismiss=true 时必须显示拖拽 handle（视觉提示）

### Anatomy
- **backdrop**: backdrop.bg, duration.enter
- **container**: container.bg, container.shadow, container.radius.*, padding
- **drag-handle (bottom only)**: handle.bg, handle.size
- **header (optional)**: 标题 + 关闭按钮，typography.headline-h3
- **content**: 可滚动主体
- **footer (optional)**: 动作区，sticky 在底部

### Do
- 选择列表 / 筛选 / 详情预览用 Sheet
- side=bottom 时高度跟随内容，超过 90vh 时启用滚动
- 拖拽到 30% 阈值才触发关闭，避免误触

### Don't
- 不要用 Sheet 做关键确认（删除前的二次确认必须 Modal）
- 不要在 Sheet 上再叠 Sheet
- 不要让 Sheet 的圆角与全屏页混淆 —— 永远露出顶部状态栏的 backdrop

---
