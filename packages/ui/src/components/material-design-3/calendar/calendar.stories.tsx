import { expect, userEvent, within } from 'storybook/test'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../../ui/button'
import { Card, CardContent, CardFooter } from '../../ui/card'
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
  title: 'Material Design 3/Calendar'
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
Basic.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(canvas.getByText('January 2026')).toHaveAttribute('data-slot', 'calendar-caption')
  await expect(canvas.getByRole('button', { name: 'January 12, 2026' })).toHaveAttribute('data-selected', 'true')

  await userEvent.click(canvas.getByRole('button', { name: 'Next month' }))

  await expect(canvas.getByText('February 2026')).toHaveAttribute('data-slot', 'calendar-caption')
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
RangeCalendar.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(canvas.getByText('January 2026')).toBeVisible()
  await expect(canvasElement.querySelectorAll('[data-slot="calendar-grid"]')).toHaveLength(2)
  await expect(canvas.getByRole('button', { name: 'January 12, 2026' })).toHaveAttribute('data-selected', 'true')
  await expect(canvas.getByRole('button', { name: 'February 11, 2026' })).toHaveAttribute('data-selected', 'true')
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
MonthAndYearSelector.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(canvas.getByLabelText('Month and year')).toHaveAttribute('data-slot', 'calendar-caption')
  await expect(canvas.getByRole('button', { name: 'January 12, 2026' })).toHaveAttribute('data-selected', 'true')
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
Presets.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(canvas.getByRole('button', { name: 'January 12, 2026' })).toHaveAttribute('data-selected', 'true')
  await expect(canvas.getByRole('button', { name: 'Today' })).toBeVisible()
  await expect(canvas.getByRole('button', { name: 'In 2 weeks' })).toBeVisible()
}
