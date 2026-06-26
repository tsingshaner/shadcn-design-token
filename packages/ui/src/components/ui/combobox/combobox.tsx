import { Combobox as ComboboxPrimitive } from '@base-ui/react/combobox'

import { cn } from '../../../lib/utils'

type ComboboxProps<Value = string, Multiple extends boolean | undefined = false> = ComboboxPrimitive.Root.Props<
  Value,
  Multiple
>
type ComboboxLabelProps = ComboboxPrimitive.Label.Props
type ComboboxValueProps = ComboboxPrimitive.Value.Props
type ComboboxInputGroupProps = ComboboxPrimitive.InputGroup.Props
type ComboboxInputProps = ComboboxPrimitive.Input.Props
type ComboboxTriggerProps = ComboboxPrimitive.Trigger.Props
type ComboboxContentProps = ComboboxPrimitive.Popup.Props &
  Pick<ComboboxPrimitive.Positioner.Props, 'align' | 'side' | 'sideOffset'>
type ComboboxListProps = ComboboxPrimitive.List.Props
type ComboboxEmptyProps = ComboboxPrimitive.Empty.Props
type ComboboxGroupProps = ComboboxPrimitive.Group.Props
type ComboboxGroupLabelProps = ComboboxPrimitive.GroupLabel.Props
type ComboboxItemProps = ComboboxPrimitive.Item.Props
type ComboboxSeparatorProps = ComboboxPrimitive.Separator.Props

const Combobox = <Value = string, Multiple extends boolean | undefined = false>(
  props: ComboboxProps<Value, Multiple>
) => <ComboboxPrimitive.Root {...props} />

const ComboboxLabel = ({ className, ...props }: ComboboxLabelProps) => (
  <ComboboxPrimitive.Label
    className={cn(
      'font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
      className
    )}
    data-slot="combobox-label"
    {...props}
  />
)

const ComboboxValue = (props: ComboboxValueProps) => <ComboboxPrimitive.Value {...props} />

const ComboboxInputGroup = ({ className, ...props }: ComboboxInputGroupProps) => (
  <ComboboxPrimitive.InputGroup
    className={cn(
      'flex h-9 w-full items-center rounded-md border border-input bg-transparent shadow-xs transition-colors focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50',
      className
    )}
    data-slot="combobox-input-group"
    {...props}
  />
)

const ComboboxInput = ({ className, ...props }: ComboboxInputProps) => (
  <ComboboxPrimitive.Input
    className={cn(
      'flex h-full min-w-0 flex-1 bg-transparent px-3 py-1 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
      className
    )}
    data-slot="combobox-input"
    {...props}
  />
)

const ComboboxTrigger = ({ children, className, ...props }: ComboboxTriggerProps) => (
  <ComboboxPrimitive.Trigger
    className={cn(
      'inline-flex size-8 shrink-0 items-center justify-center rounded-md text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50',
      className
    )}
    data-slot="combobox-trigger"
    {...props}
  >
    {children ?? (
      <svg
        aria-hidden="true"
        className="size-4 opacity-50"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    )}
  </ComboboxPrimitive.Trigger>
)

const ComboboxContent = ({
  align = 'start',
  className,
  side = 'bottom',
  sideOffset = 4,
  ...props
}: ComboboxContentProps) => (
  <ComboboxPrimitive.Portal>
    <ComboboxPrimitive.Positioner align={align} side={side} sideOffset={sideOffset}>
      <ComboboxPrimitive.Popup
        className={cn(
          'z-50 max-h-96 min-w-[12rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md outline-none',
          className
        )}
        data-slot="combobox-content"
        {...props}
      />
    </ComboboxPrimitive.Positioner>
  </ComboboxPrimitive.Portal>
)

const ComboboxList = ({ className, ...props }: ComboboxListProps) => (
  <ComboboxPrimitive.List
    className={cn('max-h-80 overflow-y-auto p-1', className)}
    data-slot="combobox-list"
    {...props}
  />
)

const ComboboxEmpty = ({ className, ...props }: ComboboxEmptyProps) => (
  <ComboboxPrimitive.Empty
    className={cn('px-2 py-6 text-center text-muted-foreground text-sm', className)}
    data-slot="combobox-empty"
    {...props}
  />
)

const ComboboxGroup = (props: ComboboxGroupProps) => <ComboboxPrimitive.Group data-slot="combobox-group" {...props} />

const ComboboxGroupLabel = ({ className, ...props }: ComboboxGroupLabelProps) => (
  <ComboboxPrimitive.GroupLabel
    className={cn('px-2 py-1.5 font-medium text-muted-foreground text-xs', className)}
    data-slot="combobox-group-label"
    {...props}
  />
)

const ComboboxItem = ({ children, className, ...props }: ComboboxItemProps) => (
  <ComboboxPrimitive.Item
    className={cn(
      'relative flex w-full cursor-default select-none items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:opacity-50',
      className
    )}
    data-slot="combobox-item"
    {...props}
  >
    {children}
    <span className="absolute right-2 flex size-3.5 items-center justify-center">
      <ComboboxPrimitive.ItemIndicator data-slot="combobox-item-indicator">
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
      </ComboboxPrimitive.ItemIndicator>
    </span>
  </ComboboxPrimitive.Item>
)

const ComboboxSeparator = ({ className, ...props }: ComboboxSeparatorProps) => (
  <ComboboxPrimitive.Separator
    className={cn('-mx-1 my-1 h-px bg-muted', className)}
    data-slot="combobox-separator"
    {...props}
  />
)

export type {
  ComboboxContentProps,
  ComboboxEmptyProps,
  ComboboxGroupLabelProps,
  ComboboxGroupProps,
  ComboboxInputGroupProps,
  ComboboxInputProps,
  ComboboxItemProps,
  ComboboxLabelProps,
  ComboboxListProps,
  ComboboxProps,
  ComboboxSeparatorProps,
  ComboboxTriggerProps,
  ComboboxValueProps
}
export {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxGroupLabel,
  ComboboxInput,
  ComboboxInputGroup,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
  ComboboxTrigger,
  ComboboxValue
}
