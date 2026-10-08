import { type ClassValue, cn } from 'cn'

import type { ComponentProps } from 'react'

type EmptyProps = ComponentProps<'div'>
type EmptyHeaderProps = ComponentProps<'div'>
type EmptyTitleProps = ComponentProps<'div'>
type EmptyDescriptionProps = ComponentProps<'p'>
type EmptyContentProps = ComponentProps<'div'>

type EmptyMediaVariantsProps = {
  variant?: 'default' | 'icon' | null
}

const emptyMediaVariants = ({
  variant = 'default',
  class: classValue,
  className
}: EmptyMediaVariantsProps & { class?: ClassValue; className?: ClassValue } = {}) =>
  cn(
    'cn-empty-media flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0',
    variant === 'default' && 'cn-empty-media-default size-12 rounded-full bg-muted text-muted-foreground',
    variant === 'icon' &&
      'cn-empty-media-icon size-10 rounded-md bg-transparent text-muted-foreground [&_svg:not([class*=size-])]:size-6',
    classValue,
    className
  )

type EmptyMediaProps = ComponentProps<'div'> & EmptyMediaVariantsProps

const Empty = ({ className, ...props }: EmptyProps) => (
  <div
    className={cn(
      'cn-empty flex w-full min-w-0 flex-1 flex-col items-center justify-center gap-6 text-balance text-center',
      className
    )}
    data-slot="empty"
    {...props}
  />
)

const EmptyHeader = ({ className, ...props }: EmptyHeaderProps) => (
  <div
    className={cn('cn-empty-header flex max-w-sm flex-col items-center gap-1', className)}
    data-slot="empty-header"
    {...props}
  />
)

const EmptyTitle = ({ className, ...props }: EmptyTitleProps) => (
  <div
    className={cn('cn-empty-title cn-font-heading font-semibold text-lg', className)}
    data-slot="empty-title"
    {...props}
  />
)

const EmptyDescription = ({ className, ...props }: EmptyDescriptionProps) => (
  <p
    className={cn(
      'cn-empty-description text-muted-foreground text-sm [&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4',
      className
    )}
    data-slot="empty-description"
    {...props}
  />
)

const EmptyContent = ({ className, ...props }: EmptyContentProps) => (
  <div
    className={cn('cn-empty-content flex w-full min-w-0 max-w-sm flex-col items-center gap-2 text-balance', className)}
    data-slot="empty-content"
    {...props}
  />
)

const EmptyMedia = ({ className, variant = 'default', ...props }: EmptyMediaProps) => (
  <div
    className={cn(emptyMediaVariants({ variant }), className)}
    data-slot="empty-icon"
    data-variant={variant}
    {...props}
  />
)

export type { EmptyContentProps, EmptyDescriptionProps, EmptyHeaderProps, EmptyMediaProps, EmptyProps, EmptyTitleProps }
export { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle }
