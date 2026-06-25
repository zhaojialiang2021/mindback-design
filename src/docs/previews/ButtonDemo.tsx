import { useState } from 'react'
import { DemoFrame, DemoControl, PropPicker } from './_DemoStub'
import { Icon } from '../icons'

const VARIANTS = ['filled', 'outline', 'neutral', 'ghost'] as const
const SIZES = ['xLarge', 'large', 'medium', 'small', 'mini', 'micro'] as const
const ICONS = ['none', 'leading', 'trailing', 'only'] as const

export function ButtonDemo() {
  const [variant, setVariant] = useState<(typeof VARIANTS)[number]>('filled')
  const [size, setSize] = useState<(typeof SIZES)[number]>('medium')
  const [icon, setIcon] = useState<(typeof ICONS)[number]>('none')
  const [fullWidth, setFullWidth] = useState(false)
  const [selected, setSelected] = useState(false)

  const code = `<Button variant="${variant}" size="${size}" icon="${icon}"${fullWidth ? ' fullWidth' : ''}${selected ? ' selected' : ''}>\n  ${icon === 'only' ? '<Icon.Plus />' : '点这里'}\n</Button>`
  const hasLeadingIcon = icon === 'leading' || icon === 'only'
  const hasTrailingIcon = icon === 'trailing'

  return (
    <DemoFrame
      caption="Button · Live"
      code={code}
      stage={
        <button
          className={`mb-button mb-button--${variant} mb-button--${size}${selected ? ' mb-button--selected' : ''}${icon === 'only' ? ' mb-button--icon-only' : ''}`}
          style={{ width: fullWidth ? '100%' : undefined }}
          aria-label={icon === 'only' ? '新增' : undefined}
          aria-pressed={selected || undefined}
        >
          {hasLeadingIcon && <Icon.Plus size={16} />}
          {icon !== 'only' && <span>点这里</span>}
          {hasTrailingIcon && <Icon.ChevronRight size={16} />}
        </button>
      }
      controls={
        <>
          <DemoControl label="variant">
            <PropPicker options={VARIANTS} value={variant} onChange={setVariant} />
          </DemoControl>
          <DemoControl label="size">
            <PropPicker options={SIZES} value={size} onChange={setSize} />
          </DemoControl>
          <DemoControl label="icon">
            <PropPicker options={ICONS} value={icon} onChange={setIcon} />
          </DemoControl>
          <DemoControl label="fullWidth">
            <PropPicker options={[false, true] as const} value={fullWidth} onChange={setFullWidth} />
          </DemoControl>
          <DemoControl label="selected">
            <PropPicker options={[false, true] as const} value={selected} onChange={setSelected} />
          </DemoControl>
        </>
      }
    />
  )
}
