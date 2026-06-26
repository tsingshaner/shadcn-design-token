import { OTPField as InputOTPPrimitive } from '@base-ui/react/otp-field'

import type { ComponentProps } from 'react'

import { cn } from '../../../lib/utils'

type InputOTPProps = InputOTPPrimitive.Root.Props
type InputOTPSlotProps = InputOTPPrimitive.Input.Props
type InputOTPGroupProps = ComponentProps<'div'>
type InputOTPSeparatorProps = ComponentProps<'div'>

const InputOTP = ({ className, ...props }: InputOTPProps) => (
  <InputOTPPrimitive.Root className={cn('flex items-center gap-2', className)} data-slot="input-otp" {...props} />
)

const InputOTPGroup = ({ className, ...props }: InputOTPGroupProps) => (
  <div className={cn('flex items-center', className)} data-slot="input-otp-group" {...props} />
)

const InputOTPSlot = ({ className, ...props }: InputOTPSlotProps) => (
  <InputOTPPrimitive.Input
    className={cn(
      'relative flex size-10 items-center justify-center border-input border-y border-r bg-background text-center text-sm shadow-xs outline-none transition-all first:rounded-l-md first:border-l last:rounded-r-md focus:z-10 focus:border-ring focus:ring-3 focus:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20',
      className
    )}
    data-slot="input-otp-slot"
    {...props}
  />
)

const InputOTPSeparator = ({ className, ...props }: InputOTPSeparatorProps) => (
  <div className={cn('px-2 text-muted-foreground', className)} data-slot="input-otp-separator" {...props}>
    <span aria-hidden="true">-</span>
  </div>
)

export type { InputOTPGroupProps, InputOTPProps, InputOTPSeparatorProps, InputOTPSlotProps }
export { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot }
