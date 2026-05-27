import { navigate } from '../router'
import { Icon } from '../icons'
import { DocsHero } from '../PageHeader'

/**
 * WorkflowPage —— 协作流程 / skill 架构 全景图
 * 真相源：CLAUDE.md 顶层指令 + .claude/skills/{name}/skill.md + references/agent-persona.md
 * 这是一份"读完就能上手协作"的指南。
 */
export function WorkflowPage() {
  return (
    <>
      <DocsHero
        title={
          <>
            人 + agent 的<em>协作管线</em>
          </>
        }
        lead='MindBack 的协作模式是「文档驱动 + skill 路由」：人写文档定义“是什么”，agent 读文档执行“怎么做”，skill 把每个动作的前置条件、输入输出、合规检查固化下来。理解这一页，你就能把 agent 当一个勤奋但需要明确指令的初级设计师来用。'
      />

      {/* 1. 系统架构 ============================================ */}
      <section className="docs-section-block">
        <div className="docs-section-block__num docs-section-block__num--blue">01 · 系统架构</div>
        <h2 className="docs-section-block__heading">三层结构，各司其职</h2>
        <p className="docs-section-block__subheading">
          真相源 / 执行层 / 产物层。每一层只做一件事，写完的东西反哺下一轮。
        </p>
        <div className="docs-arch">
          <div className="docs-arch__layer">
            <div className="docs-arch__label">真相源 · references/</div>
            <div className="docs-arch__items">
              <span className="docs-arch__item">strategy.md</span>
              <span className="docs-arch__item">agent-persona.md</span>
              <span className="docs-arch__item">design-tokens.md</span>
              <span className="docs-arch__item">design-principles.md</span>
              <span className="docs-arch__item">haptics.md</span>
              <span className="docs-arch__item">components/*.md</span>
              <span className="docs-arch__item">pages/*.md</span>
            </div>
            <p className="docs-arch__desc">
              所有「是什么」的定义都在这里。没写进 references/ 的东西，对系统而言不存在。
            </p>
          </div>

          <div className="docs-arch__divider">
            <span>读</span>
            <Icon.ChevronRight size={14} />
          </div>

          <div className="docs-arch__layer docs-arch__layer--exec">
            <div className="docs-arch__label">执行层 · .claude/skills/</div>
            <div className="docs-arch__items">
              <span className="docs-arch__item docs-arch__item--skill">/shape</span>
              <span className="docs-arch__item docs-arch__item--skill">/component</span>
              <span className="docs-arch__item docs-arch__item--skill">/draw</span>
              <span className="docs-arch__item docs-arch__item--skill">/build</span>
              <span className="docs-arch__item docs-arch__item--skill">…16 个</span>
            </div>
            <p className="docs-arch__desc">
              每个 skill 是一段 markdown 流程：强制读哪些文档、执行什么步骤、跑什么检查清单。
            </p>
          </div>

          <div className="docs-arch__divider">
            <span>写</span>
            <Icon.ChevronRight size={14} />
          </div>

          <div className="docs-arch__layer">
            <div className="docs-arch__label">产物层</div>
            <div className="docs-arch__items">
              <span className="docs-arch__item">references/ 增量</span>
              <span className="docs-arch__item">Paper 画板</span>
              <span className="docs-arch__item">Figma 标注</span>
              <span className="docs-arch__item">src/ 代码</span>
              <span className="docs-arch__item">git commit / PR</span>
            </div>
            <p className="docs-arch__desc">
              skill 的产出再写回真相源，形成闭环。下一个 skill 在更新过的文档上继续工作。
            </p>
          </div>
        </div>
      </section>

      {/* 2. 协作三原则 ============================================ */}
      <section className="docs-section-block">
        <div className="docs-section-block__num docs-section-block__num--yellow">02 · 协作原则</div>
        <h2 className="docs-section-block__heading">三条根，其它从这里推导</h2>
        <p className="docs-section-block__subheading">
          文档先行 / 管线优于动作 / 状态变更走 skill。理解为什么，比记住规则更重要。
        </p>
        <Principle
          num="01"
          title="文档先行，直觉靠后"
          rule="处理任何组件 / 页面前必须按 references/ 顺序读文档，不允许凭记忆。"
          why={`agent 没有长期记忆，人会遗忘。文档是唯一可被多次重读、可被新成员对齐的真相源。每条规则都附"为什么"，让没参与过决策的人也能推导出同样的判断。`}
        />
        <Principle
          num="02"
          title="管线优于动作"
          rule="设计与开发的所有重复动作都应该通过管线串起来，不要单点散动作。"
          why={`单点动作每次都要重新对齐前置条件——画板宽度对吗？令牌引用对吗？合规清单跑了吗？管线把这些前置条件固化成步骤，让"做对"成为默认路径。`}
        />
        <Principle
          num="03"
          title="状态变更要走 skill"
          rule={`组件 status、令牌定义、画板归档，这类"系统级"变更必须通过对应 skill。`}
          why="手改 frontmatter 看似快，实际是让系统的 invariant 被悄悄破坏。skill 会顺手做合规检查、更新索引、提醒下游影响——这些容易被人遗忘的副作用，是设计系统能持续工作的关键。"
        />
      </section>

      {/* 3. 三个角色 ============================================ */}
      <section className="docs-section-block">
        <div className="docs-section-block__num docs-section-block__num--mint">03 · 角色</div>
        <h2 className="docs-section-block__heading">参与协作的三个角色</h2>
        <p className="docs-section-block__subheading">
          MindBack 把"产品 + 设计"合并成一个角色。开发独立。Agent 是第三方，跨角色协作。
        </p>
        <div className="docs-role-grid">
          <div className="docs-role docs-role--blue">
            <div className="docs-role__icon">设</div>
            <div className="docs-role__title">产品设计师</div>
            <p className="docs-role__desc">同时负责"做什么"和"长什么样"。从 /shape 进入，走完产品设计管线。</p>
            <div className="docs-role__entry">主入口 <code>/shape</code> · <code>/component</code> · <code>/draw</code></div>
          </div>
          <div className="docs-role docs-role--mint">
            <div className="docs-role__icon">码</div>
            <div className="docs-role__title">开发</div>
            <p className="docs-role__desc">在规格已定的前提下落地代码。不参与设计决策，不修改 references/ 里的规格。</p>
            <div className="docs-role__entry">主入口 <code>/spec</code> · <code>/build</code> · <code>/inspect</code></div>
          </div>
          <div className="docs-role docs-role--violet">
            <div className="docs-role__icon">A</div>
            <div className="docs-role__title">Agent</div>
            <p className="docs-role__desc">勤奋的初级执行者：从不遗漏检查清单，但缺乏审美直觉——「好不好看」交给人。</p>
            <div className="docs-role__entry">画像见 <code>references/agent-persona.md</code></div>
          </div>
        </div>
      </section>

      {/* 4. 为什么是管线 ============================================ */}
      <section className="docs-section-block">
        <div className="docs-section-block__num docs-section-block__num--coral">04 · 为什么是管线</div>
        <h2 className="docs-section-block__heading">「管线」 ≠ 「动作」</h2>
        <p className="docs-section-block__subheading">
          单点动作每次都要重新对齐前置条件。管线把它们写死在步骤里——做对成为默认路径。
        </p>
        <div className="docs-pipeline-why">
          <div className="docs-pipeline-why__col">
            <div className="docs-pipeline-why__label docs-pipeline-why__label--bad">单点动作</div>
            <ul className="docs-pipeline-why__list">
              <li>"画一个登录页" —— 画板宽度对吗？</li>
              <li>令牌引用对吗？</li>
              <li>合规清单跑了吗？</li>
              <li>组件 status 对吗？</li>
              <li>每次都靠记忆，很容易漏。</li>
            </ul>
          </div>
          <div className="docs-pipeline-why__col">
            <div className="docs-pipeline-why__label docs-pipeline-why__label--good">管线</div>
            <ul className="docs-pipeline-why__list">
              <li><code>/preflight</code> 自动查依赖、令牌、组件状态</li>
              <li><code>/draw</code> 进入时画板规格已对齐</li>
              <li><code>/review</code> 跑标准 7 关合规清单</li>
              <li><code>/build</code> → <code>/inspect</code> 视觉自检闭环</li>
              <li>步骤即清单，agent 不会跳步。</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. 三条核心管线 ============================================ */}
      <section className="docs-section-block">
        <div className="docs-section-block__num docs-section-block__num--violet">05 · 核心管线</div>
        <h2 className="docs-section-block__heading">三条核心管线</h2>
        <p className="docs-section-block__subheading">
          按"我现在想做什么"选管线，agent 会自己路由到对应 skill。
        </p>

        <div className="docs-pipeline docs-pipeline--blue">
          <div className="docs-pipeline__title">产品设计管线 · 从想法到出货</div>
          <div className="docs-pipeline__flow">
            <span className="docs-pipeline__chip">/shape</span>
            <span className="docs-pipeline__arrow">→</span>
            <span className="docs-pipeline__chip">/component</span>
            <span className="docs-pipeline__arrow">→</span>
            <span className="docs-pipeline__chip">/fill</span>
            <span className="docs-pipeline__arrow">→</span>
            <span className="docs-pipeline__chip">/preflight</span>
            <span className="docs-pipeline__arrow">→</span>
            <span className="docs-pipeline__chip">/draw</span>
            <span className="docs-pipeline__arrow">→</span>
            <span className="docs-pipeline__chip">/review</span>
            <span className="docs-pipeline__arrow">→</span>
            <span className="docs-pipeline__chip">/build</span>
            <span className="docs-pipeline__arrow">→</span>
            <span className="docs-pipeline__chip">/inspect</span>
            <span className="docs-pipeline__arrow">→</span>
            <span className="docs-pipeline__chip">/ship</span>
          </div>
          <p className="docs-pipeline__desc">
            从模糊想法开始：shape 把意图打磨成"问题 → 假设 → 验证方式"，component 把组件规格补完整，preflight 检查依赖，draw 画板验证，review 跑 7 关审查，build 落代码，inspect 视觉自检，ship 发货。
          </p>
          <div className="docs-pipeline__example">
            <div className="docs-pipeline__example-title">什么时候用</div>
            <p>当你说"我想做一个新功能"——比如"想给记忆流加一个语音回放"。从这条管线开始，到 /ship 结束你会有：完整需求文档、组件规格、Figma/Paper 画板、可运行代码、PR。</p>
          </div>
        </div>

        <div className="docs-pipeline docs-pipeline--mint">
          <div className="docs-pipeline__title">开发管线 · 已知规格直接落地</div>
          <div className="docs-pipeline__flow">
            <span className="docs-pipeline__chip">/spec</span>
            <span className="docs-pipeline__arrow">→</span>
            <span className="docs-pipeline__chip">/build</span>
            <span className="docs-pipeline__arrow">→</span>
            <span className="docs-pipeline__chip">/inspect</span>
            <span className="docs-pipeline__arrow">→</span>
            <span className="docs-pipeline__chip">/ship</span>
          </div>
          <p className="docs-pipeline__desc">
            规格已经在 references/ 里写清楚了，直接进入实现。spec 把开发要的精确参数捞出来，build 落代码，inspect 做视觉自检，ship 收尾。
          </p>
          <div className="docs-pipeline__example">
            <div className="docs-pipeline__example-title">什么时候用</div>
            <p>当你说"把 NavBar 这个组件实现出来"——规格已存在，跳过设计阶段。/spec 会读 references/components/nav-bar.md，把 padding、字号、令牌引用列成开发清单交给 /build。</p>
          </div>
        </div>

        <div className="docs-pipeline docs-pipeline--violet">
          <div className="docs-pipeline__title">维护管线 · 系统健康度</div>
          <div className="docs-pipeline__flow">
            <span className="docs-pipeline__chip">/audit</span>
            <span className="docs-pipeline__arrow">→</span>
            <span className="docs-pipeline__chip">/health</span>
            <span className="docs-pipeline__arrow">→</span>
            <span className="docs-pipeline__chip">/retro</span>
            <span className="docs-pipeline__arrow">→</span>
            <span className="docs-pipeline__chip">/archive</span>
          </div>
          <p className="docs-pipeline__desc">
            周期性的事情。audit 全局体检，health 看代码健康度，retro 周回顾沉淀决策，archive 把已发货的 Paper 画板归档让仓库不臃肿。
          </p>
          <div className="docs-pipeline__example">
            <div className="docs-pipeline__example-title">什么时候用</div>
            <p>每周五跑一次。/audit 给一份系统健康总报告（多少 placeholder、多少 draft、令牌引用是否一致），/retro 让你和 agent 一起回顾这周的决策——做对了什么、走错了什么——沉淀到 decisions 记录里。</p>
          </div>
        </div>

        <div className="docs-pipeline docs-pipeline--coral">
          <div className="docs-pipeline__title">辅助 skill · 任意阶段都可调</div>
          <div className="docs-pipeline__flow">
            <span className="docs-pipeline__chip">/debug</span>
            <span className="docs-pipeline__arrow">·</span>
            <span className="docs-pipeline__chip">/checkpoint</span>
          </div>
          <p className="docs-pipeline__desc">
            不属于任何管线，但可以在任何时候插入。debug 用于排查现象不符合预期的问题（铁律：无根因不修复）。checkpoint 用于跨会话保存和恢复工作上下文。
          </p>
        </div>
      </section>

      {/* 6. 组件状态机 ============================================ */}
      <section className="docs-section-block">
        <div className="docs-section-block__num docs-section-block__num--pink">06 · 状态机</div>
        <h2 className="docs-section-block__heading">组件状态机</h2>
        <p className="docs-section-block__subheading">
          每个组件只有三种状态。状态推进必须通过 skill 完成，不能手改 frontmatter。
        </p>
        <div className="docs-state-machine">
          <div className="docs-state">
            <span className="docs-state__name docs-state__name--placeholder">占位</span>
            <p className="docs-state__desc">只在 manifest 里登记了名字，没有规格。</p>
          </div>
          <div className="docs-state__arrow">→</div>
          <div className="docs-state">
            <span className="docs-state__name docs-state__name--draft">草稿</span>
            <p className="docs-state__desc">核心规格已定义，可能还有"待补"。</p>
          </div>
          <div className="docs-state__arrow">→</div>
          <div className="docs-state">
            <span className="docs-state__name docs-state__name--complete">完成</span>
            <p className="docs-state__desc">规格完整，画板代码已归档，可被引用。</p>
          </div>
        </div>
        <p className="docs-pipeline__desc" style={{ margin: 'var(--space-4) 0 0' }}>
          只有 <code className="docs-inline-code">/component</code> 流程能把状态向前推一档。它会顺手做合规检查、更新索引、提醒下游影响——这些容易被人遗忘的副作用，是设计系统能持续工作的关键。
        </p>
      </section>

      {/* 7. 16 个 skill 详细卡片 ============================================ */}
      <section className="docs-section-block">
        <div className="docs-section-block__num docs-section-block__num--blue">07 · Skill 清单</div>
        <h2 className="docs-section-block__heading">16 个 skill，分三组</h2>
        <p className="docs-section-block__subheading">
          每个 skill 的能力边界、典型输入输出、什么时候用。说话时直接 <code className="docs-inline-code">{'/{name}'}</code> 触发。
        </p>

        <div className="docs-skill-group docs-skill-group--blue">
          <div className="docs-skill-group__title">设计阶段 · 6 个</div>
          <div className="docs-skill-cards">
            <SkillCard
              cmd="/shape"
              tagline="产品设计师统一入口"
              desc={`无论是模糊想法还是明确改动，都从这里进。skill 内部判定模式：偏目标走 6 问构思，偏明确直接进方案。产出"问题 → 假设 → 验证方式"的需求文档草案。`}
              when="想做一个新功能 / 在 X 页面加 Y 元素 / 提一个 idea 但还没想清楚"
              outputs="references/pages 或 components 草案"
            />
            <SkillCard
              cmd="/component"
              tagline="组件状态推进"
              desc="全流程：补全组件规格 → 在 Paper 画展示板 → 用户审阅 → 合规检查 → 归档。是组件 status 推进的唯一通道。"
              when="新组件从 placeholder 起步 / draft 想推到 complete / 修订已 complete 的规格"
              outputs="references/components/{slug}.md 增量 + manifest 注册"
            />
            <SkillCard
              cmd="/fill"
              tagline="批量补全规格缺口"
              desc={`扫描组件文档的"待补充"列表、空白规格、frontmatter 错配，一次性提出补全方案。`}
              when="多个 placeholder 要批量推进 / draft 还有 TODO / status 与内容不一致"
              outputs="逐项补全方案，等待用户确认后写回"
            />
            <SkillCard
              cmd="/preflight"
              tagline="画页面前的预检"
              desc="读取页面文档，对所有引用的组件检查 status：placeholder 阻塞，draft 警告，complete 通过。"
              when={`开始 /draw 之前 / 想知道一个页面"能不能画"了`}
              outputs="检查清单 + 缺失项 + 阻塞列表"
            />
            <SkillCard
              cmd="/draw"
              tagline="按规范画页面"
              desc="在 Paper 上按页面文档绘制 base case：393×852 画板、iOS 状态栏严格遵循、令牌引用、画板旁加设计标注。"
              when="规格 ready 想出视觉验证 / 多宽度适配 / 把组件组合成完整页面"
              outputs="Paper 画板 + 设计标注（页面名 + 关键决策 + 交互行为）"
            />
            <SkillCard
              cmd="/review"
              tagline="7 关设计审查"
              desc="逐 pass 审：信息架构、交互状态、情感弧线、AI 味检测、令牌合规、多宽度适配、开放决策。AI 跑预检（合不合规），人裁定（好不好）。"
              when="画板画完想被挑错 / 组件规格自查 / 上线前 last-call"
              outputs="逐项评分 0-10 + 问题清单 + 人机分工的修改建议"
            />
          </div>
        </div>

        <div className="docs-skill-group docs-skill-group--mint">
          <div className="docs-skill-group__title">开发阶段 · 4 个</div>
          <div className="docs-skill-cards">
            <SkillCard
              cmd="/spec"
              tagline="开发参数清单"
              desc="读组件文档和令牌表，输出开发的精确参数：尺寸、字号、令牌名、动效曲线、触觉波形。开发不需要再去 Figma 量间距。"
              when="开发想直接拿值落地 / 校对实现是否对得上"
              outputs="数值清单（每个值都标注令牌引用来源）"
            />
            <SkillCard
              cmd="/build"
              tagline="设计到代码"
              desc="从组件文档和 Paper 画板代码生成生产级 React 19 + TypeScript 组件。CSS 必须用 var(--token)，不允许硬编码颜色。"
              when="规格 complete / 已有 Paper 代码段 / 要写新页面"
              outputs="可运行的 .tsx + .css，引用令牌"
            />
            <SkillCard
              cmd="/inspect"
              tagline="视觉质检"
              desc="对照 Paper 画板（优先）或 Figma（兜底）截图与实现 dev server 截图，10 类检查逐项对比。"
              when="/build 完想确认对得上设计 / 改完一个交互想验证回归"
              outputs="逐项对比报告（设计 vs 实现，差异截图）"
            />
            <SkillCard
              cmd="/debug"
              tagline="问题排查"
              desc="4 阶段流程：调查 → 分析 → 假设 → 修复。铁律：无根因不修复。专门检查 MindBack 常见模式（令牌混用、状态错乱、CSS 变量未定义等）。"
              when="现象不符合预期 / 报错但不知道为什么 / 改了一个地方坏了另一个"
              outputs="根因分析 + 最小复现 + 修复方案"
            />
          </div>
        </div>

        <div className="docs-skill-group docs-skill-group--violet">
          <div className="docs-skill-group__title">维护与发货 · 6 个</div>
          <div className="docs-skill-cards">
            <SkillCard
              cmd="/health"
              tagline="代码健康度"
              desc="跑 tsc + eslint + 令牌合规扫描（硬编码颜色 / 间距 / 圆角检测）+ 文档一致性，输出 0-10 评分。"
              when="提 PR 之前 / 周期性自检 / 接手别人的代码先看一眼"
              outputs="评分 + 分类的问题清单"
            />
            <SkillCard
              cmd="/ship"
              tagline="发货流程"
              desc="先跑 /health 自检，再 git diff、生成中文 commit message、push、建 PR。规则来自 CLAUDE.md：commit 中文一行说清楚，不带 emoji 不带 type 前缀。"
              when="代码改完 / 一个组件状态推进 / 一次令牌更新"
              outputs="commit + push + PR + 清理本地状态"
            />
            <SkillCard
              cmd="/audit"
              tagline="系统健康总报告"
              desc="扫描 references/ 下所有文档，统计组件 / 页面状态分布，列出 last_updated、used_by、令牌引用偏差。"
              when="每周一 / 季度盘点 / 想知道整个系统现在长什么样"
              outputs="状态分布表 + 异常清单（孤立组件、过时文档、未引用令牌）"
            />
            <SkillCard
              cmd="/retro"
              tagline="周回顾"
              desc="跑一遍 /audit 拿快照，分析本周 git log（状态推进数、文档更新数、违规修复数），识别工作集中区和反复出现的阻塞。"
              when="每周五 / sprint 收尾 / 想沉淀决策和教训"
              outputs="本周指标 + 模式识别 + 改进建议（写入决策记录）"
            />
            <SkillCard
              cmd="/archive"
              tagline="归档画板代码"
              desc="从已发货的 Paper 画板提取 JSX + computed styles，验证合规后写回组件文档的 Paper 代码段，让画板可被丢掉。"
              when="一个组件流程走到底了 / 仓库里 Paper 画板太多想清理"
              outputs="文档增加 Paper 代码段 + 主仓画板可删除"
            />
            <SkillCard
              cmd="/checkpoint"
              tagline="上下文保存恢复"
              desc="save：写 .claude/context.md（git 状态、近期工作、设计系统进度、未完成决策、待推进项）。restore：读回来。"
              when="跨会话续作 / 切设备 / 把任务挂起一段时间"
              outputs=".claude/context.md（save）/ 完整状态汇报（restore）"
            />
          </div>
        </div>
      </section>

      {/* 8. 读取顺序 ============================================ */}
      <section className="docs-section-block">
        <div className="docs-section-block__num docs-section-block__num--yellow">08 · 读取顺序</div>
        <h2 className="docs-section-block__heading">每次执行的肌肉记忆</h2>
        <p className="docs-section-block__subheading">
          每个 skill 在执行前都会按这个顺序读 references/ 下的文档。这是协作的肌肉记忆，不允许凭记忆跳过。
        </p>
        <ol className="docs-reading-order">
          <li><strong>strategy.md</strong> —— 确认任务属于哪个 Track、要影响什么指标</li>
          <li><strong>agent-persona.md</strong> —— 了解 agent 能力边界和常见错误</li>
          <li><strong>design-tokens.md</strong> —— 所有令牌定义（颜色 / 字号 / 间距 / 圆角 / 阴影）</li>
          <li><strong>design-principles.md</strong> —— 设计规则 + 每条规则的「为什么」</li>
          <li><strong>haptics.md</strong> —— 5 级触觉意图和波形参数</li>
          <li><strong>目标组件 / 页面文档</strong> —— 要处理的具体对象</li>
          <li><strong>已 complete 的相关组件文档</strong> —— 推导一致性的参照</li>
        </ol>
      </section>

      {/* 9. agent 容易犯的错 ============================================ */}
      <section className="docs-section-block">
        <div className="docs-section-block__num docs-section-block__num--coral">09 · Agent 易错点</div>
        <h2 className="docs-section-block__heading">Review 时要重点看的 6 个地方</h2>
        <p className="docs-section-block__subheading">
          知道 agent 在哪些地方会失手，你就知道 review 时要重点看什么。来源：references/agent-persona.md。
        </p>
        <div className="docs-mistakes">
          <Mistake
            num="01"
            title="不读文档就动手"
            desc="凭记忆使用令牌值。每个 skill 开头强制重新读取相关文档就是为了防这点。"
          />
          <Mistake
            num="02"
            title="发明新组件"
            desc={`如果你不说"用已有的 Button"，agent 可能每次画一个新按钮。永远在 prompt 里注明已有组件。`}
          />
          <Mistake
            num="03"
            title="美化式编造"
            desc="给卡片加阴影、给按钮加渐变——训练数据里很常见，但 design-principles 禁止。需要你检查。"
          />
          <Mistake
            num="04"
            title="记忆幻觉"
            desc="声称某令牌值是 X 但文档写的是 Y。遇到不确定数值要求它引用令牌文档原文。"
          />
          <Mistake
            num="05"
            title="跳过检查清单"
            desc="画完图忘记逐条跑合规检查。skill 末尾的检查清单是强制步骤，不能省略。"
          />
          <Mistake
            num="06"
            title="过度拟人化"
            desc={`在备注里写"这样看起来更温暖"等无依据主观表达。这种判断应当忽略或要求回到令牌 / 原则。`}
          />
        </div>
      </section>

      {/* 10. 能力边界 ============================================ */}
      <section className="docs-section-block">
        <div className="docs-section-block__num docs-section-block__num--mint">10 · 能力边界</div>
        <h2 className="docs-section-block__heading">谁判断什么</h2>
        <p className="docs-section-block__subheading">
          agent 自己能判的事，让它跑；要审美的事，留给人。
        </p>
        <div className="docs-boundary">
          <div className="docs-boundary__col">
            <div className="docs-boundary__title">Agent 自己能判</div>
            <ul className="docs-boundary__list">
              <li>数值是否来自令牌表</li>
              <li>圆角是否来自 5 级体系</li>
              <li>间距是否来自梯度</li>
              <li>引用是否指向存在的令牌</li>
              <li>多宽度适配表是否存在</li>
            </ul>
          </div>
          <div className="docs-boundary__col docs-boundary__col--human">
            <div className="docs-boundary__title">人判</div>
            <ul className="docs-boundary__list">
              <li>这个间距看着是否太挤</li>
              <li>整体氛围是否对</li>
              <li>情感弧线是否连贯</li>
              <li>是否存在欺骗性 AI 模式</li>
              <li>两个接近的选项哪个更好</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 11. 想动手了？============================================ */}
      <section className="docs-section-block">
        <div className="docs-section-block__num docs-section-block__num--violet">11 · 下一步</div>
        <h2 className="docs-section-block__heading">想动手了？</h2>
        <div className="docs-explore__grid">
          <ExploreLink
            label="读设计原则"
            desc="12 条规则 + 每条的「为什么」"
            onClick={() => navigate('/docs/principles')}
          />
          <ExploreLink
            label="看一个完成的组件"
            desc="从 NavBar 看完整规格长什么样"
            onClick={() => navigate('/docs/components/nav-bar')}
          />
          <ExploreLink
            label="检查设计令牌"
            desc="所有可引用的颜色 / 字号 / 间距"
            onClick={() => navigate('/docs/tokens')}
          />
          <ExploreLink
            label="触觉反馈"
            desc="5 级意图，可在手机上预览"
            onClick={() => navigate('/docs/haptics')}
          />
        </div>
      </section>
    </>
  )
}

