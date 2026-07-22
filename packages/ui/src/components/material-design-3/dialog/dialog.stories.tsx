import { expect, userEvent, within } from 'storybook/test'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { Label } from '../../ui/label'
import { Button } from '../button'
import { Input } from '../input'
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
          'Material Design 3 basic dialog with a 28dp shape, 280–560dp width, and MD3 action buttons. See the [MD3 dialog specification](https://m3.material.io/components/dialogs/specs). For an awaitable confirmation flow, use [ConfirmDialog](?path=/docs/material-design-3-confirmdialog--docs).'
      }
    }
  },
  tags: ['autodocs'],
  title: 'Material Design 3/Dialog'
} satisfies Meta<typeof Dialog>

export default meta

type Story = StoryObj<typeof meta>
const dialogCopy = ['overview', 'setup', 'permissions', 'sharing', 'review']

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Basic dialog with start-aligned copy and trailing Material Design 3 actions.'
      }
    }
  },
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>Share</DialogTrigger>
      <DialogContent>
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
        <DialogFooter>
          <DialogClose render={<Button type="button" variant="ghost" />}>Close</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const page = within(canvasElement.ownerDocument.body)

  await expect(canvas.getByRole('button', { name: 'Share' })).toHaveClass('cn-button', 'cn-button-variant-outline')
  await userEvent.click(canvas.getByRole('button', { name: 'Share' }))

  await expect(await page.findByRole('dialog', { name: 'Share link' })).toHaveAttribute('data-slot', 'dialog-content')
  await expect(page.getByDisplayValue('https://ui.shadcn.com/docs/installation')).toBeInTheDocument()
  await expect(page.getByRole('button', { name: 'Close' })).toHaveClass('cn-button', 'cn-button-variant-ghost')
}

export const WithCloseButton: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Basic dialogs omit the close affordance by default; enable it only when the flow requires one.'
      }
    }
  },
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>With Close Button</DialogTrigger>
      <DialogContent showCloseButton>
        <DialogHeader>
          <DialogTitle>With Close Button</DialogTitle>
          <DialogDescription>This dialog opts into a close affordance.</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
WithCloseButton.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const page = within(canvasElement.ownerDocument.body)

  await userEvent.click(canvas.getByRole('button', { name: 'With Close Button' }))

  await expect(await page.findByRole('dialog', { name: 'With Close Button' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Close' })).toHaveClass('cn-button')
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
          <DialogClose render={<Button variant="ghost" />}>Close</DialogClose>
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
