import { type ComponentProps, cloneElement, isValidElement, type ReactElement } from 'react'

import { cn } from '@/lib/utils'

type BreadcrumbProps = ComponentProps<'nav'>
type BreadcrumbLinkProps = ComponentProps<'a'> & {
  render?: ReactElement<ComponentProps<'a'>>
}

const Breadcrumb = ({ ...props }: BreadcrumbProps) => <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />

const BreadcrumbList = ({ className, ...props }: ComponentProps<'ol'>) => (
  <ol
    className={cn(
      'flex flex-wrap items-center gap-1.5 break-words text-muted-foreground text-sm sm:gap-2.5',
      className
    )}
    data-slot="breadcrumb-list"
    {...props}
  />
)

const BreadcrumbItem = ({ className, ...props }: ComponentProps<'li'>) => (
  <li className={cn('inline-flex items-center gap-1.5', className)} data-slot="breadcrumb-item" {...props} />
)

const BreadcrumbLink = ({ className, render, ...props }: BreadcrumbLinkProps) => {
  const linkProps = {
    className: cn('transition-colors hover:text-foreground', render?.props.className, className),
    'data-slot': 'breadcrumb-link',
    ...props
  }

  if (render && isValidElement(render)) {
    return cloneElement(render, linkProps)
  }

  return <a {...linkProps} />
}

const BreadcrumbPage = ({ className, ...props }: ComponentProps<'span'>) => (
  <span
    aria-current="page"
    className={cn('font-normal text-foreground', className)}
    data-slot="breadcrumb-page"
    {...props}
  />
)

const BreadcrumbSeparator = ({ children = '/', className, ...props }: ComponentProps<'li'>) => (
  <li
    aria-hidden="true"
    className={cn('[&>svg]:size-3.5', className)}
    data-slot="breadcrumb-separator"
    role="presentation"
    {...props}
  >
    {children}
  </li>
)

const BreadcrumbEllipsis = ({ className, ...props }: ComponentProps<'span'>) => (
  <span
    aria-hidden="true"
    className={cn('flex size-9 items-center justify-center', className)}
    data-slot="breadcrumb-ellipsis"
    role="presentation"
    {...props}
  >
    ...
  </span>
)

export type { BreadcrumbLinkProps, BreadcrumbProps }
export {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
}
