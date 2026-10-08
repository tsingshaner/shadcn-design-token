import { cn } from 'cn'
import { type ComponentProps, createContext, useCallback, useContext, useMemo, useState } from 'react'

import { cva, type VariantProps } from '@/lib/cva'

import { Button, type ButtonProps } from '../button'
import { Input, type InputProps } from '../input'
import { Separator } from '../separator'
import { Skeleton } from '../skeleton'

const sidebarMenuButtonVariants = cva({
  base: 'h-8 w-full justify-start gap-2 px-2 data-[active=true]:bg-sidebar-accent',
  variants: {
    size: {
      lg: 'h-12',
      md: '',
      sm: 'h-7 text-xs'
    },
    variant: {
      default: '',
      outline: 'border border-sidebar-border'
    }
  }
})

const sidebarMenuSubButtonVariants = cva({
  base: 'flex h-7 min-w-0 items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground text-sm outline-none hover:bg-sidebar-accent hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:hidden',
  variants: {
    size: {
      md: '',
      sm: 'h-6 text-xs'
    }
  }
})

type SidebarContextValue = {
  open: boolean
  setOpen: (open: boolean) => void
  toggle: () => void
}

const SidebarContext = createContext<SidebarContextValue | null>(null)

type SidebarProviderProps = ComponentProps<'div'> & {
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  open?: boolean
}
type SidebarProps = ComponentProps<'aside'> & {
  side?: 'left' | 'right'
}
type SidebarInsetProps = ComponentProps<'main'>
type SidebarTriggerProps = ButtonProps
type SidebarRailProps = ComponentProps<'button'>
type SidebarHeaderProps = ComponentProps<'div'>
type SidebarFooterProps = ComponentProps<'div'>
type SidebarContentProps = ComponentProps<'div'>
type SidebarGroupProps = ComponentProps<'div'>
type SidebarGroupLabelProps = ComponentProps<'div'>
type SidebarGroupActionProps = ComponentProps<'button'>
type SidebarGroupContentProps = ComponentProps<'div'>
type SidebarInputProps = InputProps
type SidebarMenuProps = ComponentProps<'ul'>
type SidebarMenuItemProps = ComponentProps<'li'>
type SidebarMenuButtonProps = Omit<ButtonProps, 'size' | 'variant'> &
  VariantProps<typeof sidebarMenuButtonVariants> & {
    isActive?: boolean
  }
type SidebarMenuActionProps = ComponentProps<'button'> & {
  showOnHover?: boolean
}
type SidebarMenuBadgeProps = ComponentProps<'span'>
type SidebarMenuSkeletonProps = ComponentProps<'div'> & {
  showIcon?: boolean
}
type SidebarMenuSubProps = ComponentProps<'ul'>
type SidebarMenuSubItemProps = ComponentProps<'li'>
type SidebarMenuSubButtonProps = ComponentProps<'a'> &
  VariantProps<typeof sidebarMenuSubButtonVariants> & {
    isActive?: boolean
  }
type SidebarSeparatorProps = ComponentProps<typeof Separator>

const useSidebar = () => {
  const context = useContext(SidebarContext)

  if (!context) {
    throw new Error('useSidebar must be used within SidebarProvider')
  }

  return context
}

const SidebarProvider = ({
  children,
  className,
  defaultOpen = true,
  onOpenChange,
  open,
  ...props
}: SidebarProviderProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen)
  const isOpen = open ?? uncontrolledOpen
  const setOpen = useCallback(
    (nextOpen: boolean) => {
      setUncontrolledOpen(nextOpen)
      onOpenChange?.(nextOpen)
    },
    [onOpenChange]
  )
  const value = useMemo(
    () => ({
      open: isOpen,
      setOpen,
      toggle: () => setOpen(!isOpen)
    }),
    [isOpen, setOpen]
  )

  return (
    <SidebarContext.Provider value={value}>
      <div
        className={cn(
          'group/sidebar-wrapper flex min-h-svh w-full has-[[data-scope=sidebar][data-slot=inset]]:bg-sidebar',
          className
        )}
        data-scope="sidebar"
        data-sidebar-state={isOpen ? 'expanded' : 'collapsed'}
        data-slot="wrapper"
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  )
}

