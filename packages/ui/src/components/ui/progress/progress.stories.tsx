import type { Meta, StoryObj } from '@storybook/react-vite'

import { Progress } from './progress'

const meta = {
  args: {
    value: 66
  },
  component: Progress,
  parameters: {
    docs: {
      description: {
        component:
          'A visual indicator for task completion or loading progress. Examples and guidance reference the [shadcn/ui Progress documentation](https://ui.shadcn.com/docs/components/base/progress.md).'
      }
    }
  },
  tags: ['autodocs'],
  title: 'UI/Progress'
} satisfies Meta<typeof Progress>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Indeterminate: Story = {
  args: {
    value: null
  }
}
