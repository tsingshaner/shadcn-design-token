import { expect, userEvent, waitFor, within } from 'storybook/test'

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
Side.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const page = within(canvasElement.ownerDocument.body)

  await userEvent.hover(canvas.getByRole('button', { name: 'top' }))

  await waitFor(() =>
    expect(page.getByText('Open top', { selector: '[data-slot="tooltip-content"]' })).toBeInTheDocument()
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
WithKeyboardShortcut.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await userEvent.hover(canvas.getByRole('button', { name: 'Search' }))

  const tooltip = await waitFor(() => {
    const content = canvasElement.ownerDocument.body.querySelector('[data-slot="tooltip-content"]')

    if (!(content instanceof HTMLElement)) {
      throw new Error('Tooltip content was not found.')
    }

    expect(content).toHaveTextContent('Search tokens')

    return content
  })

  await expect(tooltip).toHaveAttribute('data-slot', 'tooltip-content')
  await expect(within(tooltip).getByText('⌘K')).toHaveAttribute('data-slot', 'kbd')
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
DisabledButton.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(canvas.getByRole('button', { name: 'Publish' })).toBeDisabled()
}
