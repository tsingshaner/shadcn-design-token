import type { Meta, StoryObj } from '@storybook/react-vite'

import { Label } from '../label'
import { Checkbox } from './checkbox'

const meta = {
  args: {
    defaultChecked: false
  },
  component: Checkbox,
  tags: ['autodocs'],
  title: 'UI/Checkbox'
} satisfies Meta<typeof Checkbox>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <div className="flex items-center gap-2">
      <Checkbox id="terms" {...args} />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  )
}

export const Checked: Story = {
  args: {
    defaultChecked: true
  },
  render: (args) => (
    <div className="flex items-center gap-2">
      <Checkbox id="checked" {...args} />
      <Label htmlFor="checked">Checked</Label>
    </div>
  )
}
