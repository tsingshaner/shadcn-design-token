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

export const Default: Story = {
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
