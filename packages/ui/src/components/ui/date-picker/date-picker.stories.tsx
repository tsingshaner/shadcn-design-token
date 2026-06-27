import { expect, userEvent, within } from 'storybook/test'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../button'
import { Calendar, type DateRange } from '../calendar'
import { Field, FieldLabel } from '../field'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '../input-group'
import { Popover, PopoverContent, PopoverTrigger } from '../popover'
import { DatePicker } from './date-picker'

const meta = {
  component: DatePicker,
  parameters: {
    docs: {
      description: {
        component:
          'A composed date input pattern that pairs a trigger with a calendar popover. Examples and guidance reference the [shadcn/ui Date Picker documentation](https://ui.shadcn.com/docs/components/base/date-picker.md).'
      }
    }
  },
  tags: ['autodocs'],
  title: 'Components/Date Picker'
} satisfies Meta<typeof DatePicker>

export default meta

type Story = StoryObj<typeof meta>

const date = new Date(2026, 0, 20)
const range: DateRange = { from: date, to: new Date(2026, 1, 9) }
const formatDate = (value: Date) =>
  value.toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' })

export const Basic: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Covers a simple picker from [shadcn/ui Date Picker Basic](https://ui.shadcn.com/docs/components/base/date-picker.md#basic).'
      }
    }
  },
  render: () => (
    <Field className="mx-auto w-44">
      <FieldLabel htmlFor="date-picker-simple">Date</FieldLabel>
      <DatePicker defaultValue={date} id="date-picker-simple" />
    </Field>
  )
}
Basic.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const page = within(canvasElement.ownerDocument.body)

  await expect(canvas.getByLabelText('Date')).toHaveTextContent('January 20, 2026')
  await userEvent.click(canvas.getByLabelText('Date'))

  await expect(await page.findByText('January 2026')).toHaveAttribute('data-slot', 'calendar-caption')
  await expect(page.getByRole('button', { name: 'January 20, 2026' })).toHaveAttribute('data-selected', 'true')
}

export const RangePicker: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Covers date ranges from [shadcn/ui Date Picker Range Picker](https://ui.shadcn.com/docs/components/base/date-picker.md#range-picker).'
      }
    }
  },
  render: () => (
    <Field className="mx-auto w-72">
      <FieldLabel htmlFor="date-picker-range">Date Picker Range</FieldLabel>
      <Popover>
        <PopoverTrigger
          render={<Button className="justify-start px-2.5 font-normal" id="date-picker-range" variant="outline" />}
        >
          {range.from ? formatDate(range.from) : 'Pick a date'} - {range.to ? formatDate(range.to) : ''}
        </PopoverTrigger>
        <PopoverContent align="start" className="w-auto p-0">
          <Calendar defaultMonth={range.from} mode="range" numberOfMonths={2} selected={range} />
        </PopoverContent>
      </Popover>
    </Field>
  )
}
RangePicker.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const page = within(canvasElement.ownerDocument.body)

  await userEvent.click(canvas.getByLabelText('Date Picker Range'))

  await expect(await page.findByText('January 2026')).toBeVisible()
  await expect(canvasElement.ownerDocument.body.querySelectorAll('[data-slot="calendar-grid"]')).toHaveLength(2)
  await expect(page.getByRole('button', { name: 'February 9, 2026' })).toHaveAttribute('data-selected', 'true')
}

export const DateOfBirth: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Covers dropdown calendar captions from [shadcn/ui Date Picker Date of Birth](https://ui.shadcn.com/docs/components/base/date-picker.md#date-of-birth).'
      }
    }
  },
  render: () => (
    <Field className="mx-auto w-44">
      <FieldLabel htmlFor="date-of-birth">Date of birth</FieldLabel>
      <Popover>
        <PopoverTrigger render={<Button className="justify-start font-normal" id="date-of-birth" variant="outline" />}>
          Select date
        </PopoverTrigger>
        <PopoverContent align="start" className="w-auto overflow-hidden p-0">
          <Calendar captionLayout="dropdown" defaultMonth={date} mode="single" />
        </PopoverContent>
      </Popover>
    </Field>
  )
}
DateOfBirth.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const page = within(canvasElement.ownerDocument.body)

  await userEvent.click(canvas.getByLabelText('Date of birth'))

  await expect(await page.findByLabelText('Month and year')).toHaveAttribute('data-slot', 'calendar-caption')
}

export const Input: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Covers date input composition from [shadcn/ui Date Picker Input](https://ui.shadcn.com/docs/components/base/date-picker.md#input).'
      }
    }
  },
  render: () => (
    <Field className="mx-auto w-56">
      <FieldLabel htmlFor="date-required">Subscription Date</FieldLabel>
      <InputGroup>
        <InputGroupInput defaultValue={formatDate(date)} id="date-required" placeholder="June 01, 2025" />
        <InputGroupAddon align="inline-end">
          <Popover>
            <PopoverTrigger render={<InputGroupButton aria-label="Select date" id="date-picker" />}>
              <span aria-hidden="true">⌄</span>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-auto overflow-hidden p-0" sideOffset={10}>
              <Calendar defaultMonth={date} mode="single" selected={date} />
            </PopoverContent>
          </Popover>
        </InputGroupAddon>
      </InputGroup>
    </Field>
  )
}
Input.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const page = within(canvasElement.ownerDocument.body)

  await expect(canvas.getByLabelText('Subscription Date')).toHaveValue('January 20, 2026')
  await userEvent.click(canvas.getByRole('button', { name: 'Select date' }))

  await expect(await page.findByText('January 2026')).toHaveAttribute('data-slot', 'calendar-caption')
}
