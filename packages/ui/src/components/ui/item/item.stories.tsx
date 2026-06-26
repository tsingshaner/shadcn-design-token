import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../button'
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from './item'

const meta = {
  component: Item,
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
