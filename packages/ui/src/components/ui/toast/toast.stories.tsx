import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../button'
import { Toaster, toast } from './toast'

const meta = {
  component: Toaster,
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
