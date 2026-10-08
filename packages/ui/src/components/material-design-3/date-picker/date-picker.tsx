import { cn } from 'cn'
import { CalendarDaysIcon } from 'lucide-react'
import { type ComponentProps, useId, useState } from 'react'

import { Button } from '../button'
import { Calendar } from '../calendar'
import { Popover, PopoverContent, PopoverTrigger } from '../popover'

type DatePickerProps = Omit<ComponentProps<typeof Button>, 'defaultValue' | 'onSelect' | 'value'> & {
  defaultOpen?: boolean
  defaultValue?: Date
  disabledDate?: (date: Date) => boolean
  formatDate?: (date: Date) => string
  label?: string
  onOpenChange?: (open: boolean) => void
  onValueChange?: (date: Date | undefined) => void
  open?: boolean
  placeholder?: string
  showClearButton?: boolean
  supportingText?: string
  value?: Date
}

const defaultFormatter = new Intl.DateTimeFormat('en', { day: 'numeric', month: 'long', year: 'numeric' })

const DatePicker = ({
  className,
  defaultOpen = false,
  defaultValue,
  disabledDate,
  formatDate = (date) => defaultFormatter.format(date),
  label = 'Date',
  onOpenChange,
  onValueChange,
  open,
  placeholder = 'mm/dd/yyyy',
  showClearButton = false,
  supportingText = 'MM/DD/YYYY',
  value,
  ...props
}: DatePickerProps) => {
  const [internalValue, setInternalValue] = useState(defaultValue)
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const [draftValue, setDraftValue] = useState<Date>()
  const selected = value ?? internalValue
  const resolvedOpen = open ?? internalOpen
  const supportingTextId = useId()

  const setOpen = (nextOpen: boolean) => {
    if (nextOpen) {
      setDraftValue(selected)
    }
    if (open === undefined) {
      setInternalOpen(nextOpen)
    }
    onOpenChange?.(nextOpen)
  }

  const setSelected = (date: Date | undefined) => {
    if (value === undefined) {
      setInternalValue(date)
    }
    onValueChange?.(date)
  }

  const handleSelect = (date: Date | unknown) => {
    if (date instanceof Date) {
      setDraftValue(date)
    }
  }

  return (
    <Popover onOpenChange={setOpen} open={resolvedOpen}>
      <div className="w-fit" data-slot="date-picker">
        <PopoverTrigger
          render={
            <Button
              aria-describedby={supportingText ? supportingTextId : undefined}
              aria-expanded={resolvedOpen}
              className={cn(
                'cn-date-picker h-14 w-[312px] max-w-full justify-start rounded-[4px] border-muted-foreground bg-background px-4 pr-14 text-left font-normal text-base text-foreground shadow-none outline-none focus-visible:border-2 focus-visible:border-primary focus-visible:ring-0',
                !selected && 'text-muted-foreground',
                resolvedOpen && 'border-2 border-primary',
                className
              )}
              data-slot="date-picker-trigger"
              data-state={resolvedOpen ? 'open' : 'closed'}
              variant="outline"
              {...props}
            />
          }
        >
          <span
            className={cn(
              'pointer-events-none absolute -top-2 left-3 bg-background px-1 text-muted-foreground text-xs leading-4',
              resolvedOpen && 'text-primary'
            )}
          >
            {label}
          </span>
          <span className="truncate">{selected ? formatDate(selected) : placeholder}</span>
          <span
            className={cn(
              'absolute right-2 flex size-10 items-center justify-center rounded-lg text-muted-foreground',
              resolvedOpen && 'bg-muted-foreground/[0.08]'
            )}
          >
            <CalendarDaysIcon aria-hidden="true" className="size-6" />
          </span>
        </PopoverTrigger>
        {supportingText && (
          <div
            className="px-4 pt-1 text-muted-foreground text-xs leading-4"
            data-slot="date-picker-supporting-text"
            id={supportingTextId}
          >
            {supportingText}
          </div>
        )}
      </div>
      <PopoverContent
        align="start"
        className="w-auto overflow-hidden rounded-[16px] bg-surface-container-high p-0 shadow-xl"
        data-slot="date-picker-content"
        sideOffset={8}
      >
        <Calendar
          captionLayout="dropdown"
          className="rounded-none"
          defaultMonth={selected}
          disabled={disabledDate}
          fixedWeeks
          onSelect={handleSelect}
          selected={draftValue}
        />
        <div className="flex h-14 items-center justify-between px-3 pb-1" data-slot="date-picker-actions">
          <div>
            {showClearButton && (
              <Button className="h-12 px-4" onClick={() => setDraftValue(undefined)} variant="ghost">
                Clear
              </Button>
            )}
          </div>
          <div className="flex">
            <Button className="h-12 px-4" onClick={() => setOpen(false)} variant="ghost">
              Cancel
            </Button>
            <Button
              className="h-12 px-4"
              onClick={() => {
                setSelected(draftValue)
                setOpen(false)
              }}
              variant="ghost"
            >
              OK
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export type { DatePickerProps }
export { DatePicker }
