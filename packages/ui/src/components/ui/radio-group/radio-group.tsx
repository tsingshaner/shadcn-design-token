import { Radio } from '@base-ui/react/radio'
import { RadioGroup as RadioGroupPrimitive } from '@base-ui/react/radio-group'
import { cn } from 'cn'

type RadioGroupProps = RadioGroupPrimitive.Props
type RadioGroupItemProps = Radio.Root.Props

const RadioGroup = ({ className, ...props }: RadioGroupProps) => (
  <RadioGroupPrimitive
    className={cn('grid w-full gap-2', className)}
    data-scope="radio-group"
    data-slot="root"
    {...props}
  />
)

const RadioGroupItem = ({ className, ...props }: RadioGroupItemProps) => (
  <Radio.Root
    className={cn(
      'group/radio-group-item peer relative flex aspect-square size-4 shrink-0 rounded-full border border-input outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary data-[checked]:border-primary data-[checked]:bg-primary data-[checked]:text-primary-foreground dark:bg-input/30 dark:data-[checked]:bg-primary dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40',
      className
    )}
    data-scope="radio-group"
    data-slot="item"
    {...props}
  >
    <Radio.Indicator className="flex size-4 items-center justify-center" data-scope="radio-group" data-slot="indicator">
      <span
        className="absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-foreground"
        data-scope="radio-group"
        data-slot="indicator-icon"
      />
    </Radio.Indicator>
  </Radio.Root>
)

export type { RadioGroupItemProps, RadioGroupProps }
export { RadioGroup, RadioGroupItem }
