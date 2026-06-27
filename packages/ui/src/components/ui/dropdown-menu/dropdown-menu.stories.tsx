import { expect, userEvent, within } from 'storybook/test'

import type { Meta, StoryObj } from '@storybook/react-vite'
import type { SVGProps } from 'react'

import { AvatarFallback, Avatar as AvatarRoot } from '../avatar'
import { Button } from '../button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from './dropdown-menu'

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

const MenuTrigger = ({ children = 'Open' }: { children?: string }) => (
  <DropdownMenuTrigger render={<Button variant="outline" />}>{children}</DropdownMenuTrigger>
)

export const Basic: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Basic dropdown menu with grouped actions. Reference: [shadcn/ui Dropdown Menu Basic example](https://ui.shadcn.com/docs/components/base/dropdown-menu.md#basic)'
      }
    }
  },
  render: () => (
    <DropdownMenu>
      <MenuTrigger />
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>Theme tokens</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Sync</DropdownMenuItem>
          <DropdownMenuItem>Export</DropdownMenuItem>
          <DropdownMenuItem>Duplicate</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
Basic.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const page = within(canvasElement.ownerDocument.body)

  await userEvent.click(canvas.getByRole('button', { name: 'Open' }))

  await expect(await page.findByText('Theme tokens')).toHaveAttribute('data-slot', 'dropdown-menu-label')
  await expect(page.getByText('Sync')).toHaveAttribute('data-slot', 'dropdown-menu-item')
}

export const Submenu: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use DropdownMenuSub for nested action groups. Reference: [shadcn/ui Dropdown Menu Submenu example](https://ui.shadcn.com/docs/components/base/dropdown-menu.md#submenu)'
      }
    }
  },
  render: () => (
    <DropdownMenu>
      <MenuTrigger />
      <DropdownMenuContent>
        <DropdownMenuItem>Rename</DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Export as</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>CSS variables</DropdownMenuItem>
            <DropdownMenuItem>JSON tokens</DropdownMenuItem>
            <DropdownMenuItem>Tailwind theme</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
Submenu.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const page = within(canvasElement.ownerDocument.body)

  await userEvent.click(canvas.getByRole('button', { name: 'Open' }))
  await userEvent.hover(await page.findByText('Export as'))

  await expect(await page.findByText('CSS variables')).toHaveAttribute('data-slot', 'dropdown-menu-item')
}

export const Shortcuts: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use DropdownMenuShortcut for keyboard shortcut hints. Reference: [shadcn/ui Dropdown Menu Shortcuts example](https://ui.shadcn.com/docs/components/base/dropdown-menu.md#shortcuts)'
      }
    }
  },
  render: () => (
    <DropdownMenu>
      <MenuTrigger />
      <DropdownMenuContent>
        <DropdownMenuItem>
          New token
          <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          Duplicate
          <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          Export
          <DropdownMenuShortcut>⇧⌘E</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
Shortcuts.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const page = within(canvasElement.ownerDocument.body)

  await userEvent.click(canvas.getByRole('button', { name: 'Open' }))

  await expect(await page.findByText('⌘N')).toHaveAttribute('data-slot', 'dropdown-menu-shortcut')
  await expect(page.getByText('⇧⌘E')).toHaveAttribute('data-slot', 'dropdown-menu-shortcut')
}

export const Icons: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Place icons at the start of menu items for faster scanning. Reference: [shadcn/ui Dropdown Menu Icons example](https://ui.shadcn.com/docs/components/base/dropdown-menu.md#icons)'
      }
    }
  },
  render: () => (
    <DropdownMenu>
      <MenuTrigger />
      <DropdownMenuContent>
        <DropdownMenuItem>
          <CopyIcon />
          Copy
        </DropdownMenuItem>
        <DropdownMenuItem>
          <DownloadIcon />
          Export
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const Checkboxes: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use checkbox items for independent menu toggles. Reference: [shadcn/ui Dropdown Menu Checkboxes example](https://ui.shadcn.com/docs/components/base/dropdown-menu.md#checkboxes)'
      }
    }
  },
  render: () => (
    <DropdownMenu>
      <MenuTrigger />
      <DropdownMenuContent>
        <DropdownMenuCheckboxItem defaultChecked>Show aliases</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem>Show deprecated tokens</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem defaultChecked>Show resolved values</DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
Checkboxes.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const page = within(canvasElement.ownerDocument.body)

  await userEvent.click(canvas.getByRole('button', { name: 'Open' }))

  await expect(await page.findByRole('menuitemcheckbox', { name: 'Show aliases' })).toHaveAttribute(
    'aria-checked',
    'true'
  )
  await expect(page.getByRole('menuitemcheckbox', { name: 'Show deprecated tokens' })).toHaveAttribute(
    'aria-checked',
    'false'
  )
}

