import { Input as InputPrimitive } from '@base-ui/react/input'

import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

type InputProps = ComponentProps<'input'> & {
  variant?: 'filled' | 'outlined'
}

const Input = ({ className, type, variant = 'filled', ...props }: InputProps) => (
  <InputPrimitive
    className={cn(
      'cn-input flex h-14 w-full min-w-0 px-4 py-2 text-base text-foreground caret-primary outline-none transition-colors selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-8 file:border-0 file:bg-transparent file:font-medium file:text-foreground file:text-sm placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:text-muted-foreground aria-invalid:border-destructive',
      variant === 'filled'
        ? 'rounded-t-[4px] rounded-b-none border-0 border-b border-b-muted-foreground bg-muted focus-visible:border-b-2 focus-visible:border-b-primary disabled:border-b-muted-foreground/30 disabled:bg-muted/40 aria-invalid:focus-visible:border-b-destructive'
        : 'rounded-[4px] border border-muted-foreground bg-transparent focus-visible:border-2 focus-visible:border-primary focus-visible:px-[15px] disabled:border-muted-foreground/30 aria-invalid:focus-visible:border-destructive',
      className
    )}
    data-slot="input"
    data-variant={variant}
    type={type}
    {...props}
  />
)

export type { InputProps }
export { Input }
