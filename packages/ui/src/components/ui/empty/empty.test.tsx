import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import { Empty, EmptyDescription, EmptyMedia, EmptyTitle } from './empty'

describe('Empty', () => {
  afterEach(() => {
    cleanup()
  })

  test('renders empty state slots', () => {
    render(
      <Empty>
        <EmptyTitle>No data</EmptyTitle>
        <EmptyDescription>
          Nothing to show. <a href="/docs">Read empty state documentation</a>.
        </EmptyDescription>
      </Empty>
    )

    expect(screen.getByText('No data')).toHaveAttribute('data-slot', 'empty-title')
    expect(screen.getByText(/Nothing to show/)).toHaveAttribute('data-slot', 'empty-description')
    expect(screen.getByRole('link', { name: 'Read empty state documentation' })).toBeInTheDocument()
  })

  test('renders empty media as the v4 empty icon slot', () => {
    render(<EmptyMedia variant="icon">0</EmptyMedia>)

    expect(screen.getByText('0')).toHaveAttribute('data-slot', 'empty-icon')
    expect(screen.getByText('0')).toHaveAttribute('data-variant', 'icon')
  })
})
