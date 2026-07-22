import { expect, within } from 'storybook/test'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../button'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card'

const meta = {
  component: Card,
  parameters: {
    docs: {
      description: {
        component:
          'A flexible container for grouped content and actions. Examples and guidance reference the [shadcn/ui Card documentation](https://ui.shadcn.com/docs/components/base/card.md).'
      }
    }
  },
  tags: ['autodocs'],
  title: 'Material Design 3/Card'
} satisfies Meta<typeof Card>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>Project activity</CardTitle>
        <CardDescription>Latest design-token sync summary.</CardDescription>
        <CardAction>
          <Button size="sm" variant="outline">
            View
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm">12 tokens updated and 4 components rebuilt.</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Open report</Button>
      </CardFooter>
    </Card>
  )
}
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(canvas.getByText('Project activity')).toHaveAttribute('data-slot', 'card-title')
  await expect(canvas.getByText('Latest design-token sync summary.')).toHaveAttribute('data-slot', 'card-description')
  await expect(canvas.getByRole('button', { name: 'Open report' })).toBeEnabled()
}

export const Size: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Control card width with layout classes. Reference: [shadcn/ui Card Size example](https://ui.shadcn.com/docs/components/base/card.md#size)'
      }
    }
  },
  render: () => (
    <div className="grid gap-4 sm:grid-cols-2">
      <Card className="max-w-xs">
        <CardHeader>
          <CardTitle>Small card</CardTitle>
          <CardDescription>Compact summary content.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">Best for side panels and short metadata.</p>
        </CardContent>
      </Card>
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Large card</CardTitle>
          <CardDescription>More room for supporting detail.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">Useful for dashboards and report previews.</p>
        </CardContent>
      </Card>
    </div>
  )
}

export const Spacing: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Adjust card spacing with padding and gap utilities. Reference: [shadcn/ui Card Spacing example](https://ui.shadcn.com/docs/components/base/card.md#spacing)'
      }
    }
  },
  render: () => (
    <Card className="max-w-sm gap-3 py-4">
      <CardHeader className="px-4">
        <CardTitle>Compact spacing</CardTitle>
        <CardDescription>Reduced vertical rhythm for dense interfaces.</CardDescription>
      </CardHeader>
      <CardContent className="px-4">
        <p className="text-muted-foreground text-sm">The card keeps the same structure with tighter padding.</p>
      </CardContent>
    </Card>
  )
}

export const Image: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Place image media inside a card before the content stack. Reference: [shadcn/ui Card Image example](https://ui.shadcn.com/docs/components/base/card.md#image)'
      }
    }
  },
  render: () => (
    <Card className="max-w-sm overflow-hidden pt-0">
      <img
        alt="Abstract token preview"
        className="aspect-video w-full object-cover"
        src="https://images.unsplash.com/photo-1557682250-33bd709cbe85?auto=format&fit=crop&w=900&q=80"
      />
      <CardHeader>
        <CardTitle>Token preview</CardTitle>
        <CardDescription>Visual snapshot for the current theme.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm">Use media cards for previews, reports, and galleries.</p>
      </CardContent>
    </Card>
  )
}
Image.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(canvas.getByRole('img', { name: 'Abstract token preview' })).toBeVisible()
  await expect(canvas.getByText('Token preview')).toHaveAttribute('data-slot', 'card-title')
}
