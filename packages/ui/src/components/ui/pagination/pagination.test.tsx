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
    expect(nav).toHaveAttribute('data-scope', 'pagination')
    expect(nav).toHaveAttribute('data-slot', 'root')

    expect(screen.getByText('1').closest('[data-scope="pagination"][data-slot="content"]')).toHaveAttribute(
      'data-scope',
      'pagination'
    )
    expect(screen.getByText('1').closest('[data-scope="pagination"][data-slot="content"]')).toHaveAttribute(
      'data-slot',
      'content'
    )
    expect(activeLink).toHaveAttribute('aria-current', 'page')
    expect(activeLink).toHaveAttribute('data-scope', 'pagination')
    expect(activeLink).toHaveAttribute('data-slot', 'link')
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
    expect(previous).toHaveAttribute('data-scope', 'pagination')
    expect(previous).toHaveAttribute('data-slot', 'previous')

    expect(previous.querySelector('[data-icon="inline-start"]')).toHaveClass('rtl:rotate-180')
    expect(next).toHaveTextContent('Forward')
    expect(next).toHaveAttribute('data-scope', 'pagination')
    expect(next).toHaveAttribute('data-slot', 'next')

    expect(next.querySelector('[data-icon="inline-end"]')).toHaveClass('rtl:rotate-180')
    expect(screen.getByText('Forward')).toHaveAttribute('data-scope', 'pagination')
    expect(screen.getByText('Forward')).toHaveAttribute('data-slot', 'next-text')
    expect(screen.getByText('More pages').parentElement).toHaveAttribute('data-scope', 'pagination')
    expect(screen.getByText('More pages').parentElement).toHaveAttribute('data-slot', 'ellipsis')
    expect(screen.getByText('More pages')).toHaveClass('sr-only')
  })
})
