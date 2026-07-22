import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import { Slider } from './slider'

describe('Slider', () => {
  afterEach(() => {
    cleanup()
  })

  test('renders a slider input with the default value', () => {
    render(<Slider aria-label="Volume" defaultValue={25} />)

    expect(screen.getByRole('slider', { hidden: true })).toHaveAttribute('aria-valuenow', '25')
    expect(document.querySelector('[data-slot="slider-control"]')).toHaveClass('cn-slider')
    expect(document.querySelector('[data-slot="slider-track"]')).toHaveClass('cn-slider-track')
    expect(document.querySelector('[data-slot="slider-range"]')).toHaveClass('cn-slider-range')
    expect(document.querySelector('[data-slot="slider-thumb"]')).toHaveClass('cn-slider-thumb', 'size-5', 'bg-primary')
  })

  test('renders multiple thumbs for range values', () => {
    render(<Slider defaultValue={[25, 50]} />)

    expect(screen.getAllByRole('slider', { hidden: true })).toHaveLength(2)
  })
})
