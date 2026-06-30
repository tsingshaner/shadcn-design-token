import { Combobox as ComboboxPrimitive } from '@base-ui/react/combobox'
import { CheckIcon, ChevronDownIcon, XIcon } from 'lucide-react'
import { useRef } from 'react'

import { Button } from '@/components/ui/button'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group'
import { cn } from '@/lib/utils'

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
      'cn-combobox-label font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
      className
    )}
    data-slot="combobox-label"
    {...props}
  />
)

const ComboboxValue = (props: ComboboxValueProps) => <ComboboxPrimitive.Value data-slot="combobox-value" {...props} />

const ComboboxInputGroup = ({ className, ...props }: ComboboxInputGroupProps) => (
  <ComboboxPrimitive.InputGroup
    className={cn(
      'flex min-h-9 w-full min-w-0 items-center rounded-md border border-input bg-transparent shadow-xs transition-colors focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50',
      className
    )}
    data-slot="combobox-input-group"
    {...props}
  />
)

const ComboboxClear = ({ className, ...props }: ComboboxClearProps) => (
  <ComboboxPrimitive.Clear
    className={cn('cn-combobox-clear', className)}
    data-slot="combobox-clear"
    render={
      <InputGroupButton className="size-6 px-0" type="button">
        <XIcon className="cn-combobox-clear-icon pointer-events-none size-3" />
      </InputGroupButton>
    }
    {...props}
  />
)

const ComboboxTrigger = ({ children, className, ...props }: ComboboxTriggerProps) => (
  <ComboboxPrimitive.Trigger
    className={cn(
      "cn-combobox-trigger inline-flex size-8 shrink-0 items-center justify-center rounded-md text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4",
      className
    )}
    data-slot="combobox-trigger"
    {...props}
  >
    {children ?? (
      <ChevronDownIcon className="cn-combobox-trigger-icon pointer-events-none size-4 text-muted-foreground" />
    )}
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
  <InputGroup className={cn('cn-combobox-input w-auto', className)}>
    <ComboboxPrimitive.Input data-slot="combobox-input" disabled={disabled} render={<InputGroupInput />} {...props} />
    <InputGroupAddon align="inline-end" className="gap-1 px-1.5">
      {showTrigger ? (
        <ComboboxTrigger
          className="group-has-data-[slot=combobox-clear]/input-group:hidden data-pressed:bg-transparent"
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
          'cn-combobox-content cn-combobox-content-logical cn-menu-target cn-menu-translucent group/combobox-content data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-closed:fade-out-0 data-closed:zoom-out-95 data-open:fade-in-0 data-open:zoom-in-95 relative max-h-(--available-height) w-(--anchor-width) min-w-[calc(var(--anchor-width)+--spacing(7))] max-w-(--available-width) origin-(--transform-origin) overflow-hidden rounded-lg bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 data-[chips=true]:min-w-(--anchor-width) data-closed:animate-out data-open:animate-in *:data-[slot=input-group]:m-1 *:data-[slot=input-group]:mb-0 *:data-[slot=input-group]:h-8 *:data-[slot=input-group]:border-input/30 *:data-[slot=input-group]:bg-input/30 *:data-[slot=input-group]:shadow-none',
          className
        )}
        data-chips={!!anchor}
        data-slot="combobox-content"
        {...props}
      />
    </ComboboxPrimitive.Positioner>
  </ComboboxPrimitive.Portal>
)

const ComboboxList = ({ className, ...props }: ComboboxListProps) => (
  <ComboboxPrimitive.List
    className={cn(
      'cn-combobox-list no-scrollbar max-h-[min(calc(--spacing(72)---spacing(9)),calc(var(--available-height)---spacing(9)))] scroll-py-1 overflow-y-auto overscroll-contain p-1 data-empty:p-0',
      className
    )}
    data-slot="combobox-list"
    {...props}
  />
)

const ComboboxEmpty = ({ className, ...props }: ComboboxEmptyProps) => (
  <ComboboxPrimitive.Empty
    className={cn(
      'cn-combobox-empty hidden w-full justify-center py-2 text-center text-muted-foreground text-sm group-data-empty/combobox-content:flex',
      className
    )}
    data-slot="combobox-empty"
    {...props}
  />
)

