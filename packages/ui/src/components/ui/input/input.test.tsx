import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import { Input } from './input'

describe('Input', () => {
  afterEach(() => {
    cleanup()
  })

  test('renders a textbox input', () => {
    render(<Input aria-label="Email" placeholder="Email" />)

    expect(screen.getByRole('textbox', { name: 'Email' })).toHaveAttribute('data-slot', 'input')
    expect(screen.getByRole('textbox', { name: 'Email' })).toHaveClass('cn-input')
  })
})
