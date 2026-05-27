#!/usr/bin/env bash
# Figma 个人页 1:1 还原素材下载脚本
# 节点：1761:52281（个人页）
# Figma MCP 资源链接 7 天内有效

set -euo pipefail

DEST="$(cd "$(dirname "$0")/.." && pwd)/src/assets/personal"
mkdir -p "$DEST"

declare -a ASSETS=(
  # 状态栏
  "status-cellular.png|0bebd365-b965-4af3-a4c9-2493ee4f264a"
  "status-wifi.png|5875ad9c-a6d3-4258-842f-b4f3713292c1"
  "status-battery.png|197d1b3f-74b7-435b-923b-398016461cc7"
  # 顶部弧形装饰背景
  "arc-bg.png|ff0423c1-fe48-4125-bed4-1bbe8972679b"
  # 头像
  "avatar.png|aa52224e-2944-479b-b14d-74f5b15db859"
  # 图片小组件背景图
  "widget-image.png|d1ab14fb-8531-4d0c-abd4-8ee17a1f0c27"
  # 文件小组件文件图标
  "file-icon-1.png|3ab04600-c0de-415a-8ff2-1510844dce37"
  "file-icon-2.png|f1c7d30e-b098-48d9-b935-7f8c738a9db4"
  # 链接小组件 favicon
  "link-favicon.png|d2c0b7d8-04e9-4a06-863b-3f0042b9534e"
  # MindBack 引用条
  "quote-bar.png|cdbe6590-4608-4dd3-ad75-0f1f06bbef28"
  # 设置插画 - AI 偏好
  "setting-ai.png|7dc341c4-6156-4d2f-bcfb-30658e0b0b91"
  # 数据卡 chevron-down
  "icon-chevron-down.png|f9fdb89d-6e69-4ffd-9bf4-d7cad1fdc716"
  # 通知插画素材（live_notice union）
  "notice-union.png|816e908c-157b-452f-8dcf-3b4405e75045"
  "notice-bell.png|b7bdac40-623c-4cb5-ad2c-793d5c0adea6"
  # 深色模式插画素材
  "theme-moon.png|a7aaabd9-eddd-4aee-a708-28b341b94585"
  "theme-sun.png|d00f0ec6-9d21-4bd4-92ba-bd2d2911abd6"
  "theme-sun2.png|01e31f60-d437-4b72-a796-45b2e06c5630"
  "theme-dot1.png|f9a3ba2e-6566-4cc4-9ff1-19a8a80dd053"
  "theme-dot2.png|6e720db9-6be1-4d3d-a191-00ac198a69d2"
  # 密码设置插画素材
  "lock-img.png|6c665a41-71f9-40cd-a470-48bd08b2f764"
  # Switch 拇指
  "switch-thumb.png|5704de07-dbcb-427d-858a-92ff4e0d3792"
  # 分割线
  "divider.png|8b5e5516-9650-4166-8705-30d5fa58922e"
  # 设置项箭头 chevron-right (AI 偏好)
  "icon-chevron-right.png|43393b14-25a3-48b7-aef7-d735c328eea8"
  # 颜色模式 arrow_updown 上下两个箭头
  "icon-updown-up.png|ba0d0744-b376-4881-87ce-cf046e7b8f65"
  "icon-updown-down.png|b1d98dc0-f1d9-4cc9-a62a-8386f7ba7e61"
  # 密码设置 chevron
  "icon-back-center.png|f4bbe362-151a-4b4c-9b88-21d55d786af8"
  # 外链小箭头
  "icon-external.png|7718f7f3-6dfc-4ca6-beb4-78823372c029"
  # TabBar 图标
  "tab-chat.png|9e96c074-ceed-4a52-92a4-7be8903f6ca3"
  "tab-star.png|ef7644ce-e8eb-48f1-ada4-64f866367feb"
  "tab-user.png|6425b7bc-5c65-49d1-9cb9-ad0a54b5a4b7"
)

BASE="https://www.figma.com/api/mcp/asset"

count=${#ASSETS[@]}
i=0
for entry in "${ASSETS[@]}"; do
  i=$((i+1))
  name="${entry%%|*}"
  id="${entry##*|}"
  url="$BASE/$id"
  out="$DEST/$name"
  printf "[%2d/%d] %-32s -> %s\n" "$i" "$count" "$name" "$id"
  curl -fsSL "$url" -o "$out" || { echo "FAIL $name"; exit 1; }
done

echo
echo "完成。已下载 $count 个文件到："
echo "  $DEST"
ls -la "$DEST"
