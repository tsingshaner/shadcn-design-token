import { expect, fireEvent, userEvent, within } from 'storybook/test'

import type { Meta, StoryObj } from '@storybook/react-vite'
import type { SVGProps } from 'react'

import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger
} from './context-menu'

type IconProps = SVGProps<SVGSVGElement>

const CopyIcon = (props: IconProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    {...props}
  >
    <rect height="13" rx="2" width="13" x="9" y="9" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
)

const DownloadIcon = (props: IconProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M12 3v12" />
    <path d="m7 10 5 5 5-5" />
    <path d="M5 21h14" />
  </svg>
)

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

const TriggerArea = ({ children = 'Right click here' }: { children?: string }) => (
  <ContextMenuTrigger className="flex h-36 w-64 items-center justify-center rounded-md border border-dashed text-sm">
    {children}
  </ContextMenuTrigger>
)

export const Basic: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Basic context menu opened from a contextual trigger area. Reference: [shadcn/ui Context Menu Basic example](https://ui.shadcn.com/docs/components/base/context-menu.md#basic)'
      }
    }
  },
  render: () => (
    <ContextMenu>
      <TriggerArea />
      <ContextMenuContent>
        <ContextMenuLabel>Token</ContextMenuLabel>
        <ContextMenuSeparator />
        <ContextMenuItem>Rename</ContextMenuItem>
        <ContextMenuItem>Duplicate</ContextMenuItem>
        <ContextMenuItem>Delete</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
Basic.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const page = within(canvasElement.ownerDocument.body)

  fireEvent.contextMenu(canvas.getByText('Right click here'))

  await expect(await page.findByText('Token')).toHaveAttribute('data-slot', 'context-menu-label')
  await expect(page.getByText('Rename')).toHaveAttribute('data-slot', 'context-menu-item')
}

export const Submenu: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use ContextMenuSub for nested actions. Reference: [shadcn/ui Context Menu Submenu example](https://ui.shadcn.com/docs/components/base/context-menu.md#submenu)'
      }
    }
  },
  render: () => (
    <ContextMenu>
      <TriggerArea />
      <ContextMenuContent>
        <ContextMenuItem>Rename</ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger>Export as</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem>CSS variables</ContextMenuItem>
            <ContextMenuItem>JSON tokens</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
      </ContextMenuContent>
    </ContextMenu>
  )
}
Submenu.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const page = within(canvasElement.ownerDocument.body)

  fireEvent.contextMenu(canvas.getByText('Right click here'))
  await userEvent.hover(await page.findByText('Export as'))

  await expect(await page.findByText('JSON tokens')).toHaveAttribute('data-slot', 'context-menu-item')
}

export const Shortcuts: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Add shortcut hints to context menu items. Reference: [shadcn/ui Context Menu Shortcuts example](https://ui.shadcn.com/docs/components/base/context-menu.md#shortcuts)'
      }
    }
  },
  render: () => (
    <ContextMenu>
      <TriggerArea />
      <ContextMenuContent>
        <ContextMenuItem>
          Rename
          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          Duplicate
          <ContextMenuShortcut>⌘D</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
Shortcuts.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const page = within(canvasElement.ownerDocument.body)

  fireEvent.contextMenu(canvas.getByText('Right click here'))

  await expect(await page.findByText('⌘R')).toHaveAttribute('data-slot', 'context-menu-shortcut')
  await expect(page.getByText('⌘D')).toHaveAttribute('data-slot', 'context-menu-shortcut')
}

