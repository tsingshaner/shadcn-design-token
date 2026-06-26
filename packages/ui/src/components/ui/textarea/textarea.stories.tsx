import type { Meta, StoryObj } from '@storybook/react-vite'

import { Textarea } from './textarea'

const meta = {
  args: {
    placeholder: 'Type your message here.'
  },
  component: Textarea,
  tags: ['autodocs'],
  title: 'UI/Textarea'
} satisfies Meta<typeof Textarea>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'Disabled textarea'
  }
}
