import { Progress as ProgressPrimitive } from '@base-ui/react/progress'

import { cn } from '@/lib/utils'

type ProgressProps = ProgressPrimitive.Root.Props
type ProgressTrackProps = ProgressPrimitive.Track.Props
type ProgressIndicatorProps = ProgressPrimitive.Indicator.Props
type ProgressLabelProps = ProgressPrimitive.Label.Props
type ProgressValueProps = ProgressPrimitive.Value.Props

const Progress = ({ children, className, max = 100, value, ...props }: ProgressProps) => {
  const percent = value == null ? null : Math.max(0, Math.min(100, ((value - 0) / max) * 100))

  return (
    <ProgressPrimitive.Root
      className={cn('grid w-full gap-2', className)}
      data-slot="progress"
      max={max}
      value={value}
      {...props}
    >
      {children}
      <ProgressTrack>
        <ProgressIndicator style={{ transform: percent == null ? undefined : `translateX(-${100 - percent}%)` }} />
      </ProgressTrack>
    </ProgressPrimitive.Root>
  )
}

const ProgressTrack = ({ className, ...props }: ProgressTrackProps) => (
  <ProgressPrimitive.Track
    className={cn('relative h-2 w-full overflow-hidden rounded-full bg-primary/20', className)}
    data-slot="progress-track"
    {...props}
  />
)

const ProgressIndicator = ({ className, ...props }: ProgressIndicatorProps) => (
  <ProgressPrimitive.Indicator
    className={cn('size-full flex-1 bg-primary transition-transform', className)}
    data-slot="progress-indicator"
    {...props}
  />
)

const ProgressLabel = ({ className, ...props }: ProgressLabelProps) => (
  <ProgressPrimitive.Label className={cn('font-medium text-sm', className)} data-slot="progress-label" {...props} />
)

const ProgressValue = ({ className, ...props }: ProgressValueProps) => (
  <ProgressPrimitive.Value
    className={cn('text-muted-foreground text-sm tabular-nums', className)}
    data-slot="progress-value"
    {...props}
  />
)

export type { ProgressIndicatorProps, ProgressLabelProps, ProgressProps, ProgressTrackProps, ProgressValueProps }
export { Progress, ProgressIndicator, ProgressLabel, ProgressTrack, ProgressValue }
