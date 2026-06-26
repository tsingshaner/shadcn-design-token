import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../button'
import { Sonner, sonnerToast } from './sonner'

const meta = {
  component: Sonner,
  tags: ['autodocs'],
  title: 'UI/Sonner'
} satisfies Meta<typeof Sonner>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <>
      <Button onClick={() => sonnerToast.success('Token published')}>Publish</Button>
      <Sonner timeout={3000} />
    </>
  )
}
