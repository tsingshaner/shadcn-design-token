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

    expect(screen.getByLabelText('January: 42').closest('[data-scope="chart"][data-slot="root"]')).toHaveAttribute(
      'data-scope',
      'chart'
    )
    expect(screen.getByLabelText('January: 42').closest('[data-scope="chart"][data-slot="root"]')).toHaveAttribute(
      'data-slot',
      'root'
    )
    expect(screen.getByLabelText('January: 42')).toHaveAttribute('data-scope', 'chart')
    expect(screen.getByLabelText('January: 42')).toHaveAttribute('data-slot', 'bar')
    expect(screen.getByText('42 sales')).toHaveAttribute('data-scope', 'chart')
    expect(screen.getByText('42 sales')).toHaveAttribute('data-slot', 'tooltip')
    expect(screen.getByText('Sales')).toBeInTheDocument()
  })
})
