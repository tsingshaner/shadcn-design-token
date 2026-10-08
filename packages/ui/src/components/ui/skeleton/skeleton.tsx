import { cn } from 'cn'

import type { ComponentProps } from 'react'

type SkeletonProps = ComponentProps<'div'>

const Skeleton = ({ className, ...props }: SkeletonProps) => (
  <div className={cn('cn-skeleton animate-pulse rounded-md bg-accent', className)} data-slot="skeleton" {...props} />
)

export type { SkeletonProps }
export { Skeleton }
