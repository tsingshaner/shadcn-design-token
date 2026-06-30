import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { ChevronRightIcon, MoreHorizontalIcon } from 'lucide-react'

import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

type BreadcrumbProps = ComponentProps<'nav'>
type BreadcrumbListProps = ComponentProps<'ol'>
type BreadcrumbItemProps = ComponentProps<'li'>
type BreadcrumbLinkProps = useRender.ComponentProps<'a'>
type BreadcrumbPageProps = ComponentProps<'span'>
type BreadcrumbSeparatorProps = ComponentProps<'li'>
type BreadcrumbEllipsisProps = ComponentProps<'span'>

const Breadcrumb = ({ className, ...props }: BreadcrumbProps) => (
  <nav aria-label="breadcrumb" className={cn('cn-breadcrumb', className)} data-slot="breadcrumb" {...props} />
)

const BreadcrumbList = ({ className, ...props }: BreadcrumbListProps) => (
  <ol
    className={cn(
      'cn-breadcrumb-list flex flex-wrap items-center gap-1.5 break-words text-muted-foreground text-sm sm:gap-2.5',
      className
    )}
    data-slot="breadcrumb-list"
    {...props}
  />
)

const BreadcrumbItem = ({ className, ...props }: BreadcrumbItemProps) => (
  <li
    className={cn('cn-breadcrumb-item inline-flex items-center gap-1.5', className)}
    data-slot="breadcrumb-item"
    {...props}
  />
)

const BreadcrumbLink = ({ className, render, ...props }: BreadcrumbLinkProps) =>
  useRender({
    defaultTagName: 'a',
    props: mergeProps<'a'>(
      {
        className: cn('cn-breadcrumb-link transition-colors hover:text-foreground'),
        ...({ 'data-slot': 'breadcrumb-link' } as Record<'data-slot', string>)
      },
      props,
      {
        className
      }
    ),
    render,
    state: {
      slot: 'breadcrumb-link'
    }
  })

const BreadcrumbPage = ({ className, ...props }: BreadcrumbPageProps) => (
  // biome-ignore lint/a11y/useSemanticElements: shadcn v4 exposes the current page as a disabled link.
  <span
    aria-current="page"
    aria-disabled="true"
    className={cn('cn-breadcrumb-page font-normal text-foreground', className)}
    data-slot="breadcrumb-page"
    role="link"
    tabIndex={-1}
    {...props}
  />
)

const BreadcrumbSeparator = ({ children, className, ...props }: BreadcrumbSeparatorProps) => (
  <li
    aria-hidden="true"
    className={cn('cn-breadcrumb-separator [&>svg]:size-3.5', className)}
    data-slot="breadcrumb-separator"
    role="presentation"
    {...props}
  >
    {children ?? <ChevronRightIcon className="cn-rtl-flip rtl:rotate-180" />}
  </li>
)

const BreadcrumbEllipsis = ({ className, ...props }: BreadcrumbEllipsisProps) => (
  <span
    aria-hidden="true"
    className={cn('cn-breadcrumb-ellipsis flex size-9 items-center justify-center', className)}
    data-slot="breadcrumb-ellipsis"
    role="presentation"
    {...props}
  >
    <MoreHorizontalIcon className="size-4" />
    <span className="sr-only">More</span>
  </span>
)

export type {
  BreadcrumbEllipsisProps,
  BreadcrumbItemProps,
  BreadcrumbLinkProps,
  BreadcrumbListProps,
  BreadcrumbPageProps,
  BreadcrumbProps,
  BreadcrumbSeparatorProps
}
export {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
}
