---
name: preflight
description: 画页面前检查所有依赖是否就绪
---

# /preflight {page}

检查指定页面的所有组件依赖是否就绪，防止画到一半发现缺规格。

## 执行流程

### 1. 读取页面文档

读取 `references/pages/{page}.md`，提取页面引用的所有组件名。

### 2. 逐个检查依赖

对每个组件：
- 读取 `references/components/{name}.md`
- 检查 status：
  - **complete** → 通过
  - **draft** → 警告：列出待补充项，询问是否可以先用
  - **placeholder** → 阻塞：必须先运行 `/component {name}`
  - **文件不存在** → 阻塞：必须先创建组件文档

### 3. 输出检查结果

```
页面: {page}
━━━━━━━━━━━━━━━━━━━━━━━
✅ Card (complete)
⚠️  NavBar (draft) — 待补充: [返回按钮样式, 右侧操作区布局]
❌ Modal (placeholder) — 阻塞

结论: 1 个阻塞项，需先运行 /component Modal
```

### 4. 快速修复建议

如果有 draft 组件只有少量缺口，建议用户运行 `/fill {name}` 快速补全而非走完整 `/component` 流程。
