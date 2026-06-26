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
  })

  test('calls onCheckedChange when toggled', () => {
    const onCheckedChange = vi.fn()

    render(<Checkbox aria-label="Accept" onCheckedChange={onCheckedChange} />)
    fireEvent.click(screen.getByRole('checkbox', { name: 'Accept' }))

    expect(onCheckedChange).toHaveBeenCalledWith(true, expect.any(Object))
  })
})
