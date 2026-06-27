import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import { Progress, ProgressLabel, ProgressValue } from './progress'

describe('Progress', () => {
  afterEach(() => {
    cleanup()
  })

  test('renders progressbar with value', () => {
    render(<Progress aria-label="Loading" value={40} />)

    expect(screen.getByRole('progressbar', { name: 'Loading' })).toHaveAttribute('aria-valuenow', '40')
  })

  test('renders label and value slots', () => {
    render(
      <Progress value={56}>
        <ProgressLabel>Upload progress</ProgressLabel>
        <ProgressValue />
      </Progress>
    )

    expect(screen.getByText('Upload progress')).toHaveAttribute('data-slot', 'progress-label')
    expect(screen.getByText('56%')).toHaveAttribute('data-slot', 'progress-value')
  })
})
