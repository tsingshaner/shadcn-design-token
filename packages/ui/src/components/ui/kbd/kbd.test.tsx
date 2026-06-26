import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import { Kbd } from './kbd'

describe('Kbd', () => {
  afterEach(() => {
    cleanup()
  })

  test('renders keyboard input text', () => {
    render(<Kbd>Esc</Kbd>)

    expect(screen.getByText('Esc')).toHaveAttribute('data-slot', 'kbd')
  })
})
