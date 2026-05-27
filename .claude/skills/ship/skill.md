---
name: ship
description: 发货流程：健康检查 → 提交 → 推送 → 建 PR
---

# /ship

从代码写完到 PR 创建的自动化流程。

## 执行流程

### 1. 健康检查

运行 `/health`，确认评分 >= 7/10。

如果 < 7：告知用户具体问题，建议先修复。不强制阻塞，由用户决定是否继续。

### 2. 审查改动

- `git status` 查看未提交文件
- `git diff` 查看具体改动
- 确认无敏感文件（.env、credentials 等）
- 确认无无关文件（node_modules、.DS_Store 等）

### 3. 生成 commit message

规则（来自 CLAUDE.md）：
- 中文，简短，一行说清楚
- 不带 emoji、不带 type 前缀（feat:、fix: 等）

向用户展示建议的 commit message，等待确认或修改。

### 4. 提交

- `git add` 指定文件（不使用 `git add -A`）
- `git commit`
- `git status` 确认提交成功

### 5. 推送

- 检查当前分支是否追踪远程
- 如果新分支：`git push -u origin {branch}`
- 如果已有追踪：`git push`

推送前向用户确认。

### 6. 创建 PR（如 gh 可用）

- 检查 `gh` 是否可用
- 检查当前分支与 base 分支的差异
- 生成 PR 标题和描述
- `gh pr create`

如果 `gh` 不可用，跳过此步。

### 7. 输出发货摘要

```
## 发货完成

分支：{branch}
Commit：{hash}
PR：{url}（如已创建）
改动文件：{N} 个
健康度：{score}/10
```
