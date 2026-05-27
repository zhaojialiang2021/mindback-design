---
name: audit
description: 扫描所有文档，生成系统健康报告
---

# /audit

扫描所有设计系统文档，生成健康报告。

## 执行流程

### 1. 扫描所有文档

读取以下目录中的所有文件：
- `references/components/*.md`
- `references/frameworks/*.md`
- `references/pages/*.md`

同时读取：
- `references/design-tokens.md`
- `references/design-principles.md`
- `references/haptics.md`

### 2. 统计状态

对每个文档提取 frontmatter：
- name
- status (placeholder / draft / complete)
- last_updated
- used_by

计算：
- 各状态的组件数量和占比
- 距上次更新的天数

### 3. 识别阻塞

对每个页面文档，检查其 used_by 或引用的组件：
- 如果引用了 placeholder 组件 → 标记为"阻塞"
- 如果引用了 draft 组件且有未补充项 → 标记为"部分阻塞"

### 4. 输出报告

格式：

```
MindBack 设计系统健康报告
━━━━━━━━━━━━━━━━━━━━━━━━━
Complete:   X/N  (XX%)
Draft:      X/N  (XX%)
Placeholder:X/N  (XX%)

阻塞中的页面:
  - {page}: 依赖 {component}({status})

未更新的组件 (>14天):
  - {component}: 最后更新 {date}

建议下一步:
  1. 推进 {component} → complete（阻塞 X 个页面）
  2. 定义 {component}（阻塞 {page}）
```

### 5. 一致性检查

检查所有 complete 组件是否：
- 令牌引用有效（design-tokens.md 中存在）
- 触觉意图已定义
- 多宽度适配表已填写
- Paper 代码段非空

发现不一致项列入报告。
