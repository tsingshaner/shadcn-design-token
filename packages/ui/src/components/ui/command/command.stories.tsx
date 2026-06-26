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
