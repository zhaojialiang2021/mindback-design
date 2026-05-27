import { useState } from 'react'
import { DemoFrame, DemoControl, PropPicker } from './_DemoStub'

const INTENTS = ['primary', 'secondary', 'soft', 'ghost', 'destructive'] as const
const SIZES = ['compact', 'standard', 'large'] as const

export function ButtonDemo() {
  const [intent, setIntent] = useState<(typeof INTENTS)[number]>('primary')
  const [size, setSize] = useState<(typeof SIZES)[number]>('standard')
  const [fullWidth, setFullWidth] = useState(false)

  const code = `<Button intent="${intent}" size="${size}"${fullWidth ? ' fullWidth' : ''}>\n  点这里\n</Button>`

  return (
    <DemoFrame
      caption="Button · Live"
      code={code}
      stage={
        <button
          className={`mb-button mb-button--${intent} mb-button--${size}`}
          style={{ width: fullWidth ? '100%' : undefined }}
        >
          点这里
        </button>
      }
      controls={
        <>
          <DemoControl label="intent">
            <PropPicker options={INTENTS} value={intent} onChange={setIntent} />
          </DemoControl>
          <DemoControl label="size">
            <PropPicker options={SIZES} value={size} onChange={setSize} />
          </DemoControl>
          <DemoControl label="fullWidth">
            <PropPicker options={[false, true] as const} value={fullWidth} onChange={setFullWidth} />
          </DemoControl>
        </>
      }
    />
  )
}
