import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../button'
import { Kbd } from '../kbd'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip'

const meta = {
  component: Tooltip,
  parameters: {
    docs: {
      description: {
        component:
          'A small anchored hint for supplemental information. Examples and guidance reference the [shadcn/ui Tooltip documentation](https://ui.shadcn.com/docs/components/base/tooltip.md).'
      }
    }
  },
  tags: ['autodocs'],
  title: 'UI/Tooltip'
} satisfies Meta<typeof Tooltip>

export default meta

type Story = StoryObj<typeof meta>

export const Side: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use side to choose where tooltip content appears. Reference: [shadcn/ui Tooltip Side example](https://ui.shadcn.com/docs/components/base/tooltip.md#side)'
      }
    }
  },
  render: () => (
    <TooltipProvider delay={0}>
      <div className="flex gap-3">
        {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
          <Tooltip key={side}>
            <TooltipTrigger render={<Button variant="outline" />}>{side}</TooltipTrigger>
            <TooltipContent side={side}>Open {side}</TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  )
}

export const WithKeyboardShortcut: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use Kbd in tooltip content for keyboard shortcuts. Reference: [shadcn/ui Tooltip With Keyboard Shortcut example](https://ui.shadcn.com/docs/components/base/tooltip.md#with-keyboard-shortcut)'
      }
    }
  },
  render: () => (
    <TooltipProvider delay={0}>
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline" />}>Search</TooltipTrigger>
        <TooltipContent className="flex items-center gap-2">
          Search tokens <Kbd>⌘K</Kbd>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export const DisabledButton: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Wrap a disabled button with a tooltip trigger wrapper to keep the hint available. Reference: [shadcn/ui Tooltip Disabled Button example](https://ui.shadcn.com/docs/components/base/tooltip.md#disabled-button)'
      }
    }
  },
  render: () => (
    <TooltipProvider delay={0}>
      <Tooltip>
        <TooltipTrigger render={<span className="inline-flex" />}>
          <Button disabled variant="outline">
            Publish
          </Button>
        </TooltipTrigger>
        <TooltipContent>Resolve validation errors before publishing.</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
