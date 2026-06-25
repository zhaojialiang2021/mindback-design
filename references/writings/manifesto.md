# 也是给 AI 设计的 Design System

> 草稿。作者：赵家亮。最后修改：2026-05-15。
> 这是一份长文，不是页面文案。最终会发表在公开博客 + 这个站的 Writing 区。

## 一、问题不是文档不够好

我做设计系统五年，一直被一个矛盾困扰：**设计系统的文档质量越高，被使用得越少。**

写得最好的那批 design system——Material、Carbon、Polaris——每篇组件文档都像论文：anatomy 图、状态矩阵、应用场景、Do / Don't、accessibility。看起来无懈可击。

但回到团队里，新人接手项目第一周，几乎没人翻这些文档。他们打开 Figma 拷一个看起来差不多的组件，改几个值，交付。半年后翻回来，没人记得为什么这两个按钮的圆角差 2 px。

这不是文档写得不够好的问题。是**人读散文式文档的成本**——理解→记忆→检索→决策——已经超过了"凭记忆 + 拷贝粘贴"的成本。

设计系统的失败模式不是"没人读"，是"读了用不上"。

## 二、AI 进来之后，问题翻倍

2024 之后我开始用 Cursor 和 Claude Code 写代码。一个直觉很快形成：AI 写 UI 的速度比我快 10 倍，但合规率惨不忍睹。

让 AI 给 MindBack 写一个登录页，它生成的代码大概是这样：

```tsx
<button style={{
  background: '#6366f1',  // 不在我的色板里
  borderRadius: 8,        // 我的圆角是 6/8/12/20/9999 五级
  padding: '10px 20px',   // 10px 不在我的间距梯度里
}}>登录</button>
```

每一处都是"看起来像设计系统"，但每一处都不在系统里。

这不是 AI 笨——它训练时见过的 Bootstrap、Tailwind、shadcn 都有自己的色板。它在用最普世的均值来填空。**而我从没真的告诉它："你只能从这个列表里挑值。"**

## 三、给人看的约定 vs 给机器读的契约

我反复回看 Material、HIG、Polaris 这些经典文档。它们教会人理解，但教不会机器执行。

原因是它们的形态：**散文 + 表格 + 截图。**

人读散文能脑补：「primary 用蓝色」——人会自动 fallback 到上下文中的"我们的蓝色"。
AI 读散文会生成：「primary 用蓝色」——AI 选了 #2563eb，因为它见过太多次这个值。

这两个"蓝色"完全不是一回事。一个是约定，一个需要契约。

我开始把设计系统重新切成两层：

- **人读层**：原本的 markdown 文档，保留所有 why、Do/Don't、视觉气质讲解
- **机器层**：YAML / JSON schema，每条都是封闭枚举，AI 只能从中挑值，不能生造

最大的转变在于：**机器层是被验证的。**人读散文写完没人查；机器层写完跑 lint，hardcoded 值直接报错。

这不是工程化。这是把"约定"升级成了"契约"。

## 四、契约是怎么写的

MindBack 的设计系统现在有三层：

### Layer 1: Tokens（原子值）

封闭枚举。AI 只能从这个列表挑值。

```json
{
  "color": {
    "label": {
      "primary": { "$value": "#212121", "$type": "color" }
    }
  },
  "space": {
    "1": { "$value": "4px", "$type": "dimension" },
    "2": { "$value": "8px", "$type": "dimension" }
  }
}
```

W3C Design Tokens 格式（DTCG）。任何符合这个 schema 的 JSON，Style Dictionary、Tokens Studio、Cursor、Claude 都能消费。

### Layer 2: Component Schema（语义契约）

组件是意图单元，不是视觉单元。

