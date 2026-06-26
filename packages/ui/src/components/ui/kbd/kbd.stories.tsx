import type { Meta, StoryObj } from '@storybook/react-vite'

import { Kbd } from './kbd'

const meta = {
  component: Kbd,
  tags: ['autodocs'],
  title: 'UI/Kbd'
} satisfies Meta<typeof Kbd>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="flex items-center gap-1 text-sm">
      <Kbd>⌘</Kbd>
      <Kbd>K</Kbd>
    </div>
  )
}
