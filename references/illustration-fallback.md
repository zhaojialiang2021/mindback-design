# MindBack 兜底插画风格与首批 Prompt

> status: draft
> last_updated: 2026-05-12

## 目标

为 MindBack 建立一套统一的兜底插画系统，用于空状态、无结果、解析失败、等待生成等场景。

这套插画的职责不是“讲故事”，而是：

- 降低空页面的冷感
- 维持 MindBack 的安静气质
- 强化“记忆碎片被整理”的产品隐喻
- 给文案让位，不喧宾夺主

## 风格定义

### 气质

- 安静
- 温和
- 轻陪伴
- 克制
- 有秩序感

避免：

- 科幻炫光
- 紫蓝霓虹
- 机器人头像
- 过度可爱吉祥物
- 重 3D 材质
- 复杂叙事场景

### 视觉形式

- 2.5D 轻体积插画
- 介于扁平和轻立体之间
- 主体由卡片、消息气泡、便签、图片碎片、时间线节点构成
- 小量漂浮和重叠，用来表达“记忆被归拢”
- 背景尽量干净，留白充足

### 配色规则

基于现有设计令牌体系：

- 主背景：白色 / 浅灰
- 主体线条与文字感：深灰
- 品牌蓝只做点缀，不大面积铺开
- Deco 色仅作局部辅助

推荐主色：

- Brand-Blue `#78AAFA`
- Brand-Blue-Light `rgba(120,170,250,0.08)`
- Deco-Teal `#81D5CA`
- Deco-Sky `#84B1EB`
- Deco-Lavender `#9F8CCF`
- Deco-Sage `#A0C484`
- Deco-Rose `#AA7D78`

约束：

- 单张图内品牌蓝面积不超过 10% 到 15%
- 单张图同时出现的辅助色不超过 3 种
- 不做高对比强阴影

### 构图规则

- 优先适配移动端空状态
- 建议竖向画幅
- 主体集中在中上区域
- 下半部分为标题和说明文案留白
- 一眼能看懂，不依赖复杂解释

## 可复用元素库

- 消息气泡
- 便签卡片
- 图片缩略片
- 语音波形条
- 时间线节点
- 放大镜
- 轻漂浮圆点
- 收纳容器 / 频道盒子
- 细连接线

## 母 Prompt

```text
A calm, minimal 2.5D illustration system for an AI memory app called MindBack. Clean white and soft gray background, subtle paper-card feeling, floating message bubbles, note cards, image snippets and timeline fragments, soft depth, low saturation, brand blue used only as a small accent, no sci-fi glow, no mascot, no robot face, no purple neon, emotionally warm but restrained, premium and quiet, mobile app empty state illustration, generous negative space for UI copy.
```

## 首批建议场景

1. 还没有记录
2. 无搜索结果
3. 空频道
4. AI 总结暂时为空

---

## Prompt 1: 还没有记录

**用途**

首页或频道页首次进入时，无任何记忆记录。

**中文文案建议**

- 标题：还没有记录
- 说明：把一条想法、图片或语音交给 MindBack，它会帮你慢慢整理成可回看的线索。

**Prompt**

```text
Use case: illustration-story
Asset type: mobile app empty state
Primary request: create a fallback illustration for an AI memory app empty state called "no records yet"
Scene/backdrop: clean white background with very subtle soft gray grounding
Subject: a quiet composition of 3 to 5 floating memory cards, one small message bubble, one image snippet, one tiny waveform strip, lightly orbiting around a single starting timeline dot
Style/medium: minimal 2.5D editorial product illustration, soft paper-card feeling
Composition/framing: vertical composition, subject centered slightly above middle, lower area intentionally left open for title and description text
Lighting/mood: soft daylight, calm, hopeful, uncluttered
Color palette: mostly white, warm gray and deep gray, with a very small accent of brand blue and one or two muted decorative colors
Materials/textures: matte paper cards, smooth soft shadows, no glossy plastic
Constraints: premium and restrained, no mascot, no human character, no robot, no neon, no tech HUD, no large blue area, no heavy gradients
Avoid: sci-fi interface, emoji style, childish cartoon, purple glow, busy composition, dark background
```

