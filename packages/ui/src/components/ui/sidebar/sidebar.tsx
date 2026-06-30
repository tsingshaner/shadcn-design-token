import { type ComponentProps, createContext, useCallback, useContext, useMemo, useState } from 'react'

import { cn } from '@/lib/utils'

import { Button, type ButtonProps } from '../button'
import { Input, type InputProps } from '../input'
import { Separator } from '../separator'
import { Skeleton } from '../skeleton'

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
type SidebarMenuButtonProps = ButtonProps & {
  isActive?: boolean
  size?: 'default' | 'lg' | 'sm'
  variant?: 'default' | 'outline'
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
type SidebarMenuSubButtonProps = ComponentProps<'a'> & {
  isActive?: boolean
  size?: 'md' | 'sm'
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
          'cn-sidebar-gap group/sidebar-wrapper flex min-h-svh w-full has-[[data-slot=sidebar-inset]]:bg-sidebar',
          className
        )}
        data-sidebar-state={isOpen ? 'expanded' : 'collapsed'}
        data-slot="sidebar-wrapper"
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
        'cn-sidebar-inner flex h-svh shrink-0 flex-col border-sidebar-border bg-sidebar text-sidebar-foreground transition-[width] duration-200 ease-linear',
        open ? 'w-64' : 'w-14',
        side === 'left' ? 'border-r' : 'border-l',
        className
      )}
      data-side={side}
      data-slot="sidebar"
      data-state={open ? 'expanded' : 'collapsed'}
      {...props}
    />
  )
}

const SidebarInset = ({ className, ...props }: SidebarInsetProps) => (
  <main
    className={cn('cn-sidebar-inset relative flex min-w-0 flex-1 flex-col bg-background', className)}
    data-slot="sidebar-inset"
    {...props}
  />
)

