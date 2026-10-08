import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import { Textarea } from './textarea'

describe('Textarea', () => {
  afterEach(() => {
    cleanup()
  })

  test('renders a textarea', () => {
    render(<Textarea aria-label="Message" />)

    expect(screen.getByRole('textbox', { name: 'Message' })).toHaveAttribute('data-scope', 'textarea')
    expect(screen.getByRole('textbox', { name: 'Message' })).toHaveAttribute('data-slot', 'root')

    expect(screen.getByRole('textbox', { name: 'Message' })).toHaveClass('min-h-28', 'rounded-[4px]')
  })
})
