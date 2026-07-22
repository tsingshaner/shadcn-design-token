import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test, vi } from 'vitest'

import { Checkbox } from './checkbox'

describe('Checkbox', () => {
  afterEach(() => {
    cleanup()
  })

  test('renders an unchecked checkbox', () => {
    render(<Checkbox aria-label="Accept" />)

    expect(screen.getByRole('checkbox', { name: 'Accept' })).toHaveAttribute('data-slot', 'checkbox')
    expect(screen.getByRole('checkbox', { name: 'Accept' })).toHaveClass('cn-checkbox', 'rounded-[4px]')
  })

  test('calls onCheckedChange when toggled', () => {
    const onCheckedChange = vi.fn()

    render(<Checkbox aria-label="Accept" onCheckedChange={onCheckedChange} />)
    fireEvent.click(screen.getByRole('checkbox', { name: 'Accept' }))

    expect(onCheckedChange).toHaveBeenCalledWith(true, expect.any(Object))
  })

  test('applies shadcn v4 checkbox indicator slot class', () => {
    render(<Checkbox aria-label="Accept" defaultChecked />)

    expect(
      screen.getByRole('checkbox', { name: 'Accept' }).querySelector('[data-slot="checkbox-indicator"]')
    ).toHaveClass('cn-checkbox-indicator')
  })
})
