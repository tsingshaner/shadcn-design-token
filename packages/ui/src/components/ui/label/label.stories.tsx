import { expect, userEvent, within } from 'storybook/test'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { Input } from '../input'
import { Label } from './label'

const meta = {
  component: Label,
  parameters: {
    docs: {
      description: {
        component:
          'An accessible text label for form controls. Examples and guidance reference the [shadcn/ui Label documentation](https://ui.shadcn.com/docs/components/base/label.md).'
      }
    }
  },
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
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const input = canvas.getByLabelText('Email')

  await userEvent.type(input, 'name@example.com')

  await expect(input).toHaveValue('name@example.com')
}
