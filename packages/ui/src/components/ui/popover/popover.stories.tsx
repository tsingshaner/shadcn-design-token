import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../button'
import { Popover, PopoverContent, PopoverTrigger } from './popover'

const meta = {
  component: Popover,
  parameters: {
    docs: {
      description: {
        component:
          'A floating content surface anchored to a trigger. Examples and guidance reference the [shadcn/ui Popover documentation](https://ui.shadcn.com/docs/components/base/popover.md).'
      }
    }
  },
  tags: ['autodocs'],
  title: 'UI/Popover'
} satisfies Meta<typeof Popover>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>Open popover</PopoverTrigger>
      <PopoverContent>
        <div className="grid gap-2">
          <h4 className="font-medium leading-none">Token options</h4>
          <p className="text-muted-foreground text-sm">Choose how generated tokens are grouped.</p>
        </div>
      </PopoverContent>
    </Popover>
  )
}
