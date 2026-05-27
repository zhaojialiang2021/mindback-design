做一个文件上传组件，状态完整覆盖：

- empty: 拖拽提示 + 点击选择
- loading: 进度条 + 取消按钮
- error: 错误信息 + 重试按钮
- success: 文件名 + 移除按钮

必须用 MindBack 的 Button 和 Empty State 组件契约。所有 token 必须命中 /tokens.json。
