import type { Meta, StoryObj } from '@storybook/react-vite'

import { Slider } from './slider'

const meta = {
  args: {
    defaultValue: 50,
    max: 100,
    step: 1
  },
  component: Slider,
  tags: ['autodocs'],
  title: 'UI/Slider'
} satisfies Meta<typeof Slider>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => <Slider className="max-w-sm" {...args} />
}
