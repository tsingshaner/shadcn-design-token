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
  title: 'UI/Card'
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
