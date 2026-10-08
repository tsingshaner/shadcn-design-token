import { cn } from 'cn'
import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from 'lucide-react'

import type { ComponentProps } from 'react'

import { Button } from '../button'

type PaginationProps = ComponentProps<'nav'>
type PaginationLinkProps = ComponentProps<'a'> & {
  isActive?: boolean
  size?: ComponentProps<typeof Button>['size']
}
type PaginationPreviousProps = PaginationLinkProps & {
  text?: string
}
type PaginationNextProps = PaginationLinkProps & {
  text?: string
}

const Pagination = ({ className, ...props }: PaginationProps) => (
  <nav
    aria-label="pagination"
    className={cn('mx-auto flex w-full justify-center', className)}
    data-scope="pagination"
    data-slot="root"
    {...props}
  />
)

const PaginationContent = ({ className, ...props }: ComponentProps<'ul'>) => (
  <ul
    className={cn('flex flex-row items-center gap-1', className)}
    data-scope="pagination"
    data-slot="content"
    {...props}
  />
)

const PaginationItem = ({ className, ...props }: ComponentProps<'li'>) => (
  <li className={className} data-scope="pagination" data-slot="item" {...props} />
)

const PaginationLink = ({ className, isActive, size = 'icon', ...props }: PaginationLinkProps) => (
  <Button
    className={className}
    data-scope="pagination"
    data-slot="link"
    nativeButton={false}
    render={
      <a
        aria-current={isActive ? 'page' : undefined}
        data-active={isActive}
        data-scope="pagination"
        data-slot="link"
        {...props}
      />
    }
    size={size}
    variant={isActive ? 'outline' : 'ghost'}
  />
)

const PaginationPrevious = ({ className, text = 'Previous', ...props }: PaginationPreviousProps) => (
  <PaginationLink
    aria-label="Go to previous page"
    className={className}
    data-scope="pagination"
    data-slot="previous"
    size="md"
    {...props}
  >
    <ChevronLeftIcon className="rtl:rotate-180" data-icon="inline-start" />
    <span className="hidden sm:block" data-scope="pagination" data-slot="previous-text">
      {text}
    </span>
  </PaginationLink>
)

const PaginationNext = ({ className, text = 'Next', ...props }: PaginationNextProps) => (
  <PaginationLink
    aria-label="Go to next page"
    className={className}
    data-scope="pagination"
    data-slot="next"
    size="md"
    {...props}
  >
    <span className="hidden sm:block" data-scope="pagination" data-slot="next-text">
      {text}
    </span>
    <ChevronRightIcon className="rtl:rotate-180" data-icon="inline-end" />
  </PaginationLink>
)

const PaginationEllipsis = ({ className, ...props }: ComponentProps<'span'>) => (
  <span
    aria-hidden="true"
    className={cn('flex size-9 items-center justify-center', className)}
    data-scope="pagination"
    data-slot="ellipsis"
    {...props}
  >
    <MoreHorizontalIcon />
    <span className="sr-only">More pages</span>
  </span>
)

export type { PaginationLinkProps, PaginationNextProps, PaginationPreviousProps, PaginationProps }
export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
}
