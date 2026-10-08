import { Combobox as ComboboxPrimitive } from '@base-ui/react/combobox'
import { cn } from 'cn'
import { CheckIcon, ChevronDownIcon, XIcon } from 'lucide-react'
import { useRef } from 'react'

import { Button } from '@/components/material-design-3/button'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group'

import { Ripple } from '../ripple'

type ComboboxProps<Value = string, Multiple extends boolean | undefined = false> = ComboboxPrimitive.Root.Props<
  Value,
  Multiple
>
type ComboboxLabelProps = ComboboxPrimitive.Label.Props
type ComboboxValueProps = ComboboxPrimitive.Value.Props
type ComboboxInputGroupProps = ComboboxPrimitive.InputGroup.Props
type ComboboxInputProps = ComboboxPrimitive.Input.Props & {
  showClear?: boolean
  showTrigger?: boolean
}
type ComboboxTriggerProps = ComboboxPrimitive.Trigger.Props
type ComboboxClearProps = ComboboxPrimitive.Clear.Props
type ComboboxContentProps = ComboboxPrimitive.Popup.Props &
  Pick<ComboboxPrimitive.Positioner.Props, 'align' | 'alignOffset' | 'anchor' | 'side' | 'sideOffset'>
type ComboboxListProps = ComboboxPrimitive.List.Props
type ComboboxEmptyProps = ComboboxPrimitive.Empty.Props
type ComboboxGroupProps = ComboboxPrimitive.Group.Props
type ComboboxGroupLabelProps = ComboboxPrimitive.GroupLabel.Props
type ComboboxCollectionProps = ComboboxPrimitive.Collection.Props
type ComboboxItemProps = ComboboxPrimitive.Item.Props
type ComboboxSeparatorProps = ComboboxPrimitive.Separator.Props
type ComboboxChipsProps = ComboboxPrimitive.Chips.Props
type ComboboxChipProps = ComboboxPrimitive.Chip.Props & {
  showRemove?: boolean
}
type ComboboxChipsInputProps = ComboboxPrimitive.Input.Props

const Combobox = <Value = string, Multiple extends boolean | undefined = false>(
  props: ComboboxProps<Value, Multiple>
) => <ComboboxPrimitive.Root {...props} />

const ComboboxLabel = ({ className, ...props }: ComboboxLabelProps) => (
  <ComboboxPrimitive.Label
    className={cn(
      'font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
      className
    )}
    data-scope="combobox"
    data-slot="label"
    {...props}
  />
)

const ComboboxValue = (props: ComboboxValueProps) => (
  <ComboboxPrimitive.Value data-scope="combobox" data-slot="value" {...props} />
)

const ComboboxInputGroup = ({ className, ...props }: ComboboxInputGroupProps) => (
  <ComboboxPrimitive.InputGroup
    className={cn(
      'flex min-h-14 w-full min-w-0 items-center rounded-full border-0 bg-muted px-2 transition-colors focus-within:ring-3 focus-within:ring-ring/50',
      className
    )}
    data-scope="combobox"
    data-slot="input-group"
    {...props}
  />
)

const ComboboxClear = ({ className, ...props }: ComboboxClearProps) => (
  <ComboboxPrimitive.Clear
    className={className}
    data-scope="combobox"
    data-slot="clear"
    render={
      <InputGroupButton className="size-6 px-0" type="button">
        <XIcon className="pointer-events-none size-3" data-scope="combobox" data-slot="clear-icon" />
      </InputGroupButton>
    }
    {...props}
  />
)

const ComboboxTrigger = ({ children, className, ...props }: ComboboxTriggerProps) => (
  <ComboboxPrimitive.Trigger
    className={cn(
      "relative inline-flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-md text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4",
      className
    )}
    data-scope="combobox"
    data-slot="trigger"
    {...props}
  >
    {children ?? (
      <ChevronDownIcon
        className="pointer-events-none size-4 text-muted-foreground"
        data-scope="combobox"
        data-slot="trigger-icon"
      />
    )}
    <Ripple hover={false} />
  </ComboboxPrimitive.Trigger>
)

