import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import { Alert, AlertAction, AlertDescription, AlertTitle } from './alert'

describe('Alert', () => {
  afterEach(() => {
    cleanup()
  })

  test('renders an alert region', () => {
    render(
      <Alert>
        <AlertTitle>Status</AlertTitle>
        <AlertDescription>
          Ready. <a href="/status">View status details</a>.
        </AlertDescription>
        <AlertAction>
          <button type="button">Review</button>
        </AlertAction>
      </Alert>
    )

    expect(screen.getByRole('alert')).toHaveAttribute('data-slot', 'alert')
    expect(screen.getByText('Status')).toHaveAttribute('data-slot', 'alert-title')
    expect(screen.getByRole('link', { name: 'View status details' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Review' }).parentElement).toHaveAttribute('data-slot', 'alert-action')
  })
})
