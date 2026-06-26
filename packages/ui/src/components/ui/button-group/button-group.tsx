import type { ComponentProps } from 'react'

import { cn } from '../../../lib/utils'

type ButtonGroupProps = ComponentProps<'div'>
type ButtonGroupSeparatorProps = ComponentProps<'div'>

const ButtonGroup = ({ className, ...props }: ButtonGroupProps) => (
  <div
    className={cn(
      'inline-flex w-fit items-center rounded-lg shadow-xs [&_[data-slot=button]:first-child]:rounded-l-lg [&_[data-slot=button]:last-child]:rounded-r-lg [&_[data-slot=button]:not(:first-child)]:-ml-px [&_[data-slot=button]]:rounded-none',
      className
    )}
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

export type { ButtonGroupProps, ButtonGroupSeparatorProps }
export { ButtonGroup, ButtonGroupSeparator }