const ComboboxInput = ({
  children,
  className,
  disabled = false,
  showClear = false,
  showTrigger = true,
  ...props
}: ComboboxInputProps) => (
  <InputGroup
    className={cn('h-14 w-auto rounded-full border-0 bg-muted px-2 shadow-none', className)}
    data-scope="combobox"
    data-slot="input"
  >
    <ComboboxPrimitive.Input
      data-scope="combobox"
      data-slot="input"
      disabled={disabled}
      render={<InputGroupInput />}
      {...props}
    />
    <InputGroupAddon align="inline-end" className="gap-1 px-1.5">
      {showTrigger ? (
        <ComboboxTrigger
          className="group-has-[[data-scope=combobox][data-slot=clear]]/input-group:hidden data-pressed:bg-transparent"
          disabled={disabled}
          render={<InputGroupButton className="size-6 px-0" type="button" />}
        />
      ) : null}
      {showClear ? <ComboboxClear disabled={disabled} /> : null}
    </InputGroupAddon>
    {children}
  </InputGroup>
)

const ComboboxContent = ({
  align = 'start',
  alignOffset = 0,
  anchor,
  className,
  side = 'bottom',
  sideOffset = 6,
  ...props
}: ComboboxContentProps) => (
  <ComboboxPrimitive.Portal>
    <ComboboxPrimitive.Positioner
      align={align}
      alignOffset={alignOffset}
      anchor={anchor}
      className="isolate z-50"
      side={side}
      sideOffset={sideOffset}
    >
      <ComboboxPrimitive.Popup
        className={cn(
          'group/combobox-content data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-closed:fade-out-0 data-closed:zoom-out-95 data-open:fade-in-0 data-open:zoom-in-95 relative max-h-(--available-height) w-(--anchor-width) min-w-[calc(var(--anchor-width)+--spacing(7))] max-w-(--available-width) origin-(--transform-origin) overflow-hidden rounded-[4px] bg-muted py-2 text-foreground shadow-lg duration-100 data-[chips=true]:min-w-(--anchor-width) data-closed:animate-out data-open:animate-in *:data-[scope=input-group]:data-[slot=root]:m-1 *:data-[scope=input-group]:data-[slot=root]:mb-0 *:data-[scope=input-group]:data-[slot=root]:h-12 *:data-[scope=input-group]:data-[slot=root]:border-0 *:data-[scope=input-group]:data-[slot=root]:bg-background/50 *:data-[scope=input-group]:data-[slot=root]:shadow-none',
          className
        )}
        data-chips={!!anchor}
        data-scope="combobox"
        data-slot="content"
        {...props}
      />
    </ComboboxPrimitive.Positioner>
  </ComboboxPrimitive.Portal>
)

const ComboboxList = ({ className, ...props }: ComboboxListProps) => (
  <ComboboxPrimitive.List
    className={cn(
      'no-scrollbar max-h-[min(calc(--spacing(72)---spacing(9)),calc(var(--available-height)---spacing(9)))] scroll-py-1 overflow-y-auto overscroll-contain p-1 data-empty:p-0',
      className
    )}
    data-scope="combobox"
    data-slot="list"
    {...props}
  />
)

const ComboboxEmpty = ({ className, ...props }: ComboboxEmptyProps) => (
  <ComboboxPrimitive.Empty
    className={cn(
      'hidden w-full justify-center py-2 text-center text-muted-foreground text-sm group-data-empty/combobox-content:flex',
      className
    )}
    data-scope="combobox"
    data-slot="empty"
    {...props}
  />
)

const ComboboxGroup = ({ className, ...props }: ComboboxGroupProps) => (
  <ComboboxPrimitive.Group className={className} data-scope="combobox" data-slot="group" {...props} />
)

const ComboboxGroupLabel = ({ className, ...props }: ComboboxGroupLabelProps) => (
  <ComboboxPrimitive.GroupLabel
    className={cn('px-2 py-1.5 font-medium text-muted-foreground text-xs', className)}
    data-scope="combobox"
    data-slot="group-label"
    {...props}
  />
)

