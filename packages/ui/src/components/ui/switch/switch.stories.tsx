import type { Meta, StoryObj } from '@storybook/react-vite'

import { Label } from '../label'
import { Switch } from './switch'

const meta = {
  args: {
    defaultChecked: false
  },
  component: Switch,
  tags: ['autodocs'],
  title: 'UI/Switch'
} satisfies Meta<typeof Switch>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <div className="flex items-center gap-2">
      <Switch id="airplane-mode" {...args} />
      <Label htmlFor="airplane-mode">Airplane mode</Label>
    </div>
  )
}

export const Checked: Story = {
  args: {
    defaultChecked: true
  },
  render: (args) => (
    <div className="flex items-center gap-2">
      <Switch id="notifications" {...args} />
      <Label htmlFor="notifications">Notifications</Label>
    </div>
  )
}
