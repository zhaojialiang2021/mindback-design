做一个删除确认弹窗。

要求：
- 用 Modal（不是 Sheet —— 删除是不可逆操作）
- 标题 + 描述（要说明会删除什么，不可恢复）
- 主 CTA "删除" intent=destructive
- 次 CTA "取消" intent=secondary
- 配 light haptic on tap

所有间距用 var(--space-N)，所有圆角用 var(--radius-*)。
