import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test, vi } from 'vitest'

import { Toggle } from './toggle'

describe('Toggle', () => {
  afterEach(() => {
    cleanup()
  })

  test('renders a toggle button and reports pressed state', () => {
    const onPressedChange = vi.fn()

    render(<Toggle onPressedChange={onPressedChange}>Bold</Toggle>)
    fireEvent.click(screen.getByRole('button', { name: 'Bold' }))

    expect(onPressedChange).toHaveBeenCalledWith(true, expect.any(Object))
    expect(screen.getByRole('button', { name: 'Bold' })).toHaveAttribute('data-scope', 'toggle')
    expect(screen.getByRole('button', { name: 'Bold' })).toHaveAttribute('data-slot', 'root')
    expect(screen.getByRole('button', { name: 'Bold' })).toHaveAttribute('data-variant', 'default')
    expect(screen.getByRole('button', { name: 'Bold' })).toHaveAttribute('data-size', 'md')
  })
})
