---
name: draw
description: 按规范画一个页面，包含完整合规检查
---

# /draw {page}

按设计系统规范在 Paper 中画一个完整页面。

## 执行流程

### 1. 读取文档（强制）

1. `references/design-tokens.md`
2. `references/design-principles.md`
3. `references/haptics.md`
4. 目标页面文档 `references/pages/{page}.md`
5. 页面引用的所有组件文档

### 2. Preflight 检查

对页面引用的每个组件：
- 如果 status 是 placeholder → 阻塞，提示用户先运行 `/component {name}`
- 如果 status 是 draft 且有待补充项 → 警告，询问是否继续

### 3. 绘制页面

按照页面文档和组件规格在 Paper 中逐步绘制：

- 创建画板（390×844 Mobile 为默认）
- 逐区域绘制：导航栏 → 内容区 → 底部栏
- 每个区域绘制后截图检查

绘制规则：
- 所有颜色引用令牌名，取 Light 模式值
- 所有间距、圆角、字号来自令牌
- 使用真实内容（非 lorem ipsum），中文占位文案
- 图标用 SVG 内联，来自 Bridge 图标库

### 4. 合规检查（强制）

逐条检查：

- [ ] 所有字号来自令牌表？
- [ ] 所有颜色引用令牌名？
- [ ] 圆角来自 5 级体系（6/8/12/20/9999px）？
- [ ] 间距来自 10 级梯度？
- [ ] 卡片只用 BG-0 背景？
- [ ] 品牌色只做点缀（AI 回应气泡除外）？
- [ ] 装饰色只做图标底色？
- [ ] 无装饰性渐变和阴影？
- [ ] 分割线默认用 NonOpaque？
- [ ] 交互状态只有三档（Default/Active/Disabled）？
- [ ] 图标来自指定图标库？

### 4.5 AI 内容检查（如页面涉及 AI 产出）

如果页面包含 AI 回应、智能总结、AI 异步回应等 AI 产出内容，额外检查：

- [ ] AI 回应气泡使用 Brand-Blue-Light 背景 + Brand-Blue-Border 边框？
- [ ] AI 产出与用户输入视觉上可区分？
- [ ] AI 生成内容标注"由 AI 生成"？
- [ ] 无欺骗性 AI 模式（假装用户写的、隐瞒 AI 来源）？

### 5. 截图审阅

对完整页面截图，展示给用户审阅。等待确认。

### 6. 归档

用 `/archive` 将 Paper 画板代码写回页面文档，更新 last_updated。
