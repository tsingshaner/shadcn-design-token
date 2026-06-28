import type { ComponentProps, CSSProperties, ReactNode } from 'react'

import { cn } from '@/lib/utils'

type ChartConfig = Record<string, { color?: string; label?: ReactNode }>
type ChartDatum = {
  color?: string
  label: string
  value: number
}
type ChartContainerProps = ComponentProps<'div'> & {
  config?: ChartConfig
}
type ChartBarSeriesProps = ComponentProps<'svg'> & {
  data: ChartDatum[]
}
type ChartLineSeriesProps = ComponentProps<'svg'> & {
  data: ChartDatum[]
}
type ChartTooltipProps = ComponentProps<'div'>
type ChartLegendProps = ComponentProps<'div'> & {
  config: ChartConfig
}

const getMaxValue = (data: ChartDatum[]) => Math.max(...data.map((item) => item.value), 1)

const ChartContainer = ({ className, config = {}, style, ...props }: ChartContainerProps) => {
  const variables = Object.fromEntries(
    Object.entries(config)
      .filter(([, value]) => value.color)
      .map(([key, value]) => [`--color-${key}`, value.color])
  ) as CSSProperties

  return (
    <div
      className={cn(
        'flex aspect-video w-full flex-col gap-3 rounded-md border bg-card p-4 text-card-foreground',
        className
      )}
      data-slot="chart"
      style={{ ...variables, ...style }}
      {...props}
    />
  )
}

const ChartBarSeries = ({ className, data, ...props }: ChartBarSeriesProps) => {
  const maxValue = getMaxValue(data)
  const barWidth = 100 / Math.max(data.length, 1)

  return (
    <svg
      aria-label="Bar chart"
      className={cn('min-h-0 flex-1 overflow-visible', className)}
      data-slot="chart-bar-series"
      role="img"
      viewBox="0 0 100 100"
      {...props}
    >
      {data.map((item, index) => {
        const height = (item.value / maxValue) * 88
        const x = index * barWidth + barWidth * 0.2
        const width = barWidth * 0.6

        return (
          <rect
            aria-label={`${item.label}: ${item.value}`}
            className="fill-primary"
            data-slot="chart-bar"
            fill={item.color}
            height={height}
            key={item.label}
            rx="1.5"
            width={width}
            x={x}
            y={96 - height}
          />
        )
      })}
    </svg>
  )
}

const ChartLineSeries = ({ className, data, ...props }: ChartLineSeriesProps) => {
  const maxValue = getMaxValue(data)
  const points = data
    .map((item, index) => {
      const x = data.length === 1 ? 50 : (index / (data.length - 1)) * 96 + 2
      const y = 96 - (item.value / maxValue) * 88
      return `${x},${y}`
    })
    .join(' ')

  return (
    <svg
      aria-label="Line chart"
      className={cn('min-h-0 flex-1 overflow-visible', className)}
      data-slot="chart-line-series"
      role="img"
      viewBox="0 0 100 100"
      {...props}
    >
      <polyline
        className="fill-none stroke-primary"
        data-slot="chart-line"
        points={points}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      {data.map((item, index) => {
        const x = data.length === 1 ? 50 : (index / (data.length - 1)) * 96 + 2
        const y = 96 - (item.value / maxValue) * 88

        return (
          <circle
            aria-label={`${item.label}: ${item.value}`}
            className="fill-background stroke-primary"
            cx={x}
            cy={y}
            data-slot="chart-point"
            key={item.label}
            r="2.5"
          />
        )
      })}
    </svg>
  )
}

const ChartTooltip = ({ className, ...props }: ChartTooltipProps) => (
  <div
    className={cn('rounded-md border bg-popover px-3 py-1.5 text-popover-foreground text-sm shadow-md', className)}
    data-slot="chart-tooltip"
    {...props}
  />
)

const ChartLegend = ({ className, config, ...props }: ChartLegendProps) => (
  <div className={cn('flex flex-wrap items-center gap-3 text-sm', className)} data-slot="chart-legend" {...props}>
    {Object.entries(config).map(([key, item]) => (
      <div className="flex items-center gap-1.5" data-slot="chart-legend-item" key={key}>
        <span
          className="size-2.5 rounded-sm"
          data-slot="chart-legend-swatch"
          style={{ backgroundColor: item.color ?? `var(--color-${key})` }}
        />
        <span>{item.label ?? key}</span>
      </div>
    ))}
  </div>
)

export type {
  ChartBarSeriesProps,
  ChartConfig,
  ChartContainerProps,
  ChartDatum,
  ChartLegendProps,
  ChartLineSeriesProps,
  ChartTooltipProps
}
export { ChartBarSeries, ChartContainer, ChartLegend, ChartLineSeries, ChartTooltip }
