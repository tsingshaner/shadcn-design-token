import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../button'
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
  title: 'UI/Drawer'
} satisfies Meta<typeof Drawer>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger render={<Button variant="outline" />}>Open drawer</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Edit token set</DrawerTitle>
          <DrawerDescription>Adjust the token set metadata before syncing.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose render={<Button variant="outline" />}>Cancel</DrawerClose>
          <Button>Save</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
