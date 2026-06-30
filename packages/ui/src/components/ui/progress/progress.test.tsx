import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import { Progress, ProgressLabel, ProgressValue } from './progress'

describe('Progress', () => {
  afterEach(() => {
    cleanup()
  })

  test('renders progressbar with value', () => {
    render(<Progress aria-label="Loading" value={40} />)

    const progress = screen.getByRole('progressbar', { name: 'Loading' })
    expect(progress).toHaveAttribute('aria-valuenow', '40')
    expect(progress).toHaveClass('cn-progress-root')
  })

  test('renders label and value slots', () => {
    render(
      <Progress value={56}>
        <ProgressLabel>Upload progress</ProgressLabel>
        <ProgressValue />
      </Progress>
    )

    const label = screen.getByText('Upload progress')
    const value = screen.getByText('56%')
    expect(label).toHaveAttribute('data-slot', 'progress-label')
    expect(label).toHaveClass('cn-progress-label')
    expect(value).toHaveAttribute('data-slot', 'progress-value')
    expect(value).toHaveClass('cn-progress-value')
  })
})
