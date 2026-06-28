import { ContextMenu as ContextMenuPrimitive } from '@base-ui/react/context-menu'

import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

type ContextMenuProps = ContextMenuPrimitive.Root.Props
type ContextMenuTriggerProps = ContextMenuPrimitive.Trigger.Props
type ContextMenuPortalProps = ContextMenuPrimitive.Portal.Props
type ContextMenuContentProps = ContextMenuPrimitive.Popup.Props &
  Pick<ContextMenuPrimitive.Positioner.Props, 'align' | 'side' | 'sideOffset'>
type ContextMenuItemProps = ContextMenuPrimitive.Item.Props
type ContextMenuCheckboxItemProps = ContextMenuPrimitive.CheckboxItem.Props
type ContextMenuRadioGroupProps = ContextMenuPrimitive.RadioGroup.Props
type ContextMenuRadioItemProps = ContextMenuPrimitive.RadioItem.Props
type ContextMenuLabelProps = ComponentProps<'div'>
type ContextMenuSeparatorProps = ContextMenuPrimitive.Separator.Props
type ContextMenuGroupProps = ContextMenuPrimitive.Group.Props
type ContextMenuSubProps = ContextMenuPrimitive.SubmenuRoot.Props
type ContextMenuSubTriggerProps = ContextMenuPrimitive.SubmenuTrigger.Props
type ContextMenuSubContentProps = ContextMenuContentProps
type ContextMenuShortcutProps = ComponentProps<'span'>

const itemClasses =
  'relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:opacity-50'

const ContextMenu = (props: ContextMenuProps) => <ContextMenuPrimitive.Root {...props} />

const ContextMenuTrigger = ({ className, ...props }: ContextMenuTriggerProps) => (
  <ContextMenuPrimitive.Trigger className={cn('outline-none', className)} data-slot="context-menu-trigger" {...props} />
)

const ContextMenuPortal = (props: ContextMenuPortalProps) => (
  <ContextMenuPrimitive.Portal data-slot="context-menu-portal" {...props} />
)

const ContextMenuContent = ({
  align = 'center',
  className,
  side = 'bottom',
  sideOffset = 4,
  ...props
}: ContextMenuContentProps) => (
  <ContextMenuPortal>
    <ContextMenuPrimitive.Positioner align={align} side={side} sideOffset={sideOffset}>
      <ContextMenuPrimitive.Popup
        className={cn(
          'z-50 min-w-32 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md outline-none',
          className
        )}
        data-slot="context-menu-content"
        {...props}
      />
    </ContextMenuPrimitive.Positioner>
  </ContextMenuPortal>
)

const ContextMenuGroup = (props: ContextMenuGroupProps) => (
  <ContextMenuPrimitive.Group data-slot="context-menu-group" {...props} />
)

const ContextMenuItem = ({ className, ...props }: ContextMenuItemProps) => (
  <ContextMenuPrimitive.Item className={cn(itemClasses, className)} data-slot="context-menu-item" {...props} />
)

const ContextMenuCheckboxItem = ({ children, className, ...props }: ContextMenuCheckboxItemProps) => (
  <ContextMenuPrimitive.CheckboxItem
    className={cn(itemClasses, 'pl-8', className)}
    data-slot="context-menu-checkbox-item"
    {...props}
  >
    <span className="absolute left-2 flex size-3.5 items-center justify-center">
      <ContextMenuPrimitive.CheckboxItemIndicator data-slot="context-menu-checkbox-item-indicator">
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
      </ContextMenuPrimitive.CheckboxItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.CheckboxItem>
)

const ContextMenuRadioGroup = (props: ContextMenuRadioGroupProps) => (
  <ContextMenuPrimitive.RadioGroup data-slot="context-menu-radio-group" {...props} />
)

const ContextMenuRadioItem = ({ children, className, ...props }: ContextMenuRadioItemProps) => (
  <ContextMenuPrimitive.RadioItem
    className={cn(itemClasses, 'pl-8', className)}
    data-slot="context-menu-radio-item"
    {...props}
  >
    <span className="absolute left-2 flex size-3.5 items-center justify-center">
      <ContextMenuPrimitive.RadioItemIndicator data-slot="context-menu-radio-item-indicator">
        <span className="size-2 rounded-full bg-current" />
      </ContextMenuPrimitive.RadioItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.RadioItem>
)

const ContextMenuLabel = ({ className, ...props }: ContextMenuLabelProps) => (
  <div
    className={cn('px-2 py-1.5 font-medium text-sm', className)}
    data-slot="context-menu-label"
    role="presentation"
    {...props}
  />
)

const ContextMenuSeparator = ({ className, ...props }: ContextMenuSeparatorProps) => (
  <ContextMenuPrimitive.Separator
    className={cn('-mx-1 my-1 h-px bg-muted', className)}
    data-slot="context-menu-separator"
    {...props}
  />
)

const ContextMenuShortcut = ({ className, ...props }: ContextMenuShortcutProps) => (
  <span
    className={cn('ml-auto text-muted-foreground text-xs tracking-widest', className)}
    data-slot="context-menu-shortcut"
    {...props}
  />
)

const ContextMenuSub = (props: ContextMenuSubProps) => <ContextMenuPrimitive.SubmenuRoot {...props} />

const ContextMenuSubTrigger = ({ children, className, ...props }: ContextMenuSubTriggerProps) => (
  <ContextMenuPrimitive.SubmenuTrigger
    className={cn(itemClasses, 'data-[open]:bg-accent data-[open]:text-accent-foreground', className)}
    data-slot="context-menu-sub-trigger"
    {...props}
  >
    {children}
    <span className="ml-auto text-muted-foreground">›</span>
  </ContextMenuPrimitive.SubmenuTrigger>
)

const ContextMenuSubContent = ({ className, sideOffset = 4, ...props }: ContextMenuSubContentProps) => (
  <ContextMenuContent className={cn('min-w-32', className)} sideOffset={sideOffset} {...props} />
)

export type {
  ContextMenuCheckboxItemProps,
  ContextMenuContentProps,
  ContextMenuGroupProps,
  ContextMenuItemProps,
  ContextMenuLabelProps,
  ContextMenuPortalProps,
  ContextMenuProps,
  ContextMenuRadioGroupProps,
  ContextMenuRadioItemProps,
  ContextMenuSeparatorProps,
  ContextMenuShortcutProps,
  ContextMenuSubContentProps,
  ContextMenuSubProps,
  ContextMenuSubTriggerProps,
  ContextMenuTriggerProps
}
export {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuPortal,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger
}