export const CheckboxesIcons: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Checkbox menu items include check indicators when selected. Reference: [shadcn/ui Dropdown Menu Checkboxes Icons example](https://ui.shadcn.com/docs/components/base/dropdown-menu.md#checkboxes-icons)'
      }
    }
  },
  render: () => (
    <DropdownMenu>
      <MenuTrigger />
      <DropdownMenuContent>
        <DropdownMenuCheckboxItem defaultChecked>Color</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem defaultChecked>Typography</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem>Motion</DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const RadioGroup: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use radio groups for mutually exclusive menu choices. Reference: [shadcn/ui Dropdown Menu Radio Group example](https://ui.shadcn.com/docs/components/base/dropdown-menu.md#radio-group)'
      }
    }
  },
  render: () => (
    <DropdownMenu>
      <MenuTrigger />
      <DropdownMenuContent>
        <DropdownMenuRadioGroup defaultValue="system">
          <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="system">System</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
RadioGroup.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const page = within(canvasElement.ownerDocument.body)

  await userEvent.click(canvas.getByRole('button', { name: 'Open' }))

  await expect(await page.findByRole('menuitemradio', { name: 'System' })).toHaveAttribute('aria-checked', 'true')
  await expect(page.getByRole('menuitemradio', { name: 'Dark' })).toHaveAttribute('aria-checked', 'false')
}

export const RadioIcons: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Radio menu items include an indicator for the selected value. Reference: [shadcn/ui Dropdown Menu Radio Icons example](https://ui.shadcn.com/docs/components/base/dropdown-menu.md#radio-icons)'
      }
    }
  },
  render: () => (
    <DropdownMenu>
      <MenuTrigger />
      <DropdownMenuContent>
        <DropdownMenuRadioGroup defaultValue="comfortable">
          <DropdownMenuRadioItem value="compact">Compact</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="comfortable">Comfortable</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="spacious">Spacious</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const Destructive: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use destructive styling for dangerous menu actions. Reference: [shadcn/ui Dropdown Menu Destructive example](https://ui.shadcn.com/docs/components/base/dropdown-menu.md#destructive)'
      }
    }
  },
  render: () => (
    <DropdownMenu>
      <MenuTrigger />
      <DropdownMenuContent>
        <DropdownMenuItem>Archive</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive">Delete token set</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
Destructive.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const page = within(canvasElement.ownerDocument.body)

  await userEvent.click(canvas.getByRole('button', { name: 'Open' }))

  await expect(await page.findByText('Delete token set')).toHaveClass('text-destructive')
}

export const Avatar: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use avatar content in dropdown menus for account switchers. Reference: [shadcn/ui Dropdown Menu Avatar example](https://ui.shadcn.com/docs/components/base/dropdown-menu.md#avatar)'
      }
    }
  },
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button className="gap-2" variant="outline" />}>
        <AvatarRoot className="size-5">
          <AvatarFallback>DT</AvatarFallback>
        </AvatarRoot>
        Design Tokens
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Workspace</DropdownMenuLabel>
          <DropdownMenuItem>Account settings</DropdownMenuItem>
          <DropdownMenuItem>Invite team</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
Avatar.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const page = within(canvasElement.ownerDocument.body)

  await userEvent.click(canvas.getByRole('button', { name: /Design Tokens/ }))

  await expect(await page.findByText('Workspace')).toHaveAttribute('data-slot', 'dropdown-menu-label')
  await expect(page.getByText('Invite team')).toHaveAttribute('data-slot', 'dropdown-menu-item')
}

export const Complex: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Combine groups, shortcuts, submenus, checkbox items, and destructive actions. Reference: [shadcn/ui Dropdown Menu Complex example](https://ui.shadcn.com/docs/components/base/dropdown-menu.md#complex)'
      }
    }
  },
  render: () => (
    <DropdownMenu>
      <MenuTrigger>Token actions</MenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Rename
            <DropdownMenuShortcut>⌘R</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Duplicate
            <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Export</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>CSS</DropdownMenuItem>
            <DropdownMenuItem>JSON</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuCheckboxItem defaultChecked>Show in sidebar</DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
Complex.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const page = within(canvasElement.ownerDocument.body)

  await userEvent.click(canvas.getByRole('button', { name: 'Token actions' }))
  await userEvent.hover(await page.findByText('Export'))

  await expect(await page.findByText('JSON')).toHaveAttribute('data-slot', 'dropdown-menu-item')
  await expect(page.getByRole('menuitemcheckbox', { name: 'Show in sidebar' })).toHaveAttribute('aria-checked', 'true')
}
