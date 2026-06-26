import type { ComponentProps } from 'react'

import { cn } from '../../../lib/utils'

type AvatarProps = ComponentProps<'span'>
type AvatarImageProps = ComponentProps<'img'>
type AvatarFallbackProps = ComponentProps<'span'>

const Avatar = ({ className, ...props }: AvatarProps) => (
  <span
    className={cn('relative flex size-8 shrink-0 overflow-hidden rounded-full', className)}
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

export type { AvatarFallbackProps, AvatarImageProps, AvatarProps }
export { Avatar, AvatarFallback, AvatarImage }
