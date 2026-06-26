import type { Meta, StoryObj } from '@storybook/react-vite'

import { Toggle } from './toggle'

const meta = {
  args: {
    children: 'Bold'
  },
  component: Toggle,
  tags: ['autodocs'],
  title: 'UI/Toggle'
} satisfies Meta<typeof Toggle>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Outline: Story = {
  args: {
    variant: 'outline'
  }
}
