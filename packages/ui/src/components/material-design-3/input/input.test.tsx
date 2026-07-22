import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import { Input } from './input'

describe('Input', () => {
  afterEach(() => {
    cleanup()
  })

  test('renders a filled text field by default and supports the outlined variant', () => {
    render(<Input aria-label="Email" placeholder="Email" />)
    render(<Input aria-label="Name" variant="outlined" />)

    expect(screen.getByRole('textbox', { name: 'Email' })).toHaveAttribute('data-variant', 'filled')
    expect(screen.getByRole('textbox', { name: 'Email' })).toHaveClass(
      'h-14',
      'rounded-t-[4px]',
      'rounded-b-none',
      'border-b',
      'bg-muted'
    )
    expect(screen.getByRole('textbox', { name: 'Name' })).toHaveAttribute('data-variant', 'outlined')
    expect(screen.getByRole('textbox', { name: 'Name' })).toHaveClass(
      'h-14',
      'rounded-[4px]',
      'border',
      'bg-transparent'
    )
  })
})
