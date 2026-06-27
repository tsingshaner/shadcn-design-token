import type { Meta, StoryObj } from '@storybook/react-vite'

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

export const Default: Story = {
  args: {
    defaultValue: new Date(2026, 5, 27)
  }
}
