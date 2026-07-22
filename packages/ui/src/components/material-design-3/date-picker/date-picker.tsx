import { type ComponentProps, useState } from 'react'

import { cn } from '@/lib/utils'

import { Button } from '../button'
import { Calendar } from '../calendar'
import { Popover, PopoverContent, PopoverTrigger } from '../popover'

type DatePickerProps = Omit<ComponentProps<typeof Button>, 'onSelect' | 'value'> & {
  defaultValue?: Date
  disabledDate?: (date: Date) => boolean
  formatDate?: (date: Date) => string
  onValueChange?: (date: Date) => void
  placeholder?: string
  value?: Date
}

const defaultFormatter = new Intl.DateTimeFormat('en', { day: 'numeric', month: 'long', year: 'numeric' })

const DatePicker = ({
  className,
  defaultValue,
  disabledDate,
  formatDate = (date) => defaultFormatter.format(date),
  onValueChange,
  placeholder = 'Pick a date',
  value,
  ...props
}: DatePickerProps) => {
  const [internalValue, setInternalValue] = useState(defaultValue)
  const selected = value ?? internalValue

  const setSelected = (date: Date) => {
    setInternalValue(date)
    onValueChange?.(date)
  }

  const handleSelect = (date: Date | unknown) => {
    if (date instanceof Date) {
      setSelected(date)
    }
  }

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            className={cn(
              'cn-date-picker w-64 justify-start text-left font-normal',
              !selected && 'text-muted-foreground',
              className
            )}
            variant="outline"
            {...props}
          />
        }
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
          <path d="M8 2v4" />
          <path d="M16 2v4" />
          <rect height="18" rx="2" width="18" x="3" y="4" />
          <path d="M3 10h18" />
        </svg>
        {selected ? formatDate(selected) : placeholder}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar defaultMonth={selected} disabled={disabledDate} onSelect={handleSelect} selected={selected} />
      </PopoverContent>
    </Popover>
  )
}

export type { DatePickerProps }
export { DatePicker }
