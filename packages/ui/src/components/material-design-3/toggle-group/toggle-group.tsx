import { Toggle as TogglePrimitive } from '@base-ui/react/toggle'
import { ToggleGroup as ToggleGroupPrimitive } from '@base-ui/react/toggle-group'
import { type CSSProperties, createContext, useContext } from 'react'

import { cn } from '@/lib/utils'

import { type ToggleProps, toggleVariants } from '../toggle'

type ToggleGroupProps = ToggleGroupPrimitive.Props & {
  orientation?: 'horizontal' | 'vertical'
  size?: ToggleProps['size']
  spacing?: number
  variant?: ToggleProps['variant']
}
type ToggleGroupItemProps = ToggleProps
type ToggleGroupStyle = CSSProperties & {
  '--gap'?: number
}

const ToggleGroupContext = createContext<Pick<ToggleGroupProps, 'orientation' | 'size' | 'spacing' | 'variant'>>({
  orientation: 'horizontal',
  size: 'default',
  spacing: 2,
  variant: 'default'
})

const ToggleGroup = ({
  children,
  className,
  orientation = 'horizontal',
  size = 'default',
  spacing = 2,
  style,
  variant = 'default',
  ...props
}: ToggleGroupProps) => (
  <ToggleGroupPrimitive
    className={cn(
      'cn-toggle-group group/toggle-group flex w-fit flex-row items-center gap-[calc(var(--gap)*0.25rem)] rounded-full data-vertical:flex-col data-vertical:items-stretch',
      className
    )}
    data-orientation={orientation}
    data-size={size}
    data-slot="toggle-group"
    data-spacing={spacing}
    data-variant={variant}
    orientation={orientation}
    style={{ '--gap': spacing, ...style } as ToggleGroupStyle}
    {...props}
  >
    <ToggleGroupContext.Provider value={{ orientation, size, spacing, variant }}>
      {children}
    </ToggleGroupContext.Provider>
  </ToggleGroupPrimitive>
)

const ToggleGroupItem = ({ className, size = 'default', variant = 'default', ...props }: ToggleGroupItemProps) => {
  const context = useContext(ToggleGroupContext)
  const resolvedVariant = context.variant ?? variant
  const resolvedSize = context.size ?? size

  return (
    <TogglePrimitive
      className={cn(
        'cn-toggle-group-item shrink-0 focus:z-10 focus-visible:z-10 group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:border-t-0 group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:border-l-0 group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-t group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-l',
        toggleVariants({ size: resolvedSize, variant: resolvedVariant }),
        className
      )}
      data-size={resolvedSize}
      data-slot="toggle-group-item"
      data-spacing={context.spacing}
      data-variant={resolvedVariant}
      {...props}
    />
  )
}

export type { ToggleGroupItemProps, ToggleGroupProps }
export { ToggleGroup, ToggleGroupItem }
