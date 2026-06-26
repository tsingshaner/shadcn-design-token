import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import { Command, CommandInput, CommandItem, CommandList } from './command'

afterEach(cleanup)

describe('Command', () => {
  it('filters items with the input query', () => {
    render(
      <Command>
        <CommandInput placeholder="Search commands" />
        <CommandList>
          <CommandItem value="calendar">Calendar</CommandItem>
          <CommandItem value="settings">Settings</CommandItem>
        </CommandList>
      </Command>
    )

    fireEvent.change(screen.getByPlaceholderText('Search commands'), { target: { value: 'set' } })

    expect(screen.queryByText('Calendar')).not.toBeInTheDocument()
    expect(screen.getByText('Settings')).toBeInTheDocument()
  })
})
