import { Toggle as TogglePrimitive } from '@base-ui/react/toggle'
import { tv, type VariantProps } from 'tailwind-variants'

import { cn } from '@/lib/utils'

const toggleVariants = tv({
  base: 'cn-toggle group/toggle inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap outline-none transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 data-[pressed]:bg-accent data-[pressed]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4',
  defaultVariants: {
    size: 'default',
    variant: 'default'
  },
  variants: {
    size: {
      default: 'cn-toggle-size-default h-9 min-w-9 px-2',
      lg: 'cn-toggle-size-lg h-10 min-w-10 px-2.5',
      sm: 'cn-toggle-size-sm h-8 min-w-8 px-1.5'
    },
    variant: {
      default: 'cn-toggle-variant-default bg-transparent',
      outline:
        'cn-toggle-variant-outline border border-input bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground'
    }
  }
})

type ToggleProps = TogglePrimitive.Props & VariantProps<typeof toggleVariants>

const Toggle = ({ className, variant = 'default', size = 'default', ...props }: ToggleProps) => (
  <TogglePrimitive className={cn(toggleVariants({ size, variant }), className)} data-slot="toggle" {...props} />
)

export type { ToggleProps }
export { Toggle, toggleVariants }
