import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../button'
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from './empty'

const meta = {
  component: Empty,
  parameters: {
    docs: {
      description: {
        component:
          'A placeholder state for views without content or results. Examples and guidance reference the [shadcn/ui Empty documentation](https://ui.shadcn.com/docs/components/base/empty.md).'
      }
    }
  },
  tags: ['autodocs'],
  title: 'UI/Empty'
} satisfies Meta<typeof Empty>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Empty>
      <EmptyMedia>0</EmptyMedia>
      <EmptyHeader>
        <EmptyTitle>No tokens found</EmptyTitle>
        <EmptyDescription>Create a token set to start generating component themes.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button>Create token set</Button>
      </EmptyContent>
    </Empty>
  )
}
