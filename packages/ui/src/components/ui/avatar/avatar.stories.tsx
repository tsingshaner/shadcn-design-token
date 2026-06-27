import type { Meta, StoryObj } from '@storybook/react-vite'

import { Avatar, AvatarFallback, AvatarImage } from './avatar'

const meta = {
  component: Avatar,
  parameters: {
    docs: {
      description: {
        component:
          'A user or entity image with a fallback for missing media. Examples and guidance reference the [shadcn/ui Avatar documentation](https://ui.shadcn.com/docs/components/base/avatar.md).'
      }
    }
  },
  tags: ['autodocs'],
  title: 'UI/Avatar'
} satisfies Meta<typeof Avatar>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Avatar>
        <AvatarImage alt="Design token author" src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>UI</AvatarFallback>
      </Avatar>
    </div>
  )
}
