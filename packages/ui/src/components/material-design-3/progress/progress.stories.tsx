import { useState } from 'react'
import { expect, within } from 'storybook/test'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { Slider } from '../slider'
import { Progress, ProgressLabel, ProgressValue } from './progress'

const meta = {
  args: {
    shape: 'flat',
    showTrack: true,
    thickness: 4,
    value: 66,
    variant: 'linear'
  },
  argTypes: {
    shape: { control: 'select', options: ['flat', 'wave'] },
    thickness: { control: 'select', options: [4, 8] },
    variant: { control: 'select', options: ['linear', 'circular'] }
  },
  component: Progress,
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    )
  ],
  parameters: {
    docs: {
      description: {
        component:
          'A visual indicator for task completion or loading progress. Examples and guidance reference the [shadcn/ui Progress documentation](https://ui.shadcn.com/docs/components/base/progress.md).'
      }
    }
  },
  tags: ['autodocs'],
  title: 'Material Design 3/Progress'
} satisfies Meta<typeof Progress>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(canvas.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '66')
}

export const Indeterminate: Story = {
  args: {
    value: null
  }
}
Indeterminate.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(canvas.getByRole('progressbar')).not.toHaveAttribute('aria-valuenow')
}

export const Variants: Story = {
  render: () => (
    <div className="grid gap-6">
      {(['linear', 'circular'] as const).flatMap((variant) =>
        (['flat', 'wave'] as const).flatMap((shape) =>
          ([4, 8] as const).flatMap((thickness) =>
            ([66, null] as const).map((value) => (
              <div className="grid gap-2" key={`${variant}-${shape}-${thickness}-${value}`}>
                <span className="text-muted-foreground text-xs">
                  {variant} · {shape} · {thickness}px · {value === null ? 'indeterminate' : 'determinate'}
                </span>
                <Progress
                  aria-label={`${variant} ${shape}`}
                  shape={shape}
                  thickness={thickness}
                  value={value}
                  variant={variant}
                />
              </div>
            ))
          )
        )
      )}
    </div>
  )
}

export const NoTrack: Story = {
  args: {
    showTrack: false,
    value: null,
    variant: 'circular'
  }
}

export const Label: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use ProgressLabel and ProgressValue to add a label and value display. Reference: [shadcn/ui Progress Label example](https://ui.shadcn.com/docs/components/base/progress.md#label)'
      }
    }
  },
  render: () => (
    <Progress className="w-full max-w-sm" value={56}>
      <div className="flex items-center justify-between gap-2">
        <ProgressLabel>Upload progress</ProgressLabel>
        <ProgressValue />
      </div>
    </Progress>
  )
}
Label.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(canvas.getByText('Upload progress')).toHaveAttribute('data-slot', 'progress-label')
  await expect(canvas.getByText('56%')).toHaveAttribute('data-slot', 'progress-value')
}

export const Controlled: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Control Progress from another input such as Slider. Reference: [shadcn/ui Progress Controlled example](https://ui.shadcn.com/docs/components/base/progress.md#controlled)'
      }
    }
  },
  render: function ControlledProgress() {
    const [value, setValue] = useState(50)

    return (
      <div className="flex w-full max-w-sm flex-col gap-4">
        <Progress value={value} />
        <Slider
          max={100}
          min={0}
          onValueChange={(nextValue) => setValue(Array.isArray(nextValue) ? nextValue[0] : nextValue)}
          step={1}
          value={value}
        />
      </div>
    )
  }
}
