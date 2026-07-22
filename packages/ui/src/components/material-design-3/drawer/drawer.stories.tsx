import { expect, userEvent, within } from 'storybook/test'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { Label } from '../../ui/label'
import { Button } from '../button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../dialog'
import { Input } from '../input'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from './drawer'

const meta = {
  component: Drawer,
  parameters: {
    docs: {
      description: {
        component:
          'A panel that slides from the viewport edge for secondary tasks or forms. Examples and guidance reference the [shadcn/ui Drawer documentation](https://ui.shadcn.com/docs/components/base/drawer.md).'
      }
    }
  },
  tags: ['autodocs'],
  title: 'Material Design 3/Drawer'
} satisfies Meta<typeof Drawer>

export default meta

type Story = StoryObj<typeof meta>
const drawerSides = ['top', 'right', 'bottom', 'left'] as const
const drawerCopy = ['activity', 'distance', 'calories', 'standing', 'recovery']

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Keep actions visible while drawer content scrolls. Reference: [shadcn/ui Drawer Scrollable Content example](https://ui.shadcn.com/docs/components/base/drawer.md#scrollable-content)'
      }
    }
  },
  render: () => (
    <Drawer direction="right">
      <DrawerTrigger render={<Button variant="outline" />}>Scrollable Content</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Move Goal</DrawerTitle>
          <DrawerDescription>Set your daily activity goal.</DrawerDescription>
        </DrawerHeader>
        <div className="overflow-y-auto px-4">
          {drawerCopy.map((section) => (
            <p className="mb-4 leading-normal" key={section}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </p>
          ))}
        </div>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose render={<Button variant="outline" />}>Cancel</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const page = within(canvasElement.ownerDocument.body)

  await userEvent.click(canvas.getByRole('button', { name: 'Scrollable Content' }))

  await expect(await page.findByRole('dialog', { name: 'Move Goal' })).toHaveAttribute('data-direction', 'right')
  await expect(page.getByRole('button', { name: 'Submit' })).toBeEnabled()
}

export const Sides: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use the direction prop to set the drawer side. Reference: [shadcn/ui Drawer Sides example](https://ui.shadcn.com/docs/components/base/drawer.md#sides)'
      }
    }
  },
  render: () => (
    <div className="flex flex-wrap gap-2">
      {drawerSides.map((side) => (
        <Drawer direction={side} key={side}>
          <DrawerTrigger render={<Button className="capitalize" variant="outline" />}>{side}</DrawerTrigger>
          <DrawerContent className="data-[direction=bottom]:max-h-[50vh] data-[direction=top]:max-h-[50vh]">
            <DrawerHeader>
              <DrawerTitle>Move Goal</DrawerTitle>
              <DrawerDescription>Set your daily activity goal.</DrawerDescription>
            </DrawerHeader>
            <div className="overflow-y-auto px-4">
              {drawerCopy.map((section) => (
                <p className="mb-4 leading-normal" key={`${side}-${section}`}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua.
                </p>
              ))}
            </div>
            <DrawerFooter>
              <Button>Submit</Button>
              <DrawerClose render={<Button variant="outline" />}>Cancel</DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ))}
    </div>
  )
}

const ProfileForm = ({ className }: { className?: string }) => (
  <form className={className}>
    <div className="grid gap-3">
      <Label htmlFor="drawer-email">Email</Label>
      <Input defaultValue="shadcn@example.com" id="drawer-email" type="email" />
    </div>
    <div className="grid gap-3">
      <Label htmlFor="drawer-username">Username</Label>
      <Input defaultValue="@shadcn" id="drawer-username" />
    </div>
    <Button type="submit">Save changes</Button>
  </form>
)

export const ResponsiveDialog: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Combine Dialog and Drawer for responsive edit flows. Reference: [shadcn/ui Drawer Responsive Dialog example](https://ui.shadcn.com/docs/components/base/drawer.md#responsive-dialog)'
      }
    }
  },
  render: () => (
    <div className="grid gap-4 md:grid-cols-2">
      <Dialog>
        <DialogTrigger render={<Button variant="outline" />}>Desktop Dialog</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>Make changes to your profile here. Click save when you&apos;re done.</DialogDescription>
          </DialogHeader>
          <ProfileForm className="grid items-start gap-6" />
        </DialogContent>
      </Dialog>
      <Drawer>
        <DrawerTrigger render={<Button variant="outline" />}>Mobile Drawer</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>Edit profile</DrawerTitle>
            <DrawerDescription>Make changes to your profile here. Click save when you&apos;re done.</DrawerDescription>
          </DrawerHeader>
          <ProfileForm className="grid items-start gap-6 px-4" />
          <DrawerFooter className="pt-2">
            <DrawerClose render={<Button variant="outline" />}>Cancel</DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
ResponsiveDialog.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(canvas.getByRole('button', { name: 'Desktop Dialog' })).toBeEnabled()
  await expect(canvas.getByRole('button', { name: 'Mobile Drawer' })).toBeEnabled()
}
