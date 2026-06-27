import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { Label } from '../label'
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
    defaultValue: [25, 50],
    max: 100,
    min: 0,
    step: 5
  },
  parameters: {
    docs: {
      description: {
        story:
          'Use an array with two values for a range slider. Reference: [shadcn/ui Slider Range example](https://ui.shadcn.com/docs/components/base/slider.md#range)'
      }
    }
  },
  render: (args) => <Slider aria-label="Volume" className="max-w-sm" {...args} />
}

export const MultipleThumbs: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use an array with multiple values for multiple thumbs. Reference: [shadcn/ui Slider Multiple Thumbs example](https://ui.shadcn.com/docs/components/base/slider.md#multiple-thumbs)'
      }
    }
  },
  render: () => <Slider className="max-w-sm" defaultValue={[10, 20, 70]} max={100} step={10} />
}

export const Vertical: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use orientation="vertical" for vertical sliders. Reference: [shadcn/ui Slider Vertical example](https://ui.shadcn.com/docs/components/base/slider.md#vertical)'
      }
    }
  },
  render: () => (
    <div className="flex h-40 w-full max-w-sm items-center justify-center gap-6">
      <Slider defaultValue={50} max={100} orientation="vertical" step={1} />
      <Slider defaultValue={25} max={100} orientation="vertical" step={1} />
    </div>
  )
}

export const Controlled: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use value and onValueChange for a controlled slider. Reference: [shadcn/ui Slider Controlled example](https://ui.shadcn.com/docs/components/base/slider.md#controlled)'
      }
    }
  },
  render: function ControlledSlider() {
    const [value, setValue] = useState<readonly number[]>([0.3, 0.7])

    return (
      <div className="grid w-full max-w-sm gap-3">
        <div className="flex items-center justify-between gap-2">
          <Label htmlFor="slider-controlled">Temperature</Label>
          <span className="text-muted-foreground text-sm">{value.join(', ')}</span>
        </div>
        <Slider
          id="slider-controlled"
          max={1}
          min={0}
          onValueChange={(nextValue) => setValue(Array.isArray(nextValue) ? nextValue : [nextValue])}
          step={0.1}
          value={value}
        />
      </div>
    )
  }
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
