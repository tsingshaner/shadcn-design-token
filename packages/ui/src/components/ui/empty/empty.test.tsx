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

    expect(screen.getByText('No data').closest('[data-scope="empty"][data-slot="root"]')).toHaveAttribute(
      'data-scope',
      'empty'
    )
    expect(screen.getByText('No data').closest('[data-scope="empty"][data-slot="root"]')).toHaveAttribute(
      'data-slot',
      'root'
    )
    expect(screen.getByText('No data').parentElement).toHaveAttribute('data-scope', 'empty')
    expect(screen.getByText('No data').parentElement).toHaveAttribute('data-slot', 'header')
    expect(screen.getByText('No data')).toHaveAttribute('data-scope', 'empty')
    expect(screen.getByText('No data')).toHaveAttribute('data-slot', 'title')

    expect(screen.getByText(/Nothing to show/)).toHaveAttribute('data-scope', 'empty')
    expect(screen.getByText(/Nothing to show/)).toHaveAttribute('data-slot', 'description')

    expect(screen.getByText('Try another filter.')).toHaveAttribute('data-scope', 'empty')
    expect(screen.getByText('Try another filter.')).toHaveAttribute('data-slot', 'content')
    expect(screen.getByRole('link', { name: 'Read empty state documentation' })).toBeInTheDocument()
  })

  test('renders empty media as the v4 empty icon slot', () => {
    render(<EmptyMedia variant="icon">0</EmptyMedia>)

    expect(screen.getByText('0')).toHaveAttribute('data-scope', 'empty')
    expect(screen.getByText('0')).toHaveAttribute('data-slot', 'icon')
    expect(screen.getByText('0')).toHaveAttribute('data-variant', 'icon')
  })
})
