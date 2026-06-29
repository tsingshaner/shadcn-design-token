import { Menu as DropdownMenuPrimitive } from '@base-ui/react/menu'
import { CheckIcon, ChevronRightIcon, CircleIcon } from 'lucide-react'

import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

type DropdownMenuProps = DropdownMenuPrimitive.Root.Props
type DropdownMenuTriggerProps = DropdownMenuPrimitive.Trigger.Props
type DropdownMenuPortalProps = DropdownMenuPrimitive.Portal.Props
type DropdownMenuContentProps = DropdownMenuPrimitive.Popup.Props &
  Pick<DropdownMenuPrimitive.Positioner.Props, 'align' | 'alignOffset' | 'side' | 'sideOffset'>
type DropdownMenuItemProps = DropdownMenuPrimitive.Item.Props & {
  inset?: boolean
  variant?: 'default' | 'destructive'
}
type DropdownMenuCheckboxItemProps = DropdownMenuPrimitive.CheckboxItem.Props & {
  inset?: boolean
}
type DropdownMenuRadioGroupProps = DropdownMenuPrimitive.RadioGroup.Props
type DropdownMenuRadioItemProps = DropdownMenuPrimitive.RadioItem.Props & {
  inset?: boolean
}
type DropdownMenuLabelProps = DropdownMenuPrimitive.GroupLabel.Props & {
  inset?: boolean
}
type DropdownMenuSeparatorProps = DropdownMenuPrimitive.Separator.Props
type DropdownMenuGroupProps = DropdownMenuPrimitive.Group.Props
type DropdownMenuSubProps = DropdownMenuPrimitive.SubmenuRoot.Props
type DropdownMenuSubTriggerProps = DropdownMenuPrimitive.SubmenuTrigger.Props & {
  inset?: boolean
}
type DropdownMenuSubContentProps = DropdownMenuContentProps
type DropdownMenuShortcutProps = ComponentProps<'span'>

const itemClasses =
  'group/dropdown-menu-item relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden data-disabled:pointer-events-none data-disabled:opacity-50 data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[inset=true]:pl-8 data-[variant=destructive]:text-destructive data-[variant=destructive]:data-[highlighted]:bg-destructive/10 data-[variant=destructive]:data-[highlighted]:text-destructive [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4'

const DropdownMenu = (props: DropdownMenuProps) => <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />

const DropdownMenuTrigger = (props: DropdownMenuTriggerProps) => (
  <DropdownMenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />
)

const DropdownMenuPortal = (props: DropdownMenuPortalProps) => (
  <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
)

const DropdownMenuContent = ({
  align = 'start',
  alignOffset = 0,
  className,
  side = 'bottom',
  sideOffset = 4,
  ...props
}: DropdownMenuContentProps) => (
  <DropdownMenuPortal>
    <DropdownMenuPrimitive.Positioner
      align={align}
      alignOffset={alignOffset}
      className="isolate z-50 outline-none"
      side={side}
      sideOffset={sideOffset}
    >
      <DropdownMenuPrimitive.Popup
        className={cn(
          'z-50 max-h-(--available-height) min-w-32 origin-(--transform-origin) overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md outline-none data-closed:overflow-hidden',
          className
        )}
        data-slot="dropdown-menu-content"
        {...props}
      />
    </DropdownMenuPrimitive.Positioner>
  </DropdownMenuPortal>
)

const DropdownMenuGroup = (props: DropdownMenuGroupProps) => (
  <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
)

const DropdownMenuItem = ({ className, inset, variant = 'default', ...props }: DropdownMenuItemProps) => (
  <DropdownMenuPrimitive.Item
    className={cn(itemClasses, className)}
    data-inset={inset}
    data-slot="dropdown-menu-item"
    data-variant={variant}
    {...props}
  />
)

