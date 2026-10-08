import { Avatar as AvatarPrimitive } from '@base-ui/react/avatar'
import { cn } from 'cn'

import type { ComponentProps } from 'react'

import { cva, type VariantProps } from '@/lib/cva'

const avatarVariants = cva({
  base: 'group/avatar relative flex shrink-0 select-none overflow-hidden rounded-full after:absolute after:inset-0 after:border after:border-border after:mix-blend-darken dark:after:mix-blend-lighten',
  variants: {
    size: {
      lg: 'size-10',
      md: 'size-8',
      sm: 'size-6'
    }
  }
})

type AvatarProps = AvatarPrimitive.Root.Props & VariantProps<typeof avatarVariants>
type AvatarImageProps = AvatarPrimitive.Image.Props
type AvatarFallbackProps = AvatarPrimitive.Fallback.Props
type AvatarBadgeProps = ComponentProps<'span'>
type AvatarGroupProps = ComponentProps<'div'>
type AvatarGroupCountProps = ComponentProps<'div'>

const Avatar = ({ className, size = 'md', ...props }: AvatarProps) => (
  <AvatarPrimitive.Root
    className={avatarVariants({ className, size })}
    data-scope="avatar"
    data-size={size}
    data-slot="root"
    {...props}
  />
)

const AvatarImage = ({ className, ...props }: AvatarImageProps) => (
  <AvatarPrimitive.Image
    className={cn('aspect-square size-full object-cover', className)}
    data-scope="avatar"
    data-slot="image"
    {...props}
  />
)

const AvatarFallback = ({ className, ...props }: AvatarFallbackProps) => (
  <AvatarPrimitive.Fallback
    className={cn(
      'flex size-full items-center justify-center rounded-full bg-muted font-medium text-muted-foreground text-sm group-data-[size=sm]/avatar:text-xs',
      className
    )}
    data-scope="avatar"
    data-slot="fallback"
    {...props}
  />
)

const AvatarBadge = ({ className, ...props }: AvatarBadgeProps) => (
  <span
    className={cn(
      'absolute right-0 bottom-0 z-10 inline-flex size-2.5 select-none items-center justify-center rounded-full border-2 border-background bg-primary text-primary-foreground bg-blend-color ring-2 group-data-[size=lg]/avatar:size-3 group-data-[size=sm]/avatar:size-2 group-data-[size=sm]/avatar:[&>svg]:hidden group-data-[size=lg]/avatar:[&>svg]:size-2 group-data-[size=md]/avatar:[&>svg]:size-2',
      className
    )}
    data-scope="avatar"
    data-slot="badge"
    {...props}
  />
)

const AvatarGroup = ({ className, ...props }: AvatarGroupProps) => (
  <div
    className={cn(
      'group/avatar-group flex -space-x-2 *:data-[scope=avatar]:data-[slot=root]:ring-2 *:data-[scope=avatar]:data-[slot=root]:ring-background',
      className
    )}
    data-scope="avatar"
    data-slot="group"
    {...props}
  />
)

const AvatarGroupCount = ({ className, ...props }: AvatarGroupCountProps) => (
  <div
    className={cn(
      'relative flex size-8 shrink-0 items-center justify-center rounded-full bg-muted font-medium text-muted-foreground text-xs ring-2 ring-background [&>svg]:size-3',
      className
    )}
    data-scope="avatar"
    data-slot="group-count"
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
