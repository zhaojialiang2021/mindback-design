#!/bin/bash
# update-icons.sh — 从 Bridge 内部 npm registry 拉取最新图标库，锁定版本
# 用法: ./scripts/update-icons.sh [version]

set -euo pipefail

BRIDGE_PACKAGE="@bridge/icons"
LOG_FILE="references/frameworks/icon-update-log.md"

echo "=== Bridge 图标库更新 ==="
echo ""

# 拉取最新版本（指定版本则用指定版本）
if [ $# -gt 0 ]; then
  VERSION="$1"
  echo "安装指定版本: $BRIDGE_PACKAGE@$VERSION"
  npm install "$BRIDGE_PACKAGE@$VERSION" --save-exact
else
  echo "安装最新版本: $BRIDGE_PACKAGE"
  npm install "$BRIDGE_PACKAGE@latest" --save-exact
fi

# 获取实际安装版本
INSTALLED=$(node -e "const p = require('$BRIDGE_PACKAGE/package.json'); console.log(p.version)")
echo "已安装版本: $INSTALLED"

# 检查版本是否在 package.json 中锁定
LOCKED=$(node -e "const p = require('./package.json'); const dep = p.dependencies['$BRIDGE_PACKAGE']; console.log(dep || '未找到')")
echo "package.json 锁定: $LOCKED"

# 追加更新日志
echo "" >> "$LOG_FILE"
echo "## $(date +%Y-%m-%d)" >> "$LOG_FILE"
echo "- 版本: $INSTALLED" >> "$LOG_FILE"
echo "- 操作人: $(git config user.name 2>/dev/null || echo 'unknown')" >> "$LOG_FILE"

echo ""
echo "✅ 完成。图标已更新到 $INSTALLED"
echo "⚠️  请运行 /audit 检查新图标是否影响现有组件"
