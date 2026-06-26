import { Switch as SwitchPrimitive } from '@base-ui/react/switch'

import { cn } from '../../../lib/utils'

type SwitchProps = SwitchPrimitive.Root.Props

const Switch = ({ className, ...props }: SwitchProps) => (
  <SwitchPrimitive.Root
    className={cn(
      'peer inline-flex h-5 w-9 shrink-0 items-center rounded-full border border-transparent bg-input shadow-xs outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 data-[checked]:bg-primary',
      className
    )}
    data-slot="switch"
    {...props}
  >
    <SwitchPrimitive.Thumb
      className="pointer-events-none block size-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[checked]:translate-x-4 data-[unchecked]:translate-x-0"
      data-slot="switch-thumb"
    />
  </SwitchPrimitive.Root>
)

export type { SwitchProps }
export { Switch }
