// 组件 schema 加载与类型 —— 真相源 components/*.schema.json

export type PropDef = {
  values: (string | boolean | number)[]
  default: string | boolean | number
  description: string
}

export type Constraint = {
  rule: string
  value: unknown
  description: string
}

export type AnatomyPart = {
  part: string
  tokens?: string[]
  description?: string
}

export type ComponentSchema = {
  slug: string
  name: string
  category: string
  description: string
  props: Record<string, PropDef>
  states: string[]
  constraints: Constraint[]
  tokens: Record<string, string>
  haptics?: Record<string, string>
  anatomy: AnatomyPart[]
  doDont: { do: string[]; dont: string[] }
}

const sources = import.meta.glob('../../components/*.schema.json', {
  import: 'default',
  eager: true,
}) as Record<string, ComponentSchema>

const bySlug = new Map<string, ComponentSchema>()
for (const [path, schema] of Object.entries(sources)) {
  const slug = path.split('/').pop()!.replace('.schema.json', '')
  bySlug.set(slug, schema)
}

export function getComponentSchema(slug: string): ComponentSchema | null {
  return bySlug.get(slug) ?? null
}

/** 把 schema 序列化为给 AI 的 LLM-spec markdown（Copy for AI 用） */
export function schemaToLLMSpec(schema: ComponentSchema): string {
  const lines: string[] = []
  lines.push(`# Component: ${schema.name}`)
  lines.push('')
  lines.push(schema.description)
  lines.push('')

  lines.push('## Props')
  for (const [name, def] of Object.entries(schema.props)) {
    lines.push(`- **${name}** (${JSON.stringify(def.values)}, default: ${JSON.stringify(def.default)})`)
    lines.push(`  ${def.description}`)
  }
  lines.push('')

  lines.push(`## States`)
  lines.push(schema.states.map((s) => `\`${s}\``).join(', '))
  lines.push('')

  lines.push('## Constraints')
  for (const c of schema.constraints) {
    lines.push(`- **${c.rule}**: ${c.description}`)
  }
  lines.push('')

  lines.push('## Tokens')
  lines.push('```json')
  lines.push(JSON.stringify(schema.tokens, null, 2))
  lines.push('```')
  lines.push('')

  lines.push('## Anatomy')
  for (const a of schema.anatomy) {
    lines.push(`- **${a.part}**: ${a.description ?? a.tokens?.join(', ') ?? ''}`)
  }
  lines.push('')

  lines.push('## Do')
  for (const d of schema.doDont.do) lines.push(`- ${d}`)
  lines.push('')
  lines.push("## Don't")
  for (const d of schema.doDont.dont) lines.push(`- ${d}`)
  lines.push('')

  lines.push('---')
  lines.push('使用：所有 token 引用必须命中 /tokens.json 中的令牌名。颜色、间距、圆角不允许 hardcoded 字面量。')
  return lines.join('\n')
}