export const Groups: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use groups and separators for related menu sections. Reference: [shadcn/ui Context Menu Groups example](https://ui.shadcn.com/docs/components/base/context-menu.md#groups)'
      }
    }
  },
  render: () => (
    <ContextMenu>
      <TriggerArea />
      <ContextMenuContent>
        <ContextMenuGroup>
          <ContextMenuItem>Rename</ContextMenuItem>
          <ContextMenuItem>Duplicate</ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuItem>Export</ContextMenuItem>
          <ContextMenuItem>Archive</ContextMenuItem>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export const Icons: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use icons to make common actions easier to scan. Reference: [shadcn/ui Context Menu Icons example](https://ui.shadcn.com/docs/components/base/context-menu.md#icons)'
      }
    }
  },
  render: () => (
    <ContextMenu>
      <TriggerArea />
      <ContextMenuContent>
        <ContextMenuItem>
          <CopyIcon />
          Copy
        </ContextMenuItem>
        <ContextMenuItem>
          <DownloadIcon />
          Export
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export const Checkboxes: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use checkbox items for contextual display toggles. Reference: [shadcn/ui Context Menu Checkboxes example](https://ui.shadcn.com/docs/components/base/context-menu.md#checkboxes)'
      }
    }
  },
  render: () => (
    <ContextMenu>
      <TriggerArea />
      <ContextMenuContent>
        <ContextMenuCheckboxItem defaultChecked>Show aliases</ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem>Show deprecated tokens</ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem defaultChecked>Show resolved values</ContextMenuCheckboxItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
Checkboxes.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const page = within(canvasElement.ownerDocument.body)

  fireEvent.contextMenu(canvas.getByText('Right click here'))

  await expect(await page.findByRole('menuitemcheckbox', { name: 'Show aliases' })).toHaveAttribute(
    'aria-checked',
    'true'
  )
  await expect(page.getByRole('menuitemcheckbox', { name: 'Show deprecated tokens' })).toHaveAttribute(
    'aria-checked',
    'false'
  )
}

export const Radio: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use radio items for mutually exclusive contextual choices. Reference: [shadcn/ui Context Menu Radio example](https://ui.shadcn.com/docs/components/base/context-menu.md#radio)'
      }
    }
  },
  render: () => (
    <ContextMenu>
      <TriggerArea />
      <ContextMenuContent>
        <ContextMenuRadioGroup defaultValue="comfortable">
          <ContextMenuRadioItem value="compact">Compact</ContextMenuRadioItem>
          <ContextMenuRadioItem value="comfortable">Comfortable</ContextMenuRadioItem>
          <ContextMenuRadioItem value="spacious">Spacious</ContextMenuRadioItem>
        </ContextMenuRadioGroup>
      </ContextMenuContent>
    </ContextMenu>
  )
}
Radio.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const page = within(canvasElement.ownerDocument.body)

  fireEvent.contextMenu(canvas.getByText('Right click here'))

  await expect(await page.findByRole('menuitemradio', { name: 'Comfortable' })).toHaveAttribute('aria-checked', 'true')
  await expect(page.getByRole('menuitemradio', { name: 'Compact' })).toHaveAttribute('aria-checked', 'false')
}

export const Destructive: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use destructive styling for dangerous contextual actions. Reference: [shadcn/ui Context Menu Destructive example](https://ui.shadcn.com/docs/components/base/context-menu.md#destructive)'
      }
    }
  },
  render: () => (
    <ContextMenu>
      <TriggerArea />
      <ContextMenuContent>
        <ContextMenuItem>Archive</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem className="text-destructive">Delete token set</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
Destructive.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const page = within(canvasElement.ownerDocument.body)

  fireEvent.contextMenu(canvas.getByText('Right click here'))

  await expect(await page.findByText('Delete token set')).toHaveClass('text-destructive')
}

export const Sides: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use side and align props to position context menu content. Reference: [shadcn/ui Context Menu Sides example](https://ui.shadcn.com/docs/components/base/context-menu.md#sides)'
      }
    }
  },
  render: () => (
    <ContextMenu>
      <TriggerArea>Right click for side placement</TriggerArea>
      <ContextMenuContent align="end" side="right">
        <ContextMenuItem>Right aligned</ContextMenuItem>
        <ContextMenuItem>Open details</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
Sides.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const page = within(canvasElement.ownerDocument.body)

  fireEvent.contextMenu(canvas.getByText('Right click for side placement'))

  await expect(await page.findByText('Right aligned')).toHaveAttribute('data-slot', 'context-menu-item')
  await expect(page.getByText('Open details')).toHaveAttribute('data-slot', 'context-menu-item')
}
