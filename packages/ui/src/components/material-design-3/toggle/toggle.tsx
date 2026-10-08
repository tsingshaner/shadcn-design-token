import { Toggle as TogglePrimitive } from '@base-ui/react/toggle'
import { cn } from 'cn'

import { cva, type VariantProps } from '@/lib/cva'

import { Ripple } from '../ripple'

type ToggleVariantsProps = VariantProps<typeof toggleVariants>

const toggleVariants = cva({
  base: 'group/toggle relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-lg border border-muted-foreground text-sm font-medium whitespace-nowrap outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-[0.38] data-[pressed]:border-transparent data-[pressed]:bg-secondary data-[pressed]:text-secondary-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-[18px]',
  defaultVariants: {
    size: 'md',
    variant: 'default'
  },
  variants: {
    size: {
      lg: 'h-10 min-w-10 px-5',
      md: 'h-8 min-w-8 px-4',
      sm: 'h-7 min-w-7 px-3'
    },
    variant: {
      default: 'bg-transparent',
      outline: 'bg-transparent'
    }
  }
})

type ToggleProps = TogglePrimitive.Props & ToggleVariantsProps

const Toggle = ({ children, className, variant = 'default', size = 'md', ...props }: ToggleProps) => (
  <TogglePrimitive
    className={toggleVariants({ className, size, variant })}
    data-scope="toggle"
    data-size={size}
    data-slot="root"
    data-variant={variant}
    {...props}
  >
    {children}
    <Ripple />
  </TogglePrimitive>
)

export type { ToggleProps }
export { Toggle, toggleVariants }
