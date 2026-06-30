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

    const nav = screen.getByRole('navigation', { name: 'pagination' })
    const activeLink = screen.getByRole('button', { name: '1' })
    expect(nav).toHaveAttribute('data-slot', 'pagination')
    expect(nav).toHaveClass('cn-pagination')
    expect(screen.getByText('1').closest('[data-slot="pagination-content"]')).toHaveClass('cn-pagination-content')
    expect(activeLink).toHaveAttribute('aria-current', 'page')
    expect(activeLink).toHaveClass('cn-pagination-link')
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

    const previous = screen.getByRole('button', { name: 'Go to previous page' })
    const next = screen.getByRole('button', { name: 'Go to next page' })
    expect(previous).toHaveAttribute('data-slot', 'pagination-link')
    expect(previous).toHaveClass('cn-pagination-link')
    expect(previous).toHaveClass('cn-pagination-previous')
    expect(previous.querySelector('[data-icon="inline-start"]')).toHaveClass('cn-rtl-flip')
    expect(next).toHaveTextContent('Forward')
    expect(next).toHaveClass('cn-pagination-link')
    expect(next).toHaveClass('cn-pagination-next')
    expect(next.querySelector('[data-icon="inline-end"]')).toHaveClass('cn-rtl-flip')
    expect(screen.getByText('Forward')).toHaveClass('cn-pagination-next-text')
    expect(screen.getByText('More pages').parentElement).toHaveClass('cn-pagination-ellipsis')
    expect(screen.getByText('More pages')).toHaveClass('sr-only')
  })
})
