import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import { Slider } from './slider'

describe('Slider', () => {
  afterEach(() => {
    cleanup()
  })

  test('renders a slider input with the default value', () => {
    render(<Slider aria-label="Volume" defaultValue={25} />)

    expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '25')
  })

  test('renders multiple thumbs for range values', () => {
    render(<Slider defaultValue={[25, 50]} />)

    expect(screen.getAllByRole('slider')).toHaveLength(2)
  })
})
