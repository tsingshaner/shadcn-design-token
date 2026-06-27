import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../button'
import { Input } from '../input'
import { Label } from '../label'
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

export const Basic: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Basic popover with supporting content. Reference: [shadcn/ui Popover Basic example](https://ui.shadcn.com/docs/components/base/popover.md#basic)'
      }
    }
  },
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

export const Align: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use align and side props to position popover content relative to the trigger. Reference: [shadcn/ui Popover Align example](https://ui.shadcn.com/docs/components/base/popover.md#align)'
      }
    }
  },
  render: () => (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>Open aligned popover</PopoverTrigger>
      <PopoverContent align="end" side="right">
        <div className="grid gap-2">
          <h4 className="font-medium leading-none">Aligned content</h4>
          <p className="text-muted-foreground text-sm">This content opens on the right and aligns to the end.</p>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export const WithForm: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Place compact form controls inside a popover. Reference: [shadcn/ui Popover With Form example](https://ui.shadcn.com/docs/components/base/popover.md#with-form)'
      }
    }
  },
  render: () => (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>Edit token</PopoverTrigger>
      <PopoverContent>
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Token value</h4>
            <p className="text-muted-foreground text-sm">Update the value used by generated styles.</p>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="popover-token-name">Name</Label>
            <Input defaultValue="radius-md" id="popover-token-name" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="popover-token-value">Value</Label>
            <Input defaultValue="0.375rem" id="popover-token-value" />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
