import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import { Pagination, PaginationContent, PaginationItem, PaginationLink } from './pagination'

describe('Pagination', () => {
  afterEach(() => {
    cleanup()
  })

  test('renders pagination navigation and active link', () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              1
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )

    expect(screen.getByRole('navigation', { name: 'pagination' })).toHaveAttribute('data-slot', 'pagination')
    expect(screen.getByRole('link', { name: '1' })).toHaveAttribute('aria-current', 'page')
  })
})
