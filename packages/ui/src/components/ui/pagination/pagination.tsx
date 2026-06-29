import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from 'lucide-react'

import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

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

const PaginationLink = ({ className, isActive, size = 'icon', ...props }: PaginationLinkProps) => (
  <Button
    className={cn(className)}
    nativeButton={false}
    render={
      <a aria-current={isActive ? 'page' : undefined} data-active={isActive} data-slot="pagination-link" {...props} />
    }
    size={size}
    variant={isActive ? 'outline' : 'ghost'}
  />
)

const PaginationPrevious = ({ className, text = 'Previous', ...props }: PaginationPreviousProps) => (
  <PaginationLink aria-label="Go to previous page" className={cn(className)} size="default" {...props}>
    <ChevronLeftIcon className="rtl:rotate-180" data-icon="inline-start" />
    <span className="hidden sm:block">{text}</span>
  </PaginationLink>
)

const PaginationNext = ({ className, text = 'Next', ...props }: PaginationNextProps) => (
  <PaginationLink aria-label="Go to next page" className={cn(className)} size="default" {...props}>
    <span className="hidden sm:block">{text}</span>
    <ChevronRightIcon className="rtl:rotate-180" data-icon="inline-end" />
  </PaginationLink>
)

const PaginationEllipsis = ({ className, ...props }: ComponentProps<'span'>) => (
  <span
    aria-hidden="true"
    className={cn('flex size-9 items-center justify-center', className)}
    data-slot="pagination-ellipsis"
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