const ComboboxCollection = (props: ComboboxCollectionProps) => (
  <ComboboxPrimitive.Collection data-scope="combobox" data-slot="collection" {...props} />
)

const ComboboxItem = ({ children, className, ...props }: ComboboxItemProps) => (
  <ComboboxPrimitive.Item
    className={cn(
      "relative flex min-h-12 w-full cursor-default select-none items-center gap-3 overflow-hidden rounded-none py-2 pr-10 pl-3 text-sm outline-hidden data-disabled:pointer-events-none data-highlighted:bg-primary/[0.08] data-highlighted:text-foreground data-disabled:opacity-[0.38] not-data-[variant=destructive]:data-highlighted:**:text-foreground [&_svg:not([class*='size-'])]:size-[18px] [&_svg]:pointer-events-none [&_svg]:shrink-0",
      className
    )}
    data-scope="combobox"
    data-slot="item"
    {...props}
  >
    {children}
    <ComboboxPrimitive.ItemIndicator
      data-scope="combobox"
      data-slot="item-indicator"
      render={
        <span
          className="pointer-events-none absolute right-2 flex size-4 items-center justify-center"
          data-scope="combobox"
          data-slot="item-indicator"
        >
          <CheckIcon className="pointer-events-none" data-scope="combobox" data-slot="item-indicator-icon" />
        </span>
      }
    />
    <Ripple hover={false} />
  </ComboboxPrimitive.Item>
)

const ComboboxSeparator = ({ className, ...props }: ComboboxSeparatorProps) => (
  <ComboboxPrimitive.Separator
    className={cn('-mx-1 my-1 h-px bg-border', className)}
    data-scope="combobox"
    data-slot="separator"
    {...props}
  />
)

const ComboboxChips = ({ className, ...props }: ComboboxChipsProps) => (
  <ComboboxPrimitive.Chips
    className={cn(
      'flex min-h-14 flex-wrap items-center gap-1 rounded-[4px] border border-muted-foreground bg-transparent bg-clip-padding px-4 py-2 text-sm transition-colors focus-within:border-2 focus-within:border-primary has-aria-invalid:border-destructive has-[[data-scope=combobox][data-slot=chip]]:px-2 has-aria-invalid:ring-3 has-aria-invalid:ring-destructive/20',
      className
    )}
    data-scope="combobox"
    data-slot="chips"
    {...props}
  />
)

const ComboboxChip = ({ children, className, showRemove = true, ...props }: ComboboxChipProps) => (
  <ComboboxPrimitive.Chip
    className={cn(
      'flex h-8 w-fit items-center justify-center gap-1 whitespace-nowrap rounded-lg bg-secondary px-3 font-medium text-secondary-foreground text-xs has-disabled:pointer-events-none has-disabled:cursor-not-allowed has-[[data-scope=combobox][data-slot=chip-remove]]:pr-1 has-disabled:opacity-[0.38]',
      className
    )}
    data-scope="combobox"
    data-slot="chip"
    {...props}
  >
    {children}
    {showRemove ? (
      <ComboboxPrimitive.ChipRemove
        className="-ml-1 opacity-50 hover:opacity-100"
        data-scope="combobox"
        data-slot="chip-remove"
        render={
          <Button size="icon-xs" variant="ghost">
            <XIcon className="pointer-events-none" data-scope="combobox" data-slot="chip-indicator-icon" />
          </Button>
        }
      />
    ) : null}
  </ComboboxPrimitive.Chip>
)

const ComboboxChipsInput = ({ className, ...props }: ComboboxChipsInputProps) => (
  <ComboboxPrimitive.Input
    className={cn('min-w-16 flex-1 outline-none', className)}
    data-scope="combobox"
    data-slot="chip-input"
    {...props}
  />
)

const useComboboxAnchor = () => useRef<HTMLDivElement | null>(null)

export type {
  ComboboxChipProps,
  ComboboxChipsInputProps,
  ComboboxChipsProps,
  ComboboxClearProps,
  ComboboxCollectionProps,
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
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxClear,
  ComboboxCollection,
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
  ComboboxValue,
  useComboboxAnchor
}
