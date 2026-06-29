import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from './pagination'

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
    expect(screen.getByRole('button', { name: '1' })).toHaveAttribute('aria-current', 'page')
  })

  test('renders previous, next, and ellipsis controls', () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" text="Forward" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )

    expect(screen.getByRole('button', { name: 'Go to previous page' })).toHaveAttribute('data-slot', 'pagination-link')
    expect(screen.getByRole('button', { name: 'Go to next page' })).toHaveTextContent('Forward')
    expect(screen.getByText('More pages')).toHaveClass('sr-only')
  })
})
