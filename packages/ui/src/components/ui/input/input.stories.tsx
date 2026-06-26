import type { Meta, StoryObj } from '@storybook/react-vite'

import { Input } from './input'

const meta = {
  args: {
    placeholder: 'Email'
  },
  component: Input,
  tags: ['autodocs'],
  title: 'UI/Input'
} satisfies Meta<typeof Input>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'disabled@example.com'
  }
}
