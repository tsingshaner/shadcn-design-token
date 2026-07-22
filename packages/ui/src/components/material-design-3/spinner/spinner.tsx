import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

type SpinnerProps = ComponentProps<'span'>

const Spinner = ({ className, ...props }: SpinnerProps) => (
  <span
    aria-label="Loading"
    className={cn(
      'cn-spinner inline-block size-10 animate-spin rounded-full border-4 border-primary/20 border-r-primary',
      className
    )}
    data-slot="spinner"
    role="status"
    {...props}
  />
)

export type { SpinnerProps }
export { Spinner }
