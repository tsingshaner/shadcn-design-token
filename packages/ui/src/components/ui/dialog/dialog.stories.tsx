import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../button'
import { Input } from '../input'
import { Label } from '../label'
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
const dialogCopy = ['overview', 'setup', 'permissions', 'sharing', 'review']

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Replace the default close control with your own button. Reference: [shadcn/ui Dialog Custom Close Button example](https://ui.shadcn.com/docs/components/base/dialog.md#custom-close-button)'
      }
    }
  },
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>Share</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>Anyone who has this link will be able to view this.</DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <div className="grid flex-1 gap-2">
            <Label className="sr-only" htmlFor="link">
              Link
            </Label>
            <Input defaultValue="https://ui.shadcn.com/docs/installation" id="link" readOnly />
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose render={<Button type="button" />}>Close</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export const NoCloseButton: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use showCloseButton={false} to hide the close button. Reference: [shadcn/ui Dialog No Close Button example](https://ui.shadcn.com/docs/components/base/dialog.md#no-close-button)'
      }
    }
  },
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>No Close Button</DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>No Close Button</DialogTitle>
          <DialogDescription>This dialog doesn&apos;t have a close button in the top-right corner.</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export const StickyFooter: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Keep actions visible while dialog content scrolls. Reference: [shadcn/ui Dialog Sticky Footer example](https://ui.shadcn.com/docs/components/base/dialog.md#sticky-footer)'
      }
    }
  },
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>Sticky Footer</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sticky Footer</DialogTitle>
          <DialogDescription>
            This dialog has a sticky footer that stays visible while content scrolls.
          </DialogDescription>
        </DialogHeader>
        <div className="-mx-4 max-h-[50vh] overflow-y-auto px-4">
          {dialogCopy.map((section) => (
            <p className="mb-4 leading-normal" key={section}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </p>
          ))}
        </div>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>Close</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export const ScrollableContent: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Long content can scroll while the header stays in view. Reference: [shadcn/ui Dialog Scrollable Content example](https://ui.shadcn.com/docs/components/base/dialog.md#scrollable-content)'
      }
    }
  },
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>Scrollable Content</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Scrollable Content</DialogTitle>
          <DialogDescription>This is a dialog with scrollable content.</DialogDescription>
        </DialogHeader>
        <div className="-mx-4 max-h-[50vh] overflow-y-auto px-4">
          {dialogCopy.map((section) => (
            <p className="mb-4 leading-normal" key={`scroll-${section}`}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </p>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
