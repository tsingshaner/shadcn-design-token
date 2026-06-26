import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import { Spinner } from './spinner'

describe('Spinner', () => {
  afterEach(() => {
    cleanup()
  })

  test('renders a status indicator', () => {
    render(<Spinner />)

    expect(screen.getByRole('status', { name: 'Loading' })).toHaveAttribute('data-slot', 'spinner')
  })
})
