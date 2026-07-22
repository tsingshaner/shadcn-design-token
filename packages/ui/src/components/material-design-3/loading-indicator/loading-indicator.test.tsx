import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import { LoadingIndicator } from './loading-indicator'

describe('LoadingIndicator', () => {
  afterEach(() => {
    cleanup()
  })

  test('renders an accessible indeterminate progressbar', () => {
    render(<LoadingIndicator />)

    const indicator = screen.getByRole('progressbar', { name: 'Loading' })
    expect(indicator).not.toHaveAttribute('aria-valuenow')
    expect(indicator).toHaveClass('size-12')
    expect(indicator.querySelector('svg')).toHaveClass('size-[38px]')
    expect(indicator.querySelector('path')).toHaveAttribute('stroke-linecap', 'round')
    expect(indicator.querySelector('path')).toHaveAttribute('stroke-width', '8')
  })

  test('renders the optional container', () => {
    render(<LoadingIndicator aria-label="Fetching" showContainer />)

    expect(screen.getByRole('progressbar', { name: 'Fetching' })).toHaveClass('bg-primary/10')
  })

  test('includes the seven-step morph and reduced-motion fallback', () => {
    render(<LoadingIndicator />)

    const styles = document.querySelector('style')?.textContent
    expect(styles).toContain('85.714%')
    expect(styles).toContain('@media (prefers-reduced-motion: reduce)')
    expect(styles).toContain('animation: none')
  })
})
