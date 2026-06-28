import { Switch as SwitchPrimitive } from '@base-ui/react/switch'

import { cn } from '@/lib/utils'

type SwitchProps = SwitchPrimitive.Root.Props & {
  size?: 'default' | 'sm'
}

const Switch = ({ className, size = 'default', ...props }: SwitchProps) => (
  <SwitchPrimitive.Root
    className={cn(
      'peer inline-flex shrink-0 items-center rounded-full border border-transparent bg-input shadow-xs outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 data-[checked]:bg-primary',
      size === 'default' && 'h-5 w-9',
      size === 'sm' && 'h-4 w-7',
      className
    )}
    data-size={size}
    data-slot="switch"
    {...props}
  >
    <SwitchPrimitive.Thumb
      className={cn(
        'pointer-events-none block rounded-full bg-background shadow-lg ring-0 transition-transform data-[unchecked]:translate-x-0',
        size === 'default' && 'size-4 data-[checked]:translate-x-4',
        size === 'sm' && 'size-3 data-[checked]:translate-x-3'
      )}
      data-slot="switch-thumb"
    />
  </SwitchPrimitive.Root>
)

export type { SwitchProps }
export { Switch }
