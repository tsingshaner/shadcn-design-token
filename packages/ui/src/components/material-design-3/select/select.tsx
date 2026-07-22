import { Select as SelectPrimitive } from '@base-ui/react/select'

import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

type SelectProps<Value = string, Multiple extends boolean | undefined = false> = SelectPrimitive.Root.Props<
  Value,
  Multiple
>
type SelectGroupProps = SelectPrimitive.Group.Props
type SelectValueProps = SelectPrimitive.Value.Props
type SelectTriggerProps = SelectPrimitive.Trigger.Props & {
  size?: 'default' | 'sm'
}
type SelectContentProps = SelectPrimitive.Popup.Props &
  Pick<SelectPrimitive.Positioner.Props, 'align' | 'alignItemWithTrigger' | 'alignOffset' | 'side' | 'sideOffset'>
type SelectLabelProps = SelectPrimitive.GroupLabel.Props
type SelectItemProps = SelectPrimitive.Item.Props
type SelectSeparatorProps = SelectPrimitive.Separator.Props
type SelectScrollUpButtonProps = ComponentProps<typeof SelectPrimitive.ScrollUpArrow>
type SelectScrollDownButtonProps = ComponentProps<typeof SelectPrimitive.ScrollDownArrow>

const Select = <Value = string, Multiple extends boolean | undefined = false>(props: SelectProps<Value, Multiple>) => (
  <SelectPrimitive.Root {...props} />
)

const SelectGroup = ({ className, ...props }: SelectGroupProps) => (
  <SelectPrimitive.Group
    className={cn('cn-select-group scroll-my-1 p-1', className)}
    data-slot="select-group"
    {...props}
  />
)

const SelectValue = ({ className, ...props }: SelectValueProps) => (
  <SelectPrimitive.Value
    className={cn('cn-select-value flex flex-1 text-left', className)}
    data-slot="select-value"
    {...props}
  />
)

const SelectTrigger = ({ children, className, size = 'default', ...props }: SelectTriggerProps) => (
  <SelectPrimitive.Trigger
    className={cn(
      "cn-select-trigger flex w-fit select-none items-center justify-between gap-2 whitespace-nowrap rounded-[4px] border border-muted-foreground bg-transparent px-4 py-2 text-sm outline-none transition-colors focus-visible:border-2 focus-visible:border-primary focus-visible:px-[15px] disabled:cursor-not-allowed disabled:opacity-[0.38] aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-[size=default]:h-14 data-[size=sm]:h-12 data-[placeholder]:text-muted-foreground *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg:not([class*='size-'])]:size-[18px] [&_svg]:pointer-events-none [&_svg]:shrink-0",
      className
    )}
    data-size={size}
    data-slot="select-trigger"
    {...props}
  >
    {children}
    <SelectPrimitive.Icon
      aria-hidden="true"
      className="cn-select-trigger-icon size-4 text-muted-foreground"
      data-slot="select-icon"
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
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
)

const SelectContent = ({
  align = 'center',
  alignItemWithTrigger = true,
  alignOffset = 0,
  className,
  children,
  side = 'bottom',
  sideOffset = 4,
  ...props
}: SelectContentProps) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Positioner
      align={align}
      alignItemWithTrigger={alignItemWithTrigger}
      alignOffset={alignOffset}
      className="isolate z-50"
      side={side}
      sideOffset={sideOffset}
    >
      <SelectPrimitive.Popup
        className={cn(
          'cn-select-content cn-select-content-logical cn-menu-target cn-menu-translucent data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:fade-in-0 data-open:zoom-in-95 data-closed:fade-out-0 data-closed:zoom-out-95 relative isolate z-50 max-h-(--available-height) w-(--anchor-width) min-w-36 origin-(--transform-origin) overflow-y-auto overflow-x-hidden rounded-[4px] bg-muted py-2 text-foreground shadow-lg duration-100 data-[align-trigger=true]:animate-none data-closed:animate-out data-open:animate-in',
          className
        )}
        data-align-trigger={alignItemWithTrigger}
        data-slot="select-content"
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.List>{children}</SelectPrimitive.List>
        <SelectScrollDownButton />
      </SelectPrimitive.Popup>
    </SelectPrimitive.Positioner>
  </SelectPrimitive.Portal>
)

const SelectLabel = ({ className, ...props }: SelectLabelProps) => (
  <SelectPrimitive.GroupLabel
    className={cn('cn-select-label px-1.5 py-1 text-muted-foreground text-xs', className)}
    data-slot="select-label"
    {...props}
  />
)

const SelectItem = ({ children, className, ...props }: SelectItemProps) => (
  <SelectPrimitive.Item
    className={cn(
      'cn-select-item relative flex min-h-12 w-full cursor-default select-none items-center gap-3 rounded-none py-2 pr-10 pl-3 text-sm outline-hidden focus:bg-primary/[0.08] focus:text-foreground data-[disabled]:pointer-events-none data-disabled:pointer-events-none data-[highlighted]:bg-primary/[0.08] data-[highlighted]:text-foreground data-[disabled]:opacity-[0.38] data-disabled:opacity-[0.38] [&_svg:not([class*=size-])]:size-[18px] [&_svg]:pointer-events-none [&_svg]:shrink-0 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2',
      className
    )}
    data-slot="select-item"
    {...props}
  >
    <SelectPrimitive.ItemText className="cn-select-item-text flex flex-1 shrink-0 gap-2 whitespace-nowrap">
      {children}
    </SelectPrimitive.ItemText>
    <span className="cn-select-item-indicator pointer-events-none absolute right-2 flex size-4 items-center justify-center">
      <SelectPrimitive.ItemIndicator data-slot="select-item-indicator">
        <svg
          aria-hidden="true"
          className="cn-select-item-indicator-icon size-4"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
          viewBox="0 0 24 24"
        >
          <path d="m5 12 4 4L19 6" />
        </svg>
      </SelectPrimitive.ItemIndicator>
    </span>
  </SelectPrimitive.Item>
)

const SelectSeparator = ({ className, ...props }: SelectSeparatorProps) => (
  <SelectPrimitive.Separator
    className={cn('cn-select-separator pointer-events-none -mx-1 my-1 h-px bg-border', className)}
    data-slot="select-separator"
    {...props}
  />
)

const SelectScrollUpButton = ({ className, ...props }: SelectScrollUpButtonProps) => (
  <SelectPrimitive.ScrollUpArrow
    className={cn(
      "cn-select-scroll-up-button top-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4",
      className
    )}
    data-slot="select-scroll-up-button"
    {...props}
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
      <path d="m18 15-6-6-6 6" />
    </svg>
  </SelectPrimitive.ScrollUpArrow>
)

const SelectScrollDownButton = ({ className, ...props }: SelectScrollDownButtonProps) => (
  <SelectPrimitive.ScrollDownArrow
    className={cn(
      "cn-select-scroll-down-button bottom-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4",
      className
    )}
    data-slot="select-scroll-down-button"
    {...props}
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
  </SelectPrimitive.ScrollDownArrow>
)

export type {
  SelectContentProps,
  SelectGroupProps,
  SelectItemProps,
  SelectLabelProps,
  SelectProps,
  SelectScrollDownButtonProps,
  SelectScrollUpButtonProps,
  SelectSeparatorProps,
  SelectTriggerProps,
  SelectValueProps
}
export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue
}
