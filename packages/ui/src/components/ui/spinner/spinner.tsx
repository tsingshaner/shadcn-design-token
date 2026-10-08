import { cn } from 'cn'

import type { ComponentProps } from 'react'

type SpinnerProps = ComponentProps<'span'>

const Spinner = ({ className, ...props }: SpinnerProps) => (
  <span
    aria-label="Loading"
    className={cn(
      'inline-block size-4 animate-spin rounded-full border-2 border-current border-r-transparent',
      className
    )}
    data-scope="spinner"
    data-slot="root"
    role="status"
    {...props}
  />
)

export type { SpinnerProps }
export { Spinner }
