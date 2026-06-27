import type { Meta, StoryObj } from '@storybook/react-vite'

import { Calendar } from './calendar'

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

export const Default: Story = {
  args: {
    defaultMonth: new Date(2026, 5, 1),
    selected: new Date(2026, 5, 27)
  }
}