const Sidebar = ({ className, side = 'left', ...props }: SidebarProps) => {
  const { open } = useSidebar()

  return (
    <aside
      className={cn(
        'flex h-svh shrink-0 flex-col border-sidebar-border bg-sidebar text-sidebar-foreground transition-[width] duration-200 ease-linear',
        open ? 'w-64' : 'w-14',
        side === 'left' ? 'border-r' : 'border-l',
        className
      )}
      data-scope="sidebar"
      data-side={side}
      data-slot="root"
      data-state={open ? 'expanded' : 'collapsed'}
      {...props}
    />
  )
}

const SidebarInset = ({ className, ...props }: SidebarInsetProps) => (
  <main
    className={cn('relative flex min-w-0 flex-1 flex-col bg-background', className)}
    data-scope="sidebar"
    data-slot="inset"
    {...props}
  />
)

const SidebarTrigger = ({ children, className, onClick, ...props }: SidebarTriggerProps) => {
  const { toggle } = useSidebar()

  return (
    <Button
      className={className}
      data-scope="sidebar"
      data-slot="trigger"
      onClick={(event) => {
        toggle()
        onClick?.(event)
      }}
      size="icon"
      variant="ghost"
      {...props}
    >
      {children ?? (
        <svg
          aria-hidden="true"
          className="size-4"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <rect height="18" rx="2" width="18" x="3" y="3" />
          <path d="M9 3v18" />
        </svg>
      )}
    </Button>
  )
}

const SidebarRail = ({ className, onClick, ...props }: SidebarRailProps) => {
  const { toggle } = useSidebar()

  return (
    <button
      aria-label="Toggle sidebar"
      className={cn('absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 sm:flex', className)}
      data-scope="sidebar"
      data-slot="rail"
      onClick={(event) => {
        toggle()
        onClick?.(event)
      }}
      type="button"
      {...props}
    />
  )
}

const SidebarHeader = ({ className, ...props }: SidebarHeaderProps) => (
  <div className={cn('flex flex-col gap-2 p-2', className)} data-scope="sidebar" data-slot="header" {...props} />
)

const SidebarFooter = ({ className, ...props }: SidebarFooterProps) => (
  <div className={cn('flex flex-col gap-2 p-2', className)} data-scope="sidebar" data-slot="footer" {...props} />
)

const SidebarContent = ({ className, ...props }: SidebarContentProps) => (
  <div
    className={cn('flex min-h-0 flex-1 flex-col gap-2 overflow-auto p-2', className)}
    data-scope="sidebar"
    data-slot="content"
    {...props}
  />
)

const SidebarGroup = ({ className, ...props }: SidebarGroupProps) => (
  <div
    className={cn('relative flex w-full min-w-0 flex-col p-2', className)}
    data-scope="sidebar"
    data-slot="group"
    {...props}
  />
)

const SidebarGroupLabel = ({ className, ...props }: SidebarGroupLabelProps) => (
  <div
    className={cn(
      'flex h-8 shrink-0 items-center rounded-md px-2 font-medium text-muted-foreground text-xs outline-none',
      className
    )}
    data-scope="sidebar"
    data-slot="group-label"
    {...props}
  />
)

const SidebarGroupAction = ({ className, ...props }: SidebarGroupActionProps) => (
  <button
    className={cn(
      'absolute top-3.5 right-3 flex aspect-square items-center justify-center rounded-md outline-none transition-transform',
      className
    )}
    data-scope="sidebar"
    data-slot="group-action"
    type="button"
    {...props}
  />
)

const SidebarGroupContent = ({ className, ...props }: SidebarGroupContentProps) => (
  <div className={cn('w-full text-sm', className)} data-scope="sidebar" data-slot="group-content" {...props} />
)

const SidebarInput = ({ className, ...props }: SidebarInputProps) => (
  <Input className={className} data-scope="sidebar" data-slot="input" {...props} />
)

const SidebarMenu = ({ className, ...props }: SidebarMenuProps) => (
  <ul
    className={cn('flex w-full min-w-0 flex-col gap-1', className)}
    data-scope="sidebar"
    data-slot="menu"
    {...props}
  />
)

