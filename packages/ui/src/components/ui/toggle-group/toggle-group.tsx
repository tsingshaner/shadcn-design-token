import { ToggleGroup as ToggleGroupPrimitive } from '@base-ui/react/toggle-group'

import { cn } from '@/lib/utils'

import { Toggle, type ToggleProps } from '../toggle'

type ToggleGroupProps = ToggleGroupPrimitive.Props & {
  size?: ToggleProps['size']
  spacing?: number
  variant?: ToggleProps['variant']
}
type ToggleGroupItemProps = ToggleProps

const ToggleGroup = ({ className, size, spacing, style, variant, ...props }: ToggleGroupProps) => (
  <ToggleGroupPrimitive
    className={cn('flex w-fit items-center gap-1 rounded-md data-[orientation=vertical]:flex-col', className)}
    data-size={size}
    data-slot="toggle-group"
    data-variant={variant}
    style={{ ...(spacing !== undefined ? { gap: `${spacing * 0.25}rem` } : null), ...style }}
    {...props}
  />
)

const ToggleGroupItem = (props: ToggleGroupItemProps) => <Toggle data-slot="toggle-group-item" {...props} />

export type { ToggleGroupProps }
export { ToggleGroup, ToggleGroupItem }
