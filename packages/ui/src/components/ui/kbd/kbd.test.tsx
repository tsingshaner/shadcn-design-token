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
    expect(key).toHaveAttribute('data-slot', 'kbd')
    expect(key).toHaveClass('cn-kbd')
  })

  test('groups keyboard keys', () => {
    render(
      <KbdGroup aria-label="Keyboard shortcut">
        <Kbd>Ctrl</Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>
    )

    const group = screen.getByLabelText('Keyboard shortcut')
    expect(screen.getByText('Ctrl').parentElement).toHaveAttribute('data-slot', 'kbd-group')
    expect(group).toHaveAttribute('data-slot', 'kbd-group')
    expect(group).toHaveClass('cn-kbd-group')
  })
})
