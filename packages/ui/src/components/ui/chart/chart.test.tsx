import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import { ChartBarSeries, ChartContainer, ChartLegend, ChartTooltip } from './chart'

afterEach(cleanup)

describe('Chart', () => {
  it('renders bars and legend items', () => {
    render(
      <ChartContainer config={{ sales: { color: 'red', label: 'Sales' } }}>
        <ChartBarSeries data={[{ label: 'January', value: 42 }]} />
        <ChartLegend config={{ sales: { color: 'red', label: 'Sales' } }} />
        <ChartTooltip>42 sales</ChartTooltip>
      </ChartContainer>
    )

    expect(screen.getByLabelText('January: 42').closest('[data-slot="chart"]')).toHaveClass('cn-chart')
    expect(screen.getByLabelText('January: 42')).toHaveAttribute('data-slot', 'chart-bar')
    expect(screen.getByText('42 sales')).toHaveClass('cn-chart-tooltip')
    expect(screen.getByText('Sales')).toBeInTheDocument()
  })
})
