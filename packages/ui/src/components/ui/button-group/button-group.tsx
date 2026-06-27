import type { ComponentProps } from 'react'

import { cn } from '../../../lib/utils'

type ButtonGroupOrientation = 'horizontal' | 'vertical'
type ButtonGroupProps = ComponentProps<'div'> & {
  orientation?: ButtonGroupOrientation
}
type ButtonGroupSeparatorProps = ComponentProps<'div'>

const ButtonGroup = ({ className, orientation = 'horizontal', ...props }: ButtonGroupProps) => (
  <div
    className={cn(
      'inline-flex w-fit items-center rounded-lg shadow-xs [&_[data-slot=button]:first-child]:rounded-l-lg [&_[data-slot=button]:last-child]:rounded-r-lg [&_[data-slot=button]:not(:first-child)]:-ml-px [&_[data-slot=button]]:rounded-none',
      orientation === 'vertical' &&
        'flex-col [&_[data-slot=button]:first-child]:rounded-t-lg [&_[data-slot=button]:first-child]:rounded-l-none [&_[data-slot=button]:last-child]:rounded-r-none [&_[data-slot=button]:last-child]:rounded-b-lg [&_[data-slot=button]:not(:first-child)]:-mt-px [&_[data-slot=button]:not(:first-child)]:ml-0',
      className
    )}
    data-orientation={orientation}
    data-slot="button-group"
    {...props}
  />
)

const ButtonGroupSeparator = ({ className, ...props }: ButtonGroupSeparatorProps) => (
  <div
    aria-hidden="true"
    className={cn('h-4 w-px bg-border', className)}
    data-slot="button-group-separator"
    {...props}
  />
)

export type { ButtonGroupOrientation, ButtonGroupProps, ButtonGroupSeparatorProps }
export { ButtonGroup, ButtonGroupSeparator }
