import { type ComponentProps, useMemo, useState } from 'react'

import { cn } from '@/lib/utils'

import { Button } from '../button'

type DateRange = {
  from?: Date
  to?: Date
}
type CalendarProps = Omit<ComponentProps<'div'>, 'onSelect'> & {
  captionLayout?: 'dropdown' | 'label'
  defaultMonth?: Date
  disabled?: Date[] | ((date: Date) => boolean)
  fixedWeeks?: boolean
  mode?: 'range' | 'single'
  month?: Date
  numberOfMonths?: number
  onMonthChange?: (month: Date) => void
  onSelect?: (date: Date | DateRange | undefined) => void
  selected?: Date | DateRange
}

const weekdayLabels = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const monthFormatter = new Intl.DateTimeFormat('en', { month: 'long', year: 'numeric' })
const dayFormatter = new Intl.DateTimeFormat('en', { day: 'numeric', month: 'long', year: 'numeric' })

const startOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1)

const addMonths = (date: Date, amount: number) => new Date(date.getFullYear(), date.getMonth() + amount, 1)

const isSameDay = (date: Date, otherDate: Date) =>
  date.getFullYear() === otherDate.getFullYear() &&
  date.getMonth() === otherDate.getMonth() &&
  date.getDate() === otherDate.getDate()

const isDateRange = (value: Date | DateRange | undefined): value is DateRange =>
  Boolean(value && !(value instanceof Date) && ('from' in value || 'to' in value))

const isInRange = (date: Date, range: DateRange | undefined) => {
  if (!(range?.from && range.to)) {
    return false
  }

  const time = date.getTime()
  return time >= range.from.getTime() && time <= range.to.getTime()
}

const isDisabled = (date: Date, disabled: CalendarProps['disabled']) => {
  if (Array.isArray(disabled)) {
    return disabled.some((disabledDate) => isSameDay(date, disabledDate))
  }

  return disabled?.(date) ?? false
}

const getCalendarDays = (month: Date) => {
  const firstDay = startOfMonth(month)
  const gridStart = new Date(firstDay)
  gridStart.setDate(firstDay.getDate() - firstDay.getDay())

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(gridStart)
    date.setDate(gridStart.getDate() + index)
    return date
  })
}

const getDayState = (
  date: Date,
  visibleMonth: Date,
  selected: CalendarProps['selected'],
  disabled: CalendarProps['disabled']
) => {
  const selectedRange = isDateRange(selected) ? selected : undefined
  const selectedDay = selected instanceof Date ? isSameDay(date, selected) : false
  const rangeEndpoint =
    (selectedRange?.from ? isSameDay(date, selectedRange.from) : false) ||
    (selectedRange?.to ? isSameDay(date, selectedRange.to) : false)

  return {
    disabled: isDisabled(date, disabled),
    outside: date.getMonth() !== visibleMonth.getMonth(),
    rangeEndpoint,
    rangeMiddle: isInRange(date, selectedRange),
    selected: selectedDay || rangeEndpoint,
    selectedRange
  }
}

const Calendar = ({
  captionLayout = 'label',
  className,
  defaultMonth,
  disabled,
  mode = 'single',
  month,
  numberOfMonths = 1,
  onMonthChange,
  onSelect,
  selected,
  ...props
}: CalendarProps) => {
  const selectedStart = selected instanceof Date ? selected : isDateRange(selected) ? selected.from : undefined
  const [internalMonth, setInternalMonth] = useState(startOfMonth(defaultMonth ?? selectedStart ?? new Date()))
  const visibleMonth = startOfMonth(month ?? internalMonth)
  const months = useMemo(
    () => Array.from({ length: numberOfMonths }, (_, index) => addMonths(visibleMonth, index)),
    [numberOfMonths, visibleMonth]
  )

  const setVisibleMonth = (nextMonth: Date) => {
    setInternalMonth(nextMonth)
    onMonthChange?.(nextMonth)
  }

  return (
    <div
      className={cn('cn-calendar w-fit rounded-md border bg-background p-3 text-foreground', className)}
      data-slot="calendar"
      {...props}
    >
      <div className="mb-3 flex items-center justify-between gap-2" data-slot="calendar-header">
        <Button
          aria-label="Previous month"
          onClick={() => setVisibleMonth(addMonths(visibleMonth, -1))}
          size="icon-sm"
          variant="ghost"
        >
          <svg
            aria-hidden="true"
            className="cn-rtl-flip size-4"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </Button>
        {captionLayout === 'dropdown' ? (
          <select
            aria-label="Month and year"
            className="cn-calendar-dropdown-root cn-calendar-caption-label rounded-md border bg-background px-2 py-1 font-medium text-sm"
            data-slot="calendar-caption"
            onChange={(event) => setVisibleMonth(new Date(event.currentTarget.value))}
            value={visibleMonth.toISOString()}
          >
            {Array.from({ length: 12 }, (_, index) => new Date(visibleMonth.getFullYear(), index, 1)).map((date) => (
              <option key={date.toISOString()} value={date.toISOString()}>
                {monthFormatter.format(date)}
              </option>
            ))}
          </select>
        ) : (
          <div className="cn-calendar-caption font-medium text-sm" data-slot="calendar-caption">
            {monthFormatter.format(visibleMonth)}
          </div>
        )}
        <Button
          aria-label="Next month"
          onClick={() => setVisibleMonth(addMonths(visibleMonth, 1))}
          size="icon-sm"
          variant="ghost"
        >
          <svg
            aria-hidden="true"
            className="cn-rtl-flip size-4"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </Button>
      </div>
      <div className="flex gap-4">
        {months.map((visibleMonthItem) => {
          const days = getCalendarDays(visibleMonthItem)

          return (
            <div
              className="grid grid-cols-7 gap-1 text-center"
              data-slot="calendar-grid"
              key={visibleMonthItem.toISOString()}
            >
              {weekdayLabels.map((weekday) => (
                <div
                  className="h-8 content-center text-muted-foreground text-xs"
                  data-slot="calendar-weekday"
                  key={weekday}
                >
                  {weekday}
                </div>
              ))}
              {days.map((date) => {
                const day = getDayState(date, visibleMonthItem, selected, disabled)

                return (
                  <Button
                    aria-label={dayFormatter.format(date)}
                    className={cn(
                      'cn-calendar-day-button size-8 p-0 font-normal tabular-nums',
                      day.outside && 'text-muted-foreground opacity-50',
                      day.rangeMiddle && 'bg-accent text-accent-foreground',
                      day.selected && 'bg-primary text-primary-foreground hover:bg-primary/90'
                    )}
                    data-outside={day.outside}
                    data-selected={day.selected}
                    disabled={day.disabled}
                    key={date.toISOString()}
                    onClick={() => onSelect?.(mode === 'range' ? { from: date, to: day.selectedRange?.to } : date)}
                    size="icon-sm"
                    variant={day.selected ? 'default' : 'ghost'}
                  >
                    {date.getDate()}
                  </Button>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export type { CalendarProps, DateRange }
export { Calendar }
