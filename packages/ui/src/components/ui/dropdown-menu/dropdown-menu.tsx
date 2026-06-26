import { Menu as DropdownMenuPrimitive } from '@base-ui/react/menu'

import type { ComponentProps } from 'react'

import { cn } from '../../../lib/utils'

type DropdownMenuProps = DropdownMenuPrimitive.Root.Props
type DropdownMenuTriggerProps = DropdownMenuPrimitive.Trigger.Props
type DropdownMenuPortalProps = DropdownMenuPrimitive.Portal.Props
type DropdownMenuContentProps = DropdownMenuPrimitive.Popup.Props &
  Pick<DropdownMenuPrimitive.Positioner.Props, 'align' | 'side' | 'sideOffset'>
type DropdownMenuItemProps = DropdownMenuPrimitive.Item.Props
type DropdownMenuCheckboxItemProps = DropdownMenuPrimitive.CheckboxItem.Props
type DropdownMenuRadioGroupProps = DropdownMenuPrimitive.RadioGroup.Props
type DropdownMenuRadioItemProps = DropdownMenuPrimitive.RadioItem.Props
type DropdownMenuLabelProps = DropdownMenuPrimitive.GroupLabel.Props
type DropdownMenuSeparatorProps = DropdownMenuPrimitive.Separator.Props
type DropdownMenuGroupProps = DropdownMenuPrimitive.Group.Props
type DropdownMenuSubProps = DropdownMenuPrimitive.SubmenuRoot.Props
type DropdownMenuSubTriggerProps = DropdownMenuPrimitive.SubmenuTrigger.Props
type DropdownMenuSubContentProps = DropdownMenuContentProps
type DropdownMenuShortcutProps = ComponentProps<'span'>

const itemClasses =
  'relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:opacity-50'

const DropdownMenu = (props: DropdownMenuProps) => <DropdownMenuPrimitive.Root {...props} />

const DropdownMenuTrigger = ({ className, ...props }: DropdownMenuTriggerProps) => (
  <DropdownMenuPrimitive.Trigger
    className={cn('outline-none focus-visible:ring-3 focus-visible:ring-ring/50', className)}
    data-slot="dropdown-menu-trigger"
    {...props}
  />
)

const DropdownMenuPortal = (props: DropdownMenuPortalProps) => (
  <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
)

const DropdownMenuContent = ({
  align = 'center',
  className,
  side = 'bottom',
  sideOffset = 4,
  ...props
}: DropdownMenuContentProps) => (
  <DropdownMenuPortal>
    <DropdownMenuPrimitive.Positioner align={align} side={side} sideOffset={sideOffset}>
      <DropdownMenuPrimitive.Popup
        className={cn(
          'z-50 min-w-32 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md outline-none',
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

const DropdownMenuItem = ({ className, ...props }: DropdownMenuItemProps) => (
  <DropdownMenuPrimitive.Item className={cn(itemClasses, className)} data-slot="dropdown-menu-item" {...props} />
)

const DropdownMenuCheckboxItem = ({ children, className, ...props }: DropdownMenuCheckboxItemProps) => (
  <DropdownMenuPrimitive.CheckboxItem
    className={cn(itemClasses, 'pl-8', className)}
    data-slot="dropdown-menu-checkbox-item"
    {...props}
  >
    <span className="absolute left-2 flex size-3.5 items-center justify-center">
      <DropdownMenuPrimitive.CheckboxItemIndicator data-slot="dropdown-menu-checkbox-item-indicator">
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
      </DropdownMenuPrimitive.CheckboxItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
)

const DropdownMenuRadioGroup = (props: DropdownMenuRadioGroupProps) => (
  <DropdownMenuPrimitive.RadioGroup data-slot="dropdown-menu-radio-group" {...props} />
)

const DropdownMenuRadioItem = ({ children, className, ...props }: DropdownMenuRadioItemProps) => (
  <DropdownMenuPrimitive.RadioItem
    className={cn(itemClasses, 'pl-8', className)}
    data-slot="dropdown-menu-radio-item"
    {...props}
  >
    <span className="absolute left-2 flex size-3.5 items-center justify-center">
      <DropdownMenuPrimitive.RadioItemIndicator data-slot="dropdown-menu-radio-item-indicator">
        <span className="size-2 rounded-full bg-current" />
      </DropdownMenuPrimitive.RadioItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
)

const DropdownMenuLabel = ({ className, ...props }: DropdownMenuLabelProps) => (
  <DropdownMenuPrimitive.GroupLabel
    className={cn('px-2 py-1.5 font-medium text-sm', className)}
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

const DropdownMenuSub = (props: DropdownMenuSubProps) => <DropdownMenuPrimitive.SubmenuRoot {...props} />

const DropdownMenuSubTrigger = ({ children, className, ...props }: DropdownMenuSubTriggerProps) => (
  <DropdownMenuPrimitive.SubmenuTrigger
    className={cn(itemClasses, 'data-[open]:bg-accent data-[open]:text-accent-foreground', className)}
    data-slot="dropdown-menu-sub-trigger"
    {...props}
  >
    {children}
    <span className="ml-auto text-muted-foreground">›</span>
  </DropdownMenuPrimitive.SubmenuTrigger>
)

const DropdownMenuSubContent = ({ className, sideOffset = 4, ...props }: DropdownMenuSubContentProps) => (
  <DropdownMenuContent className={cn('min-w-32', className)} sideOffset={sideOffset} {...props} />
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
