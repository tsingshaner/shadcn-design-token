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
    expect(nav).toHaveAttribute('data-slot', 'breadcrumb')
    expect(nav).toHaveClass('cn-breadcrumb')
    expect(screen.getByText('Current').closest('[data-slot="breadcrumb-list"]')).toHaveClass('cn-breadcrumb-list')
    expect(screen.getByText('Current').closest('[data-slot="breadcrumb-item"]')).toHaveClass('cn-breadcrumb-item')
    expect(page).toHaveAttribute('aria-current', 'page')
    expect(page).toHaveAttribute('aria-disabled', 'true')
    expect(page).toHaveAttribute('tabIndex', '-1')
    expect(page).toHaveClass('cn-breadcrumb-page')
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

    expect(screen.getByTestId('separator')).toHaveAttribute('data-slot', 'breadcrumb-separator')
    expect(screen.getByTestId('separator')).toHaveClass('cn-breadcrumb-separator')
    expect(screen.getByTestId('separator').querySelector('svg')).toHaveClass('cn-rtl-flip')
    expect(screen.getByRole('link', { name: 'Docs' })).toHaveClass('cn-breadcrumb-link')
    expect(screen.getByText('More').parentElement).toHaveClass('cn-breadcrumb-ellipsis')
    expect(screen.getByText('More')).toHaveClass('sr-only')
  })
})
