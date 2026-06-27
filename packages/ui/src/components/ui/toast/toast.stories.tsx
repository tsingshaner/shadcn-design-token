import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../button'
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
  title: 'UI/Toast'
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