const DropdownMenuCheckboxItem = ({ children, className, checked, inset, ...props }: DropdownMenuCheckboxItemProps) => (
  <DropdownMenuPrimitive.CheckboxItem
    checked={checked}
    className={cn(itemClasses, 'pl-8', className)}
    data-inset={inset}
    data-slot="dropdown-menu-checkbox-item"
    {...props}
  >
    <span
      className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center"
      data-slot="dropdown-menu-checkbox-item-indicator"
    >
      <DropdownMenuPrimitive.CheckboxItemIndicator>
        <CheckIcon />
      </DropdownMenuPrimitive.CheckboxItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
)

const DropdownMenuRadioGroup = (props: DropdownMenuRadioGroupProps) => (
  <DropdownMenuPrimitive.RadioGroup data-slot="dropdown-menu-radio-group" {...props} />
)

const DropdownMenuRadioItem = ({ children, className, inset, ...props }: DropdownMenuRadioItemProps) => (
  <DropdownMenuPrimitive.RadioItem
    className={cn(itemClasses, 'pl-8', className)}
    data-inset={inset}
    data-slot="dropdown-menu-radio-item"
    {...props}
  >
    <span
      className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center"
      data-slot="dropdown-menu-radio-item-indicator"
    >
      <DropdownMenuPrimitive.RadioItemIndicator>
        <CircleIcon className="size-2 fill-current" />
      </DropdownMenuPrimitive.RadioItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
)

const DropdownMenuLabel = ({ className, inset, ...props }: DropdownMenuLabelProps) => (
  <DropdownMenuPrimitive.GroupLabel
    className={cn('px-2 py-1.5 font-medium text-sm data-[inset=true]:pl-8', className)}
    data-inset={inset}
    data-slot="dropdown-menu-label"
    {...props}
  />
)

const DropdownMenuSeparator = ({ className, ...props }: DropdownMenuSeparatorProps) => (
  <DropdownMenuPrimitive.Separator
    className={cn('-mx-1 my-1 h-px bg-muted', className)}
    data-slot="dropdown-menu-separator"
    {...props}
  />
)

const DropdownMenuShortcut = ({ className, ...props }: DropdownMenuShortcutProps) => (
  <span
    className={cn('ml-auto text-muted-foreground text-xs tracking-widest', className)}
    data-slot="dropdown-menu-shortcut"
    {...props}
  />
)

const DropdownMenuSub = (props: DropdownMenuSubProps) => (
  <DropdownMenuPrimitive.SubmenuRoot data-slot="dropdown-menu-sub" {...props} />
)

const DropdownMenuSubTrigger = ({ children, className, inset, ...props }: DropdownMenuSubTriggerProps) => (
  <DropdownMenuPrimitive.SubmenuTrigger
    className={cn(itemClasses, 'data-popup-open:bg-accent data-popup-open:text-accent-foreground', className)}
    data-inset={inset}
    data-slot="dropdown-menu-sub-trigger"
    {...props}
  >
    {children}
    <ChevronRightIcon className="ml-auto" />
  </DropdownMenuPrimitive.SubmenuTrigger>
)

const DropdownMenuSubContent = ({
  align = 'start',
  alignOffset = -3,
  className,
  side = 'right',
  sideOffset = 0,
  ...props
}: DropdownMenuSubContentProps) => (
  <DropdownMenuContent
    align={align}
    alignOffset={alignOffset}
    className={cn('w-auto min-w-32', className)}
    data-slot="dropdown-menu-sub-content"
    side={side}
    sideOffset={sideOffset}
    {...props}
  />
)

export type {
  DropdownMenuCheckboxItemProps,
  DropdownMenuContentProps,
  DropdownMenuGroupProps,
  DropdownMenuItemProps,
  DropdownMenuLabelProps,
  DropdownMenuPortalProps,
  DropdownMenuProps,
  DropdownMenuRadioGroupProps,
  DropdownMenuRadioItemProps,
  DropdownMenuSeparatorProps,
  DropdownMenuShortcutProps,
  DropdownMenuSubContentProps,
  DropdownMenuSubProps,
  DropdownMenuSubTriggerProps,
  DropdownMenuTriggerProps
}
export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
}