```json
{
  "Button": {
    "props": {
      "variant": ["filled", "outline", "neutral", "ghost"],
      "size": ["xLarge", "large", "medium", "small", "mini", "micro"]
    },
    "states": ["idle", "hover", "active", "loading", "disabled"],
    "constraints": [
      { "rule": "max_filled_per_view", "value": 1 },
      { "rule": "icon_only_requires_aria_label", "value": true }
    ]
  }
}
```

注意 `constraints`。这是经典文档里写在散文里的规则——「不要在同一视图放两个 filled 按钮」——现在它是一个**可被检查的字段**。

### Layer 3: Generative Rules（可执行逻辑）

```json
{
  "rules": [
    { "if": { "variant": "filled" },
      "then": { "tokens": { "bg": "brand-blue" } } }
  ]
}
```

这层是把"if 条件 then token 覆盖"也变成数据。AI 拿到这层，就不需要在散文里推理"什么是 destructive"——它只需要匹配条件。

## 五、验收标准变了

传统设计系统的验收是：

- 文档完整度
- 组件覆盖率
- 团队采用率（多少 PR 引用了这个组件）

这些指标在 AI 进来之后都失效了。组件库覆盖率高，但 AI 全用 hardcoded 值——形同虚设。

新的核心 KPI 只有一个：**零样本 AI 生成合规率。**

把这套设计系统喂给一个**未见过它**的 Claude / Cursor，让它生成一个新页面，看产出有多少能直接用。

具体测三件事：

1. **合法 token 使用率**：所有颜色 / 间距 / 圆角必须命中令牌名
2. **组件 props 命中率**：必须从 schema enum 中选
3. **状态完整性**：empty / loading / error / disabled / focus 必须全覆盖（AI 最容易漏的）

我们现在跑这套测试，目标是合规率 ≥ 80%。低于这个数，说明契约还有漏洞。

## 六、设计师角色变了

这是最让我犹豫但也最确信的变化。

传统设计师的核心动作是 **maker**——做出第一版来。但当 AI 能在 30 秒内做出 5 个看起来差不多的版本时，maker 的稀缺性消失了。

留给设计师的是 **curator**：

- 哪些约束应该被写进契约
- 哪些违反约束的产出值得保留（变成新约定）
- AI 在两个接近选项里时，哪个更对（这件事 AI 做不了）

策展人不画图。策展人定义"什么算好"。

这跟传统设计师培训的方向完全反过来。但事实是——AI 进来之后，新人设计师比老人设计师更容易适应这个角色，因为他们没有"我必须画出来"的肌肉记忆。

## 七、所以我做了 mindback.design

[https://mindback.design](https://mindback.design) 是 MindBack（一个 AI 记忆助手 App）的设计系统站。

它的形态跟 Material 不一样：
- 顶部三组导航 System / MindBack / Writing，对应「方法论 / 活样本 / 思考」三类受众
- 每个深度组件页有一个 **Copy for AI** 按钮——一键复制 LLM-spec markdown，粘到 Cursor 直接生效
- 站点 expose 6 个 HTTP 端点：`/skill.md` `/design.md` `/tokens.json` `/components.md` `/components.json` `/llms.txt`，AI 可以 fetch 拿到当前最新契约
- 一个最小 MCP server（200 行，无 npm 依赖），让 Cursor 在生成过程中实时查询令牌

技术栈很普通：Vite + React + 自写 hash router。**重点不是技术栈，是结构。**

## 八、不是设计系统的未来。是设计系统的及格线

写到这里我意识到一件事：这一切并不需要 AI。

封闭枚举、机器可读契约、可被 lint 的规则——这些其实是**所有设计系统都该有的**。AI 只是把"散文式约定"的失败模式以 100 倍速度暴露了出来。

如果你的设计系统在 AI 时代崩了，它在人类时代其实也一直在缓慢失败——只不过人类员工愿意忍。

**AI-native 不是下一代设计系统。它是这一代设计系统的及格线。**

---

*欢迎反馈：[zhaojialiang@xiaohongshu.com](mailto:zhaojialiang@xiaohongshu.com)*
