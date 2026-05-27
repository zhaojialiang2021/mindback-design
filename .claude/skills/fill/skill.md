---
name: fill
description: 扫描组件文档缺口，提出补全方案
---

# /fill {name}

扫描指定组件文档的缺口（待补充列表、空白规格），提出补全方案。

## 执行流程

### 1. 读取文档（强制）

1. `references/design-tokens.md`
2. `references/design-principles.md`
3. `references/haptics.md`
4. 目标组件文档 `references/components/{name}.md`

### 2. 扫描缺口

检查以下内容：

- frontmatter 中 status 是否与内容匹配（placeholder 不应有规格表，draft 可有待补充，complete 不应有待补充）
- 规格表中是否有空值或 TODO
- "待补充"列表中的项目
- 触觉意图是否定义
- 多宽度适配表是否填写
- Paper 代码段是否有内容

### 3. 输出补全方案

对每个缺口，输出：
- 缺口描述
- 建议值（从设计原则和已有组件推导）
- 设计备注（为什么这么建议）

等待用户确认。

### 4. 更新文档

将确认后的补全内容写入组件文档，更新 last_updated。

不改变 status。status 只由 `/component` 流程改变。
