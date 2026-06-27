import { type SVGProps, useState } from 'react'
import { expect, userEvent, within } from 'storybook/test'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../button'
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut
} from './command'

type IconProps = SVGProps<SVGSVGElement>

const CommandIcon = ({ children, ...props }: IconProps & { children: React.ReactNode }) => (
  <svg
    aria-hidden="true"
    className="size-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    {...props}
  >
    {children}
  </svg>
)

const CalendarIcon = (props: IconProps) => (
  <CommandIcon {...props}>
    <rect height="18" rx="2" width="18" x="3" y="4" />
    <path d="M8 2v4M16 2v4M3 10h18" />
  </CommandIcon>
)

const CalculatorIcon = (props: IconProps) => (
  <CommandIcon {...props}>
    <rect height="18" rx="2" width="14" x="5" y="3" />
    <path d="M8 7h8M8 11h2M14 11h2M8 15h2M14 15h2" />
  </CommandIcon>
)

const CreditCardIcon = (props: IconProps) => (
  <CommandIcon {...props}>
    <rect height="14" rx="2" width="20" x="2" y="5" />
    <path d="M2 10h20M6 15h4" />
  </CommandIcon>
)

const HomeIcon = (props: IconProps) => (
  <CommandIcon {...props}>
    <path d="m3 10 9-7 9 7" />
    <path d="M5 10v10h14V10" />
  </CommandIcon>
)

const InboxIcon = (props: IconProps) => (
  <CommandIcon {...props}>
    <path d="M22 12h-6l-2 3h-4l-2-3H2" />
    <path d="M5 5h14l3 7v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6z" />
  </CommandIcon>
)

const SearchEmojiIcon = (props: IconProps) => (
  <CommandIcon {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" />
  </CommandIcon>
)

const SettingsIcon = (props: IconProps) => (
  <CommandIcon {...props}>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1" />
  </CommandIcon>
)

const UserIcon = (props: IconProps) => (
  <CommandIcon {...props}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21a8 8 0 0 1 16 0" />
  </CommandIcon>
)

const meta = {
  component: Command,
  parameters: {
    docs: {
      description: {
        component:
          'A command menu pattern for searchable actions and navigation. Examples and guidance reference the [shadcn/ui Command documentation](https://ui.shadcn.com/docs/components/base/command.md).'
      }
    }
  },
  tags: ['autodocs'],
  title: 'Components/Command'
} satisfies Meta<typeof Command>

export default meta

type Story = StoryObj<typeof meta>

const CommandDialogExample = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex flex-col gap-4">
      <Button className="w-fit" onClick={() => setOpen(true)} variant="outline">
        Open Menu
      </Button>
      <CommandDialog onOpenChange={setOpen} open={open}>
        {children}
      </CommandDialog>
    </div>
  )
}

export const Basic: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Covers the dialog command menu from [shadcn/ui Command Basic](https://ui.shadcn.com/docs/components/base/command.md#basic).'
      }
    }
  },
  render: () => (
    <CommandDialogExample>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem value="calendar">Calendar</CommandItem>
          <CommandItem value="search emoji">Search Emoji</CommandItem>
          <CommandItem value="calculator">Calculator</CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialogExample>
  )
}
Basic.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const page = within(canvasElement.ownerDocument.body)

  await userEvent.click(canvas.getByRole('button', { name: 'Open Menu' }))

  await expect(await page.findByRole('dialog')).toBeVisible()
  await userEvent.type(page.getByPlaceholderText('Type a command or search...'), 'calc')

  await expect(page.getByRole('option', { name: 'Calculator' })).toBeVisible()
  await expect(page.queryByRole('option', { name: 'Calendar' })).not.toBeInTheDocument()
}

export const Shortcuts: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Covers command shortcuts from [shadcn/ui Command Shortcuts](https://ui.shadcn.com/docs/components/base/command.md#shortcuts).'
      }
    }
  },
  render: () => (
    <CommandDialogExample>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Settings">
          <CommandItem value="profile">
            <UserIcon />
            <span>Profile</span>
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem value="billing">
            <CreditCardIcon />
            <span>Billing</span>
            <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
          <CommandItem value="settings">
            <SettingsIcon />
            <span>Settings</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialogExample>
  )
}
Shortcuts.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const page = within(canvasElement.ownerDocument.body)

  await userEvent.click(canvas.getByRole('button', { name: 'Open Menu' }))

  await expect(await page.findByText('⌘P')).toHaveAttribute('data-slot', 'command-shortcut')
  await expect(page.getByRole('option', { name: /Profile/ })).toBeVisible()
}

export const Groups: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Covers grouped command sections with icons and separators from [shadcn/ui Command Groups](https://ui.shadcn.com/docs/components/base/command.md#groups).'
      }
    }
  },
  render: () => (
    <CommandDialogExample>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem value="calendar">
            <CalendarIcon />
            <span>Calendar</span>
          </CommandItem>
          <CommandItem value="search emoji">
            <SearchEmojiIcon />
            <span>Search Emoji</span>
          </CommandItem>
          <CommandItem value="calculator">
            <CalculatorIcon />
            <span>Calculator</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem value="profile">
            <UserIcon />
            <span>Profile</span>
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem value="billing">
            <CreditCardIcon />
            <span>Billing</span>
            <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
          <CommandItem value="settings">
            <SettingsIcon />
            <span>Settings</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialogExample>
  )
}
Groups.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const page = within(canvasElement.ownerDocument.body)

  await userEvent.click(canvas.getByRole('button', { name: 'Open Menu' }))

  const settingsHeading = page
    .getAllByText('Settings')
    .find((element) => element.getAttribute('data-slot') === 'command-group-heading')

  await expect(await page.findByText('Suggestions')).toHaveAttribute('data-slot', 'command-group-heading')
  await expect(settingsHeading).toBeVisible()
  await expect(page.getByRole('option', { name: /Billing/ })).toBeVisible()
}

export const Scrollable: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Covers long scrollable command lists from [shadcn/ui Command Scrollable](https://ui.shadcn.com/docs/components/base/command.md#scrollable).'
      }
    }
  },
  render: () => (
    <CommandDialogExample>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigation">
          <CommandItem value="home">
            <HomeIcon />
            <span>Home</span>
            <CommandShortcut>⌘H</CommandShortcut>
          </CommandItem>
          <CommandItem value="inbox">
            <InboxIcon />
            <span>Inbox</span>
            <CommandShortcut>⌘I</CommandShortcut>
          </CommandItem>
          <CommandItem value="calendar">
            <CalendarIcon />
            <span>Calendar</span>
            <CommandShortcut>⌘C</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Actions">
          {['New File', 'New Folder', 'Copy', 'Paste', 'Rename', 'Move', 'Archive', 'Delete'].map((item) => (
            <CommandItem key={item} value={item.toLowerCase()}>
              <span>{item}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialogExample>
  )
}
Scrollable.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const page = within(canvasElement.ownerDocument.body)

  await userEvent.click(canvas.getByRole('button', { name: 'Open Menu' }))
  await userEvent.type(await page.findByPlaceholderText('Type a command or search...'), 'archive')

  await expect(page.getByRole('option', { name: 'Archive' })).toBeVisible()
  await expect(page.queryByRole('option', { name: 'Home ⌘H' })).not.toBeInTheDocument()
}