function SkillCard({
  cmd,
  tagline,
  desc,
  when,
  outputs,
}: {
  cmd: string
  tagline: string
  desc: string
  when: string
  outputs: string
}) {
  return (
    <div className="docs-skill-card">
      <div className="docs-skill-card__head">
        <code className="docs-skill-card__cmd">{cmd}</code>
        <span className="docs-skill-card__tag">{tagline}</span>
      </div>
      <p className="docs-skill-card__desc">{desc}</p>
      <div className="docs-skill-card__meta">
        <div>
          <div className="docs-skill-card__meta-label">什么时候用</div>
          <div className="docs-skill-card__meta-text">{when}</div>
        </div>
        <div>
          <div className="docs-skill-card__meta-label">典型产出</div>
          <div className="docs-skill-card__meta-text">{outputs}</div>
        </div>
      </div>
    </div>
  )
}

function Mistake({ num, title, desc }: { num: string; title: string; desc: string }) {
  return (
    <div className="docs-mistake">
      <div className="docs-mistake__num">{num}</div>
      <div className="docs-mistake__title">{title}</div>
      <p className="docs-mistake__desc">{desc}</p>
    </div>
  )
}

function Principle({
  num,
  title,
  rule,
  why,
}: {
  num: string
  title: string
  rule: string
  why: string
}) {
  return (
    <div className="docs-principle">
      <div className="docs-principle__num">{num}</div>
      <div className="docs-principle__body">
        <h3 className="docs-principle__title">{title}</h3>
        <p className="docs-principle__text">{rule}</p>
        <blockquote className="docs-principle__why">{why}</blockquote>
      </div>
    </div>
  )
}

function ExploreLink({
  label,
  desc,
  onClick,
}: {
  label: string
  desc: string
  onClick: () => void
}) {
  return (
    <button className="docs-explore__item" onClick={onClick}>
      <div className="docs-explore__label">
        {label}
        <Icon.ChevronRight size={14} />
      </div>
      <div className="docs-explore__desc">{desc}</div>
    </button>
  )
}
