import { ToggleGroup as ToggleGroupPrimitive } from '@base-ui/react/toggle-group'

import { cn } from '../../../lib/utils'

type ToggleGroupProps = ToggleGroupPrimitive.Props

const ToggleGroup = ({ className, ...props }: ToggleGroupProps) => (
  <ToggleGroupPrimitive
    className={cn('flex w-fit items-center gap-1 rounded-md data-[orientation=vertical]:flex-col', className)}
    data-slot="toggle-group"
    {...props}
  />
)

export type { ToggleGroupProps }
export { ToggleGroup }
