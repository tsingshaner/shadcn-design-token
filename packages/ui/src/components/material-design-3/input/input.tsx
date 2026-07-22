import { Input as InputPrimitive } from '@base-ui/react/input'

import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

type InputProps = ComponentProps<'input'>

const Input = ({ className, type, ...props }: InputProps) => (
  <InputPrimitive
    className={cn(
      'cn-input flex h-14 w-full min-w-0 rounded-[4px] border border-muted-foreground bg-transparent px-4 py-2 text-base outline-none transition-colors selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-8 file:border-0 file:bg-transparent file:font-medium file:text-foreground file:text-sm placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-[0.38]',
      'focus-visible:border-2 focus-visible:border-primary focus-visible:px-[15px] aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20',
      className
    )}
    data-slot="input"
    type={type}
    {...props}
  />
)

export type { InputProps }
export { Input }
