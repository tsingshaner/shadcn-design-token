import { Radio } from '@base-ui/react/radio'
import { RadioGroup as RadioGroupPrimitive } from '@base-ui/react/radio-group'

import { cn } from '@/lib/utils'

import { Ripple } from '../ripple'

type RadioGroupProps = RadioGroupPrimitive.Props
type RadioGroupItemProps = Radio.Root.Props

const RadioGroup = ({ className, ...props }: RadioGroupProps) => (
  <RadioGroupPrimitive
    className={cn('cn-radio-group grid w-full gap-2', className)}
    data-slot="radio-group"
    {...props}
  />
)

const RadioGroupItem = ({ className, ...props }: RadioGroupItemProps) => (
  <Radio.Root
    className={cn(
      'cn-radio-group-item group/radio-group-item peer relative flex aspect-square size-5 shrink-0 rounded-full border-2 border-muted-foreground bg-transparent outline-none after:pointer-events-none after:absolute after:-inset-2.5 after:rounded-full after:bg-primary after:opacity-0 focus-visible:after:opacity-[0.1] disabled:cursor-not-allowed disabled:opacity-[0.38] disabled:after:hidden aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-[checked]:border-primary',
      className
    )}
    data-slot="radio-group-item"
    {...props}
  >
    <Radio.Indicator
      className="cn-radio-group-indicator z-10 flex size-full items-center justify-center"
      data-slot="radio-group-indicator"
    >
      <span className="cn-radio-group-indicator-icon size-2.5 rounded-full bg-primary" />
    </Radio.Indicator>
    <Ripple className="text-primary" unbounded />
  </Radio.Root>
)

export type { RadioGroupItemProps, RadioGroupProps }
export { RadioGroup, RadioGroupItem }