---

## Prompt 2: 无搜索结果

**用途**

搜索页没有找到相关记忆内容。

**中文文案建议**

- 标题：没有找到相关记忆
- 说明：换个关键词试试，或者回忆一下当时提到的人、地点或时间。

**Prompt**

```text
Use case: illustration-story
Asset type: mobile app empty state
Primary request: create a fallback illustration for "no search results" in an AI memory app
Scene/backdrop: clean white background with subtle floating fragments
Subject: a simple magnifying glass moving across scattered note cards and tiny memory fragments, with faint connector lines suggesting a search path, but no matching highlighted result
Style/medium: minimal 2.5D illustration with quiet product-design aesthetics
Composition/framing: vertical layout, main subject slightly above center, spacious lower area for copy
Lighting/mood: calm, thoughtful, slightly exploratory rather than error-like
Color palette: white, soft gray, deep gray, tiny brand blue highlights, optional muted sky or sage accent
Materials/textures: matte layered cards and soft translucent lens
Constraints: should feel gentle and intelligent, not like failure or warning, no red error language in image, no human character, no robot face
Avoid: exaggerated confusion symbols, loud warning graphics, dark backgrounds, strong perspective distortion, neon glow
```

---

## Prompt 3: 空频道

**用途**

某个频道已创建，但里面暂时没有内容。

**中文文案建议**

- 标题：这个频道还很安静
- 说明：先丢进来几条和这个主题有关的记录，MindBack 会慢慢把它整理成一个可浏览的频道。

**Prompt**

```text
Use case: illustration-story
Asset type: mobile app empty state
Primary request: create a fallback illustration for an empty topic channel in an AI memory app
Scene/backdrop: clean white background with a soft grounding plane
Subject: a rounded open container or tray representing a channel, with a few tiny floating memory scraps above it, but the center area still mostly empty and quiet
Style/medium: minimal 2.5D product illustration, refined and calm
Composition/framing: vertical composition, channel container centered in upper-middle area, lower third kept open for copy
Lighting/mood: quiet, organized, waiting to be filled
Color palette: mostly white and gray, with one tiny accent of brand blue and one muted decorative color such as sage or sky
Materials/textures: matte paper cards, subtle soft-edge shadows, smooth rounded container
Constraints: should communicate potential rather than emptiness, no mascot, no folder icon cliché, no heavy blue fill, no clutter
Avoid: cartoon storage box, office illustration clichés, bright gradients, futuristic interface overlays
```

---

## Prompt 4: AI 总结暂时为空

**用途**

AI 正在等待更多上下文，或暂时还没生成出可展示的总结。

**中文文案建议**

- 标题：总结还在形成中
- 说明：再给我一点上下文，我会把这些碎片整理成更清晰的回顾。

**Prompt**

```text
Use case: illustration-story
Asset type: mobile app empty state
Primary request: create a fallback illustration for "AI summary not ready yet" in a memory assistant app
Scene/backdrop: white background with very subtle depth
Subject: several small memory fragments and message cards slowly converging toward a central larger summary card that is still faint or incomplete, suggesting formation rather than failure
Style/medium: calm minimal 2.5D illustration, premium app visual language
Composition/framing: vertical layout, central forming card in upper-middle area, lower area left open for copy
Lighting/mood: patient, intelligent, quietly in-progress
Color palette: white, soft gray, deep gray, brand blue only as tiny structural accents, optional lavender or sky as muted support color
Materials/textures: matte layered paper cards with soft contact shadows
Constraints: communicate "forming" not "loading spinner", no explicit spinners, no robot brain, no bright energy beams, no dramatic motion
Avoid: progress bar UI inside illustration, sci-fi assembly effect, purple neon, metallic machinery, error state feeling
```

## 后续扩展建议

第二批可补：

- 图片解析失败
- 音频解析失败
- 网络断开
- 暂无智能总结历史
- 暂无可分享卡片

第三批可补：

- onboarding 引导插画
- 搜索能力说明插画
- 频道能力说明插画
- 时间碎片能力说明插画
