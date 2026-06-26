import { type ComponentProps, useMemo, useState } from 'react'

import { cn } from '../../../lib/utils'
import { Button } from '../button'

type CalendarProps = Omit<ComponentProps<'div'>, 'onSelect'> & {
  defaultMonth?: Date
  disabled?: (date: Date) => boolean
  month?: Date
  onMonthChange?: (month: Date) => void
  onSelect?: (date: Date) => void
  selected?: Date
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

const Calendar = ({
  className,
  defaultMonth,
  disabled,
  month,
  onMonthChange,
  onSelect,
  selected,
  ...props
}: CalendarProps) => {
  const [internalMonth, setInternalMonth] = useState(startOfMonth(defaultMonth ?? selected ?? new Date()))
  const visibleMonth = startOfMonth(month ?? internalMonth)
  const days = useMemo(() => getCalendarDays(visibleMonth), [visibleMonth])

  const setVisibleMonth = (nextMonth: Date) => {
    setInternalMonth(nextMonth)
    onMonthChange?.(nextMonth)
  }

  return (
    <div
      className={cn('w-fit rounded-md border bg-background p-3 text-foreground', className)}
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
            className="size-4"
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
        <div className="font-medium text-sm" data-slot="calendar-caption">
          {monthFormatter.format(visibleMonth)}
        </div>
        <Button
          aria-label="Next month"
          onClick={() => setVisibleMonth(addMonths(visibleMonth, 1))}
          size="icon-sm"
          variant="ghost"
        >
          <svg
            aria-hidden="true"
            className="size-4"
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
      <div className="grid grid-cols-7 gap-1 text-center" data-slot="calendar-grid">
        {weekdayLabels.map((weekday) => (
          <div className="h-8 content-center text-muted-foreground text-xs" data-slot="calendar-weekday" key={weekday}>
            {weekday}
          </div>
        ))}
        {days.map((date) => {
          const outside = date.getMonth() !== visibleMonth.getMonth()
          const selectedDay = selected ? isSameDay(date, selected) : false
          const disabledDay = disabled?.(date) ?? false

          return (
            <Button
              aria-label={dayFormatter.format(date)}
              className={cn(
                'size-8 p-0 font-normal tabular-nums',
                outside && 'text-muted-foreground opacity-50',
                selectedDay && 'bg-primary text-primary-foreground hover:bg-primary/90'
              )}
              data-outside={outside}
              data-selected={selectedDay}
              disabled={disabledDay}
              key={date.toISOString()}
              onClick={() => onSelect?.(date)}
              size="icon-sm"
              variant={selectedDay ? 'default' : 'ghost'}
            >
              {date.getDate()}
            </Button>
          )
        })}
      </div>
    </div>
  )
}

export type { CalendarProps }
export { Calendar }
