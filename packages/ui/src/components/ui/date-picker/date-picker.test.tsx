import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import { DatePicker } from './date-picker'

afterEach(cleanup)

describe('DatePicker', () => {
  it('renders the selected date on the trigger', () => {
    render(<DatePicker value={new Date(2026, 5, 27)} />)

    expect(screen.getByRole('button', { name: /june 27, 2026/i })).toBeInTheDocument()
  })
})
