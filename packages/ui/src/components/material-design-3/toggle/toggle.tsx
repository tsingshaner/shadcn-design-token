import { Toggle as TogglePrimitive } from '@base-ui/react/toggle'
import { type ClassValue, cn } from 'cn'

import { Ripple } from '../ripple'

type ToggleVariantsProps = {
  size?: 'default' | 'lg' | 'sm' | null
  variant?: 'default' | 'outline' | null
}

const toggleVariants = ({
  size = 'default',
  variant = 'default',
  class: classValue,
  className
}: ToggleVariantsProps & { class?: ClassValue; className?: ClassValue } = {}) =>
  cn(
    'cn-toggle group/toggle relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-lg border border-muted-foreground text-sm font-medium whitespace-nowrap outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-[0.38] data-[pressed]:border-transparent data-[pressed]:bg-secondary data-[pressed]:text-secondary-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-[18px]',
    size === 'default' && 'cn-toggle-size-default h-8 min-w-8 px-4',
    size === 'lg' && 'cn-toggle-size-lg h-10 min-w-10 px-5',
    size === 'sm' && 'cn-toggle-size-sm h-7 min-w-7 px-3',
    variant === 'default' && 'cn-toggle-variant-default bg-transparent',
    variant === 'outline' && 'cn-toggle-variant-outline bg-transparent',
    classValue,
    className
  )

type ToggleProps = TogglePrimitive.Props & ToggleVariantsProps

const Toggle = ({ children, className, variant = 'default', size = 'default', ...props }: ToggleProps) => (
  <TogglePrimitive className={cn(toggleVariants({ size, variant }), className)} data-slot="toggle" {...props}>
    {children}
    <Ripple />
  </TogglePrimitive>
)

export type { ToggleProps }
export { Toggle, toggleVariants }
