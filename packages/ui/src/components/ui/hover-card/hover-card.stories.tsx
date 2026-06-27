import type { Meta, StoryObj } from '@storybook/react-vite'

import { Avatar, AvatarFallback } from '../avatar'
import { Button } from '../button'
import { HoverCard, HoverCardContent, HoverCardTrigger } from './hover-card'

const meta = {
  component: HoverCard,
  parameters: {
    docs: {
      description: {
        component:
          'A lightweight preview surface shown when hovering over related content. Examples and guidance reference the [shadcn/ui Hover Card documentation](https://ui.shadcn.com/docs/components/base/hover-card.md).'
      }
    }
  },
  tags: ['autodocs'],
  title: 'UI/HoverCard'
} satisfies Meta<typeof HoverCard>

export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Basic hover card preview for linked content. Reference: [shadcn/ui Hover Card Basic example](https://ui.shadcn.com/docs/components/base/hover-card.md#basic)'
      }
    }
  },
  render: () => (
    <HoverCard defaultOpen>
      <HoverCardTrigger render={<Button variant="link" />}>@design-tokens</HoverCardTrigger>
      <HoverCardContent>
        <div className="flex gap-4">
          <Avatar>
            <AvatarFallback>DT</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="font-semibold text-sm">@design-tokens</h4>
            <p className="text-sm">Composable primitives for token-driven interfaces.</p>
            <p className="text-muted-foreground text-xs">Created June 2026</p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}

export const Sides: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use side to control where hover card content opens. Reference: [shadcn/ui Hover Card Sides example](https://ui.shadcn.com/docs/components/base/hover-card.md#sides)'
      }
    }
  },
  render: () => (
    <div className="flex gap-6">
      {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
        <HoverCard defaultOpen={side === 'top'} key={side}>
          <HoverCardTrigger render={<Button variant="outline" />}>{side}</HoverCardTrigger>
          <HoverCardContent side={side}>
            <div className="space-y-1">
              <h4 className="font-semibold text-sm">Open {side}</h4>
              <p className="text-muted-foreground text-sm">Preview content can be placed on any side.</p>
            </div>
          </HoverCardContent>
        </HoverCard>
      ))}
    </div>
  )
}
