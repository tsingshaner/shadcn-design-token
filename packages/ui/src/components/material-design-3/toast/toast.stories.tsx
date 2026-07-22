import { expect, userEvent, within } from 'storybook/test'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../../ui/button'
import { Toaster, toast } from './toast'

const meta = {
  component: Toaster,
  parameters: {
    docs: {
      description: {
        component:
          'A transient notification pattern for user feedback. Examples and guidance reference the [shadcn/ui Toast documentation](https://ui.shadcn.com/docs/components/base/toast.md).'
      }
    }
  },
  tags: ['autodocs'],
  title: 'Material Design 3/Toast'
} satisfies Meta<typeof Toaster>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <>
      <Button onClick={() => toast.success('Token sync completed')}>Show toast</Button>
      <Toaster timeout={3000} />
    </>
  )
}
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const page = within(canvasElement.ownerDocument.body)

  await userEvent.click(canvas.getByRole('button', { name: 'Show toast' }))

  await expect(await page.findByText('Token sync completed')).toHaveAttribute('data-slot', 'toast-description')
  await expect(page.getByTestId('toast-viewport-top-right')).toHaveAttribute('data-slot', 'toast-viewport')
}
