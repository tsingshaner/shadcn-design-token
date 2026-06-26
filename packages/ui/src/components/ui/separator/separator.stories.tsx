import type { Meta, StoryObj } from '@storybook/react-vite'

import { Separator } from './separator'

const meta = {
  component: Separator,
  tags: ['autodocs'],
  title: 'UI/Separator'
} satisfies Meta<typeof Separator>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="w-72">
      <div className="space-y-1">
        <h4 className="font-medium text-sm leading-none">Design tokens</h4>
        <p className="text-muted-foreground text-sm">Shared primitives for components.</p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center gap-4 text-sm">
        <span>Color</span>
        <Separator orientation="vertical" />
        <span>Radius</span>
        <Separator orientation="vertical" />
        <span>Type</span>
      </div>
    </div>
  )
}
