import { type ComponentProps, createContext, useCallback, useContext, useMemo, useState } from 'react'

import { cn } from '@/lib/utils'

import { Button, type ButtonProps } from '../button'
import { Separator } from '../separator'

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
type SidebarGroupContentProps = ComponentProps<'div'>
type SidebarMenuProps = ComponentProps<'ul'>
type SidebarMenuItemProps = ComponentProps<'li'>
type SidebarMenuButtonProps = ButtonProps & {
  isActive?: boolean
}
type SidebarMenuBadgeProps = ComponentProps<'span'>
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
          'group/sidebar-wrapper flex min-h-svh w-full has-[[data-slot=sidebar-inset]]:bg-sidebar',
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
        'flex h-svh shrink-0 flex-col border-sidebar-border bg-sidebar text-sidebar-foreground transition-[width] duration-200 ease-linear',
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
    className={cn('relative flex min-w-0 flex-1 flex-col bg-background', className)}
    data-slot="sidebar-inset"
    {...props}
  />
)

const SidebarTrigger = ({ children, className, onClick, ...props }: SidebarTriggerProps) => {
  const { toggle } = useSidebar()

  return (
    <Button
      className={className}
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
  <div className={cn('flex flex-col gap-2 p-2', className)} data-slot="sidebar-header" {...props} />
)

const SidebarFooter = ({ className, ...props }: SidebarFooterProps) => (
  <div className={cn('flex flex-col gap-2 p-2', className)} data-slot="sidebar-footer" {...props} />
)

const SidebarContent = ({ className, ...props }: SidebarContentProps) => (
  <div
    className={cn('flex min-h-0 flex-1 flex-col gap-2 overflow-auto p-2', className)}
    data-slot="sidebar-content"
    {...props}
  />
)

const SidebarGroup = ({ className, ...props }: SidebarGroupProps) => (
  <div className={cn('relative flex w-full min-w-0 flex-col p-2', className)} data-slot="sidebar-group" {...props} />
)

const SidebarGroupLabel = ({ className, ...props }: SidebarGroupLabelProps) => (
  <div
    className={cn(
      'flex h-8 shrink-0 items-center rounded-md px-2 font-medium text-muted-foreground text-xs outline-none',
      className
    )}
    data-slot="sidebar-group-label"
    {...props}
  />
)

const SidebarGroupContent = ({ className, ...props }: SidebarGroupContentProps) => (
  <div className={cn('w-full text-sm', className)} data-slot="sidebar-group-content" {...props} />
)

const SidebarMenu = ({ className, ...props }: SidebarMenuProps) => (
  <ul className={cn('flex w-full min-w-0 flex-col gap-1', className)} data-slot="sidebar-menu" {...props} />
)

const SidebarMenuItem = ({ className, ...props }: SidebarMenuItemProps) => (
  <li className={cn('group/menu-item relative', className)} data-slot="sidebar-menu-item" {...props} />
)

const SidebarMenuButton = ({ className, isActive, ...props }: SidebarMenuButtonProps) => (
  <Button
    className={cn('h-8 w-full justify-start gap-2 px-2 data-[active=true]:bg-sidebar-accent', className)}
    data-active={isActive}
    data-slot="sidebar-menu-button"
    variant="ghost"
    {...props}
  />
)

const SidebarMenuBadge = ({ className, ...props }: SidebarMenuBadgeProps) => (
  <span
    className={cn('ml-auto rounded-md px-1.5 font-medium text-muted-foreground text-xs tabular-nums', className)}
    data-slot="sidebar-menu-badge"
    {...props}
  />
)

const SidebarSeparator = ({ className, ...props }: SidebarSeparatorProps) => (
  <Separator className={cn('mx-2 w-auto bg-sidebar-border', className)} data-slot="sidebar-separator" {...props} />
)

export type {
  SidebarContentProps,
  SidebarFooterProps,
  SidebarGroupContentProps,
  SidebarGroupLabelProps,
  SidebarGroupProps,
  SidebarHeaderProps,
  SidebarInsetProps,
  SidebarMenuBadgeProps,
  SidebarMenuButtonProps,
  SidebarMenuItemProps,
  SidebarMenuProps,
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
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar
}
