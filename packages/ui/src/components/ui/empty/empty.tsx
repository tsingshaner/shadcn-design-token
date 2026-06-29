import { tv, type VariantProps } from 'tailwind-variants'

import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

type EmptyProps = ComponentProps<'div'>
type EmptyHeaderProps = ComponentProps<'div'>
type EmptyTitleProps = ComponentProps<'div'>
type EmptyDescriptionProps = ComponentProps<'p'>
type EmptyContentProps = ComponentProps<'div'>

const emptyMediaVariants = tv({
  base: 'flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0',
  defaultVariants: {
    variant: 'default'
  },
  variants: {
    variant: {
      default: 'size-12 rounded-full bg-muted text-muted-foreground',
      icon: 'size-10 rounded-md bg-transparent text-muted-foreground [&_svg:not([class*=size-])]:size-6'
    }
  }
})

type EmptyMediaProps = ComponentProps<'div'> & VariantProps<typeof emptyMediaVariants>

const Empty = ({ className, ...props }: EmptyProps) => (
  <div
    className={cn(
      'flex w-full min-w-0 flex-1 flex-col items-center justify-center gap-6 text-balance text-center',
      className
    )}
    data-slot="empty"
    {...props}
  />
)

const EmptyHeader = ({ className, ...props }: EmptyHeaderProps) => (
  <div className={cn('flex max-w-sm flex-col items-center gap-1', className)} data-slot="empty-header" {...props} />
)

const EmptyTitle = ({ className, ...props }: EmptyTitleProps) => (
  <div className={cn('font-semibold text-lg', className)} data-slot="empty-title" {...props} />
)

const EmptyDescription = ({ className, ...props }: EmptyDescriptionProps) => (
  <p
    className={cn(
      'text-muted-foreground text-sm [&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4',
      className
    )}
    data-slot="empty-description"
    {...props}
  />
)

const EmptyContent = ({ className, ...props }: EmptyContentProps) => (
  <div
    className={cn('flex w-full min-w-0 max-w-sm flex-col items-center gap-2 text-balance', className)}
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
