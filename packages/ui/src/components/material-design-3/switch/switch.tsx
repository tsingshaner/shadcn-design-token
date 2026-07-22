import { Switch as SwitchPrimitive } from '@base-ui/react/switch'

import { cn } from '@/lib/utils'

type SwitchProps = SwitchPrimitive.Root.Props

const Switch = ({ className, ...props }: SwitchProps) => (
  <SwitchPrimitive.Root
    className={cn(
      'cn-switch peer group/switch relative inline-flex h-8 w-[52px] shrink-0 rounded-full border-2 border-muted-foreground bg-muted outline-none transition-colors duration-75 after:absolute after:inset-x-0 after:-inset-y-2 focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-disabled:cursor-not-allowed data-checked:border-primary data-checked:bg-primary data-disabled:opacity-[0.38] dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40',
      className
    )}
    data-slot="switch"
    {...props}
  >
    <SwitchPrimitive.Thumb
      className={cn(
        'cn-switch-thumb pointer-events-none absolute -start-0.5 -top-0.5 flex size-8 items-center justify-center transition-[inset-inline-start] duration-300 [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)] before:absolute before:size-10 before:rounded-full before:bg-muted-foreground/0 before:transition-colors group-hover/switch:before:bg-muted-foreground/[0.08] group-active/switch:before:bg-muted-foreground/[0.12] group-data-checked/switch:start-[18px] group-data-disabled/switch:transition-none group-data-checked/switch:before:bg-primary/0 group-data-disabled/switch:before:bg-transparent group-data-checked/switch:group-active/switch:before:bg-primary/[0.12] group-data-checked/switch:group-hover/switch:before:bg-primary/[0.08]'
      )}
      data-slot="switch-thumb"
    >
      <span
        className="relative z-10 block size-4 rounded-full bg-muted-foreground transition-[width,height,background-color] duration-250 group-active/switch:size-7 group-data-checked/switch:size-6 group-data-checked/switch:bg-primary-foreground group-data-disabled/switch:transition-none"
        data-slot="switch-handle"
      />
    </SwitchPrimitive.Thumb>
  </SwitchPrimitive.Root>
)

export type { SwitchProps }
export { Switch }