const ComboboxGroup = ({ className, ...props }: ComboboxGroupProps) => (
  <ComboboxPrimitive.Group className={cn('cn-combobox-group', className)} data-slot="combobox-group" {...props} />
)

const ComboboxGroupLabel = ({ className, ...props }: ComboboxGroupLabelProps) => (
  <ComboboxPrimitive.GroupLabel
    className={cn('cn-combobox-label px-2 py-1.5 font-medium text-muted-foreground text-xs', className)}
    data-slot="combobox-group-label"
    {...props}
  />
)

const ComboboxCollection = (props: ComboboxCollectionProps) => (
  <ComboboxPrimitive.Collection data-slot="combobox-collection" {...props} />
)

const ComboboxItem = ({ children, className, ...props }: ComboboxItemProps) => (
  <ComboboxPrimitive.Item
    className={cn(
      "cn-combobox-item relative flex w-full cursor-default select-none items-center gap-2 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden data-disabled:pointer-events-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-disabled:opacity-50 not-data-[variant=destructive]:data-highlighted:**:text-accent-foreground [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
      className
    )}
    data-slot="combobox-item"
    {...props}
  >
    {children}
    <ComboboxPrimitive.ItemIndicator
      data-slot="combobox-item-indicator"
      render={
        <span className="cn-combobox-item-indicator pointer-events-none absolute right-2 flex size-4 items-center justify-center">
          <CheckIcon className="cn-combobox-item-indicator-icon pointer-events-none" />
        </span>
      }
    />
  </ComboboxPrimitive.Item>
)

const ComboboxSeparator = ({ className, ...props }: ComboboxSeparatorProps) => (
  <ComboboxPrimitive.Separator
    className={cn('cn-combobox-separator -mx-1 my-1 h-px bg-border', className)}
    data-slot="combobox-separator"
    {...props}
  />
)

const ComboboxChips = ({ className, ...props }: ComboboxChipsProps) => (
  <ComboboxPrimitive.Chips
    className={cn(
      'cn-combobox-chips flex min-h-8 flex-wrap items-center gap-1 rounded-lg border border-input bg-transparent bg-clip-padding px-2.5 py-1 text-sm transition-colors focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50 has-aria-invalid:border-destructive has-data-[slot=combobox-chip]:px-1 has-aria-invalid:ring-3 has-aria-invalid:ring-destructive/20 dark:bg-input/30 dark:has-aria-invalid:border-destructive/50 dark:has-aria-invalid:ring-destructive/40',
      className
    )}
    data-slot="combobox-chips"
    {...props}
  />
)

const ComboboxChip = ({ children, className, showRemove = true, ...props }: ComboboxChipProps) => (
  <ComboboxPrimitive.Chip
    className={cn(
      'cn-combobox-chip flex h-[calc(--spacing(5.25))] w-fit items-center justify-center gap-1 whitespace-nowrap rounded-sm bg-muted px-1.5 font-medium text-foreground text-xs has-disabled:pointer-events-none has-disabled:cursor-not-allowed has-data-[slot=combobox-chip-remove]:pr-0 has-disabled:opacity-50',
      className
    )}
    data-slot="combobox-chip"
    {...props}
  >
    {children}
    {showRemove ? (
      <ComboboxPrimitive.ChipRemove
        className="cn-combobox-chip-remove -ml-1 opacity-50 hover:opacity-100"
        data-slot="combobox-chip-remove"
        render={
          <Button size="icon-xs" variant="ghost">
            <XIcon className="cn-combobox-chip-indicator-icon pointer-events-none" />
          </Button>
        }
      />
    ) : null}
  </ComboboxPrimitive.Chip>
)

const ComboboxChipsInput = ({ className, ...props }: ComboboxChipsInputProps) => (
  <ComboboxPrimitive.Input
    className={cn('cn-combobox-chip-input min-w-16 flex-1 outline-none', className)}
    data-slot="combobox-chip-input"
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
