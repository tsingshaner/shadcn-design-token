import { Progress as ProgressPrimitive } from '@base-ui/react/progress'

import { cn } from '@/lib/utils'

type ProgressProps = ProgressPrimitive.Root.Props
type ProgressTrackProps = ProgressPrimitive.Track.Props
type ProgressIndicatorProps = ProgressPrimitive.Indicator.Props
type ProgressLabelProps = ProgressPrimitive.Label.Props
type ProgressValueProps = ProgressPrimitive.Value.Props

const Progress = ({ children, className, value, ...props }: ProgressProps) => (
  <ProgressPrimitive.Root
    className={cn('cn-progress-root flex w-full flex-wrap gap-3', className)}
    data-slot="progress"
    value={value}
    {...props}
  >
    {children}
    <ProgressTrack>
      <ProgressIndicator />
    </ProgressTrack>
  </ProgressPrimitive.Root>
)

const ProgressTrack = ({ className, ...props }: ProgressTrackProps) => (
  <ProgressPrimitive.Track
    className={cn(
      'cn-progress-track relative flex h-2 w-full items-center overflow-x-hidden rounded-full bg-primary/20',
      className
    )}
    data-slot="progress-track"
    {...props}
  />
)

const ProgressIndicator = ({ className, ...props }: ProgressIndicatorProps) => (
  <ProgressPrimitive.Indicator
    className={cn('cn-progress-indicator h-full bg-primary transition-all', className)}
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
export { Progress, ProgressIndicator, ProgressLabel, ProgressTrack, ProgressValue }
