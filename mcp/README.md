# MindBack MCP Server

最小可用 MCP server，让 Cursor / Claude Code 直接查 MindBack 的设计令牌和组件契约。

## 工具

| 工具 | 说明 |
|------|------|
| `list_tokens` | 列出全部令牌，可按 category 过滤 |
| `get_token` | 根据令牌名取详情（含 dark 模式覆盖） |
| `list_components` | 列出 5 个深度组件简表 |
| `get_component` | 根据 slug 取组件完整契约 |
| `get_skill` | 拉一站式 Skill markdown（design + components + 使用约定） |

## 安装到 Claude Code

把以下加到 `~/Library/Application Support/Claude/claude_desktop_config.json`：

```json
{
  "mcpServers": {
    "mindback-design": {
      "command": "node",
      "args": ["/Users/<you>/mindback/mcp/server.mjs"]
    }
  }
}
```

重启 Claude Desktop / Code，工具会出现在 MCP 工具列表里。

## 安装到 Cursor

`.cursor/mcp.json`：

```json
{
  "mcpServers": {
    "mindback-design": {
      "command": "node",
      "args": ["./mcp/server.mjs"]
    }
  }
}
```

## 测试

```bash
node mcp/server.mjs <<< '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'
```

## 不引入 npm 依赖

纯 Node + stdio + JSON-RPC 2.0 实现，~200 行。MCP 协议规范：
https://spec.modelcontextprotocol.io/specification/
