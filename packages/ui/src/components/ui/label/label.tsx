import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

type LabelProps = ComponentProps<'label'>

const Label = ({ className, ...props }: LabelProps) => (
  // biome-ignore lint/a11y/noLabelWithoutControl: consumers pass htmlFor or wrap the associated control.
  <label
    className={cn(
      'cn-label flex select-none items-center gap-2 font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50 group-data-[disabled=true]:pointer-events-none',
      className
    )}
    data-slot="label"
    {...props}
  />
)

export type { LabelProps }
export { Label }
