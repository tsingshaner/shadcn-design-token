import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import { ChartBarSeries, ChartContainer, ChartLegend } from './chart'

afterEach(cleanup)

describe('Chart', () => {
  it('renders bars and legend items', () => {
    render(
      <ChartContainer config={{ sales: { color: 'red', label: 'Sales' } }}>
        <ChartBarSeries data={[{ label: 'January', value: 42 }]} />
        <ChartLegend config={{ sales: { color: 'red', label: 'Sales' } }} />
      </ChartContainer>
    )

    expect(screen.getByLabelText('January: 42')).toHaveAttribute('data-slot', 'chart-bar')
    expect(screen.getByText('Sales')).toBeInTheDocument()
  })
})
