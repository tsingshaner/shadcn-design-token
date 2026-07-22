import { Checkbox as CheckboxPrimitive } from '@base-ui/react/checkbox'
import { CheckIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

type CheckboxProps = CheckboxPrimitive.Root.Props

const Checkbox = ({ className, ...props }: CheckboxProps) => (
  <CheckboxPrimitive.Root
    className={cn(
      'cn-checkbox peer relative flex size-[18px] shrink-0 items-center justify-center rounded-[2px] border-2 border-muted-foreground bg-transparent outline-none transition-colors after:absolute after:-inset-[11px] after:rounded-full after:bg-current after:opacity-0 after:transition-opacity hover:after:opacity-[0.08] focus-visible:after:opacity-[0.1] active:after:opacity-[0.1] disabled:cursor-not-allowed disabled:opacity-[0.38] disabled:after:hidden group-has-disabled/field:opacity-[0.38] aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground',
      className
    )}
    data-slot="checkbox"
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className="cn-checkbox-indicator z-10 grid place-content-center text-current transition-none [&>svg]:size-4"
      data-slot="checkbox-indicator"
    >
      <CheckIcon />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
)

export type { CheckboxProps }
export { Checkbox }
