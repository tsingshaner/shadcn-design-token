import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import { Separator } from './separator'

describe('Separator', () => {
  afterEach(() => {
    cleanup()
  })

  test('renders decorative separator by default', () => {
    render(<Separator data-testid="separator" />)

    expect(screen.getByTestId('separator')).toHaveAttribute('role', 'none')
  })

  test('supports semantic vertical orientation', () => {
    render(<Separator decorative={false} orientation="vertical" />)

    expect(screen.getByRole('separator')).toHaveAttribute('aria-orientation', 'vertical')
  })
})
