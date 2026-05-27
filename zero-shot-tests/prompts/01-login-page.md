用 MindBack 设计系统做一个登录页。

要求：
- 顶部品牌区（logo + 一句标语）
- 邮箱输入 + 密码输入（用 Input 组件，覆盖 empty / focus / error / disabled 状态）
- 主 CTA "登录" (Button intent=primary, size=large, fullWidth=true)
- 次要操作 "忘记密码"（Button intent=ghost）
- 加载中 / 错误反馈用 Empty State kind=error

约束：所有颜色、间距、字号、圆角必须用令牌名（var(--<token>)），禁止 hardcoded hex/px。
