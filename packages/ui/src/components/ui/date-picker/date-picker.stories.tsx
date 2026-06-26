import type { Meta, StoryObj } from '@storybook/react-vite'

import { DatePicker } from './date-picker'

const meta = {
  component: DatePicker,
  title: 'Components/Date Picker'
} satisfies Meta<typeof DatePicker>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    defaultValue: new Date(2026, 5, 27)
  }
}
