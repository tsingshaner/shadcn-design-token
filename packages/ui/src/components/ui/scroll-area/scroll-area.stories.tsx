import type { Meta, StoryObj } from '@storybook/react-vite'

import { Separator } from '../separator'
import { ScrollArea } from './scroll-area'

const meta = {
  component: ScrollArea,
  tags: ['autodocs'],
  title: 'UI/ScrollArea'
} satisfies Meta<typeof ScrollArea>

export default meta

type Story = StoryObj<typeof meta>

const tags = Array.from({ length: 24 }, (_, index) => `Token ${index + 1}`)

export const Default: Story = {
  render: () => (
    <ScrollArea className="h-72 w-48 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 font-medium text-sm leading-none">Tokens</h4>
        {tags.map((tag) => (
          <div key={tag}>
            <div className="py-2 text-sm">{tag}</div>
            <Separator />
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}
