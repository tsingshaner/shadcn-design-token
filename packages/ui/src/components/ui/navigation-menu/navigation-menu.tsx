import { NavigationMenu as NavigationMenuPrimitive } from '@base-ui/react/navigation-menu'

import { cn } from '@/lib/utils'

type NavigationMenuProps<Value = string> = NavigationMenuPrimitive.Root.Props<Value>
type NavigationMenuListProps = NavigationMenuPrimitive.List.Props
type NavigationMenuItemProps = NavigationMenuPrimitive.Item.Props
type NavigationMenuTriggerProps = NavigationMenuPrimitive.Trigger.Props
type NavigationMenuContentProps = NavigationMenuPrimitive.Content.Props
type NavigationMenuLinkProps = NavigationMenuPrimitive.Link.Props
type NavigationMenuViewportProps = NavigationMenuPrimitive.Viewport.Props &
  Pick<NavigationMenuPrimitive.Positioner.Props, 'align' | 'side' | 'sideOffset'>

const navigationMenuTriggerStyle =
  'inline-flex h-9 items-center justify-center rounded-md bg-background px-4 py-2 font-medium text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[open]:bg-accent data-[open]:text-accent-foreground disabled:pointer-events-none disabled:opacity-50'

const NavigationMenu = <Value = string>({ className, ...props }: NavigationMenuProps<Value>) => (
  <NavigationMenuPrimitive.Root
    className={cn('relative z-10 flex max-w-max flex-1 items-center justify-center', className)}
    data-slot="navigation-menu"
    {...props}
  />
)

const NavigationMenuList = ({ className, ...props }: NavigationMenuListProps) => (
  <NavigationMenuPrimitive.List
    className={cn('group flex flex-1 list-none items-center justify-center gap-1', className)}
    data-slot="navigation-menu-list"
    {...props}
  />
)

const NavigationMenuItem = ({ className, ...props }: NavigationMenuItemProps) => (
  <NavigationMenuPrimitive.Item className={cn('relative', className)} data-slot="navigation-menu-item" {...props} />
)

const NavigationMenuTrigger = ({ children, className, ...props }: NavigationMenuTriggerProps) => (
  <NavigationMenuPrimitive.Trigger
    className={cn(navigationMenuTriggerStyle, 'group', className)}
    data-slot="navigation-menu-trigger"
    {...props}
  >
    {children}
    <NavigationMenuPrimitive.Icon
      aria-hidden="true"
      className="ml-1 size-3 transition-transform duration-200 group-data-[open]:rotate-180"
      data-slot="navigation-menu-indicator"
    >
      <svg
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </NavigationMenuPrimitive.Icon>
  </NavigationMenuPrimitive.Trigger>
)

const NavigationMenuContent = ({ className, ...props }: NavigationMenuContentProps) => (
  <NavigationMenuPrimitive.Content
    className={cn('w-full p-4', className)}
    data-slot="navigation-menu-content"
    {...props}
  />
)

const NavigationMenuLink = ({ className, ...props }: NavigationMenuLinkProps) => (
  <NavigationMenuPrimitive.Link
    className={cn(navigationMenuTriggerStyle, className)}
    data-slot="navigation-menu-link"
    {...props}
  />
)

const NavigationMenuViewport = ({
  align = 'center',
  className,
  side = 'bottom',
  sideOffset = 8,
  ...props
}: NavigationMenuViewportProps) => (
  <NavigationMenuPrimitive.Portal>
    <NavigationMenuPrimitive.Positioner align={align} side={side} sideOffset={sideOffset}>
      <NavigationMenuPrimitive.Popup
        className="z-50 overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md"
        data-slot="navigation-menu-popup"
      >
        <NavigationMenuPrimitive.Viewport
          className={cn('h-[var(--popup-height)] w-[var(--popup-width)]', className)}
          data-slot="navigation-menu-viewport"
          {...props}
        />
      </NavigationMenuPrimitive.Popup>
    </NavigationMenuPrimitive.Positioner>
  </NavigationMenuPrimitive.Portal>
)

export type {
  NavigationMenuContentProps,
  NavigationMenuItemProps,
  NavigationMenuLinkProps,
  NavigationMenuListProps,
  NavigationMenuProps,
  NavigationMenuTriggerProps,
  NavigationMenuViewportProps
}
export {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle
}
