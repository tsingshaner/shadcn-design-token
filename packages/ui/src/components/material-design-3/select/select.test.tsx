import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test, vi } from 'vitest'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select'

afterEach(cleanup)

describe('Select', () => {
  test('shows the selected value in the trigger', () => {
    render(
      <Select defaultValue="dark" items={{ dark: 'Dark', light: 'Light' }}>
        <SelectTrigger>
          <SelectValue placeholder="Select theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
        </SelectContent>
      </Select>
    )

    expect(screen.getByRole('combobox')).toHaveTextContent('Dark')
    expect(screen.getByRole('combobox')).toHaveClass('data-[size=default]:h-14', 'rounded-[4px]')
  })

  test('calls onValueChange when selecting an item', () => {
    const onValueChange = vi.fn()

    render(
      <Select items={{ dark: 'Dark', light: 'Light' }} onValueChange={onValueChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
        </SelectContent>
      </Select>
    )

    fireEvent.click(screen.getByRole('combobox'))

    const option = screen.getByRole('option', { name: 'Dark' })
    fireEvent.pointerDown(option, { pointerType: 'mouse' })
    fireEvent.click(option)

    expect(onValueChange).toHaveBeenCalledWith('dark', expect.any(Object))
  })
})
