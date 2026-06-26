import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import { Alert, AlertDescription, AlertTitle } from './alert'

describe('Alert', () => {
  afterEach(() => {
    cleanup()
  })

  test('renders an alert region', () => {
    render(
      <Alert>
        <AlertTitle>Status</AlertTitle>
        <AlertDescription>Ready</AlertDescription>
      </Alert>
    )

    expect(screen.getByRole('alert')).toHaveAttribute('data-slot', 'alert')
    expect(screen.getByText('Status')).toHaveAttribute('data-slot', 'alert-title')
  })
})
