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
