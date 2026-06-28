import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

type SpinnerProps = ComponentProps<'span'>

const Spinner = ({ className, ...props }: SpinnerProps) => (
  <span
    aria-label="Loading"
    className={cn(
      'inline-block size-4 animate-spin rounded-full border-2 border-current border-r-transparent',
      className
    )}
    data-slot="spinner"
    role="status"
    {...props}
  />
)

export type { SpinnerProps }
export { Spinner }