const SidebarMenuItem = ({ className, ...props }: SidebarMenuItemProps) => (
  <li className={cn('group/menu-item relative', className)} data-scope="sidebar" data-slot="menu-item" {...props} />
)

const SidebarMenuButton = ({
  className,
  isActive,
  size = 'md',
  variant = 'default',
  ...props
}: SidebarMenuButtonProps) => (
  <Button
    className={sidebarMenuButtonVariants({ className, size, variant })}
    data-active={isActive}
    data-scope="sidebar"
    data-size={size}
    data-slot="menu-button"
    variant="ghost"
    {...props}
  />
)

const SidebarMenuAction = ({ className, showOnHover = false, ...props }: SidebarMenuActionProps) => (
  <button
    className={cn(
      'absolute top-1.5 right-1 flex aspect-square items-center justify-center rounded-md outline-none transition-transform',
      'group-data-[collapsible=icon]:hidden',
      showOnHover &&
        'opacity-0 group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 aria-expanded:opacity-100',
      className
    )}
    data-scope="sidebar"
    data-slot="menu-action"
    type="button"
    {...props}
  />
)

const SidebarMenuBadge = ({ className, ...props }: SidebarMenuBadgeProps) => (
  <span
    className={cn('ml-auto rounded-md px-1.5 font-medium text-muted-foreground text-xs tabular-nums', className)}
    data-scope="sidebar"
    data-slot="menu-badge"
    {...props}
  />
)

const SidebarMenuSkeleton = ({ className, showIcon = false, ...props }: SidebarMenuSkeletonProps) => (
  <div
    className={cn('flex h-8 items-center gap-2 rounded-md px-2', className)}
    data-scope="sidebar"
    data-slot="menu-skeleton"
    {...props}
  >
    {showIcon ? <Skeleton className="size-4" data-scope="sidebar" data-slot="menu-skeleton-icon" /> : null}
    <Skeleton className="h-4 flex-1" data-scope="sidebar" data-slot="menu-skeleton-text" />
  </div>
)

const SidebarMenuSub = ({ className, ...props }: SidebarMenuSubProps) => (
  <ul
    className={cn('mx-3.5 flex min-w-0 flex-col gap-1 border-sidebar-border border-l px-2.5 py-0.5', className)}
    data-scope="sidebar"
    data-slot="menu-sub"
    {...props}
  />
)

const SidebarMenuSubItem = ({ className, ...props }: SidebarMenuSubItemProps) => (
  <li
    className={cn('group/menu-sub-item relative', className)}
    data-scope="sidebar"
    data-slot="menu-sub-item"
    {...props}
  />
)

const SidebarMenuSubButton = ({ className, isActive, size = 'md', ...props }: SidebarMenuSubButtonProps) => (
  <a
    className={cn(
      sidebarMenuSubButtonVariants({ size }),
      isActive && 'bg-sidebar-accent text-sidebar-accent-foreground',
      className
    )}
    data-active={isActive}
    data-scope="sidebar"
    data-size={size}
    data-slot="menu-sub-button"
    {...props}
  />
)

const SidebarSeparator = ({ className, ...props }: SidebarSeparatorProps) => (
  <Separator
    className={cn('mx-2 w-auto bg-sidebar-border', className)}
    data-scope="sidebar"
    data-slot="separator"
    {...props}
  />
)

export type {
  SidebarContentProps,
  SidebarFooterProps,
  SidebarGroupActionProps,
  SidebarGroupContentProps,
  SidebarGroupLabelProps,
  SidebarGroupProps,
  SidebarHeaderProps,
  SidebarInputProps,
  SidebarInsetProps,
  SidebarMenuActionProps,
  SidebarMenuBadgeProps,
  SidebarMenuButtonProps,
  SidebarMenuItemProps,
  SidebarMenuProps,
  SidebarMenuSkeletonProps,
  SidebarMenuSubButtonProps,
  SidebarMenuSubItemProps,
  SidebarMenuSubProps,
  SidebarProps,
  SidebarProviderProps,
  SidebarRailProps,
  SidebarSeparatorProps,
  SidebarTriggerProps
}
export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar
}
