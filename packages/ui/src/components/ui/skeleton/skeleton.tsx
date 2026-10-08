import { cn } from 'cn'

import type { ComponentProps } from 'react'

type SkeletonProps = ComponentProps<'div'>

const Skeleton = ({ className, ...props }: SkeletonProps) => (
  <div
    className={cn('animate-pulse rounded-md bg-accent', className)}
    data-scope="skeleton"
    data-slot="root"
    {...props}
  />
)

export type { SkeletonProps }
export { Skeleton }
