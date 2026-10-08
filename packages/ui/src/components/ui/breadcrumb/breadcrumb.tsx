import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { cn } from 'cn'
import { ChevronRightIcon, MoreHorizontalIcon } from 'lucide-react'

import type { ComponentProps } from 'react'

type BreadcrumbProps = ComponentProps<'nav'>
type BreadcrumbListProps = ComponentProps<'ol'>
type BreadcrumbItemProps = ComponentProps<'li'>
type BreadcrumbLinkProps = useRender.ComponentProps<'a'>
type BreadcrumbPageProps = ComponentProps<'span'>
type BreadcrumbSeparatorProps = ComponentProps<'li'>
type BreadcrumbEllipsisProps = ComponentProps<'span'>

const Breadcrumb = ({ className, ...props }: BreadcrumbProps) => (
  <nav aria-label="breadcrumb" className={className} data-scope="breadcrumb" data-slot="root" {...props} />
)

const BreadcrumbList = ({ className, ...props }: BreadcrumbListProps) => (
  <ol
    className={cn(
      'flex flex-wrap items-center gap-1.5 break-words text-muted-foreground text-sm sm:gap-2.5',
      className
    )}
    data-scope="breadcrumb"
    data-slot="list"
    {...props}
  />
)

const BreadcrumbItem = ({ className, ...props }: BreadcrumbItemProps) => (
  <li
    className={cn('inline-flex items-center gap-1.5', className)}
    data-scope="breadcrumb"
    data-slot="item"
    {...props}
  />
)

const BreadcrumbLink = ({ className, render, ...props }: BreadcrumbLinkProps) =>
  useRender({
    defaultTagName: 'a',
    props: mergeProps<'a'>(
      {
        className: cn('transition-colors hover:text-foreground'),
        ...({ 'data-scope': 'breadcrumb', 'data-slot': 'link' } as Record<'data-scope' | 'data-slot', string>)
      },
      props,
      {
        className
      }
    ),
    render,
    state: {
      scope: 'breadcrumb',
      slot: 'link'
    }
  })

const BreadcrumbPage = ({ className, ...props }: BreadcrumbPageProps) => (
  // biome-ignore lint/a11y/useSemanticElements: shadcn v4 exposes the current page as a disabled link.
  <span
    aria-current="page"
    aria-disabled="true"
    className={cn('font-normal text-foreground', className)}
    data-scope="breadcrumb"
    data-slot="page"
    role="link"
    tabIndex={-1}
    {...props}
  />
)

const BreadcrumbSeparator = ({ children, className, ...props }: BreadcrumbSeparatorProps) => (
  <li
    aria-hidden="true"
    className={cn('[&>svg]:size-3.5', className)}
    data-scope="breadcrumb"
    data-slot="separator"
    role="presentation"
    {...props}
  >
    {children ?? <ChevronRightIcon className="rtl:rotate-180" />}
  </li>
)

const BreadcrumbEllipsis = ({ className, ...props }: BreadcrumbEllipsisProps) => (
  <span
    aria-hidden="true"
    className={cn('flex size-9 items-center justify-center', className)}
    data-scope="breadcrumb"
    data-slot="ellipsis"
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
