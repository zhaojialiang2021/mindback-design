# Legacy 代码

> 本目录的代码**不是**当前真相源，仅作历史参考。

## 这里的内容

| 文件 | 来源 | 状态 |
|------|------|------|
| AIPreferences.tsx / .css | 2026-03 设计系统建立前手写 | 已脱离主代码路径，未被 import |

## 为什么留着

作为视觉对照。当用 `/build ai-preferences` 重新生成这个页面时，可以参考旧代码中的交互细节（动效时序、表单状态机等）。但视觉规格、令牌引用、组件用法**一律以 `references/pages/ai-preferences.md` 为准**。

## 何时删除

`references/pages/ai-preferences.md` 升到 `complete` 且新版代码合入后，本目录可以整体删除。
