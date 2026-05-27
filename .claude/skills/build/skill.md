---
name: build
description: 设计到代码：从文档 + Paper 代码生成生产级 React 组件
---

# /build {name}

从组件/页面文档和 Paper 画板代码生成生产级 React 19 + TypeScript 组件。

## 前置条件

- 目标组件/页面文档 status 必须为 complete 或 draft（不能是 placeholder）
- `src/index.css` 中已定义所有令牌 CSS 变量

## 执行流程

### 1. 读取文档（强制）

1. `references/design-tokens.md`
2. `references/design-principles.md`
3. `references/haptics.md`
4. 目标组件/页面文档
5. 目标引用的已 complete 组件文档

### 2. 提取设计代码

按优先级获取设计源：

1. 如果文档有 `## Paper 代码` 段，从中提取
2. 如果有 Paper 画板，用 Paper MCP 的 `get_jsx` 提取
3. 如果有 Figma 设计稿，用 Figma MCP 的 `get_design_context` 提取

### 3. 生成组件文件

#### 文件结构

页面级组件：
```
src/pages/{Name}.tsx
src/pages/{Name}.css
```

通用组件：
```
src/components/{Name}.tsx
src/components/{Name}.css
```

#### 代码规范

- TypeScript strict 模式兼容
- 函数组件 + hooks
- Props 用 interface 定义，export
- 组件默认 export
- CSS 使用 `var(--token-name)` 引用令牌，禁止硬编码值
- 中文注释仅在"为什么这么做"时添加

#### 令牌映射规则

设计令牌名 → CSS 自定义属性：
- `Label-Primary` → `var(--label-primary)`
- `BG-0` → `var(--bg-0)`
- `Space-4` → `var(--space-4)` (16px)
- `Radius-Large` → `var(--radius-large)` (12px)
- `Brand-Blue` → `var(--brand-blue)`
- `Duration-Fast` → `var(--duration-fast)`
- `Curve-Default` → `var(--curve-default)`

字号映射：直接使用 px 值（令牌表中已固定），不创建额外 CSS 变量。

#### 样式写法

- 组件 CSS 文件使用 BEM-like 命名：`.message-bubble`、`.message-bubble--ai`、`.message-bubble__content`
- 不使用 CSS Modules、CSS-in-JS、Tailwind
- 间距和颜色一律用 `var(--space-N)` / `var(--token-name)`

### 4. 合规检查（强制）

逐条检查生成的代码：

- [ ] CSS 中无硬编码颜色值（hex/rgb/rgba），全部用 `var(--token-name)`
- [ ] 间距全部用 `var(--space-N)` 或文档中声明的令牌值
- [ ] 圆角全部用 `var(--radius-N)`
- [ ] 无 `!important`
- [ ] TypeScript 无 `any` 类型
- [ ] 组件可被独立渲染（不依赖全局状态）

不通过项必须修复。

### 5. 运行验证

- 运行 `tsc --noEmit` 确认类型正确
- 启动 dev server 截图验证视觉表现
- 对比 Figma / Paper 设计稿

### 6. 建议下一步

- 运行 `/inspect {name}` 做像素级质检
- 运行 `/health` 检查整体代码健康度
