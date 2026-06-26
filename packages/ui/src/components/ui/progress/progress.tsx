import { Progress as ProgressPrimitive } from '@base-ui/react/progress'

import { cn } from '../../../lib/utils'

type ProgressProps = ProgressPrimitive.Root.Props

const Progress = ({ className, max = 100, value, ...props }: ProgressProps) => {
  const percent = value == null ? null : Math.max(0, Math.min(100, ((value - 0) / max) * 100))

  return (
    <ProgressPrimitive.Root
      className={cn('relative h-2 w-full overflow-hidden rounded-full bg-primary/20', className)}
      data-slot="progress"
      max={max}
      value={value}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="size-full flex-1 bg-primary transition-transform"
        data-slot="progress-indicator"
        style={{ transform: percent == null ? undefined : `translateX(-${100 - percent}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}

export type { ProgressProps }
export { Progress }
