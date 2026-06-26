import type { Meta, StoryObj } from '@storybook/react-vite'

import { Spinner } from './spinner'

const meta = {
  component: Spinner,
  tags: ['autodocs'],
  title: 'UI/Spinner'
} satisfies Meta<typeof Spinner>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Spinner />
      <Spinner className="size-5 text-primary" />
      <Spinner className="size-6 text-muted-foreground" />
    </div>
  )
}
