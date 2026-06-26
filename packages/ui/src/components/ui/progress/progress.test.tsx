import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import { Progress } from './progress'

describe('Progress', () => {
  afterEach(() => {
    cleanup()
  })

  test('renders progressbar with value', () => {
    render(<Progress aria-label="Loading" value={40} />)

    expect(screen.getByRole('progressbar', { name: 'Loading' })).toHaveAttribute('aria-valuenow', '40')
  })
})
