import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
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

    expect(screen.getByRole('navigation', { name: 'breadcrumb' })).toHaveAttribute('data-slot', 'breadcrumb')
    expect(screen.getByText('Current')).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('link', { name: 'Current' })).toHaveAttribute('aria-disabled', 'true')
    expect(screen.getByRole('link', { name: 'Current' })).toHaveAttribute('tabIndex', '-1')
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
        </BreadcrumbList>
      </Breadcrumb>
    )

    expect(screen.getByTestId('separator')).toHaveAttribute('data-slot', 'breadcrumb-separator')
    expect(screen.getByText('More')).toHaveClass('sr-only')
  })
})
