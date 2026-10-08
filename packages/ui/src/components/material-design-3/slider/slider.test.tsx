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
    expect(document.querySelector('[data-scope="slider"][data-slot="range"]')).toHaveClass('rounded-[2px]')
    const range = document.querySelector<HTMLElement>('[data-scope="slider"][data-slot="range"]')

    expect(range).toHaveStyle({
      width: 'max(0px, calc(25% - var(--slider-track-gap)))'
    })
    expect(range?.style.borderStartStartRadius).toBe('var(--slider-track-radius)')
    expect(document.querySelector('[data-scope="slider"][data-slot="track"]')).toHaveClass('data-horizontal:h-4')
    expect(document.querySelector('[data-scope="slider"][data-slot="thumb"]')).toHaveAttribute('data-scope', 'slider')
    expect(document.querySelector('[data-scope="slider"][data-slot="thumb"]')).toHaveAttribute('data-slot', 'thumb')
    expect(document.querySelector('[data-scope="slider"][data-slot="thumb"]')).toHaveClass(
      'data-horizontal:h-11',
      'data-horizontal:w-1',
      'bg-primary'
    )
  })

  test('renders multiple thumbs for range values', () => {
    render(<Slider defaultValue={[25, 50]} />)

    expect(screen.getAllByRole('slider', { hidden: true })).toHaveLength(2)
  })

  test('derives the range variant from an array value', () => {
    render(<Slider aria-label="Price range" defaultValue={[25, 50]} />)

    expect(screen.getByRole('group', { name: 'Price range' })).toHaveAttribute('data-variant', 'range')
  })

  test.each(['xs', 'sm', 'md', 'lg', 'xl'] as const)('exposes the %s size', (size) => {
    render(<Slider aria-label={`${size} slider`} defaultValue={50} size={size} />)

    const root = screen.getByRole('group', { name: `${size} slider` })

    expect(root).toHaveAttribute('data-size', size)
  })

  test('uses the standard variant by default', () => {
    render(<Slider aria-label="Standard value" defaultValue={25} />)

    expect(screen.getByRole('group', { name: 'Standard value' })).toHaveAttribute('data-variant', 'standard')
  })

  test('marks a centered slider and retains its active indicator', () => {
    render(<Slider aria-label="Centered value" defaultValue={40} max={100} min={-100} variant="centered" />)

    expect(screen.getByRole('group', { name: 'Centered value' })).toHaveAttribute('data-variant', 'centered')
    expect(document.querySelector('[data-scope="slider"][data-slot="range"]')).toBeInTheDocument()
  })

  test('renders one stop for every discrete value', () => {
    render(<Slider defaultValue={50} max={100} min={0} showStops step={25} />)

    expect(document.querySelectorAll('[data-scope="slider"][data-slot="stop"]')).toHaveLength(5)
  })

  test('renders the current value in the value indicator', () => {
    render(<Slider defaultValue={40} showValueIndicator />)

    expect(document.querySelector('[data-scope="slider"][data-slot="value-indicator"]')).toHaveTextContent('40')
  })

  test('renders a value indicator for each range thumb', () => {
    render(<Slider defaultValue={[20, 80]} showValueIndicator />)

    const indicators = document.querySelectorAll('[data-scope="slider"][data-slot="value-indicator"]')

    expect(indicators).toHaveLength(2)
    expect(indicators[0]).toHaveTextContent('20')
    expect(indicators[1]).toHaveTextContent('80')
  })

  test('renders an icon inside the thumb', () => {
    render(<Slider defaultValue={50} icon={<svg aria-label="Volume icon" role="img" />} size="md" />)

    expect(
      document.querySelector('[data-scope="slider"][data-slot="icon"] [aria-label="Volume icon"]')
    ).toBeInTheDocument()
  })

  test('applies vertical sizing without changing slider orientation semantics', () => {
    render(<Slider aria-label="Vertical value" defaultValue={50} orientation="vertical" size="xl" />)

    expect(screen.getByRole('slider', { hidden: true })).toHaveAttribute('aria-orientation', 'vertical')
    expect(screen.getByRole('group', { name: 'Vertical value' })).toHaveAttribute('data-size', 'xl')
    expect(screen.getByRole('group', { name: 'Vertical value' })).toHaveClass('data-vertical:h-full')
  })

  test('disables the slider and its thumb', () => {
    render(<Slider aria-label="Disabled value" defaultValue={50} disabled />)

    expect(screen.getByRole('group', { name: 'Disabled value' })).toHaveAttribute('data-disabled')
    expect(screen.getByRole('slider', { hidden: true })).toBeDisabled()
  })
})
