import { expect, within } from 'storybook/test'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { LoadingIndicator } from './loading-indicator'

const meta = {
  args: {
    'aria-label': 'Loading'
  },
  component: LoadingIndicator,
  parameters: {
    docs: {
      description: {
        component: 'Material Design 3 expressive loading indicator with a seven-shape morph animation.'
      }
    }
  },
  tags: ['autodocs'],
  title: 'Material Design 3/Loading Indicator'
} satisfies Meta<typeof LoadingIndicator>

export default meta

type Story = StoryObj<typeof meta>

export const WithoutContainer: Story = {}
WithoutContainer.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(canvas.getByRole('progressbar', { name: 'Loading' })).not.toHaveAttribute('aria-valuenow')
}

export const WithContainer: Story = {
  args: {
    showContainer: true
  }
}
WithContainer.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(canvas.getByRole('progressbar', { name: 'Loading' })).toHaveClass('bg-primary/10')
}
