import type { Meta, StoryObj } from '@storybook/react-vite'

import { Toggle } from './toggle'

const meta = {
  args: {
    children: 'Bold'
  },
  component: Toggle,
  parameters: {
    docs: {
      description: {
        component:
          'A two-state button control for enabling and disabling an option. Examples and guidance reference the [shadcn/ui Toggle documentation](https://ui.shadcn.com/docs/components/base/toggle.md).'
      }
    }
  },
  tags: ['autodocs'],
  title: 'UI/Toggle'
} satisfies Meta<typeof Toggle>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Outline: Story = {
  args: {
    variant: 'outline'
  }
}
