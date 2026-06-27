import type { Meta, StoryObj } from '@storybook/react-vite'

import { DirectionProvider } from './direction'

const meta = {
  component: DirectionProvider,
  parameters: {
    docs: {
      description: {
        component:
          'A helper for previewing left-to-right and right-to-left layout direction. Examples and guidance reference the [shadcn/ui Direction documentation](https://ui.shadcn.com/docs/components/base/direction.md).'
      }
    }
  },
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
