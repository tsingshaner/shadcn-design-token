import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import { Card, CardContent, CardHeader, CardTitle } from './card'

describe('Card', () => {
  afterEach(() => {
    cleanup()
  })

  test('renders card structure slots', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Report</CardTitle>
        </CardHeader>
        <CardContent>Ready</CardContent>
      </Card>
    )

    expect(screen.getByText('Report')).toHaveAttribute('data-slot', 'card-title')
    expect(screen.getByText('Ready')).toHaveAttribute('data-slot', 'card-content')
  })
})
