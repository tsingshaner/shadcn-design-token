import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import { Kbd, KbdGroup } from './kbd'

describe('Kbd', () => {
  afterEach(() => {
    cleanup()
  })

  test('renders keyboard input text', () => {
    render(<Kbd>Esc</Kbd>)

    expect(screen.getByText('Esc')).toHaveAttribute('data-slot', 'kbd')
  })

  test('groups keyboard keys', () => {
    render(
      <KbdGroup>
        <Kbd>Ctrl</Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>
    )

    expect(screen.getByText('Ctrl').parentElement).toHaveAttribute('data-slot', 'kbd-group')
  })
})
