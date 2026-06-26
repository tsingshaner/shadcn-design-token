import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { Calendar } from './calendar'

afterEach(cleanup)

describe('Calendar', () => {
  it('renders the month grid and selects a date', () => {
    const onSelect = vi.fn()

    render(<Calendar defaultMonth={new Date(2026, 5, 1)} onSelect={onSelect} selected={new Date(2026, 5, 27)} />)

    expect(screen.getByText('June 2026')).toBeInTheDocument()
    expect(screen.getByLabelText('June 27, 2026')).toHaveAttribute('data-selected', 'true')

    fireEvent.click(screen.getByLabelText('June 15, 2026'))

    expect(onSelect).toHaveBeenCalledWith(new Date(2026, 5, 15))
  })
})
