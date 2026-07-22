import { Progress as ProgressPrimitive } from '@base-ui/react/progress'
import { useLayoutEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils'

type ProgressProps = ProgressPrimitive.Root.Props & {
  shape?: 'flat' | 'wave'
  showTrack?: boolean
  thickness?: 4 | 8
  variant?: 'circular' | 'linear'
}
type ProgressTrackProps = ProgressPrimitive.Track.Props
type ProgressIndicatorProps = ProgressPrimitive.Indicator.Props
type ProgressLabelProps = ProgressPrimitive.Label.Props
type ProgressValueProps = ProgressPrimitive.Value.Props

const linearIndeterminateKeyframes =
  '@keyframes md3-progress-linear{0%{transform:translateX(-100%)}100%{transform:translateX(200%)}}'
const linearGaps = { 4: 6, 8: 8 } as const
const linearHeights = { 4: 12, 8: 14 } as const
const linearSizes = { flat: { 4: 'h-1', 8: 'h-2' }, wave: { 4: 'h-3', 8: 'h-[14px]' } } as const
const linearThicknesses = { 4: 'h-1', 8: 'h-2' } as const

const circularSizes = {
  flat: { 4: ['size-10', 40], 8: ['size-11', 44] },
  wave: { 4: ['size-12', 48], 8: ['size-13', 52] }
} as const

const circularPath = (center: number, radius: number, amplitude: number) =>
  Array.from({ length: 145 }, (_, index) => {
    const angle = (index * Math.PI * 2) / 144
    const waveRadius = radius + Math.sin(angle * 8) * amplitude
    return `${index === 0 ? 'M' : 'L'} ${center + Math.cos(angle) * waveRadius} ${center + Math.sin(angle) * waveRadius}`
  }).join(' ')

type ProgressVisualProps = {
  percentage: number
  shape: 'flat' | 'wave'
  showTrack: boolean
  thickness: 4 | 8
  value: number | null
}

const linearWavePath = (width: number, height: number, thickness: number) => {
  const start = thickness / 2
  const length = Math.max(0, width - thickness)
  const center = height / 2
  const amplitude = (height - thickness) / 2
  const segments = Math.ceil(length / 2)

  return Array.from({ length: segments + 1 }, (_, index) => {
    const offset = Math.min(index * 2, length)
    const point = `${start + offset} ${center + Math.sin((offset * Math.PI * 2) / 44) * amplitude}`
    return `${index === 0 ? 'M' : 'L'} ${point}`
  }).join(' ')
}

const LinearWave = ({ thickness }: Pick<ProgressVisualProps, 'thickness'>) => {
  const height = linearHeights[thickness]
  const ref = useRef<SVGSVGElement>(null)
  const [width, setWidth] = useState(0)

  useLayoutEffect(() => {
    const element = ref.current
    if (!element) {
      return
    }

    setWidth(element.getBoundingClientRect().width)
    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width))
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 size-full overflow-visible"
      data-slot="progress-wave"
      preserveAspectRatio="none"
      ref={ref}
      viewBox={`0 0 ${width || 1} ${height}`}
    >
      <path
        className="fill-none stroke-primary"
        d={width > 0 ? linearWavePath(width, height, thickness) : undefined}
        strokeLinecap="round"
        strokeWidth={thickness}
      />
    </svg>
  )
}

const LinearProgressVisual = ({ percentage, shape, showTrack, thickness, value }: ProgressVisualProps) => {
  return (
    <ProgressTrack
      className={cn(
        linearSizes[shape][thickness],
        (shape === 'wave' || !showTrack || value !== null) && 'bg-transparent',
        shape === 'wave' && 'rounded-none'
      )}
    >
      <style>{linearIndeterminateKeyframes}</style>
      {showTrack && value !== null && percentage < 100 && (
        <span
          aria-hidden="true"
          className={cn(
            'absolute top-1/2 right-0 -translate-y-1/2 rounded-full bg-secondary',
            linearThicknesses[thickness]
          )}
          data-slot="progress-track-rest"
          style={{ left: percentage > 0 ? `calc(${percentage}% + ${linearGaps[thickness]}px)` : 0 }}
        />
      )}
      <ProgressIndicator
        className={cn(
          'relative data-[indeterminate]:w-1/2 data-[indeterminate]:animate-[md3-progress-linear_1.5s_ease-in-out_infinite] motion-reduce:data-[indeterminate]:animate-none',
          shape === 'wave' && 'absolute inset-y-0 rounded-none bg-background'
        )}
      >
        {shape === 'wave' && <LinearWave thickness={thickness} />}
      </ProgressIndicator>
      {showTrack && value !== null && percentage < 100 && (
        <span
          aria-hidden="true"
          className="absolute top-1/2 right-0 size-1 -translate-y-1/2 rounded-full bg-primary"
          data-slot="progress-stop"
        />
      )}
    </ProgressTrack>
  )
}

