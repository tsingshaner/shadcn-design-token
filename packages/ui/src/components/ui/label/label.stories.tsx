import type { Meta, StoryObj } from '@storybook/react-vite'

import { Input } from '../input'
import { Label } from './label'

const meta = {
  component: Label,
  tags: ['autodocs'],
  title: 'UI/Label'
} satisfies Meta<typeof Label>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="grid max-w-sm gap-2">
      <Label htmlFor="email">Email</Label>
      <Input id="email" placeholder="name@example.com" />
    </div>
  )
}
