import type { Meta, StoryObj } from '@storybook/react-vite'

import {
  Command,
  CommandGroup,
  CommandGroupHeading,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut
} from './command'

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

export const Default: Story = {
  render: () => (
    <Command className="w-96 border shadow-md">
      <CommandInput placeholder="Type a command or search" />
      <CommandList>
        <CommandGroup>
          <CommandGroupHeading>Suggestions</CommandGroupHeading>
          <CommandItem value="calendar">Calendar</CommandItem>
          <CommandItem value="search">Search</CommandItem>
          <CommandItem value="settings">Settings</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup>
          <CommandGroupHeading>Actions</CommandGroupHeading>
          <CommandItem value="new project">
            New project
            <CommandShortcut>⌘N</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
