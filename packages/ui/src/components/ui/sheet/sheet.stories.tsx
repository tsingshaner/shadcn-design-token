import { expect, userEvent, within } from 'storybook/test'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from './sheet'

const meta = {
  component: Sheet,
  parameters: {
    docs: {
      description: {
        component:
          'A side panel dialog for secondary workflows and forms. Examples and guidance reference the [shadcn/ui Sheet documentation](https://ui.shadcn.com/docs/components/base/sheet.md).'
      }
    }
  },
  tags: ['autodocs'],
  title: 'UI/Sheet'
} satisfies Meta<typeof Sheet>

export default meta

type Story = StoryObj<typeof meta>
const sheetSides = ['top', 'right', 'bottom', 'left'] as const
const sheetCopy = ['profile', 'preferences', 'notifications', 'security']

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use the side prop on SheetContent to set the edge where the sheet appears. Reference: [shadcn/ui Sheet Side example](https://ui.shadcn.com/docs/components/base/sheet.md#side)'
      }
    }
  },
  render: () => (
    <div className="flex flex-wrap gap-2">
      {sheetSides.map((side) => (
        <Sheet key={side}>
          <SheetTrigger render={<Button className="capitalize" variant="outline" />}>{side}</SheetTrigger>
          <SheetContent className="data-[side=bottom]:max-h-[50vh] data-[side=top]:max-h-[50vh]" side={side}>
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>Make changes to your profile here. Click save when you&apos;re done.</SheetDescription>
            </SheetHeader>
            <div className="overflow-y-auto px-4">
              {sheetCopy.map((section) => (
                <p className="mb-2 leading-relaxed" key={section}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua.
                </p>
              ))}
            </div>
            <SheetFooter>
              <Button type="submit">Save changes</Button>
              <SheetClose render={<Button variant="outline" />}>Cancel</SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  )
}
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const page = within(canvasElement.ownerDocument.body)

  await userEvent.click(canvas.getByRole('button', { name: 'right' }))

  await expect(await page.findByRole('dialog', { name: 'Edit profile' })).toHaveAttribute('data-side', 'right')
  await expect(page.getByRole('button', { name: 'Save changes' })).toBeEnabled()
}

export const NoCloseButton: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use showCloseButton={false} to hide the close button. Reference: [shadcn/ui Sheet No Close Button example](https://ui.shadcn.com/docs/components/base/sheet.md#no-close-button)'
      }
    }
  },
  render: () => (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>Open sheet</SheetTrigger>
      <SheetContent showCloseButton={false}>
        <SheetHeader>
          <SheetTitle>No Close Button</SheetTitle>
          <SheetDescription>
            This sheet doesn&apos;t have a close button in the top-right corner. Click outside to close.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
NoCloseButton.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const page = within(canvasElement.ownerDocument.body)

  await userEvent.click(canvas.getByRole('button', { name: 'Open sheet' }))

  await expect(await page.findByRole('dialog', { name: 'No Close Button' })).toBeInTheDocument()
  await expect(page.queryByRole('button', { name: 'Close' })).not.toBeInTheDocument()
}
