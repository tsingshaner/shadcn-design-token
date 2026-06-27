import { expect, userEvent, within } from 'storybook/test'

import type { Meta, StoryObj } from '@storybook/react-vite'
import type { SVGProps } from 'react'

import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger
} from './menubar'

type IconProps = SVGProps<SVGSVGElement>

const FileIcon = (props: IconProps) => (
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
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6" />
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
  component: Menubar,
  parameters: {
    docs: {
      description: {
        component:
          'A horizontal application menu with nested menu items and keyboard navigation. Examples and guidance reference the [shadcn/ui Menubar documentation](https://ui.shadcn.com/docs/components/base/menubar.md).'
      }
    }
  },
  tags: ['autodocs'],
  title: 'UI/Menubar'
} satisfies Meta<typeof Menubar>

export default meta

type Story = StoryObj<typeof meta>

export const Checkbox: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use checkbox items for independent menubar toggles. Reference: [shadcn/ui Menubar Checkbox example](https://ui.shadcn.com/docs/components/base/menubar.md#checkbox)'
      }
    }
  },
  render: () => (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem defaultChecked>Show aliases</MenubarCheckboxItem>
          <MenubarCheckboxItem>Show deprecated tokens</MenubarCheckboxItem>
          <MenubarCheckboxItem defaultChecked>Show resolved values</MenubarCheckboxItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
Checkbox.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const page = within(canvasElement.ownerDocument.body)

  await userEvent.click(canvas.getByRole('menuitem', { name: 'View' }))

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
          'Use radio items for mutually exclusive menubar choices. Reference: [shadcn/ui Menubar Radio example](https://ui.shadcn.com/docs/components/base/menubar.md#radio)'
      }
    }
  },
  render: () => (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Density</MenubarTrigger>
        <MenubarContent>
          <MenubarRadioGroup defaultValue="comfortable">
            <MenubarRadioItem value="compact">Compact</MenubarRadioItem>
            <MenubarRadioItem value="comfortable">Comfortable</MenubarRadioItem>
            <MenubarRadioItem value="spacious">Spacious</MenubarRadioItem>
          </MenubarRadioGroup>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
Radio.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const page = within(canvasElement.ownerDocument.body)

  await userEvent.click(canvas.getByRole('menuitem', { name: 'Density' }))

  await expect(await page.findByRole('menuitemradio', { name: 'Comfortable' })).toHaveAttribute('aria-checked', 'true')
  await expect(page.getByRole('menuitemradio', { name: 'Spacious' })).toHaveAttribute('aria-checked', 'false')
}

export const Submenu: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use nested submenus for secondary menubar actions. Reference: [shadcn/ui Menubar Submenu example](https://ui.shadcn.com/docs/components/base/menubar.md#submenu)'
      }
    }
  },
  render: () => (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            New token
            <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarSub>
            <MenubarSubTrigger>Export</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>CSS variables</MenubarItem>
              <MenubarItem>JSON tokens</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem>Close</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
Submenu.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const page = within(canvasElement.ownerDocument.body)

  await userEvent.click(canvas.getByRole('menuitem', { name: 'File' }))
  await userEvent.hover(await page.findByText('Export'))

  await expect(await page.findByText('CSS variables')).toHaveAttribute('data-slot', 'menubar-item')
  await expect(page.getByText('⌘N')).toHaveAttribute('data-slot', 'menubar-shortcut')
}

export const WithIcons: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Add icons to menubar items for faster scanning. Reference: [shadcn/ui Menubar With Icons example](https://ui.shadcn.com/docs/components/base/menubar.md#with-icons)'
      }
    }
  },
  render: () => (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            <FileIcon />
            New file
            <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            <DownloadIcon />
            Export
            <MenubarShortcut>⇧⌘E</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
WithIcons.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const page = within(canvasElement.ownerDocument.body)

  await userEvent.click(canvas.getByRole('menuitem', { name: 'File' }))

  await expect(await page.findByText('New file')).toHaveAttribute('data-slot', 'menubar-item')
  await expect(page.getByText('⇧⌘E')).toHaveAttribute('data-slot', 'menubar-shortcut')
}
