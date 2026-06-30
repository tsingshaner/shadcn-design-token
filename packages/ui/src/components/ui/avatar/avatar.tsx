import { Avatar as AvatarPrimitive } from '@base-ui/react/avatar'

import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

type AvatarProps = AvatarPrimitive.Root.Props & {
  size?: 'default' | 'sm' | 'lg'
}
type AvatarImageProps = AvatarPrimitive.Image.Props
type AvatarFallbackProps = AvatarPrimitive.Fallback.Props
type AvatarBadgeProps = ComponentProps<'span'>
type AvatarGroupProps = ComponentProps<'div'>
type AvatarGroupCountProps = ComponentProps<'div'>

const Avatar = ({ className, size = 'default', ...props }: AvatarProps) => (
  <AvatarPrimitive.Root
    className={cn(
      'cn-avatar group/avatar relative flex shrink-0 select-none overflow-hidden rounded-full after:absolute after:inset-0 after:border after:border-border after:mix-blend-darken dark:after:mix-blend-lighten',
      size === 'sm' && 'size-6',
      size === 'default' && 'size-8',
      size === 'lg' && 'size-10',
      className
    )}
    data-size={size}
    data-slot="avatar"
    {...props}
  />
)

const AvatarImage = ({ className, ...props }: AvatarImageProps) => (
  <AvatarPrimitive.Image
    className={cn('cn-avatar-image aspect-square size-full object-cover', className)}
    data-slot="avatar-image"
    {...props}
  />
)

const AvatarFallback = ({ className, ...props }: AvatarFallbackProps) => (
  <AvatarPrimitive.Fallback
    className={cn(
      'cn-avatar-fallback flex size-full items-center justify-center rounded-full bg-muted font-medium text-muted-foreground text-sm group-data-[size=sm]/avatar:text-xs',
      className
    )}
    data-slot="avatar-fallback"
    {...props}
  />
)

const AvatarBadge = ({ className, ...props }: AvatarBadgeProps) => (
  <span
    className={cn(
      'cn-avatar-badge absolute right-0 bottom-0 z-10 inline-flex size-2.5 select-none items-center justify-center rounded-full border-2 border-background bg-primary text-primary-foreground bg-blend-color ring-2 group-data-[size=lg]/avatar:size-3 group-data-[size=sm]/avatar:size-2 group-data-[size=sm]/avatar:[&>svg]:hidden group-data-[size=default]/avatar:[&>svg]:size-2 group-data-[size=lg]/avatar:[&>svg]:size-2',
      className
    )}
    data-slot="avatar-badge"
    {...props}
  />
)

const AvatarGroup = ({ className, ...props }: AvatarGroupProps) => (
  <div
    className={cn(
      'cn-avatar-group group/avatar-group flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background',
      className
    )}
    data-slot="avatar-group"
    {...props}
  />
)

const AvatarGroupCount = ({ className, ...props }: AvatarGroupCountProps) => (
  <div
    className={cn(
      'cn-avatar-group-count relative flex size-8 shrink-0 items-center justify-center rounded-full bg-muted font-medium text-muted-foreground text-xs ring-2 ring-background [&>svg]:size-3',
      className
    )}
    data-slot="avatar-group-count"
    {...props}
  />
)

export type {
  AvatarBadgeProps,
  AvatarFallbackProps,
  AvatarGroupCountProps,
  AvatarGroupProps,
  AvatarImageProps,
  AvatarProps
}
export { Avatar, AvatarBadge, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage }
