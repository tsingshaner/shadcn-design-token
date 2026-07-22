import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card'

describe('Card', () => {
  afterEach(() => {
    cleanup()
  })

  test('renders card structure slots', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Report</CardTitle>
          <CardDescription>Monthly metrics</CardDescription>
          <CardAction>Open</CardAction>
        </CardHeader>
        <CardContent>Ready</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>
    )

    expect(screen.getByText('Report').closest('[data-slot="card"]')).toHaveClass('cn-card', 'rounded-xl', 'bg-muted')
    expect(screen.getByText('Report').parentElement).toHaveClass('cn-card-header')
    expect(screen.getByText('Report')).toHaveAttribute('data-slot', 'card-title')
    expect(screen.getByText('Report')).toHaveClass('cn-card-title', 'cn-font-heading')
    expect(screen.getByText('Monthly metrics')).toHaveClass('cn-card-description')
    expect(screen.getByText('Open')).toHaveClass('cn-card-action')
    expect(screen.getByText('Ready')).toHaveAttribute('data-slot', 'card-content')
    expect(screen.getByText('Ready')).toHaveClass('cn-card-content')
    expect(screen.getByText('Footer')).toHaveClass('cn-card-footer')
  })
})
