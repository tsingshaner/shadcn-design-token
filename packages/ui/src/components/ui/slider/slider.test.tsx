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
    expect(document.querySelector('[data-scope="slider"][data-slot="control"]')).toHaveAttribute('data-scope', 'slider')
    expect(document.querySelector('[data-scope="slider"][data-slot="control"]')).toHaveAttribute('data-slot', 'control')
    expect(document.querySelector('[data-scope="slider"][data-slot="track"]')).toHaveAttribute('data-scope', 'slider')
    expect(document.querySelector('[data-scope="slider"][data-slot="track"]')).toHaveAttribute('data-slot', 'track')
    expect(document.querySelector('[data-scope="slider"][data-slot="range"]')).toHaveAttribute('data-scope', 'slider')
    expect(document.querySelector('[data-scope="slider"][data-slot="range"]')).toHaveAttribute('data-slot', 'range')
    expect(document.querySelector('[data-scope="slider"][data-slot="thumb"]')).toHaveAttribute('data-scope', 'slider')
    expect(document.querySelector('[data-scope="slider"][data-slot="thumb"]')).toHaveAttribute('data-slot', 'thumb')
  })

  test('renders multiple thumbs for range values', () => {
    render(<Slider defaultValue={[25, 50]} />)

    expect(screen.getAllByRole('slider', { hidden: true })).toHaveLength(2)
  })
})
