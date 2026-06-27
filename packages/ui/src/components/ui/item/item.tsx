import type { ComponentProps } from 'react'

import { cn } from '../../../lib/utils'

type ItemProps = ComponentProps<'div'> & {
  size?: 'default' | 'sm' | 'xs'
  variant?: 'default' | 'outline' | 'muted'
}
type ItemMediaProps = ComponentProps<'div'> & {
  variant?: 'default' | 'icon' | 'image'
}
type ItemContentProps = ComponentProps<'div'>
type ItemTitleProps = ComponentProps<'div'>
type ItemDescriptionProps = ComponentProps<'div'>
type ItemActionsProps = ComponentProps<'div'>
type ItemGroupProps = ComponentProps<'div'>
type ItemSeparatorProps = ComponentProps<'div'>
type ItemHeaderProps = ComponentProps<'div'>
type ItemFooterProps = ComponentProps<'div'>

const Item = ({ className, size = 'default', variant = 'default', ...props }: ItemProps) => (
  <div
    className={cn(
      'flex w-full items-start gap-4 rounded-lg transition-colors',
      variant === 'default' && 'hover:bg-muted/50',
      variant === 'outline' && 'border bg-background shadow-xs hover:bg-muted/50',
      variant === 'muted' && 'bg-muted/50 hover:bg-muted',
      size === 'default' && 'p-3',
      size === 'sm' && 'gap-3 p-2.5',
      size === 'xs' && 'gap-2 rounded-md p-2',
      className
    )}
    data-size={size}
    data-slot="item"
    data-variant={variant}
    {...props}
  />
)

const ItemGroup = ({ className, ...props }: ItemGroupProps) => (
  <div className={cn('grid gap-2', className)} data-slot="item-group" {...props} />
)

const ItemSeparator = ({ className, ...props }: ItemSeparatorProps) => (
  <div aria-hidden="true" className={cn('h-px w-full bg-border', className)} data-slot="item-separator" {...props} />
)

const ItemHeader = ({ className, ...props }: ItemHeaderProps) => (
  <div className={cn('mb-2 w-full', className)} data-slot="item-header" {...props} />
)

const ItemFooter = ({ className, ...props }: ItemFooterProps) => (
  <div className={cn('mt-2 flex w-full items-center gap-2', className)} data-slot="item-footer" {...props} />
)

const ItemMedia = ({ className, variant = 'default', ...props }: ItemMediaProps) => (
  <div
    className={cn(
      'flex shrink-0 items-center justify-center overflow-hidden text-muted-foreground',
      variant === 'default' && 'size-10 rounded-md bg-muted',
      variant === 'icon' && 'size-10 rounded-md border bg-background [&>svg]:size-5',
      variant === 'image' && 'size-10 rounded-md bg-muted [&>img]:size-full [&>img]:object-cover',
      className
    )}
    data-slot="item-media"
    data-variant={variant}
    {...props}
  />
)

const ItemContent = ({ className, ...props }: ItemContentProps) => (
  <div className={cn('grid min-w-0 flex-1 gap-1', className)} data-slot="item-content" {...props} />
)

const ItemTitle = ({ className, ...props }: ItemTitleProps) => (
  <div className={cn('truncate font-medium text-sm leading-none', className)} data-slot="item-title" {...props} />
)

const ItemDescription = ({ className, ...props }: ItemDescriptionProps) => (
  <div
    className={cn('line-clamp-2 text-muted-foreground text-sm', className)}
    data-slot="item-description"
    {...props}
  />
)

const ItemActions = ({ className, ...props }: ItemActionsProps) => (
  <div className={cn('flex shrink-0 items-center gap-2', className)} data-slot="item-actions" {...props} />
)

export type {
  ItemActionsProps,
  ItemContentProps,
  ItemDescriptionProps,
  ItemFooterProps,
  ItemGroupProps,
  ItemHeaderProps,
  ItemMediaProps,
  ItemProps,
  ItemSeparatorProps,
  ItemTitleProps
}
export {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemSeparator,
  ItemTitle
}
