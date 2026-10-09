import { Toggle as TogglePrimitive } from '@base-ui/react/toggle'

import { cva, type VariantProps } from '@/lib/cva'

type ToggleVariantsProps = VariantProps<typeof toggleVariants>

const toggleVariants = cva({
  base: 'group/toggle inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap outline-none transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 data-[pressed]:bg-accent data-[pressed]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4',
  defaultVariants: {
    size: 'md',
    variant: 'default'
  },
  variants: {
    size: {
      lg: 'h-10 min-w-10 px-2.5',
      md: 'h-9 min-w-9 px-2',
      sm: 'h-8 min-w-8 px-1.5'
    },
    variant: {
      default: 'bg-transparent',
      outline: 'border border-input bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground'
    }
  }
})

type ToggleProps = TogglePrimitive.Props & ToggleVariantsProps

const Toggle = ({ className, variant = 'default', size = 'md', ...props }: ToggleProps) => (
  <TogglePrimitive
    className={toggleVariants({ className, size, variant })}
    data-scope="toggle"
    data-size={size}
    data-slot="root"
    data-variant={variant}
    {...props}
  />
)

export type { ToggleProps }
export { Toggle, toggleVariants }
