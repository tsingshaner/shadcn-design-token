import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../button'
import { Sonner, sonnerToast } from './sonner'

const meta = {
  component: Sonner,
  parameters: {
    docs: {
      description: {
        component:
          'Toast notification primitives built around the Sonner pattern. Examples and guidance reference the [shadcn/ui Sonner documentation](https://ui.shadcn.com/docs/components/base/sonner.md).'
      }
    }
  },
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
