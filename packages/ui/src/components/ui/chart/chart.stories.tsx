import { expect, within } from 'storybook/test'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { ChartBarSeries, type ChartConfig, ChartContainer, ChartLegend } from './chart'

const meta = {
  component: ChartContainer,
  parameters: {
    docs: {
      description: {
        component:
          'Composable chart primitives for visualizing token-driven data series. Examples and guidance reference the [shadcn/ui Chart documentation](https://ui.shadcn.com/docs/components/base/chart.md).'
      }
    }
  },
  tags: ['autodocs'],
  title: 'Components/Chart'
} satisfies Meta<typeof ChartContainer>

export default meta

type Story = StoryObj<typeof meta>

const chartConfig = {
  desktop: { color: 'var(--primary)', label: 'Desktop' },
  mobile: { color: 'var(--muted-foreground)', label: 'Mobile' }
} satisfies ChartConfig

export const BarChart: Story = {
  render: () => (
    <ChartContainer config={chartConfig}>
      <ChartBarSeries
        data={[
          { color: 'var(--color-desktop)', label: 'Jan', value: 186 },
          { color: 'var(--color-mobile)', label: 'Feb', value: 305 },
          { color: 'var(--color-desktop)', label: 'Mar', value: 237 }
        ]}
      />
      <ChartLegend config={chartConfig} />
    </ChartContainer>
  )
}
BarChart.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(canvasElement.querySelector('[data-slot="chart"]')?.getAttribute('style')).toContain(
    '--color-desktop: var(--primary)'
  )
  await expect(canvas.getByRole('img', { name: 'Bar chart' })).toHaveAttribute('data-slot', 'chart-bar-series')
  await expect(canvas.getByLabelText('Feb: 305')).toHaveAttribute('data-slot', 'chart-bar')
  await expect(canvasElement.querySelectorAll('[data-slot="chart-bar"]')).toHaveLength(3)
  await expect(canvas.getByText('Desktop')).toBeVisible()
  await expect(canvas.getByText('Mobile')).toBeVisible()
}
