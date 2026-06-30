import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from './empty'

describe('Empty', () => {
  afterEach(() => {
    cleanup()
  })

  test('renders empty state slots', () => {
    render(
      <Empty>
        <EmptyHeader>
          <EmptyTitle>No data</EmptyTitle>
          <EmptyDescription>
            Nothing to show. <a href="/docs">Read empty state documentation</a>.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>Try another filter.</EmptyContent>
      </Empty>
    )

    expect(screen.getByText('No data').closest('[data-slot="empty"]')).toHaveClass('cn-empty')
    expect(screen.getByText('No data').parentElement).toHaveClass('cn-empty-header')
    expect(screen.getByText('No data')).toHaveAttribute('data-slot', 'empty-title')
    expect(screen.getByText('No data')).toHaveClass('cn-empty-title')
    expect(screen.getByText(/Nothing to show/)).toHaveAttribute('data-slot', 'empty-description')
    expect(screen.getByText(/Nothing to show/)).toHaveClass('cn-empty-description')
    expect(screen.getByText('Try another filter.')).toHaveClass('cn-empty-content')
    expect(screen.getByRole('link', { name: 'Read empty state documentation' })).toBeInTheDocument()
  })

  test('renders empty media as the v4 empty icon slot', () => {
    render(<EmptyMedia variant="icon">0</EmptyMedia>)

    expect(screen.getByText('0')).toHaveAttribute('data-slot', 'empty-icon')
    expect(screen.getByText('0')).toHaveAttribute('data-variant', 'icon')
    expect(screen.getByText('0')).toHaveClass('cn-empty-media', 'cn-empty-media-icon')
  })
})
