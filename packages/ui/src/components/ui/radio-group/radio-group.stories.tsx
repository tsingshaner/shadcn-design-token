import type { Meta, StoryObj } from '@storybook/react-vite'

import { Label } from '../label'
import { RadioGroup, RadioGroupItem } from './radio-group'

const meta = {
  component: RadioGroup,
  tags: ['autodocs'],
  title: 'UI/RadioGroup'
} satisfies Meta<typeof RadioGroup>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="comfortable">
      <div className="flex items-center gap-2">
        <RadioGroupItem id="default" value="default" />
        <Label htmlFor="default">Default</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem id="comfortable" value="comfortable" />
        <Label htmlFor="comfortable">Comfortable</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem id="compact" value="compact" />
        <Label htmlFor="compact">Compact</Label>
      </div>
    </RadioGroup>
  )
}
