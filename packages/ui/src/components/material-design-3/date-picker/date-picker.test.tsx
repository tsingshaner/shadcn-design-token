import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test, vi } from 'vitest'

import { DatePicker } from './date-picker'

afterEach(cleanup)

describe('DatePicker', () => {
  test('renders the MD3 outlined field with its selected date', () => {
    render(<DatePicker value={new Date(2026, 5, 27)} />)

    expect(screen.getByRole('button', { name: /june 27, 2026/i })).toBeInTheDocument()
    expect(screen.getByText('MM/DD/YYYY')).toHaveAttribute('data-scope', 'date-picker')
    expect(screen.getByText('MM/DD/YYYY')).toHaveAttribute('data-slot', 'supporting-text')
  })

  test('commits a draft date only after confirmation', () => {
    const onValueChange = vi.fn()

    render(<DatePicker defaultValue={new Date(2026, 5, 27)} onValueChange={onValueChange} />)

    fireEvent.click(screen.getByRole('button', { name: /june 27, 2026/i }))
    fireEvent.click(screen.getByRole('button', { name: 'June 15, 2026' }))

    expect(onValueChange).not.toHaveBeenCalled()

    fireEvent.click(screen.getByRole('button', { name: 'OK' }))

    expect(onValueChange).toHaveBeenCalledWith(new Date(2026, 5, 15))
    expect(screen.getByRole('button', { name: /june 15, 2026/i })).toBeInTheDocument()
  })

  test('discards a draft selection on cancel', () => {
    const onValueChange = vi.fn()

    render(<DatePicker defaultValue={new Date(2026, 5, 27)} onValueChange={onValueChange} />)

    fireEvent.click(screen.getByRole('button', { name: /june 27, 2026/i }))
    fireEvent.click(screen.getByRole('button', { name: 'June 15, 2026' }))
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }))

    expect(onValueChange).not.toHaveBeenCalled()
    expect(screen.getByRole('button', { name: /june 27, 2026/i })).toBeInTheDocument()
  })
})
