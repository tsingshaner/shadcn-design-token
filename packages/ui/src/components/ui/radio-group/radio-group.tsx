import { Radio } from '@base-ui/react/radio'
import { RadioGroup as RadioGroupPrimitive } from '@base-ui/react/radio-group'

import { cn } from '@/lib/utils'

type RadioGroupProps = RadioGroupPrimitive.Props
type RadioGroupItemProps = Radio.Root.Props

const RadioGroup = ({ className, ...props }: RadioGroupProps) => (
  <RadioGroupPrimitive className={cn('grid gap-3', className)} data-slot="radio-group" {...props} />
)

const RadioGroupItem = ({ className, ...props }: RadioGroupItemProps) => (
  <Radio.Root
    className={cn(
      'aspect-square size-4 shrink-0 rounded-full border border-input bg-background shadow-xs outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[checked]:border-primary data-[checked]:text-primary',
      className
    )}
    data-slot="radio-group-item"
    {...props}
  >
    <Radio.Indicator className="relative flex items-center justify-center" data-slot="radio-group-indicator">
      <span className="size-2 rounded-full bg-current" />
    </Radio.Indicator>
  </Radio.Root>
)

export type { RadioGroupItemProps, RadioGroupProps }
export { RadioGroup, RadioGroupItem }
