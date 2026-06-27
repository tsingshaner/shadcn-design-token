import type { Meta, StoryObj } from '@storybook/react-vite'

import { Slider } from './slider'

const meta = {
  args: {
    defaultValue: 50,
    max: 100,
    step: 1
  },
  component: Slider,
  parameters: {
    docs: {
      description: {
        component:
          'A range input for choosing numeric values. Examples and guidance reference the [shadcn/ui Slider documentation](https://ui.shadcn.com/docs/components/base/slider.md).'
      }
    }
  },
  tags: ['autodocs'],
  title: 'UI/Slider'
} satisfies Meta<typeof Slider>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => <Slider className="max-w-sm" {...args} />
}

export const Range: Story = {
  args: {
    defaultValue: 40,
    max: 100,
    min: 0,
    step: 10
  },
  parameters: {
    docs: {
      description: {
        story:
          'Set min, max, and step to constrain the selected range. Reference: [shadcn/ui Slider Range example](https://ui.shadcn.com/docs/components/base/slider.md#range)'
      }
    }
  },
  render: (args) => <Slider aria-label="Volume" className="max-w-sm" {...args} />
}

export const Disabled: Story = {
  args: {
    defaultValue: 70,
    disabled: true,
    max: 100,
    step: 1
  },
  parameters: {
    docs: {
      description: {
        story:
          'Use disabled to show a read-only slider state. Reference: [shadcn/ui Slider Disabled example](https://ui.shadcn.com/docs/components/base/slider.md#disabled)'
      }
    }
  },
  render: (args) => <Slider aria-label="Disabled volume" className="max-w-sm" {...args} />
}
