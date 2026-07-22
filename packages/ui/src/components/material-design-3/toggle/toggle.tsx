import { Toggle as TogglePrimitive } from '@base-ui/react/toggle'
import { tv, type VariantProps } from 'tailwind-variants'

import { cn } from '@/lib/utils'

const toggleVariants = tv({
  base: 'cn-toggle group/toggle inline-flex items-center justify-center gap-2 rounded-lg border border-muted-foreground text-sm font-medium whitespace-nowrap outline-none transition-colors hover:bg-primary/[0.08] focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-[0.38] data-[pressed]:border-transparent data-[pressed]:bg-secondary data-[pressed]:text-secondary-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-[18px]',
  defaultVariants: {
    size: 'default',
    variant: 'default'
  },
  variants: {
    size: {
      default: 'cn-toggle-size-default h-8 min-w-8 px-4',
      lg: 'cn-toggle-size-lg h-10 min-w-10 px-5',
      sm: 'cn-toggle-size-sm h-7 min-w-7 px-3'
    },
    variant: {
      default: 'cn-toggle-variant-default bg-transparent',
      outline: 'cn-toggle-variant-outline bg-transparent'
    }
  }
})

type ToggleProps = TogglePrimitive.Props & VariantProps<typeof toggleVariants>

const Toggle = ({ className, variant = 'default', size = 'default', ...props }: ToggleProps) => (
  <TogglePrimitive className={cn(toggleVariants({ size, variant }), className)} data-slot="toggle" {...props} />
)

export type { ToggleProps }
export { Toggle, toggleVariants }
