import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test, vi } from 'vitest'

import { Switch } from './switch'

describe('Switch', () => {
  afterEach(() => {
    cleanup()
  })

  test('renders a switch control', () => {
    render(<Switch aria-label="Notifications" />)

    expect(screen.getByRole('switch', { name: 'Notifications' })).toHaveAttribute('data-slot', 'switch')
    expect(screen.getByRole('switch', { name: 'Notifications' })).toHaveClass('cn-switch')
  })

  test('calls onCheckedChange when toggled', () => {
    const onCheckedChange = vi.fn()

    render(<Switch aria-label="Notifications" onCheckedChange={onCheckedChange} />)
    fireEvent.click(screen.getByRole('switch', { name: 'Notifications' }))

    expect(onCheckedChange).toHaveBeenCalledWith(true, expect.any(Object))
  })

  test('renders the MD3 thumb and handle', () => {
    render(<Switch aria-label="Notifications" />)

    const control = screen.getByRole('switch', { name: 'Notifications' })

    expect(control.querySelector('[data-slot="switch-thumb"]')).toHaveClass('cn-switch-thumb')
    expect(control.querySelector('[data-slot="switch-handle"]')).toBeInTheDocument()
  })
})
