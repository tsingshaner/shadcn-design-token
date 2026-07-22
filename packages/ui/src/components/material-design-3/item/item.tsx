import { type ComponentProps, cloneElement, isValidElement, type ReactElement } from 'react'

import { cn } from '@/lib/utils'

import { Separator, type SeparatorProps } from '../separator'

type ItemProps = ComponentProps<'div'> & {
  render?: ReactElement<{ className?: string; 'data-size'?: string; 'data-slot'?: string; 'data-variant'?: string }>
  size?: 'default' | 'sm' | 'xs'
  variant?: 'default' | 'outline' | 'muted'
}
type ItemMediaProps = ComponentProps<'div'> & {
  variant?: 'default' | 'icon' | 'image'
}
type ItemContentProps = ComponentProps<'div'>
type ItemTitleProps = ComponentProps<'div'>
type ItemDescriptionProps = ComponentProps<'p'>
type ItemActionsProps = ComponentProps<'div'>
type ItemGroupProps = ComponentProps<'ul'>
type ItemSeparatorProps = SeparatorProps
type ItemHeaderProps = ComponentProps<'div'>
type ItemFooterProps = ComponentProps<'div'>

const Item = ({ className, render, size = 'default', variant = 'default', ...props }: ItemProps) => {
  const itemClassName = cn(
    'cn-item group/item flex min-h-14 w-full flex-wrap items-center gap-4 rounded-none outline-none transition-colors duration-100 focus-visible:bg-primary/[0.08] [a]:transition-colors',
    variant === 'default' && 'cn-item-variant-default hover:bg-primary/[0.08]',
    variant === 'outline' && 'cn-item-variant-outline border bg-background shadow-xs hover:bg-muted/50',
    variant === 'muted' && 'cn-item-variant-muted bg-muted/50 hover:bg-muted',
    size === 'default' && 'cn-item-size-default px-4 py-2',
    size === 'sm' && 'cn-item-size-sm min-h-12 gap-3 px-4 py-1.5',
    size === 'xs' && 'cn-item-size-xs min-h-10 gap-2 px-4 py-1',
    render?.props.className,
    className
  )

  if (isValidElement(render)) {
    return cloneElement(render, {
      ...props,
      className: itemClassName,
      'data-size': size,
      'data-slot': 'item',
      'data-variant': variant
    })
  }

  return <div className={itemClassName} data-size={size} data-slot="item" data-variant={variant} {...props} />
}

const ItemGroup = ({ className, ...props }: ItemGroupProps) => (
  <ul
    className={cn('cn-item-group group/item-group flex w-full flex-col gap-0', className)}
    data-slot="item-group"
    {...props}
  />
)

const ItemSeparator = ({ className, ...props }: ItemSeparatorProps) => (
  <Separator
    className={cn('cn-item-separator data-horizontal:w-full', className)}
    data-slot="item-separator"
    orientation="horizontal"
    {...props}
  />
)

const ItemHeader = ({ className, ...props }: ItemHeaderProps) => (
  <div
    className={cn('cn-item-header flex basis-full items-center justify-between', className)}
    data-slot="item-header"
    {...props}
  />
)

const ItemFooter = ({ className, ...props }: ItemFooterProps) => (
  <div
    className={cn('cn-item-footer flex basis-full items-center justify-between', className)}
    data-slot="item-footer"
    {...props}
  />
)

const ItemMedia = ({ className, variant = 'default', ...props }: ItemMediaProps) => (
  <div
    className={cn(
      'cn-item-media flex shrink-0 items-center justify-center overflow-hidden text-muted-foreground',
      variant === 'default' && 'cn-item-media-variant-default size-10 rounded-md bg-muted',
      variant === 'icon' && 'cn-item-media-variant-icon size-10 rounded-md border bg-background [&>svg]:size-5',
      variant === 'image' &&
        'cn-item-media-variant-image size-10 rounded-md bg-muted [&>img]:size-full [&>img]:object-cover',
      className
    )}
    data-slot="item-media"
    data-variant={variant}
    {...props}
  />
)

const ItemContent = ({ className, ...props }: ItemContentProps) => (
  <div
    className={cn(
      'cn-item-content flex min-w-0 flex-1 flex-col gap-1 [&+[data-slot=item-content]]:flex-none',
      className
    )}
    data-slot="item-content"
    {...props}
  />
)

const ItemTitle = ({ className, ...props }: ItemTitleProps) => (
  <div
    className={cn('cn-item-title line-clamp-1 flex w-fit items-center font-medium text-sm', className)}
    data-slot="item-title"
    {...props}
  />
)

const ItemDescription = ({ className, ...props }: ItemDescriptionProps) => (
  <p
    className={cn(
      'cn-item-description line-clamp-2 font-normal text-muted-foreground text-sm [&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4',
      className
    )}
    data-slot="item-description"
    {...props}
  />
)

const ItemActions = ({ className, ...props }: ItemActionsProps) => (
  <div
    className={cn('cn-item-actions flex shrink-0 items-center gap-2', className)}
    data-slot="item-actions"
    {...props}
  />
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
