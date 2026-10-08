import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from './breadcrumb'

describe('Breadcrumb', () => {
  afterEach(() => {
    cleanup()
  })

  test('renders breadcrumb navigation', () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>Current</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    )

    const nav = screen.getByRole('navigation', { name: 'breadcrumb' })
    const page = screen.getByRole('link', { name: 'Current' })
    expect(nav).toHaveAttribute('data-scope', 'breadcrumb')
    expect(nav).toHaveAttribute('data-slot', 'root')

    expect(screen.getByText('Current').closest('[data-scope="breadcrumb"][data-slot="list"]')).toHaveAttribute(
      'data-scope',
      'breadcrumb'
    )
    expect(screen.getByText('Current').closest('[data-scope="breadcrumb"][data-slot="list"]')).toHaveAttribute(
      'data-slot',
      'list'
    )
    expect(screen.getByText('Current').closest('[data-scope="breadcrumb"][data-slot="item"]')).toHaveAttribute(
      'data-scope',
      'breadcrumb'
    )
    expect(screen.getByText('Current').closest('[data-scope="breadcrumb"][data-slot="item"]')).toHaveAttribute(
      'data-slot',
      'item'
    )
    expect(page).toHaveAttribute('aria-current', 'page')
    expect(page).toHaveAttribute('aria-disabled', 'true')
    expect(page).toHaveAttribute('tabIndex', '-1')
    expect(page).toHaveAttribute('data-scope', 'breadcrumb')
    expect(page).toHaveAttribute('data-slot', 'page')
  })

  test('renders default separator and ellipsis slots', () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>Home</BreadcrumbItem>
          <BreadcrumbSeparator data-testid="separator" />
          <BreadcrumbItem>
            <BreadcrumbEllipsis />
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    )

    expect(screen.getByTestId('separator')).toHaveAttribute('data-scope', 'breadcrumb')
    expect(screen.getByTestId('separator')).toHaveAttribute('data-slot', 'separator')

    expect(screen.getByTestId('separator').querySelector('svg')).toHaveClass('rtl:rotate-180')
    expect(screen.getByRole('link', { name: 'Docs' })).toHaveAttribute('data-scope', 'breadcrumb')
    expect(screen.getByRole('link', { name: 'Docs' })).toHaveAttribute('data-slot', 'link')
    expect(screen.getByText('More').parentElement).toHaveAttribute('data-scope', 'breadcrumb')
    expect(screen.getByText('More').parentElement).toHaveAttribute('data-slot', 'ellipsis')
    expect(screen.getByText('More')).toHaveClass('sr-only')
  })
})
