import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

type AvatarProps = ComponentProps<'span'> & {
  size?: 'default' | 'sm' | 'lg'
}
type AvatarImageProps = ComponentProps<'img'>
type AvatarFallbackProps = ComponentProps<'span'>
type AvatarBadgeProps = ComponentProps<'span'>
type AvatarGroupProps = ComponentProps<'div'>
type AvatarGroupCountProps = ComponentProps<'span'>

const Avatar = ({ className, size = 'default', ...props }: AvatarProps) => (
  <span
    className={cn(
      'relative flex shrink-0 overflow-hidden rounded-full',
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

const AvatarImage = ({ className, alt, ...props }: AvatarImageProps) => (
  <img
    alt={alt}
    className={cn('aspect-square size-full object-cover', className)}
    data-slot="avatar-image"
    {...props}
  />
)

const AvatarFallback = ({ className, ...props }: AvatarFallbackProps) => (
  <span
    className={cn(
      'flex size-full items-center justify-center rounded-full bg-muted font-medium text-muted-foreground text-xs',
      className
    )}
    data-slot="avatar-fallback"
    {...props}
  />
)

const AvatarBadge = ({ className, ...props }: AvatarBadgeProps) => (
  <span
    className={cn(
      'absolute right-0 bottom-0 flex size-2.5 items-center justify-center rounded-full border-2 border-background bg-primary text-primary-foreground [&>svg]:size-2',
      className
    )}
    data-slot="avatar-badge"
    {...props}
  />
)

const AvatarGroup = ({ className, ...props }: AvatarGroupProps) => (
  <div
    className={cn('flex -space-x-2 [&_[data-slot=avatar]]:ring-2 [&_[data-slot=avatar]]:ring-background', className)}
    data-slot="avatar-group"
    {...props}
  />
)

const AvatarGroupCount = ({ className, ...props }: AvatarGroupCountProps) => (
  <span
    className={cn(
      'flex size-8 items-center justify-center rounded-full bg-muted font-medium text-muted-foreground text-xs ring-2 ring-background [&>svg]:size-3',
      className
    )}
    data-slot="avatar-group-count"
    {...props}
  />
)

export type { AvatarFallbackProps, AvatarImageProps, AvatarProps }
export { Avatar, AvatarBadge, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage }
