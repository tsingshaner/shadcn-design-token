import { NavigationMenu as NavigationMenuPrimitive } from '@base-ui/react/navigation-menu'
import { ChevronDownIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

type NavigationMenuProps<Value = string> = NavigationMenuPrimitive.Root.Props<Value> &
  Pick<NavigationMenuPrimitive.Positioner.Props, 'align'>
type NavigationMenuListProps = NavigationMenuPrimitive.List.Props
type NavigationMenuItemProps = NavigationMenuPrimitive.Item.Props
type NavigationMenuTriggerProps = NavigationMenuPrimitive.Trigger.Props
type NavigationMenuContentProps = NavigationMenuPrimitive.Content.Props
type NavigationMenuLinkProps = NavigationMenuPrimitive.Link.Props
type NavigationMenuPositionerProps = NavigationMenuPrimitive.Positioner.Props
type NavigationMenuIndicatorProps = NavigationMenuPrimitive.Icon.Props
type NavigationMenuViewportProps = NavigationMenuPositionerProps

const navigationMenuTriggerStyle =
  'cn-navigation-menu-trigger group/navigation-menu-trigger inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 font-medium text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[open]:bg-accent data-[open]:text-accent-foreground disabled:pointer-events-none disabled:opacity-50'

const NavigationMenu = <Value = string>({
  align = 'start',
  children,
  className,
  ...props
}: NavigationMenuProps<Value>) => (
  <NavigationMenuPrimitive.Root
    className={cn(
      'cn-navigation-menu group/navigation-menu relative z-10 flex max-w-max flex-1 items-center justify-center',
      className
    )}
    data-slot="navigation-menu"
    {...props}
  >
    {children}
    <NavigationMenuPositioner align={align} />
  </NavigationMenuPrimitive.Root>
)

const NavigationMenuList = ({ className, ...props }: NavigationMenuListProps) => (
  <NavigationMenuPrimitive.List
    className={cn('cn-navigation-menu-list group flex flex-1 list-none items-center justify-center gap-1', className)}
    data-slot="navigation-menu-list"
    {...props}
  />
)

const NavigationMenuItem = ({ className, ...props }: NavigationMenuItemProps) => (
  <NavigationMenuPrimitive.Item
    className={cn('cn-navigation-menu-item relative', className)}
    data-slot="navigation-menu-item"
    {...props}
  />
)

const NavigationMenuTrigger = ({ children, className, ...props }: NavigationMenuTriggerProps) => (
  <NavigationMenuPrimitive.Trigger
    className={cn(navigationMenuTriggerStyle, 'group', className)}
    data-slot="navigation-menu-trigger"
    {...props}
  >
    {children}{' '}
    <ChevronDownIcon
      aria-hidden="true"
      className="cn-navigation-menu-trigger-icon size-3 transition-transform duration-200 group-data-[open]:rotate-180"
    />
  </NavigationMenuPrimitive.Trigger>
)

const NavigationMenuContent = ({ className, ...props }: NavigationMenuContentProps) => (
  <NavigationMenuPrimitive.Content
    className={cn(
      'cn-navigation-menu-content h-full w-auto p-4 transition-[opacity,transform,translate] duration-[0.35s] data-ending-style:data-activation-direction=left:translate-x-[50%] data-ending-style:data-activation-direction=right:translate-x-[-50%] data-starting-style:data-activation-direction=left:translate-x-[-50%] data-starting-style:data-activation-direction=right:translate-x-[50%] data-ending-style:opacity-0 data-starting-style:opacity-0 **:data-[slot=navigation-menu-link]:focus:outline-none **:data-[slot=navigation-menu-link]:focus:ring-0',
      className
    )}
    data-slot="navigation-menu-content"
    {...props}
  />
)

const NavigationMenuLink = ({ className, ...props }: NavigationMenuLinkProps) => (
  <NavigationMenuPrimitive.Link
    className={cn(
      'cn-navigation-menu-link rounded-md px-3 py-2 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
      className
    )}
    data-slot="navigation-menu-link"
    {...props}
  />
)

const NavigationMenuPositioner = ({
  align = 'start',
  alignOffset = 0,
  className,
  side = 'bottom',
  sideOffset = 8,
  ...props
}: NavigationMenuPositionerProps) => (
  <NavigationMenuPrimitive.Portal>
    <NavigationMenuPrimitive.Positioner
      align={align}
      alignOffset={alignOffset}
      className={cn(
        'cn-navigation-menu-positioner isolate z-50 h-(--positioner-height) w-(--positioner-width) max-w-(--available-width) transition-[top,left,right,bottom] duration-[0.35s] data-instant:transition-none',
        className
      )}
      data-slot="navigation-menu-positioner"
      side={side}
      sideOffset={sideOffset}
      {...props}
    >
      <NavigationMenuPrimitive.Popup
        className="cn-navigation-menu-popup data-[ending-style]:easing-[ease] relative h-(--popup-height) w-(--popup-width) xs:w-(--popup-width) origin-(--transform-origin) overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md transition-[opacity,transform,width,height,scale,translate] duration-[0.35s] ease-[cubic-bezier(0.22,1,0.36,1)]"
        data-slot="navigation-menu-popup"
      >
        <NavigationMenuPrimitive.Viewport
          className="relative size-full overflow-hidden"
          data-slot="navigation-menu-viewport"
        />
      </NavigationMenuPrimitive.Popup>
    </NavigationMenuPrimitive.Positioner>
  </NavigationMenuPrimitive.Portal>
)

const NavigationMenuIndicator = ({ className, ...props }: NavigationMenuIndicatorProps) => (
  <NavigationMenuPrimitive.Icon
    className={cn(
      'cn-navigation-menu-indicator top-full z-1 flex h-1.5 items-end justify-center overflow-hidden',
      className
    )}
    data-slot="navigation-menu-indicator"
    {...props}
  >
    <div className="cn-navigation-menu-indicator-arrow relative top-[60%] h-2 w-2 rotate-45" />
  </NavigationMenuPrimitive.Icon>
)

const NavigationMenuViewport = (props: NavigationMenuViewportProps) => <NavigationMenuPositioner {...props} />

export type {
  NavigationMenuContentProps,
  NavigationMenuIndicatorProps,
  NavigationMenuItemProps,
  NavigationMenuLinkProps,
  NavigationMenuListProps,
  NavigationMenuPositionerProps,
  NavigationMenuProps,
  NavigationMenuTriggerProps,
  NavigationMenuViewportProps
}
export {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuPositioner,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle
}
