import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from './breadcrumb'

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
  })
})
