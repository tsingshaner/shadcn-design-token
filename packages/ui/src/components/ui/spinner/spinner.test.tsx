import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import { Spinner } from './spinner'

describe('Spinner', () => {
  afterEach(() => {
    cleanup()
  })

  test('renders a status indicator', () => {
    render(<Spinner />)

    const spinner = screen.getByRole('status', { name: 'Loading' })
    expect(spinner).toHaveAttribute('data-slot', 'spinner')
    expect(spinner).toHaveClass('cn-spinner')
  })
})
