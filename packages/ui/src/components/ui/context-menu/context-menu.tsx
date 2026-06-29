import { ContextMenu as ContextMenuPrimitive } from '@base-ui/react/context-menu'
import { CheckIcon, ChevronRightIcon, CircleIcon } from 'lucide-react'

import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

type ContextMenuProps = ContextMenuPrimitive.Root.Props
type ContextMenuTriggerProps = ContextMenuPrimitive.Trigger.Props
type ContextMenuPortalProps = ContextMenuPrimitive.Portal.Props
type ContextMenuContentProps = ContextMenuPrimitive.Popup.Props &
  Pick<ContextMenuPrimitive.Positioner.Props, 'align' | 'alignOffset' | 'side' | 'sideOffset'>
type ContextMenuItemProps = ContextMenuPrimitive.Item.Props & {
  inset?: boolean
  variant?: 'default' | 'destructive'
}
type ContextMenuCheckboxItemProps = ContextMenuPrimitive.CheckboxItem.Props & {
  inset?: boolean
}
type ContextMenuRadioGroupProps = ContextMenuPrimitive.RadioGroup.Props
type ContextMenuRadioItemProps = ContextMenuPrimitive.RadioItem.Props & {
  inset?: boolean
}
type ContextMenuLabelProps = ComponentProps<'div'> & {
  inset?: boolean
}
type ContextMenuSeparatorProps = ContextMenuPrimitive.Separator.Props
type ContextMenuGroupProps = ContextMenuPrimitive.Group.Props
type ContextMenuSubProps = ContextMenuPrimitive.SubmenuRoot.Props
type ContextMenuSubTriggerProps = ContextMenuPrimitive.SubmenuTrigger.Props & {
  inset?: boolean
}
type ContextMenuSubContentProps = ContextMenuContentProps
type ContextMenuShortcutProps = ComponentProps<'span'>

const itemClasses =
  'group/context-menu-item relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden data-disabled:pointer-events-none data-disabled:opacity-50 data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[inset=true]:pl-8 data-[variant=destructive]:text-destructive data-[variant=destructive]:data-[highlighted]:bg-destructive/10 data-[variant=destructive]:data-[highlighted]:text-destructive [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4'

const ContextMenu = (props: ContextMenuProps) => <ContextMenuPrimitive.Root data-slot="context-menu" {...props} />

const ContextMenuTrigger = ({ className, ...props }: ContextMenuTriggerProps) => (
  <ContextMenuPrimitive.Trigger
    className={cn('select-none outline-none', className)}
    data-slot="context-menu-trigger"
    {...props}
  />
)

const ContextMenuPortal = (props: ContextMenuPortalProps) => (
  <ContextMenuPrimitive.Portal data-slot="context-menu-portal" {...props} />
)

const ContextMenuContent = ({
  align = 'start',
  alignOffset = 4,
  className,
  side = 'right',
  sideOffset = 0,
  ...props
}: ContextMenuContentProps) => (
  <ContextMenuPortal>
    <ContextMenuPrimitive.Positioner
      align={align}
      alignOffset={alignOffset}
      className="isolate z-50 outline-none"
      side={side}
      sideOffset={sideOffset}
    >
      <ContextMenuPrimitive.Popup
        className={cn(
          'z-50 max-h-(--available-height) min-w-32 origin-(--transform-origin) overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md outline-none',
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

const ContextMenuItem = ({ className, inset, variant = 'default', ...props }: ContextMenuItemProps) => (
  <ContextMenuPrimitive.Item
    className={cn(itemClasses, className)}
    data-inset={inset}
    data-slot="context-menu-item"
    data-variant={variant}
    {...props}
  />
)

const ContextMenuCheckboxItem = ({ children, checked, className, inset, ...props }: ContextMenuCheckboxItemProps) => (
  <ContextMenuPrimitive.CheckboxItem
    checked={checked}
    className={cn(itemClasses, 'pl-8', className)}
    data-inset={inset}
    data-slot="context-menu-checkbox-item"
    {...props}
  >
    <span
      className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center"
      data-slot="context-menu-checkbox-item-indicator"
    >
      <ContextMenuPrimitive.CheckboxItemIndicator>
        <CheckIcon />
      </ContextMenuPrimitive.CheckboxItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.CheckboxItem>
)

const ContextMenuRadioGroup = (props: ContextMenuRadioGroupProps) => (
  <ContextMenuPrimitive.RadioGroup data-slot="context-menu-radio-group" {...props} />
)

const ContextMenuRadioItem = ({ children, className, inset, ...props }: ContextMenuRadioItemProps) => (
  <ContextMenuPrimitive.RadioItem
    className={cn(itemClasses, 'pl-8', className)}
    data-inset={inset}
    data-slot="context-menu-radio-item"
    {...props}
  >
    <span
      className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center"
      data-slot="context-menu-radio-item-indicator"
    >
      <ContextMenuPrimitive.RadioItemIndicator>
        <CircleIcon className="size-2 fill-current" />
      </ContextMenuPrimitive.RadioItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.RadioItem>
)

const ContextMenuLabel = ({ className, inset, ...props }: ContextMenuLabelProps) => (
  <div
    className={cn('px-2 py-1.5 font-medium text-sm data-[inset=true]:pl-8', className)}
    data-inset={inset}
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

const ContextMenuSub = (props: ContextMenuSubProps) => (
  <ContextMenuPrimitive.SubmenuRoot data-slot="context-menu-sub" {...props} />
)

const ContextMenuSubTrigger = ({ children, className, inset, ...props }: ContextMenuSubTriggerProps) => (
  <ContextMenuPrimitive.SubmenuTrigger
    className={cn(itemClasses, 'data-popup-open:bg-accent data-popup-open:text-accent-foreground', className)}
    data-inset={inset}
    data-slot="context-menu-sub-trigger"
    {...props}
  >
    {children}
    <ChevronRightIcon className="ml-auto" />
  </ContextMenuPrimitive.SubmenuTrigger>
)

const ContextMenuSubContent = ({ className, side = 'right', ...props }: ContextMenuSubContentProps) => (
  <ContextMenuContent
    className={cn('min-w-32', className)}
    data-slot="context-menu-sub-content"
    side={side}
    {...props}
  />
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
