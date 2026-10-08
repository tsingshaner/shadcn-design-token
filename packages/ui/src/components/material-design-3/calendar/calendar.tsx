import { cn } from 'cn'
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { type ComponentProps, useMemo, useState } from 'react'

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
const monthNameFormatter = new Intl.DateTimeFormat('en', { month: 'short' })
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

const getCalendarDays = (month: Date, fixedWeeks: boolean) => {
  const firstDay = startOfMonth(month)
  const gridStart = new Date(firstDay)
  gridStart.setDate(firstDay.getDate() - firstDay.getDay())
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()
  const dayCount = fixedWeeks ? 42 : Math.ceil((firstDay.getDay() + daysInMonth) / 7) * 7

  return Array.from({ length: dayCount }, (_, index) => {
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
    selectedRange,
    today: isSameDay(date, new Date())
  }
}

const Calendar = ({
  captionLayout = 'label',
  className,
  defaultMonth,
  disabled,
  fixedWeeks = false,
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
  const yearOptions = useMemo(
    () => Array.from({ length: 201 }, (_, index) => visibleMonth.getFullYear() - 100 + index),
    [visibleMonth]
  )

  const setVisibleMonth = (nextMonth: Date) => {
    setInternalMonth(nextMonth)
    onMonthChange?.(nextMonth)
  }

  return (
    <div
      className={cn('w-fit rounded-[16px] border-0 bg-surface-container-high text-foreground shadow-none', className)}
      data-scope="calendar"
      data-slot="root"
      {...props}
    >
      <div className="flex h-16 items-center justify-between px-3" data-scope="calendar" data-slot="header">
        {captionLayout === 'dropdown' ? (
          <>
            <div className="flex items-center">
              <Button
                aria-label="Previous month"
                className="size-12 text-muted-foreground"
                onClick={() => setVisibleMonth(addMonths(visibleMonth, -1))}
                size="icon"
                variant="ghost"
              >
                <ChevronLeftIcon className="size-6" />
              </Button>
              <label className="relative flex h-10 items-center rounded-full font-medium text-muted-foreground text-sm">
                <select
                  aria-label="Month and year"
                  className="appearance-none bg-transparent py-2 pr-7 pl-2 outline-none"
                  data-scope="calendar"
                  data-slot="caption"
                  onChange={(event) =>
                    setVisibleMonth(new Date(visibleMonth.getFullYear(), Number(event.currentTarget.value), 1))
                  }
                  value={visibleMonth.getMonth()}
                >
                  {Array.from({ length: 12 }, (_, index) => {
                    const monthName = monthNameFormatter.format(new Date(2000, index, 1))

                    return (
                      <option key={monthName} value={index}>
                        {monthName}
                      </option>
                    )
                  })}
                </select>
                <ChevronDownIcon aria-hidden="true" className="pointer-events-none absolute right-1 size-[18px]" />
              </label>
              <Button
                aria-label="Next month"
                className="size-12 text-muted-foreground"
                onClick={() => setVisibleMonth(addMonths(visibleMonth, 1))}
                size="icon"
                variant="ghost"
              >
                <ChevronRightIcon className="size-6" />
              </Button>
            </div>
            <div className="flex items-center">
              <Button
                aria-label="Previous year"
                className="size-12 text-muted-foreground"
                onClick={() => setVisibleMonth(addMonths(visibleMonth, -12))}
                size="icon"
                variant="ghost"
              >
                <ChevronLeftIcon className="size-6" />
              </Button>
              <label className="relative flex h-10 items-center rounded-full font-medium text-muted-foreground text-sm">
                <select
                  aria-label="Year"
                  className="appearance-none bg-transparent py-2 pr-7 pl-2 outline-none"
                  onChange={(event) =>
                    setVisibleMonth(new Date(Number(event.currentTarget.value), visibleMonth.getMonth(), 1))
                  }
                  value={visibleMonth.getFullYear()}
                >
                  {yearOptions.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                <ChevronDownIcon aria-hidden="true" className="pointer-events-none absolute right-1 size-[18px]" />
              </label>
              <Button
                aria-label="Next year"
                className="size-12 text-muted-foreground"
                onClick={() => setVisibleMonth(addMonths(visibleMonth, 12))}
                size="icon"
                variant="ghost"
              >
                <ChevronRightIcon className="size-6" />
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="px-3 font-medium text-sm" data-scope="calendar" data-slot="caption">
              {monthFormatter.format(visibleMonth)}
            </div>
            <div className="flex items-center">
              <Button
                aria-label="Previous month"
                className="size-12 text-muted-foreground"
                onClick={() => setVisibleMonth(addMonths(visibleMonth, -1))}
                size="icon"
                variant="ghost"
              >
                <ChevronLeftIcon className="size-6" />
              </Button>
              <Button
                aria-label="Next month"
                className="size-12 text-muted-foreground"
                onClick={() => setVisibleMonth(addMonths(visibleMonth, 1))}
                size="icon"
                variant="ghost"
              >
                <ChevronRightIcon className="size-6" />
              </Button>
            </div>
          </>
        )}
      </div>
      <div className="flex gap-4 px-3 pb-1">
        {months.map((visibleMonthItem) => {
          const days = getCalendarDays(visibleMonthItem, fixedWeeks)

          return (
            <div
              className="grid auto-rows-[48px] grid-cols-[repeat(7,48px)] text-center"
              data-scope="calendar"
              data-slot="grid"
              key={visibleMonthItem.toISOString()}
            >
              {weekdayLabels.map((weekday) => (
                <div
                  className="size-12 content-center text-base"
                  data-scope="calendar"
                  data-slot="weekday"
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
                      'size-10 place-self-center p-0 font-normal text-base tabular-nums',
                      day.outside && 'text-muted-foreground opacity-[0.38]',
                      day.today && !day.selected && 'border-primary text-primary',
                      day.rangeMiddle &&
                        !day.rangeEndpoint &&
                        'size-12 rounded-none bg-secondary text-secondary-foreground',
                      day.selected && 'border-transparent bg-primary text-primary-foreground'
                    )}
                    data-outside={day.outside}
                    data-scope="calendar"
                    data-selected={day.selected}
                    data-slot="day-button"
                    data-today={day.today}
                    disabled={day.disabled}
                    key={date.toISOString()}
                    onClick={() => onSelect?.(mode === 'range' ? { from: date, to: day.selectedRange?.to } : date)}
                    size="icon"
                    variant={day.selected ? 'primary' : 'ghost'}
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
