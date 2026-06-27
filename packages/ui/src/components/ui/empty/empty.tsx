import type { ComponentProps } from 'react'

import { cn } from '../../../lib/utils'

type EmptyProps = ComponentProps<'div'>
type EmptyHeaderProps = ComponentProps<'div'>
type EmptyTitleProps = ComponentProps<'div'>
type EmptyDescriptionProps = ComponentProps<'div'>
type EmptyContentProps = ComponentProps<'div'>
type EmptyMediaProps = ComponentProps<'div'> & {
  variant?: 'default' | 'icon'
}

const Empty = ({ className, ...props }: EmptyProps) => (
  <div
    className={cn(
      'flex min-h-64 flex-col items-center justify-center gap-6 rounded-lg border border-dashed p-6 text-center',
      className
    )}
    data-slot="empty"
    {...props}
  />
)

const EmptyHeader = ({ className, ...props }: EmptyHeaderProps) => (
  <div className={cn('grid gap-1', className)} data-slot="empty-header" {...props} />
)

const EmptyTitle = ({ className, ...props }: EmptyTitleProps) => (
  <div className={cn('font-semibold text-lg', className)} data-slot="empty-title" {...props} />
)

const EmptyDescription = ({ className, ...props }: EmptyDescriptionProps) => (
  <div className={cn('max-w-sm text-muted-foreground text-sm', className)} data-slot="empty-description" {...props} />
)

const EmptyContent = ({ className, ...props }: EmptyContentProps) => (
  <div className={cn('flex items-center gap-2', className)} data-slot="empty-content" {...props} />
)

const EmptyMedia = ({ className, variant = 'default', ...props }: EmptyMediaProps) => (
  <div
    className={cn(
      'flex size-12 items-center justify-center rounded-full',
      variant === 'default' && 'bg-muted text-muted-foreground',
      variant === 'icon' && 'bg-muted text-muted-foreground [&_svg:not([class*=size-])]:size-6',
      className
    )}
    data-slot="empty-media"
    data-variant={variant}
    {...props}
  />
)

export type { EmptyContentProps, EmptyDescriptionProps, EmptyHeaderProps, EmptyMediaProps, EmptyProps, EmptyTitleProps }
export { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle }
