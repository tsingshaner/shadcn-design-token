import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import { Empty, EmptyDescription, EmptyTitle } from './empty'

describe('Empty', () => {
  afterEach(() => {
    cleanup()
  })

  test('renders empty state slots', () => {
    render(
      <Empty>
        <EmptyTitle>No data</EmptyTitle>
        <EmptyDescription>Nothing to show.</EmptyDescription>
      </Empty>
    )

    expect(screen.getByText('No data')).toHaveAttribute('data-slot', 'empty-title')
    expect(screen.getByText('Nothing to show.')).toHaveAttribute('data-slot', 'empty-description')
  })
})
