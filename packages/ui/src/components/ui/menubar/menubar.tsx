import { Menu as MenuPrimitive } from '@base-ui/react/menu'
import { Menubar as MenubarPrimitive } from '@base-ui/react/menubar'
import { cn } from 'cn'
import { CheckIcon } from 'lucide-react'

import type { ComponentProps } from 'react'

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
    className={cn('flex h-9 items-center gap-1 rounded-md border bg-background p-1 shadow-xs', className)}
    data-scope="menubar"
    data-slot="root"
    {...props}
  />
)

const MenubarMenu = (props: MenubarMenuProps) => <DropdownMenu data-scope="menubar" data-slot="menu" {...props} />

const MenubarGroup = (props: MenubarGroupProps) => (
  <DropdownMenuGroup data-scope="menubar" data-slot="group" {...props} />
)

const MenubarPortal = (props: MenubarPortalProps) => (
  <DropdownMenuPortal data-scope="menubar" data-slot="portal" {...props} />
)

const MenubarTrigger = ({ className, ...props }: MenubarTriggerProps) => (
  <DropdownMenuTrigger
    className={cn(
      'flex cursor-default select-none items-center rounded-sm px-3 py-1.5 font-medium text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-popup-open:bg-accent data-popup-open:text-accent-foreground',
      className
    )}
    data-scope="menubar"
    data-slot="trigger"
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
    className={cn('min-w-32', className)}
    data-scope="menubar"
    data-slot="content"
    sideOffset={sideOffset}
    {...props}
  />
)

const MenubarItem = ({ className, inset, variant = 'default', ...props }: MenubarItemProps) => (
  <DropdownMenuItem
    className={cn('group/menubar-item', className)}
    data-inset={inset}
    data-scope="menubar"
    data-slot="item"
    data-variant={variant}
    inset={inset}
    variant={variant}
    {...props}
  />
)

const MenubarCheckboxItem = ({ children, className, checked, inset, ...props }: MenubarCheckboxItemProps) => (
  <MenuPrimitive.CheckboxItem
    checked={checked}
    className={cn('', checkableItemClasses, 'pl-8', className)}
    data-inset={inset}
    data-scope="menubar"
    data-slot="checkbox-item"
    {...props}
  >
    <span
      className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center"
      data-scope="menubar"
      data-slot="checkbox-item-indicator"
    >
      <MenuPrimitive.CheckboxItemIndicator>
        <CheckIcon />
      </MenuPrimitive.CheckboxItemIndicator>
    </span>
    {children}
  </MenuPrimitive.CheckboxItem>
)

const MenubarRadioGroup = (props: MenubarRadioGroupProps) => (
  <DropdownMenuRadioGroup data-scope="menubar" data-slot="radio-group" {...props} />
)

const MenubarRadioItem = ({ children, className, inset, ...props }: MenubarRadioItemProps) => (
  <MenuPrimitive.RadioItem
    className={cn('', checkableItemClasses, 'pl-8', className)}
    data-inset={inset}
    data-scope="menubar"
    data-slot="radio-item"
    {...props}
  >
    <span
      className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center"
      data-scope="menubar"
      data-slot="radio-item-indicator"
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
    className={className}
    data-inset={inset}
    data-scope="menubar"
    data-slot="label"
    inset={inset}
    {...props}
  />
)

const MenubarSeparator = ({ className, ...props }: MenubarSeparatorProps) => (
  <DropdownMenuSeparator
    className={cn('-mx-1 my-1 h-px', className)}
    data-scope="menubar"
    data-slot="separator"
    {...props}
  />
)

const MenubarShortcut = ({ className, ...props }: MenubarShortcutProps) => (
  <DropdownMenuShortcut className={cn('ml-auto', className)} data-scope="menubar" data-slot="shortcut" {...props} />
)

const MenubarSub = (props: MenubarSubProps) => <DropdownMenuSub data-scope="menubar" data-slot="sub" {...props} />

const MenubarSubTrigger = ({ className, inset, ...props }: MenubarSubTriggerProps) => (
  <DropdownMenuSubTrigger
    className={className}
    data-inset={inset}
    data-scope="menubar"
    data-slot="sub-trigger"
    inset={inset}
    {...props}
  />
)

const MenubarSubContent = ({ className, ...props }: MenubarSubContentProps) => (
  <DropdownMenuSubContent
    className={cn('min-w-32', className)}
    data-scope="menubar"
    data-slot="sub-content"
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
