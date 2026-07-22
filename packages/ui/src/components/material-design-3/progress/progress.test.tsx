import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import { linearWavePath, Progress, ProgressLabel, ProgressValue } from './progress'

describe('Progress', () => {
  afterEach(() => {
    cleanup()
  })

  test.each(
    (['linear', 'circular'] as const).flatMap((variant) =>
      (['flat', 'wave'] as const).flatMap((shape) =>
        ([4, 8] as const).flatMap((thickness) =>
          ([40, null] as const).map((value) => [variant, shape, thickness, value] as const)
        )
      )
    )
  )('renders the %s %s %ipx variant with value %s', (variant, shape, thickness, value) => {
    render(<Progress aria-label="Loading" shape={shape} thickness={thickness} value={value} variant={variant} />)

    const progress = screen.getByRole('progressbar', { name: 'Loading' })
    const indicator = progress.querySelector('[data-slot="progress-indicator"]')
    expect(progress).toHaveAttribute('data-variant', variant)
    expect(progress).toHaveAttribute('data-shape', shape)
    expect(progress).toHaveAttribute('data-thickness', String(thickness))
    expect(progress.getAttribute('aria-valuenow')).toBe(value === null ? null : String(value))
    expect(indicator).toHaveAttribute(value === null ? 'data-indeterminate' : 'data-progressing')
  })

  test.each(
    (['flat', 'wave'] as const).flatMap((shape) => ([4, 8] as const).map((thickness) => [shape, thickness] as const))
  )('styles the linear %s %ipx variant', (shape, thickness) => {
    const gaps = { 4: 6, 8: 8 } as const
    const sizes = { flat: { 4: 'h-1', 8: 'h-2' }, wave: { 4: 'h-3', 8: 'h-[14px]' } } as const

    render(<Progress shape={shape} thickness={thickness} value={40} />)

    const progress = screen.getByRole('progressbar')
    const track = progress.querySelector('[data-slot="progress-track"]')
    const indicator = progress.querySelector('[data-slot="progress-indicator"]')
    const rest = progress.querySelector('[data-slot="progress-track-rest"]')
    const wave = progress.querySelector('[data-slot="progress-wave"]')
    expect(track).toHaveClass(sizes[shape][thickness])
    expect(rest).toHaveClass('rounded-full')
    expect(rest).toHaveStyle({ left: `calc(40% + ${gaps[thickness]}px)` })
    expect(wave?.tagName.toLowerCase()).toBe(shape === 'wave' ? 'svg' : undefined)
    expect(indicator).toHaveClass(shape === 'wave' ? 'bg-background' : 'bg-primary')
  })

  test('rounds both ends of the linear wave path', () => {
    render(<Progress shape="wave" value={40} />)

    const wave = screen.getByRole('progressbar').querySelector('[data-slot="progress-wave"] path')
    expect(wave).toHaveAttribute('stroke-linecap', 'round')
    expect(wave).toHaveAttribute('stroke-width', '4')
  })

  test('preserves the existing wave when progress grows', () => {
    const before = linearWavePath(48, 12, 4)
    const after = linearWavePath(50, 12, 4)

    expect(after.slice(0, before.length + 2)).toBe(`${before} L`)
  })

  test.each(
    (['flat', 'wave'] as const).flatMap((shape) => ([4, 8] as const).map((thickness) => [shape, thickness] as const))
  )('styles the circular %s %ipx variant', (shape, thickness) => {
    render(<Progress shape={shape} thickness={thickness} value={40} variant="circular" />)

    const indicator = screen.getByRole('progressbar').querySelector('path')
    const track = screen.getByRole('progressbar').querySelector('[data-slot="progress-track"]')
    const rest = screen.getByRole('progressbar').querySelector('[data-slot="progress-circular-rest"]')
    expect(track).toHaveClass(
      {
        flat: { 4: 'size-10', 8: 'size-11' },
        wave: { 4: 'size-12', 8: 'size-13' }
      }[shape][thickness]
    )
    expect(indicator).toHaveAttribute('stroke-width', String(thickness))
    expect(indicator).toHaveAttribute('stroke-linecap', 'round')
    expect(indicator).toHaveAttribute('stroke-linejoin', 'round')
    expect(indicator?.getAttribute('d')?.split('L')).toHaveLength(145)
    expect(rest).toHaveAttribute('stroke-linecap', 'round')
    expect(rest).toHaveAttribute('stroke-dasharray')
    expect(rest).toHaveAttribute('transform', expect.stringContaining('rotate('))
  })

  test('rotates circular indeterminate progress around the SVG center', () => {
    render(<Progress value={null} variant="circular" />)

    const progress = screen.getByRole('progressbar')
    expect(progress.querySelector('svg')).toHaveClass('origin-center', 'animate-spin')
    expect(progress.querySelector('path')).not.toHaveClass('animate-spin')
  })

  test.each(['linear', 'circular'] as const)('hides the %s track', (variant) => {
    render(<Progress aria-label="Loading" showTrack={false} value={40} variant={variant} />)

    const track = screen.getByRole('progressbar', { name: 'Loading' }).querySelector('[data-slot="progress-track"]')
    if (variant === 'linear') {
      expect(track).toHaveClass('bg-transparent')
    } else {
      expect(track?.querySelectorAll('circle')).toHaveLength(0)
    }
  })

  test('renders the linear determinate stop indicator until completion', () => {
    const { rerender } = render(<Progress value={40} />)

    expect(screen.getByRole('progressbar').querySelector('[data-slot="progress-stop"]')).toHaveClass('size-1')

    rerender(<Progress value={100} />)
    expect(screen.getByRole('progressbar').querySelector('[data-slot="progress-stop"]')).not.toBeInTheDocument()
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
