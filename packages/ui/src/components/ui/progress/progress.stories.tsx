import type { Meta, StoryObj } from '@storybook/react-vite'

import { Progress } from './progress'

const meta = {
  args: {
    value: 66
  },
  component: Progress,
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
