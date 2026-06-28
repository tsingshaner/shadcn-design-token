import { Select as SelectPrimitive } from '@base-ui/react/select'

import { cn } from '@/lib/utils'

type SelectProps<Value = string, Multiple extends boolean | undefined = false> = SelectPrimitive.Root.Props<
  Value,
  Multiple
>
type SelectGroupProps = SelectPrimitive.Group.Props
type SelectValueProps = SelectPrimitive.Value.Props
type SelectTriggerProps = SelectPrimitive.Trigger.Props
type SelectContentProps = SelectPrimitive.Popup.Props &
  Pick<SelectPrimitive.Positioner.Props, 'align' | 'side' | 'sideOffset'>
type SelectLabelProps = SelectPrimitive.GroupLabel.Props
type SelectItemProps = SelectPrimitive.Item.Props
type SelectSeparatorProps = SelectPrimitive.Separator.Props

const Select = <Value = string, Multiple extends boolean | undefined = false>(props: SelectProps<Value, Multiple>) => (
  <SelectPrimitive.Root {...props} />
)

const SelectGroup = (props: SelectGroupProps) => <SelectPrimitive.Group data-slot="select-group" {...props} />

const SelectValue = ({ className, ...props }: SelectValueProps) => (
  <SelectPrimitive.Value
    className={cn('line-clamp-1 flex items-center gap-2', className)}
    data-slot="select-value"
    {...props}
  />
)

const SelectTrigger = ({ children, className, ...props }: SelectTriggerProps) => (
  <SelectPrimitive.Trigger
    className={cn(
      'flex h-9 w-full items-center justify-between gap-2 rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[placeholder]:text-muted-foreground',
      className
    )}
    data-slot="select-trigger"
    {...props}
  >
    {children}
    <SelectPrimitive.Icon aria-hidden="true" className="size-4 opacity-50" data-slot="select-icon">
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
  className,
  side = 'bottom',
  sideOffset = 4,
  ...props
}: SelectContentProps) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Positioner align={align} side={side} sideOffset={sideOffset}>
      <SelectPrimitive.Popup
        className={cn(
          'z-50 max-h-96 min-w-[8rem] overflow-y-auto rounded-md border bg-popover text-popover-foreground shadow-md outline-none',
          className
        )}
        data-slot="select-content"
        {...props}
      />
    </SelectPrimitive.Positioner>
  </SelectPrimitive.Portal>
)

const SelectLabel = ({ className, ...props }: SelectLabelProps) => (
  <SelectPrimitive.GroupLabel
    className={cn('px-2 py-1.5 font-medium text-muted-foreground text-xs', className)}
    data-slot="select-label"
    {...props}
  />
)

const SelectItem = ({ children, className, ...props }: SelectItemProps) => (
  <SelectPrimitive.Item
    className={cn(
      'relative flex w-full cursor-default select-none items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:opacity-50',
      className
    )}
    data-slot="select-item"
    {...props}
  >
    <span className="absolute right-2 flex size-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator data-slot="select-item-indicator">
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
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
)

const SelectSeparator = ({ className, ...props }: SelectSeparatorProps) => (
  <SelectPrimitive.Separator
    className={cn('-mx-1 my-1 h-px bg-muted', className)}
    data-slot="select-separator"
    {...props}
  />
)

export type {
  SelectContentProps,
  SelectGroupProps,
  SelectItemProps,
  SelectLabelProps,
  SelectProps,
  SelectSeparatorProps,
  SelectTriggerProps,
  SelectValueProps
}
export { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue }
