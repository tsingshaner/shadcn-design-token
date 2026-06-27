import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from './dropdown-menu'

const meta = {
  component: DropdownMenu,
  parameters: {
    docs: {
      description: {
        component:
          'A menu of actions or navigation choices opened from a trigger. Examples and guidance reference the [shadcn/ui Dropdown Menu documentation](https://ui.shadcn.com/docs/components/base/dropdown-menu.md).'
      }
    }
  },
  tags: ['autodocs'],
  title: 'UI/DropdownMenu'
} satisfies Meta<typeof DropdownMenu>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" />}>Open</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Theme tokens</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Sync
          <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>Export</DropdownMenuItem>
        <DropdownMenuCheckboxItem defaultChecked>Show aliases</DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
