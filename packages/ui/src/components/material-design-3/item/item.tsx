import { cn } from 'cn'
import { type ComponentProps, cloneElement, isValidElement, type ReactElement } from 'react'

import { cva, type VariantProps } from '@/lib/cva'

import { Separator, type SeparatorProps } from '../separator'

const itemVariants = cva({
  base: 'group/item flex min-h-14 w-full flex-wrap items-center gap-4 rounded-none outline-none transition-colors duration-100 focus-visible:bg-primary/[0.08] [a]:transition-colors',
  variants: {
    size: {
      md: 'px-4 py-2',
      sm: 'min-h-12 gap-3 px-4 py-1.5',
      xs: 'min-h-10 gap-2 px-4 py-1'
    },
    variant: {
      default: 'hover:bg-primary/[0.08]',
      muted: 'bg-muted/50 hover:bg-muted',
      outline: 'border bg-background shadow-xs hover:bg-muted/50'
    }
  }
})

const itemMediaVariants = cva({
  base: 'flex shrink-0 items-center justify-center overflow-hidden text-muted-foreground',
  variants: {
    variant: {
      default: 'size-10 rounded-md bg-muted',
      icon: 'size-10 rounded-md border bg-background [&>svg]:size-5',
      image: 'size-10 rounded-md bg-muted [&>img]:size-full [&>img]:object-cover'
    }
  }
})

type ItemProps = ComponentProps<'div'> &
  VariantProps<typeof itemVariants> & {
    render?: ReactElement<{
      className?: string
      'data-scope'?: string
      'data-size'?: string
      'data-slot'?: string
      'data-variant'?: string
    }>
  }
type ItemMediaProps = ComponentProps<'div'> & VariantProps<typeof itemMediaVariants>
type ItemContentProps = ComponentProps<'div'>
type ItemTitleProps = ComponentProps<'div'>
type ItemDescriptionProps = ComponentProps<'p'>
type ItemActionsProps = ComponentProps<'div'>
type ItemGroupProps = ComponentProps<'ul'>
type ItemSeparatorProps = SeparatorProps
type ItemHeaderProps = ComponentProps<'div'>
type ItemFooterProps = ComponentProps<'div'>

const Item = ({ className, render, size = 'md', variant = 'default', ...props }: ItemProps) => {
  const itemClassName = cn(itemVariants({ size, variant }), render?.props.className, className)

  if (isValidElement(render)) {
    return cloneElement(render, {
      ...props,
      className: itemClassName,
      'data-scope': 'item',
      'data-size': size,
      'data-slot': 'root',
      'data-variant': variant
    })
  }

  return (
    <div
      className={itemClassName}
      data-scope="item"
      data-size={size}
      data-slot="root"
      data-variant={variant}
      {...props}
    />
  )
}

const ItemGroup = ({ className, ...props }: ItemGroupProps) => (
  <ul
    className={cn('group/item-group flex w-full flex-col gap-0', className)}
    data-scope="item"
    data-slot="group"
    {...props}
  />
)

const ItemSeparator = ({ className, ...props }: ItemSeparatorProps) => (
  <Separator
    className={cn('data-horizontal:w-full', className)}
    data-scope="item"
    data-slot="separator"
    orientation="horizontal"
    {...props}
  />
)

const ItemHeader = ({ className, ...props }: ItemHeaderProps) => (
  <div
    className={cn('flex basis-full items-center justify-between', className)}
    data-scope="item"
    data-slot="header"
    {...props}
  />
)

const ItemFooter = ({ className, ...props }: ItemFooterProps) => (
  <div
    className={cn('flex basis-full items-center justify-between', className)}
    data-scope="item"
    data-slot="footer"
    {...props}
  />
)

const ItemMedia = ({ className, variant = 'default', ...props }: ItemMediaProps) => (
  <div
    className={itemMediaVariants({ className, variant })}
    data-scope="item"
    data-slot="media"
    data-variant={variant}
    {...props}
  />
)

const ItemContent = ({ className, ...props }: ItemContentProps) => (
  <div
    className={cn('flex min-w-0 flex-1 flex-col gap-1 [&+[data-scope=item][data-slot=content]]:flex-none', className)}
    data-scope="item"
    data-slot="content"
    {...props}
  />
)

const ItemTitle = ({ className, ...props }: ItemTitleProps) => (
  <div
    className={cn('line-clamp-1 flex w-fit items-center font-medium text-sm', className)}
    data-scope="item"
    data-slot="title"
    {...props}
  />
)

const ItemDescription = ({ className, ...props }: ItemDescriptionProps) => (
  <p
    className={cn(
      'line-clamp-2 font-normal text-muted-foreground text-sm [&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4',
      className
    )}
    data-scope="item"
    data-slot="description"
    {...props}
  />
)

const ItemActions = ({ className, ...props }: ItemActionsProps) => (
  <div className={cn('flex shrink-0 items-center gap-2', className)} data-scope="item" data-slot="actions" {...props} />
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
