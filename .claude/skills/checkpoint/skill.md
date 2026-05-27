---
name: checkpoint
description: 上下文保存恢复：跨会话保存和恢复工作状态
---

# /checkpoint {save|restore}

保存当前工作上下文或恢复之前保存的上下文，避免每次会话重新梳理状态。

## /checkpoint save

### 1. 收集状态

- **Git 状态**：当前分支、未提交改动摘要
- **近期工作**：最近 5 条 git log
- **设计系统进度**：
  - 组件状态分布（complete/draft/placeholder 各几个）
  - 页面状态分布
  - 最近的组件/页面文档更新
- **未完成决策**：从最近的 `/review` 输出或对话上下文提取
- **待推进项**：哪些 placeholder 组件需要定义，哪些 draft 页面需要画

### 2. 写入

写入 `.claude/context.md`，格式：

```markdown
# 工作上下文

> 保存时间：{date}

## Git
- 分支：{branch}
- 未提交：{summary}

## 近期工作
{recent commits}

## 设计系统进度
- 组件：{N} complete / {N} draft / {N} placeholder
- 页面：{N} draft / {N} complete

## 未完成决策
{list}

## 待推进
{list}
```

## /checkpoint restore

### 1. 读取

读取 `.claude/context.md`。

### 2. 输出摘要

用简洁的中文展示上次工作状态：
- 你上次在哪个分支上工作
- 做了什么
- 还有什么没做完

### 3. 建议下一步

根据待推进项，建议：
- "有 {N} 个 placeholder 组件待定义，可以从 `/component {name}` 开始"
- "有 {N} 个 draft 页面待画，可以先 `/preflight` 再 `/draw`"
- "有未完成的设计决策需要 `/review`"
