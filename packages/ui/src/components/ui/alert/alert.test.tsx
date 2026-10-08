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

    const alert = screen.getByRole('alert')
    const title = screen.getByText('Status')
    const action = screen.getByRole('button', { name: 'Review' }).parentElement
    expect(alert).toHaveAttribute('data-scope', 'alert')
    expect(alert).toHaveAttribute('data-slot', 'root')

    expect(alert).toHaveAttribute('data-variant', 'default')
    expect(title).toHaveAttribute('data-scope', 'alert')
    expect(title).toHaveAttribute('data-slot', 'title')

    expect(screen.getByRole('link', { name: 'View status details' })).toBeInTheDocument()
    expect(screen.getByText(/Ready/)).toHaveAttribute('data-scope', 'alert')
    expect(screen.getByText(/Ready/)).toHaveAttribute('data-slot', 'description')
    expect(action).toHaveAttribute('data-scope', 'alert')
    expect(action).toHaveAttribute('data-slot', 'action')
  })
})
