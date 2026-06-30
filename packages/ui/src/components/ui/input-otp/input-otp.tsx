import { OTPField as InputOTPPrimitive } from '@base-ui/react/otp-field'

import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

type InputOTPProps = Omit<InputOTPPrimitive.Root.Props, 'length' | 'onChange' | 'onValueChange'> & {
  length?: number
  maxLength?: number
  onChange?: (value: string) => void
  onValueChange?: InputOTPPrimitive.Root.Props['onValueChange']
  pattern?: RegExp | string
}
type InputOTPSlotProps = InputOTPPrimitive.Input.Props & {
  index?: number
}
type InputOTPGroupProps = ComponentProps<'div'>
type InputOTPSeparatorProps = ComponentProps<'div'>

const InputOTP = ({
  className,
  length,
  maxLength,
  normalizeValue,
  onChange,
  onValueChange,
  pattern,
  ...props
}: InputOTPProps) => {
  const otpLength = length ?? maxLength

  if (!otpLength) {
    throw new Error('InputOTP requires either length or maxLength.')
  }

  return (
    <InputOTPPrimitive.Root
      className={cn('cn-input-otp flex items-center gap-2', className)}
      data-slot="input-otp"
      length={otpLength}
      normalizeValue={(value) => {
        const normalized = normalizeValue?.(value) ?? value

        if (!pattern) {
          return normalized
        }

        const matcher = typeof pattern === 'string' ? new RegExp(pattern) : pattern

        return [...normalized].filter((character) => matcher.test(character)).join('')
      }}
      onValueChange={(value, eventDetails) => {
        onChange?.(value)
        onValueChange?.(value, eventDetails)
      }}
      {...props}
    />
  )
}

const InputOTPGroup = ({ className, ...props }: InputOTPGroupProps) => (
  <div className={cn('cn-input-otp-group flex items-center', className)} data-slot="input-otp-group" {...props} />
)

const InputOTPSlot = ({ className, index: _index, ...props }: InputOTPSlotProps) => (
  <InputOTPPrimitive.Input
    className={cn(
      'cn-input-otp-input cn-input-otp-slot relative flex size-10 items-center justify-center border-input border-y border-r bg-background text-center text-sm shadow-xs outline-none transition-all first:rounded-l-md first:border-l last:rounded-r-md focus:z-10 focus:border-ring focus:ring-3 focus:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20',
      className
    )}
    data-slot="input-otp-slot"
    {...props}
  />
)

const InputOTPSeparator = ({ className, ...props }: InputOTPSeparatorProps) => (
  <div
    className={cn('cn-input-otp-separator px-2 text-muted-foreground', className)}
    data-slot="input-otp-separator"
    {...props}
  >
    <span aria-hidden="true">-</span>
  </div>
)

export type { InputOTPGroupProps, InputOTPProps, InputOTPSeparatorProps, InputOTPSlotProps }
export { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot }
