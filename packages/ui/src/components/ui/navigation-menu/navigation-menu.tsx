import { NavigationMenu as NavigationMenuPrimitive } from '@base-ui/react/navigation-menu'
import { cn } from 'cn'
import { ChevronDownIcon } from 'lucide-react'

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
  'group/navigation-menu-trigger inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 font-medium text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[open]:bg-accent data-[open]:text-accent-foreground disabled:pointer-events-none disabled:opacity-50'

const NavigationMenu = <Value = string>({
  align = 'start',
  children,
  className,
  ...props
}: NavigationMenuProps<Value>) => (
  <NavigationMenuPrimitive.Root
    className={cn('group/navigation-menu relative z-10 flex max-w-max flex-1 items-center justify-center', className)}
    data-scope="navigation-menu"
    data-slot="root"
    {...props}
  >
    {children}
    <NavigationMenuPositioner align={align} />
  </NavigationMenuPrimitive.Root>
)

const NavigationMenuList = ({ className, ...props }: NavigationMenuListProps) => (
  <NavigationMenuPrimitive.List
    className={cn('group flex flex-1 list-none items-center justify-center gap-1', className)}
    data-scope="navigation-menu"
    data-slot="list"
    {...props}
  />
)

const NavigationMenuItem = ({ className, ...props }: NavigationMenuItemProps) => (
  <NavigationMenuPrimitive.Item
    className={cn('relative', className)}
    data-scope="navigation-menu"
    data-slot="item"
    {...props}
  />
)

const NavigationMenuTrigger = ({ children, className, ...props }: NavigationMenuTriggerProps) => (
  <NavigationMenuPrimitive.Trigger
    className={cn(navigationMenuTriggerStyle, 'group', className)}
    data-scope="navigation-menu"
    data-slot="trigger"
    {...props}
  >
    {children}{' '}
    <ChevronDownIcon
      aria-hidden="true"
      className="size-3 transition-transform duration-200 group-data-[open]:rotate-180"
      data-scope="navigation-menu"
      data-slot="trigger-icon"
    />
  </NavigationMenuPrimitive.Trigger>
)

const NavigationMenuContent = ({ className, ...props }: NavigationMenuContentProps) => (
  <NavigationMenuPrimitive.Content
    className={cn(
      'h-full w-auto p-4 transition-[opacity,transform,translate] duration-[0.35s] data-ending-style:data-activation-direction=left:translate-x-[50%] data-ending-style:data-activation-direction=right:translate-x-[-50%] data-starting-style:data-activation-direction=left:translate-x-[-50%] data-starting-style:data-activation-direction=right:translate-x-[50%] data-ending-style:opacity-0 data-starting-style:opacity-0 **:data-[scope=navigation-menu]:data-[slot=link]:focus:outline-none **:data-[scope=navigation-menu]:data-[slot=link]:focus:ring-0',
      className
    )}
    data-scope="navigation-menu"
    data-slot="content"
    {...props}
  />
)

const NavigationMenuLink = ({ className, ...props }: NavigationMenuLinkProps) => (
  <NavigationMenuPrimitive.Link
    className={cn(
      'rounded-md px-3 py-2 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
      className
    )}
    data-scope="navigation-menu"
    data-slot="link"
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
        'isolate z-50 h-(--positioner-height) w-(--positioner-width) max-w-(--available-width) transition-[top,left,right,bottom] duration-[0.35s] data-instant:transition-none',
        className
      )}
      data-scope="navigation-menu"
      data-slot="positioner"
      side={side}
      sideOffset={sideOffset}
      {...props}
    >
      <NavigationMenuPrimitive.Popup
        className="data-[ending-style]:easing-[ease] relative h-(--popup-height) w-(--popup-width) xs:w-(--popup-width) origin-(--transform-origin) overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md transition-[opacity,transform,width,height,scale,translate] duration-[0.35s] ease-[cubic-bezier(0.22,1,0.36,1)]"
        data-scope="navigation-menu"
        data-slot="popup"
      >
        <NavigationMenuPrimitive.Viewport
          className="relative size-full overflow-hidden"
          data-scope="navigation-menu"
          data-slot="viewport"
        />
      </NavigationMenuPrimitive.Popup>
    </NavigationMenuPrimitive.Positioner>
  </NavigationMenuPrimitive.Portal>
)

const NavigationMenuIndicator = ({ className, ...props }: NavigationMenuIndicatorProps) => (
  <NavigationMenuPrimitive.Icon
    className={cn('top-full z-1 flex h-1.5 items-end justify-center overflow-hidden', className)}
    data-scope="navigation-menu"
    data-slot="indicator"
    {...props}
  >
    <div className="relative top-[60%] h-2 w-2 rotate-45" data-scope="navigation-menu" data-slot="indicator-arrow" />
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
