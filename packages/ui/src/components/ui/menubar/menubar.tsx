import { Menu as MenubarMenuPrimitive } from '@base-ui/react/menu'
import { Menubar as MenubarPrimitive } from '@base-ui/react/menubar'

import type { ComponentProps } from 'react'

import { cn } from '../../../lib/utils'

type MenubarProps = MenubarPrimitive.Props
type MenubarMenuProps = MenubarMenuPrimitive.Root.Props
type MenubarTriggerProps = MenubarMenuPrimitive.Trigger.Props
type MenubarPortalProps = MenubarMenuPrimitive.Portal.Props
type MenubarContentProps = MenubarMenuPrimitive.Popup.Props &
  Pick<MenubarMenuPrimitive.Positioner.Props, 'align' | 'side' | 'sideOffset'>
type MenubarItemProps = MenubarMenuPrimitive.Item.Props
type MenubarCheckboxItemProps = MenubarMenuPrimitive.CheckboxItem.Props
type MenubarRadioGroupProps = MenubarMenuPrimitive.RadioGroup.Props
type MenubarRadioItemProps = MenubarMenuPrimitive.RadioItem.Props
type MenubarLabelProps = MenubarMenuPrimitive.GroupLabel.Props
type MenubarSeparatorProps = MenubarMenuPrimitive.Separator.Props
type MenubarGroupProps = MenubarMenuPrimitive.Group.Props
type MenubarSubProps = MenubarMenuPrimitive.SubmenuRoot.Props
type MenubarSubTriggerProps = MenubarMenuPrimitive.SubmenuTrigger.Props
type MenubarSubContentProps = MenubarContentProps
type MenubarShortcutProps = ComponentProps<'span'>

const itemClasses =
  'relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:opacity-50'

const Menubar = ({ className, ...props }: MenubarProps) => (
  <MenubarPrimitive
    className={cn('flex h-9 items-center gap-1 rounded-md border bg-background p-1 shadow-xs', className)}
    data-slot="menubar"
    {...props}
  />
)

const MenubarMenu = (props: MenubarMenuProps) => <MenubarMenuPrimitive.Root {...props} />

const MenubarTrigger = ({ className, ...props }: MenubarTriggerProps) => (
  <MenubarMenuPrimitive.Trigger
    className={cn(
      'flex cursor-default select-none items-center rounded-sm px-3 py-1.5 font-medium text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[open]:bg-accent data-[open]:text-accent-foreground',
      className
    )}
    data-slot="menubar-trigger"
    {...props}
  />
)

const MenubarPortal = (props: MenubarPortalProps) => (
  <MenubarMenuPrimitive.Portal data-slot="menubar-portal" {...props} />
)

const MenubarContent = ({
  align = 'start',
  className,
  side = 'bottom',
  sideOffset = 4,
  ...props
}: MenubarContentProps) => (
  <MenubarPortal>
    <MenubarMenuPrimitive.Positioner align={align} side={side} sideOffset={sideOffset}>
      <MenubarMenuPrimitive.Popup
        className={cn(
          'z-50 min-w-32 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md outline-none',
          className
        )}
        data-slot="menubar-content"
        {...props}
      />
    </MenubarMenuPrimitive.Positioner>
  </MenubarPortal>
)

const MenubarGroup = (props: MenubarGroupProps) => <MenubarMenuPrimitive.Group data-slot="menubar-group" {...props} />

const MenubarItem = ({ className, ...props }: MenubarItemProps) => (
  <MenubarMenuPrimitive.Item className={cn(itemClasses, className)} data-slot="menubar-item" {...props} />
)

const MenubarCheckboxItem = ({ children, className, ...props }: MenubarCheckboxItemProps) => (
  <MenubarMenuPrimitive.CheckboxItem
    className={cn(itemClasses, 'pl-8', className)}
    data-slot="menubar-checkbox-item"
    {...props}
  >
    <span className="absolute left-2 flex size-3.5 items-center justify-center">
      <MenubarMenuPrimitive.CheckboxItemIndicator data-slot="menubar-checkbox-item-indicator">
        <svg
          aria-hidden="true"
          className="size-4"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
          viewBox="0 0 24 24"
        >
          <path d="m5 12 4 4L19 6" />
        </svg>
      </MenubarMenuPrimitive.CheckboxItemIndicator>
    </span>
    {children}
  </MenubarMenuPrimitive.CheckboxItem>
)

const MenubarRadioGroup = (props: MenubarRadioGroupProps) => (
  <MenubarMenuPrimitive.RadioGroup data-slot="menubar-radio-group" {...props} />
)

const MenubarRadioItem = ({ children, className, ...props }: MenubarRadioItemProps) => (
  <MenubarMenuPrimitive.RadioItem
    className={cn(itemClasses, 'pl-8', className)}
    data-slot="menubar-radio-item"
    {...props}
  >
    <span className="absolute left-2 flex size-3.5 items-center justify-center">
      <MenubarMenuPrimitive.RadioItemIndicator data-slot="menubar-radio-item-indicator">
        <span className="size-2 rounded-full bg-current" />
      </MenubarMenuPrimitive.RadioItemIndicator>
    </span>
    {children}
  </MenubarMenuPrimitive.RadioItem>
)

const MenubarLabel = ({ className, ...props }: MenubarLabelProps) => (
  <MenubarMenuPrimitive.GroupLabel
    className={cn('px-2 py-1.5 font-medium text-sm', className)}
    data-slot="menubar-label"
    {...props}
  />
)

const MenubarSeparator = ({ className, ...props }: MenubarSeparatorProps) => (
  <MenubarMenuPrimitive.Separator
    className={cn('-mx-1 my-1 h-px bg-muted', className)}
    data-slot="menubar-separator"
    {...props}
  />
)

const MenubarShortcut = ({ className, ...props }: MenubarShortcutProps) => (
  <span
    className={cn('ml-auto text-muted-foreground text-xs tracking-widest', className)}
    data-slot="menubar-shortcut"
    {...props}
  />
)

const MenubarSub = (props: MenubarSubProps) => <MenubarMenuPrimitive.SubmenuRoot {...props} />

const MenubarSubTrigger = ({ children, className, ...props }: MenubarSubTriggerProps) => (
  <MenubarMenuPrimitive.SubmenuTrigger
    className={cn(itemClasses, 'data-[open]:bg-accent data-[open]:text-accent-foreground', className)}
    data-slot="menubar-sub-trigger"
    {...props}
  >
    {children}
    <span className="ml-auto text-muted-foreground">›</span>
  </MenubarMenuPrimitive.SubmenuTrigger>
)

const MenubarSubContent = ({ className, sideOffset = 4, ...props }: MenubarSubContentProps) => (
  <MenubarContent className={cn('min-w-32', className)} sideOffset={sideOffset} {...props} />
)

export type {
  MenubarCheckboxItemProps,
  MenubarContentProps,
  MenubarGroupProps,
  MenubarItemProps,
  MenubarLabelProps,
  MenubarMenuProps,
  MenubarPortalProps,
  MenubarProps,
  MenubarRadioGroupProps,
  MenubarRadioItemProps,
  MenubarSeparatorProps,
  MenubarShortcutProps,
  MenubarSubContentProps,
  MenubarSubProps,
  MenubarSubTriggerProps,
  MenubarTriggerProps
}
export {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarPortal,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger
}
