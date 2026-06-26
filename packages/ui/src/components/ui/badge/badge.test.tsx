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
})
