import type { Meta, StoryObj } from '@storybook/react-vite'

import { DirectionProvider } from './direction'

const meta = {
  component: DirectionProvider,
  tags: ['autodocs'],
  title: 'UI/Direction'
} satisfies Meta<typeof DirectionProvider>

export default meta

type Story = StoryObj<typeof meta>

export const RTL: Story = {
  render: () => (
    <DirectionProvider direction="rtl">
      <div className="rounded-md border p-4 text-right">RTL direction context</div>
    </DirectionProvider>
  )
}