const CircularProgressVisual = ({ percentage, shape, showTrack, thickness, value }: ProgressVisualProps) => {
  const [sizeClass, size] = circularSizes[shape][thickness]
  const center = size / 2
  const amplitude = shape === 'wave' ? 1.5 : 0
  const radius = (size - thickness) / 2 - amplitude
  const activePercentage = value === null ? 25 : percentage
  const gap = ((linearGaps[thickness] + thickness) / (Math.PI * 2 * radius)) * 100
  const restPercentage = Math.max(0, 100 - activePercentage - gap * 2)

  return (
    <ProgressTrack className={cn('overflow-visible bg-transparent', sizeClass)}>
      <ProgressIndicator className="size-full bg-transparent" style={{ height: '100%', width: '100%' }}>
        <svg
          aria-hidden="true"
          className={cn('size-full -rotate-90 overflow-visible', value === null && 'origin-center animate-spin')}
          viewBox={`0 0 ${size} ${size}`}
        >
          {showTrack && restPercentage > 0 && (
            <circle
              className="fill-none stroke-secondary"
              cx={center}
              cy={center}
              data-slot="progress-circular-rest"
              pathLength="100"
              r={radius}
              strokeDasharray={`${restPercentage} ${100 - restPercentage}`}
              strokeLinecap="round"
              strokeWidth={thickness}
              transform={`rotate(${(activePercentage + gap) * 3.6} ${center} ${center})`}
            />
          )}
          <path
            className="fill-none stroke-primary transition-[stroke-dasharray] duration-300"
            d={circularPath(center, radius, amplitude)}
            pathLength="100"
            strokeDasharray={`${activePercentage} ${100 - activePercentage}`}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={thickness}
          />
        </svg>
      </ProgressIndicator>
    </ProgressTrack>
  )
}

const Progress = ({
  children,
  className,
  max = 100,
  min = 0,
  shape = 'flat',
  showTrack = true,
  thickness = 4,
  value,
  variant = 'linear',
  ...props
}: ProgressProps) => {
  const percentage = Math.min(100, Math.max(0, ((Number(value) - min) / Math.max(Number.EPSILON, max - min)) * 100))

  return (
    <ProgressPrimitive.Root
      className={cn('cn-progress-root flex flex-wrap gap-3', variant === 'linear' ? 'w-full' : 'w-fit', className)}
      data-shape={shape}
      data-slot="progress"
      data-thickness={thickness}
      data-variant={variant}
      max={max}
      min={min}
      value={value}
      {...props}
    >
      {children}
      {variant === 'linear' ? (
        <LinearProgressVisual {...{ percentage, shape, showTrack, thickness, value }} />
      ) : (
        <CircularProgressVisual {...{ percentage, shape, showTrack, thickness, value }} />
      )}
    </ProgressPrimitive.Root>
  )
}

const ProgressTrack = ({ className, ...props }: ProgressTrackProps) => (
  <ProgressPrimitive.Track
    className={cn(
      'cn-progress-track relative flex h-1 w-full items-center overflow-x-hidden rounded-full bg-secondary',
      className
    )}
    data-slot="progress-track"
    {...props}
  />
)

const ProgressIndicator = ({ className, ...props }: ProgressIndicatorProps) => (
  <ProgressPrimitive.Indicator
    className={cn('cn-progress-indicator h-full rounded-full bg-primary transition-all', className)}
    data-slot="progress-indicator"
    {...props}
  />
)

const ProgressLabel = ({ className, ...props }: ProgressLabelProps) => (
  <ProgressPrimitive.Label
    className={cn('cn-progress-label font-medium text-sm', className)}
    data-slot="progress-label"
    {...props}
  />
)

const ProgressValue = ({ className, ...props }: ProgressValueProps) => (
  <ProgressPrimitive.Value
    className={cn('cn-progress-value text-muted-foreground text-sm tabular-nums', className)}
    data-slot="progress-value"
    {...props}
  />
)

export type { ProgressIndicatorProps, ProgressLabelProps, ProgressProps, ProgressTrackProps, ProgressValueProps }
export { linearWavePath, Progress, ProgressIndicator, ProgressLabel, ProgressTrack, ProgressValue }
