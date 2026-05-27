---
name: archive
description: 从 Paper 画板提取代码写回文档
---

# /archive {board}

从 Paper 画板提取代码和关键规格，写回组件/页面文档。

## 执行流程

### 1. 读取画板

使用 `get_jsx` 获取指定画板的完整代码。
使用 `get_computed_styles` 获取关键节点的精确样式值。

### 2. 验证合规

对提取的代码做快速检查：
- 颜色值是否与令牌匹配（Light 模式值）
- 间距是否来自梯度
- 圆角是否来自 4 级体系
- 字号是否来自令牌

如果不合规，列出偏差项，等待用户决定是否修复。

### 3. 写回文档

将代码写入对应文档的 `## Paper 代码` 段落，格式：

```
## Paper 代码

<!-- 自动归档自 Paper，请勿手动修改 -->

\```html
{代码}
\```
```

### 4. 更新 frontmatter

- status → `complete`（如果之前是 draft）
- last_updated → 当前日期
