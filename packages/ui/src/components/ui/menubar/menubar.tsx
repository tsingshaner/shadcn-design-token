import { Menu as MenuPrimitive } from '@base-ui/react/menu'
import { Menubar as MenubarPrimitive } from '@base-ui/react/menubar'
import { CheckIcon } from 'lucide-react'

import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '../dropdown-menu'

type MenubarProps = MenubarPrimitive.Props
type MenubarMenuProps = ComponentProps<typeof DropdownMenu>
type MenubarTriggerProps = ComponentProps<typeof DropdownMenuTrigger>
type MenubarPortalProps = ComponentProps<typeof DropdownMenuPortal>
type MenubarContentProps = ComponentProps<typeof DropdownMenuContent>
type MenubarItemProps = ComponentProps<typeof DropdownMenuItem>
type MenubarCheckboxItemProps = MenuPrimitive.CheckboxItem.Props & {
  inset?: boolean
}
type MenubarRadioGroupProps = ComponentProps<typeof DropdownMenuRadioGroup>
type MenubarRadioItemProps = MenuPrimitive.RadioItem.Props & {
  inset?: boolean
}
type MenubarLabelProps = ComponentProps<typeof DropdownMenuLabel>
type MenubarSeparatorProps = ComponentProps<typeof DropdownMenuSeparator>
type MenubarGroupProps = ComponentProps<typeof DropdownMenuGroup>
type MenubarSubProps = ComponentProps<typeof DropdownMenuSub>
type MenubarSubTriggerProps = ComponentProps<typeof DropdownMenuSubTrigger>
type MenubarSubContentProps = ComponentProps<typeof DropdownMenuSubContent>
type MenubarShortcutProps = ComponentProps<typeof DropdownMenuShortcut>

const checkableItemClasses =
  'relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden data-disabled:pointer-events-none data-disabled:opacity-50 data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[inset=true]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4'

const Menubar = ({ className, ...props }: MenubarProps) => (
  <MenubarPrimitive
    className={cn('cn-menubar flex h-9 items-center gap-1 rounded-md border bg-background p-1 shadow-xs', className)}
    data-slot="menubar"
    {...props}
  />
)

const MenubarMenu = (props: MenubarMenuProps) => <DropdownMenu data-slot="menubar-menu" {...props} />

const MenubarGroup = (props: MenubarGroupProps) => <DropdownMenuGroup data-slot="menubar-group" {...props} />

const MenubarPortal = (props: MenubarPortalProps) => <DropdownMenuPortal data-slot="menubar-portal" {...props} />

const MenubarTrigger = ({ className, ...props }: MenubarTriggerProps) => (
  <DropdownMenuTrigger
    className={cn(
      'cn-menubar-trigger flex cursor-default select-none items-center rounded-sm px-3 py-1.5 font-medium text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-popup-open:bg-accent data-popup-open:text-accent-foreground',
      className
    )}
    data-slot="menubar-trigger"
    {...props}
  />
)

const MenubarContent = ({
  align = 'start',
  alignOffset = -4,
  className,
  sideOffset = 8,
  ...props
}: MenubarContentProps) => (
  <DropdownMenuContent
    align={align}
    alignOffset={alignOffset}
    className={cn(
      'cn-menubar-content cn-menubar-content-logical cn-menu-target cn-menu-translucent min-w-32',
      className
    )}
    data-slot="menubar-content"
    sideOffset={sideOffset}
    {...props}
  />
)

const MenubarItem = ({ className, inset, variant = 'default', ...props }: MenubarItemProps) => (
  <DropdownMenuItem
    className={cn('cn-menubar-item group/menubar-item', className)}
    data-inset={inset}
    data-slot="menubar-item"
    data-variant={variant}
    inset={inset}
    variant={variant}
    {...props}
  />
)

const MenubarCheckboxItem = ({ children, className, checked, inset, ...props }: MenubarCheckboxItemProps) => (
  <MenuPrimitive.CheckboxItem
    checked={checked}
    className={cn('cn-menubar-checkbox-item', checkableItemClasses, 'pl-8', className)}
    data-inset={inset}
    data-slot="menubar-checkbox-item"
    {...props}
  >
    <span
      className="cn-menubar-checkbox-item-indicator pointer-events-none absolute left-2 flex size-3.5 items-center justify-center"
      data-slot="menubar-checkbox-item-indicator"
    >
      <MenuPrimitive.CheckboxItemIndicator>
        <CheckIcon />
      </MenuPrimitive.CheckboxItemIndicator>
    </span>
    {children}
  </MenuPrimitive.CheckboxItem>
)

const MenubarRadioGroup = (props: MenubarRadioGroupProps) => (
  <DropdownMenuRadioGroup data-slot="menubar-radio-group" {...props} />
)

const MenubarRadioItem = ({ children, className, inset, ...props }: MenubarRadioItemProps) => (
  <MenuPrimitive.RadioItem
    className={cn('cn-menubar-radio-item', checkableItemClasses, 'pl-8', className)}
    data-inset={inset}
    data-slot="menubar-radio-item"
    {...props}
  >
    <span
      className="cn-menubar-radio-item-indicator pointer-events-none absolute left-2 flex size-3.5 items-center justify-center"
      data-slot="menubar-radio-item-indicator"
    >
      <MenuPrimitive.RadioItemIndicator>
        <CheckIcon />
      </MenuPrimitive.RadioItemIndicator>
    </span>
    {children}
  </MenuPrimitive.RadioItem>
)

const MenubarLabel = ({ className, inset, ...props }: MenubarLabelProps) => (
  <DropdownMenuLabel
    className={cn('cn-menubar-label', className)}
    data-inset={inset}
    data-slot="menubar-label"
    inset={inset}
    {...props}
  />
)

const MenubarSeparator = ({ className, ...props }: MenubarSeparatorProps) => (
  <DropdownMenuSeparator
    className={cn('cn-menubar-separator -mx-1 my-1 h-px', className)}
    data-slot="menubar-separator"
    {...props}
  />
)

const MenubarShortcut = ({ className, ...props }: MenubarShortcutProps) => (
  <DropdownMenuShortcut
    className={cn('cn-menubar-shortcut ml-auto', className)}
    data-slot="menubar-shortcut"
    {...props}
  />
)

const MenubarSub = (props: MenubarSubProps) => <DropdownMenuSub data-slot="menubar-sub" {...props} />

const MenubarSubTrigger = ({ className, inset, ...props }: MenubarSubTriggerProps) => (
  <DropdownMenuSubTrigger
    className={cn('cn-menubar-sub-trigger', className)}
    data-inset={inset}
    data-slot="menubar-sub-trigger"
    inset={inset}
    {...props}
  />
)

const MenubarSubContent = ({ className, ...props }: MenubarSubContentProps) => (
  <DropdownMenuSubContent
    className={cn('cn-menubar-sub-content cn-menu-target cn-menu-translucent min-w-32', className)}
    data-slot="menubar-sub-content"
    {...props}
  />
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
