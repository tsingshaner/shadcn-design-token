import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../button'
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from './item'

const meta = {
  component: Item,
  parameters: {
    docs: {
      description: {
        component:
          'A structured row primitive for repeated lists, settings, and menu-like content. Examples and guidance reference the [shadcn/ui Item documentation](https://ui.shadcn.com/docs/components/base/item.md).'
      }
    }
  },
  tags: ['autodocs'],
  title: 'UI/Item'
} satisfies Meta<typeof Item>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Item className="max-w-lg">
      <ItemMedia>UI</ItemMedia>
      <ItemContent>
        <ItemTitle>Component tokens</ItemTitle>
        <ItemDescription>Reusable variables for button, card, input, and overlay surfaces.</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button size="sm" variant="outline">
          Open
        </Button>
      </ItemActions>
    </Item>
  )
}
