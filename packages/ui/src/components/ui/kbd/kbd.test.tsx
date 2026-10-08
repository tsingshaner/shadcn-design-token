import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import { Kbd, KbdGroup } from './kbd'

describe('Kbd', () => {
  afterEach(() => {
    cleanup()
  })

  test('renders keyboard input text', () => {
    render(<Kbd>Esc</Kbd>)

    const key = screen.getByText('Esc')
    expect(key).toHaveAttribute('data-scope', 'kbd')
    expect(key).toHaveAttribute('data-slot', 'root')
  })

  test('groups keyboard keys', () => {
    render(
      <KbdGroup aria-label="Keyboard shortcut">
        <Kbd>Ctrl</Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>
    )

    const group = screen.getByLabelText('Keyboard shortcut')
    expect(screen.getByText('Ctrl').parentElement).toHaveAttribute('data-scope', 'kbd')
    expect(screen.getByText('Ctrl').parentElement).toHaveAttribute('data-slot', 'group')
    expect(group).toHaveAttribute('data-scope', 'kbd')
    expect(group).toHaveAttribute('data-slot', 'group')
  })
})