const SidebarTrigger = ({ children, className, onClick, ...props }: SidebarTriggerProps) => {
  const { toggle } = useSidebar()

  return (
    <Button
      className={cn('cn-sidebar-trigger', className)}
      data-slot="sidebar-trigger"
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
          className="cn-rtl-flip size-4"
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
      className={cn('cn-sidebar-rail absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 sm:flex', className)}
      data-slot="sidebar-rail"
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
  <div className={cn('cn-sidebar-header flex flex-col gap-2 p-2', className)} data-slot="sidebar-header" {...props} />
)

const SidebarFooter = ({ className, ...props }: SidebarFooterProps) => (
  <div className={cn('cn-sidebar-footer flex flex-col gap-2 p-2', className)} data-slot="sidebar-footer" {...props} />
)

const SidebarContent = ({ className, ...props }: SidebarContentProps) => (
  <div
    className={cn('cn-sidebar-content flex min-h-0 flex-1 flex-col gap-2 overflow-auto p-2', className)}
    data-slot="sidebar-content"
    {...props}
  />
)

const SidebarGroup = ({ className, ...props }: SidebarGroupProps) => (
  <div
    className={cn('cn-sidebar-group relative flex w-full min-w-0 flex-col p-2', className)}
    data-slot="sidebar-group"
    {...props}
  />
)

const SidebarGroupLabel = ({ className, ...props }: SidebarGroupLabelProps) => (
  <div
    className={cn(
      'cn-sidebar-group-label flex h-8 shrink-0 items-center rounded-md px-2 font-medium text-muted-foreground text-xs outline-none',
      className
    )}
    data-slot="sidebar-group-label"
    {...props}
  />
)

const SidebarGroupAction = ({ className, ...props }: SidebarGroupActionProps) => (
  <button
    className={cn(
      'cn-sidebar-group-action absolute top-3.5 right-3 flex aspect-square items-center justify-center rounded-md outline-none transition-transform',
      className
    )}
    data-slot="sidebar-group-action"
    type="button"
    {...props}
  />
)

const SidebarGroupContent = ({ className, ...props }: SidebarGroupContentProps) => (
  <div
    className={cn('cn-sidebar-group-content w-full text-sm', className)}
    data-slot="sidebar-group-content"
    {...props}
  />
)

const SidebarInput = ({ className, ...props }: SidebarInputProps) => (
  <Input className={cn('cn-sidebar-input', className)} data-slot="sidebar-input" {...props} />
)

const SidebarMenu = ({ className, ...props }: SidebarMenuProps) => (
  <ul
    className={cn('cn-sidebar-menu flex w-full min-w-0 flex-col gap-1', className)}
    data-slot="sidebar-menu"
    {...props}
  />
)

const SidebarMenuItem = ({ className, ...props }: SidebarMenuItemProps) => (
  <li className={cn('group/menu-item relative', className)} data-slot="sidebar-menu-item" {...props} />
)

const SidebarMenuButton = ({
  className,
  isActive,
  size = 'default',
  variant = 'default',
  ...props
}: SidebarMenuButtonProps) => (
  <Button
    className={cn(
      'cn-sidebar-menu-button h-8 w-full justify-start gap-2 px-2 data-[active=true]:bg-sidebar-accent',
      variant === 'default' && 'cn-sidebar-menu-button-variant-default',
      variant === 'outline' && 'cn-sidebar-menu-button-variant-outline border border-sidebar-border',
      size === 'default' && 'cn-sidebar-menu-button-size-default',
      size === 'sm' && 'cn-sidebar-menu-button-size-sm h-7 text-xs',
      size === 'lg' && 'cn-sidebar-menu-button-size-lg h-12',
      className
    )}
    data-active={isActive}
    data-size={size}
    data-slot="sidebar-menu-button"
    variant="ghost"
    {...props}
  />
)

const SidebarMenuAction = ({ className, showOnHover = false, ...props }: SidebarMenuActionProps) => (
  <button
    className={cn(
      'cn-sidebar-menu-action absolute top-1.5 right-1 flex aspect-square items-center justify-center rounded-md outline-none transition-transform',
      'group-data-[collapsible=icon]:hidden',
      showOnHover &&
        'opacity-0 group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 aria-expanded:opacity-100',
      className
    )}
    data-slot="sidebar-menu-action"
    type="button"
    {...props}
  />
)

const SidebarMenuBadge = ({ className, ...props }: SidebarMenuBadgeProps) => (
  <span
    className={cn(
      'cn-sidebar-menu-badge ml-auto rounded-md px-1.5 font-medium text-muted-foreground text-xs tabular-nums',
      className
    )}
    data-slot="sidebar-menu-badge"
    {...props}
  />
)

const SidebarMenuSkeleton = ({ className, showIcon = false, ...props }: SidebarMenuSkeletonProps) => (
  <div
    className={cn('cn-sidebar-menu-skeleton flex h-8 items-center gap-2 rounded-md px-2', className)}
    data-slot="sidebar-menu-skeleton"
    {...props}
  >
    {showIcon ? (
      <Skeleton className="cn-sidebar-menu-skeleton-icon size-4" data-slot="sidebar-menu-skeleton-icon" />
    ) : null}
    <Skeleton className="cn-sidebar-menu-skeleton-text h-4 flex-1" data-slot="sidebar-menu-skeleton-text" />
  </div>
)

const SidebarMenuSub = ({ className, ...props }: SidebarMenuSubProps) => (
  <ul
    className={cn(
      'cn-sidebar-menu-sub mx-3.5 flex min-w-0 flex-col gap-1 border-sidebar-border border-l px-2.5 py-0.5',
      className
    )}
    data-slot="sidebar-menu-sub"
    {...props}
  />
)

const SidebarMenuSubItem = ({ className, ...props }: SidebarMenuSubItemProps) => (
  <li className={cn('group/menu-sub-item relative', className)} data-slot="sidebar-menu-sub-item" {...props} />
)

const SidebarMenuSubButton = ({ className, isActive, size = 'md', ...props }: SidebarMenuSubButtonProps) => (
  <a
    className={cn(
      'cn-sidebar-menu-sub-button flex h-7 min-w-0 items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground text-sm outline-none hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
      'group-data-[collapsible=icon]:hidden',
      size === 'sm' && 'h-6 text-xs',
      isActive && 'bg-sidebar-accent text-sidebar-accent-foreground',
      className
    )}
    data-active={isActive}
    data-size={size}
    data-slot="sidebar-menu-sub-button"
    {...props}
  />
)

const SidebarSeparator = ({ className, ...props }: SidebarSeparatorProps) => (
  <Separator
    className={cn('cn-sidebar-separator mx-2 w-auto bg-sidebar-border', className)}
    data-slot="sidebar-separator"
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
