#!/bin/bash
# build.sh —— 全量构建机器层产物
# 真相源：tokens/*.json + components/*.schema.json
# 用法：./scripts/build-tokens.sh
set -euo pipefail
cd "$(dirname "$0")/.."
node scripts/build-tokens.mjs
node scripts/build-components.mjs
