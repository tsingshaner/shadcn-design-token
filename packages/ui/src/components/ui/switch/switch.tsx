import { Switch as SwitchPrimitive } from '@base-ui/react/switch'
import { cn } from 'cn'

type SwitchProps = SwitchPrimitive.Root.Props & {
  size?: 'md' | 'sm'
}

const Switch = ({ className, size = 'md', ...props }: SwitchProps) => (
  <SwitchPrimitive.Root
    className={cn(
      'peer group/switch relative inline-flex shrink-0 items-center rounded-full border border-transparent outline-none transition-all after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-[size=md]:h-[18.4px] data-[size=sm]:h-3.5 data-[size=md]:w-8 data-[size=sm]:w-6 data-disabled:cursor-not-allowed data-checked:bg-primary data-unchecked:bg-input data-disabled:opacity-50 dark:data-unchecked:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40',
      className
    )}
    data-scope="switch"
    data-size={size}
    data-slot="root"
    {...props}
  >
    <SwitchPrimitive.Thumb
      className={cn(
        'pointer-events-none block rounded-full bg-background ring-0 transition-transform group-data-[size=md]/switch:size-4 group-data-[size=sm]/switch:size-3 group-data-[size=md]/switch:data-checked:translate-x-[calc(100%-2px)] group-data-[size=md]/switch:data-unchecked:translate-x-0 group-data-[size=sm]/switch:data-checked:translate-x-[calc(100%-2px)] group-data-[size=sm]/switch:data-unchecked:translate-x-0 dark:data-checked:bg-primary-foreground dark:data-unchecked:bg-foreground'
      )}
      data-scope="switch"
      data-slot="thumb"
    />
  </SwitchPrimitive.Root>
)

export type { SwitchProps }
export { Switch }
