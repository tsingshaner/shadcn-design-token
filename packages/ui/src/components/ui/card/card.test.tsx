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

    expect(screen.getByText('Report').closest('[data-scope="card"][data-slot="root"]')).toHaveAttribute(
      'data-scope',
      'card'
    )
    expect(screen.getByText('Report').closest('[data-scope="card"][data-slot="root"]')).toHaveAttribute(
      'data-slot',
      'root'
    )
    expect(screen.getByText('Report').parentElement).toHaveAttribute('data-scope', 'card')
    expect(screen.getByText('Report').parentElement).toHaveAttribute('data-slot', 'header')
    expect(screen.getByText('Report')).toHaveAttribute('data-scope', 'card')
    expect(screen.getByText('Report')).toHaveAttribute('data-slot', 'title')

    expect(screen.getByText('Monthly metrics')).toHaveAttribute('data-scope', 'card')
    expect(screen.getByText('Monthly metrics')).toHaveAttribute('data-slot', 'description')
    expect(screen.getByText('Open')).toHaveAttribute('data-scope', 'card')
    expect(screen.getByText('Open')).toHaveAttribute('data-slot', 'action')
    expect(screen.getByText('Ready')).toHaveAttribute('data-scope', 'card')
    expect(screen.getByText('Ready')).toHaveAttribute('data-slot', 'content')

    expect(screen.getByText('Footer')).toHaveAttribute('data-scope', 'card')
    expect(screen.getByText('Footer')).toHaveAttribute('data-slot', 'footer')
  })
})
