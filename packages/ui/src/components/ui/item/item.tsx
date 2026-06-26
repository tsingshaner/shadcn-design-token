import type { ComponentProps } from 'react'

import { cn } from '../../../lib/utils'

type ItemProps = ComponentProps<'div'>
type ItemMediaProps = ComponentProps<'div'>
type ItemContentProps = ComponentProps<'div'>
type ItemTitleProps = ComponentProps<'div'>
type ItemDescriptionProps = ComponentProps<'div'>
type ItemActionsProps = ComponentProps<'div'>

const Item = ({ className, ...props }: ItemProps) => (
  <div
    className={cn('flex w-full items-start gap-4 rounded-lg p-3 transition-colors hover:bg-muted/50', className)}
    data-slot="item"
    {...props}
  />
)

const ItemMedia = ({ className, ...props }: ItemMediaProps) => (
  <div
    className={cn(
      'flex size-10 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground',
      className
    )}
    data-slot="item-media"
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

export type { ItemActionsProps, ItemContentProps, ItemDescriptionProps, ItemMediaProps, ItemProps, ItemTitleProps }
export { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle }
