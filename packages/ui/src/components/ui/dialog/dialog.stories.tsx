import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from './dialog'

const meta = {
  component: Dialog,
  parameters: {
    docs: {
      description: {
        component:
          'A modal layer for focused tasks, forms, and supporting content. Examples and guidance reference the [shadcn/ui Dialog documentation](https://ui.shadcn.com/docs/components/base/dialog.md).'
      }
    }
  },
  tags: ['autodocs'],
  title: 'UI/Dialog'
} satisfies Meta<typeof Dialog>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button />}>Open dialog</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit token set</DialogTitle>
          <DialogDescription>Update token metadata before publishing the package.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
          <Button>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
