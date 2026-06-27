import type { Meta, StoryObj } from '@storybook/react-vite'

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger
} from './context-menu'

const meta = {
  component: ContextMenu,
  parameters: {
    docs: {
      description: {
        component:
          'A contextual action menu opened from a right-click or equivalent gesture. Examples and guidance reference the [shadcn/ui Context Menu documentation](https://ui.shadcn.com/docs/components/base/context-menu.md).'
      }
    }
  },
  tags: ['autodocs'],
  title: 'UI/ContextMenu'
} satisfies Meta<typeof ContextMenu>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-36 w-64 items-center justify-center rounded-md border border-dashed text-sm">
        Right click here
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuLabel>Token</ContextMenuLabel>
        <ContextMenuSeparator />
        <ContextMenuItem>
          Rename
          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>Duplicate</ContextMenuItem>
        <ContextMenuItem>Delete</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
