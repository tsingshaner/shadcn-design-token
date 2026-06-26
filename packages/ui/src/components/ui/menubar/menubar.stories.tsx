import type { Meta, StoryObj } from '@storybook/react-vite'

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger
} from './menubar'

const meta = {
  component: Menubar,
  tags: ['autodocs'],
  title: 'UI/Menubar'
} satisfies Meta<typeof Menubar>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            New token
            <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>Import</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Export</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Show aliases</MenubarItem>
          <MenubarItem>Show resolved values</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
