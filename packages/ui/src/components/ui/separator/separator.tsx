import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

type SeparatorProps = ComponentProps<'div'> & {
  decorative?: boolean
  orientation?: 'horizontal' | 'vertical'
}

const Separator = ({ className, decorative = true, orientation = 'horizontal', ...props }: SeparatorProps) => (
  <div
    className={cn(
      'shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px',
      className
    )}
    data-orientation={orientation}
    data-slot="separator"
    {...(decorative ? { role: 'none' as const } : { 'aria-orientation': orientation, role: 'separator' as const })}
    {...props}
  />
)

export type { SeparatorProps }
export { Separator }
