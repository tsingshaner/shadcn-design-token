import { Progress as ProgressPrimitive } from '@base-ui/react/progress'

import { cn } from '@/lib/utils'

type ProgressProps = ProgressPrimitive.Root.Props
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
      <ProgressPrimitive.Track
        className="relative h-2 w-full overflow-hidden rounded-full bg-primary/20"
        data-slot="progress-track"
      >
        <ProgressPrimitive.Indicator
          className="size-full flex-1 bg-primary transition-transform"
          data-slot="progress-indicator"
          style={{ transform: percent == null ? undefined : `translateX(-${100 - percent}%)` }}
        />
      </ProgressPrimitive.Track>
    </ProgressPrimitive.Root>
  )
}

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

export type { ProgressProps }
export { Progress, ProgressLabel, ProgressValue }
