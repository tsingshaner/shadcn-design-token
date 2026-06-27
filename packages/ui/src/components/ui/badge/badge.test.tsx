import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import { Badge } from './badge'

describe('Badge', () => {
  afterEach(() => {
    cleanup()
  })

  test('renders badge content', () => {
    render(<Badge>Stable</Badge>)

    expect(screen.getByText('Stable')).toHaveAttribute('data-slot', 'badge')
  })

  test('applies variants', () => {
    render(<Badge variant="secondary">Secondary</Badge>)

    expect(screen.getByText('Secondary')).toHaveClass('bg-secondary')
  })

  test('supports link rendering', () => {
    render(
      <Badge render={<a href="#link" />} variant="link">
        Open Link
      </Badge>
    )

    expect(screen.getByRole('link', { name: 'Open Link' })).toHaveAttribute('data-slot', 'badge')
  })
})
