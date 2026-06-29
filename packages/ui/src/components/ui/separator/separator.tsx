import { Separator as SeparatorPrimitive } from '@base-ui/react/separator'

import { cn } from '@/lib/utils'

type SeparatorProps = SeparatorPrimitive.Props & {
  decorative?: boolean
}

const Separator = ({ className, decorative = true, orientation = 'horizontal', ...props }: SeparatorProps) => (
  <SeparatorPrimitive
    className={cn(
      'shrink-0 bg-border data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch',
      className
    )}
    data-slot="separator"
    orientation={orientation}
    {...(decorative ? { role: 'none' as const } : { 'aria-orientation': orientation, role: 'separator' as const })}
    {...props}
  />
)

export type { SeparatorProps }
export { Separator }
