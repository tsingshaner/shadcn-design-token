import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

import { buttonVariants } from '../button'

type PaginationProps = ComponentProps<'nav'>
type PaginationLinkProps = ComponentProps<'a'> & {
  isActive?: boolean
  size?: NonNullable<Parameters<typeof buttonVariants>[0]>['size']
  variant?: NonNullable<Parameters<typeof buttonVariants>[0]>['variant']
}

const Pagination = ({ className, ...props }: PaginationProps) => (
  <nav
    aria-label="pagination"
    className={cn('mx-auto flex w-full justify-center', className)}
    data-slot="pagination"
    {...props}
  />
)

const PaginationContent = ({ className, ...props }: ComponentProps<'ul'>) => (
  <ul className={cn('flex flex-row items-center gap-1', className)} data-slot="pagination-content" {...props} />
)

const PaginationItem = ({ className, ...props }: ComponentProps<'li'>) => (
  <li className={cn('', className)} data-slot="pagination-item" {...props} />
)

const PaginationLink = ({ className, isActive, size = 'icon', variant, ...props }: PaginationLinkProps) => (
  <a
    aria-current={isActive ? 'page' : undefined}
    className={cn(buttonVariants({ size, variant: variant ?? (isActive ? 'outline' : 'ghost') }), className)}
    data-slot="pagination-link"
    {...props}
  />
)

const PaginationPrevious = (props: PaginationLinkProps) => (
  <PaginationLink aria-label="Go to previous page" size="default" {...props}>
    Previous
  </PaginationLink>
)

const PaginationNext = (props: PaginationLinkProps) => (
  <PaginationLink aria-label="Go to next page" size="default" {...props}>
    Next
  </PaginationLink>
)

const PaginationEllipsis = ({ className, ...props }: ComponentProps<'span'>) => (
  <span
    aria-hidden="true"
    className={cn('flex size-9 items-center justify-center', className)}
    data-slot="pagination-ellipsis"
    {...props}
  >
    ...
  </span>
)

export type { PaginationLinkProps, PaginationProps }
export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
}
