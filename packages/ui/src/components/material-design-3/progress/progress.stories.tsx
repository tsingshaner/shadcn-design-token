import { useState } from 'react'
import { expect, within } from 'storybook/test'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { Slider } from '../slider'
import { Progress, ProgressLabel, ProgressValue } from './progress'

const meta = {
  args: {
    value: 66
  },
  component: Progress,
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
