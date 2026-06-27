import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../button'
import { Card, CardContent, CardFooter } from '../card'
import { Calendar, type DateRange } from './calendar'

const meta = {
  component: Calendar,
  parameters: {
    docs: {
      description: {
        component:
          'A date selection surface for picking single dates from a monthly calendar view. Examples and guidance reference the [shadcn/ui Calendar documentation](https://ui.shadcn.com/docs/components/base/calendar.md).'
      }
    }
  },
  tags: ['autodocs'],
  title: 'Components/Calendar'
} satisfies Meta<typeof Calendar>

export default meta

type Story = StoryObj<typeof meta>

const baseDate = new Date(2026, 0, 12)
const range: DateRange = { from: baseDate, to: new Date(2026, 1, 11) }

export const Basic: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Covers single-date selection from [shadcn/ui Calendar Basic](https://ui.shadcn.com/docs/components/base/calendar.md#basic).'
      }
    }
  },
  render: () => <Calendar className="rounded-lg border" defaultMonth={baseDate} mode="single" selected={baseDate} />
}

export const RangeCalendar: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Covers range selection from [shadcn/ui Calendar Range Calendar](https://ui.shadcn.com/docs/components/base/calendar.md#range-calendar).'
      }
    }
  },
  render: () => (
    <Calendar
      className="rounded-lg border"
      defaultMonth={range.from}
      mode="range"
      numberOfMonths={2}
      selected={range}
    />
  )
}

export const MonthAndYearSelector: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Covers dropdown captions from [shadcn/ui Calendar Month and Year Selector](https://ui.shadcn.com/docs/components/base/calendar.md#month-and-year-selector).'
      }
    }
  },
  render: () => (
    <Calendar
      captionLayout="dropdown"
      className="rounded-lg border"
      defaultMonth={baseDate}
      mode="single"
      selected={baseDate}
    />
  )
}

export const Presets: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Covers preset date actions from [shadcn/ui Calendar Presets](https://ui.shadcn.com/docs/components/base/calendar.md#presets).'
      }
    }
  },
  render: () => (
    <Card className="mx-auto w-fit max-w-[300px]">
      <CardContent>
        <Calendar className="border-0 p-0" defaultMonth={baseDate} fixedWeeks mode="single" selected={baseDate} />
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2 border-t">
        {['Today', 'Tomorrow', 'In 3 days', 'In a week', 'In 2 weeks'].map((label) => (
          <Button className="flex-1" key={label} size="sm" variant="outline">
            {label}
          </Button>
        ))}
      </CardFooter>
    </Card>
  )
}
