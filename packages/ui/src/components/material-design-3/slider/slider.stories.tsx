import { Volume2Icon } from 'lucide-react'
import { useState } from 'react'
import { expect, within } from 'storybook/test'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { Label } from '../../ui/label'
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
          'Material 3 Expressive slider built on Base UI. Includes standard, centered, range, discrete, icon, size, and orientation variants from the [Material 3 Slider specs](https://m3.material.io/components/sliders/specs).'
      }
    }
  },
  tags: ['autodocs'],
  title: 'Material Design 3/Slider'
} satisfies Meta<typeof Slider>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <div className="w-80">
      <Slider {...args} />
    </div>
  )
}
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(canvas.getByRole('slider', { hidden: true })).toHaveAttribute('aria-valuenow', '50')
}

export const Sizes: Story = {
  render: () => (
    <div className="grid w-80 gap-6">
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <div className="grid gap-2" key={size}>
          <Label className="uppercase" htmlFor={`slider-${size}`}>
            {size}
          </Label>
          <Slider aria-label={`${size} slider`} defaultValue={50} id={`slider-${size}`} size={size} />
        </div>
      ))}
    </div>
  )
}
Sizes.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(canvas.getAllByRole('slider', { hidden: true })).toHaveLength(5)
}

export const Centered: Story = {
  render: () => (
    <div className="grid w-80 gap-8">
      <Slider aria-label="Negative value" defaultValue={-40} max={100} min={-100} variant="centered" />
      <Slider aria-label="Positive value" defaultValue={40} max={100} min={-100} variant="centered" />
    </div>
  )
}
Centered.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const thumbs = canvas.getAllByRole('slider', { hidden: true })

  await expect(thumbs[0]).toHaveAttribute('aria-valuenow', '-40')
  await expect(thumbs[1]).toHaveAttribute('aria-valuenow', '40')
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
  render: (args) => (
    <div className="w-80">
      <Slider aria-label="Volume" {...args} />
    </div>
  )
}
Range.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const thumbs = canvas.getAllByRole('slider', { hidden: true })

  await expect(thumbs).toHaveLength(2)
  await expect(thumbs[0]).toHaveAttribute('aria-valuenow', '25')
  await expect(thumbs[1]).toHaveAttribute('aria-valuenow', '50')
}

export const RangePositions: Story = {
  render: () => (
    <div className="grid w-80 gap-8">
      <Slider aria-label="Collapsed range" defaultValue={[0, 0]} max={100} min={-100} />
      <Slider aria-label="Negative range" defaultValue={[-50, 0]} max={100} min={-100} />
      <Slider aria-label="Positive range" defaultValue={[0, 50]} max={100} min={-100} />
    </div>
  )
}
RangePositions.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(canvas.getAllByRole('slider', { hidden: true })).toHaveLength(6)
}

export const Discrete: Story = {
  render: () => (
    <div className="w-80">
      <Slider aria-label="Discrete value" defaultValue={40} max={100} min={0} showStops showValueIndicator step={20} />
    </div>
  )
}
Discrete.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(canvas.getByRole('slider', { hidden: true })).toHaveAttribute('aria-valuenow', '40')
  await expect(canvasElement.querySelectorAll('[data-slot="slider-stop"]')).toHaveLength(6)
  await expect(canvasElement.querySelector('[data-slot="slider-value-indicator"]')).toHaveTextContent('40')
}

export const WithIcon: Story = {
  render: () => (
    <div className="grid w-80 gap-8">
      {(['md', 'lg', 'xl'] as const).map((size) => (
        <Slider
          aria-label={`${size} volume`}
          defaultValue={60}
          icon={<Volume2Icon aria-hidden="true" />}
          key={size}
          size={size}
        />
      ))}
    </div>
  )
}
WithIcon.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(canvas.getAllByRole('slider', { hidden: true })).toHaveLength(3)
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
  render: () => (
    <div className="w-80">
      <Slider defaultValue={[10, 20, 70]} max={100} step={10} />
    </div>
  )
}
MultipleThumbs.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(canvas.getAllByRole('slider', { hidden: true })).toHaveLength(3)
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
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <Slider
          aria-label={`${size} vertical slider`}
          defaultValue={50}
          key={size}
          orientation="vertical"
          size={size}
        />
      ))}
    </div>
  )
}
Vertical.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  for (const slider of canvas.getAllByRole('slider', { hidden: true })) {
    await expect(slider).toHaveAttribute('aria-orientation', 'vertical')
  }
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
  render: (args) => (
    <div className="w-80">
      <Slider aria-label="Disabled volume" {...args} />
    </div>
  )
}
Disabled.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(canvas.getByRole('group', { name: 'Disabled volume' })).toHaveAttribute('data-disabled')
  await expect(canvas.getByRole('slider', { hidden: true })).toBeDisabled()
}
