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
    expect(progress).toHaveAttribute('data-scope', 'progress')
    expect(progress).toHaveAttribute('data-slot', 'root')
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
    expect(label).toHaveAttribute('data-scope', 'progress')
    expect(label).toHaveAttribute('data-slot', 'label')

    expect(value).toHaveAttribute('data-scope', 'progress')
    expect(value).toHaveAttribute('data-slot', 'value')
  })
})
