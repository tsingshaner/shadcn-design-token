import type { Meta, StoryObj } from '@storybook/react-vite'

import { Calendar } from './calendar'

const meta = {
  component: Calendar,
  title: 'Components/Calendar'
} satisfies Meta<typeof Calendar>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    defaultMonth: new Date(2026, 5, 1),
    selected: new Date(2026, 5, 27)
  }
}
