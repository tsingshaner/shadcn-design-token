import { type SVGProps, useState } from 'react'
import { expect, userEvent, within } from 'storybook/test'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../card'
import { Field, FieldDescription, FieldLabel } from '../field'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from './input-otp'

const REGEXP_ONLY_DIGITS = /^\d$/
const REGEXP_ONLY_DIGITS_AND_CHARS = /^[a-zA-Z0-9]$/

type IconProps = SVGProps<SVGSVGElement>

const RefreshCwIcon = (props: IconProps) => (
  <svg
    aria-hidden="true"
    className="size-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M21 12a9 9 0 0 1-15.5 6.3L3 16" />
    <path d="M3 21v-5h5" />
    <path d="M3 12a9 9 0 0 1 15.5-6.3L21 8" />
    <path d="M21 3v5h-5" />
  </svg>
)

const meta = {
  component: InputOTP,
  parameters: {
    docs: {
      description: {
        component:
          'A segmented input pattern for one-time passwords and verification codes. Examples and guidance reference the [shadcn/ui Input OTP documentation](https://ui.shadcn.com/docs/components/base/input-otp.md).'
      }
    }
  },
  tags: ['autodocs'],
  title: 'UI/InputOTP'
} satisfies Meta<typeof InputOTP>

export default meta

type Story = StoryObj<typeof meta>

const SixDigitSlots = ({ invalid = false }: { invalid?: boolean }) => (
  <>
    <InputOTPGroup>
      <InputOTPSlot aria-invalid={invalid || undefined} index={0} />
      <InputOTPSlot aria-invalid={invalid || undefined} index={1} />
      <InputOTPSlot aria-invalid={invalid || undefined} index={2} />
    </InputOTPGroup>
    <InputOTPSeparator />
    <InputOTPGroup>
      <InputOTPSlot aria-invalid={invalid || undefined} index={3} />
      <InputOTPSlot aria-invalid={invalid || undefined} index={4} />
      <InputOTPSlot aria-invalid={invalid || undefined} index={5} />
    </InputOTPGroup>
  </>
)

export const Default: Story = {
  render: () => (
    <InputOTP length={6}>
      <SixDigitSlots />
    </InputOTP>
  )
}
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(canvas.getAllByRole('textbox')).toHaveLength(6)
  await expect(canvasElement.querySelectorAll('[data-slot="input-otp-group"]')).toHaveLength(2)
}

export const Separator: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Covers separators between OTP groups from [shadcn/ui Input OTP Separator](https://ui.shadcn.com/docs/components/base/input-otp.md#separator).'
      }
    }
  },
  render: () => (
    <InputOTP maxLength={6}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  )
}
Separator.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(canvas.getAllByRole('textbox')).toHaveLength(6)
  await expect(canvasElement.querySelectorAll('[data-slot="input-otp-separator"]')).toHaveLength(2)
}

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Covers disabled one-time password inputs from [shadcn/ui Input OTP Disabled](https://ui.shadcn.com/docs/components/base/input-otp.md#disabled).'
      }
    }
  },
  render: () => (
    <InputOTP disabled id="disabled" maxLength={6} value="123456">
      <SixDigitSlots />
    </InputOTP>
  )
}
Disabled.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  for (const input of canvas.getAllByRole('textbox')) {
    await expect(input).toBeDisabled()
  }
  await expect(
    canvas
      .getAllByRole('textbox')
      .map((input) => (input as HTMLInputElement).value)
      .join('')
  ).toBe('123456')
}

export const Controlled: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Covers controlled values from [shadcn/ui Input OTP Controlled](https://ui.shadcn.com/docs/components/base/input-otp.md#controlled).'
      }
    }
  },
  render: function ControlledExample() {
    const [value, setValue] = useState('')

    return (
      <div className="space-y-2">
        <InputOTP maxLength={6} onChange={setValue} value={value}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        <div className="text-center text-sm">
          {value === '' ? <>Enter your one-time password.</> : <>You entered: {value}</>}
        </div>
      </div>
    )
  }
}
Controlled.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await userEvent.type(canvas.getAllByRole('textbox')[0], '123456')

  await expect(canvas.getByText('You entered: 123456')).toBeVisible()
}

export const Invalid: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Covers invalid OTP slots from [shadcn/ui Input OTP Invalid](https://ui.shadcn.com/docs/components/base/input-otp.md#invalid).'
      }
    }
  },
  render: () => (
    <InputOTP maxLength={6} value="000000">
      <SixDigitSlots invalid />
    </InputOTP>
  )
}
Invalid.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  for (const input of canvas.getAllByRole('textbox')) {
    await expect(input).toHaveAttribute('aria-invalid', 'true')
  }
}

export const FourDigits: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Covers four-digit PIN inputs from [shadcn/ui Input OTP Four Digits](https://ui.shadcn.com/docs/components/base/input-otp.md#four-digits).'
      }
    }
  },
  render: () => (
    <InputOTP maxLength={4} pattern={REGEXP_ONLY_DIGITS}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
      </InputOTPGroup>
    </InputOTP>
  )
}
FourDigits.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(canvas.getAllByRole('textbox')).toHaveLength(4)
}

export const Alphanumeric: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Covers alphanumeric OTP inputs from [shadcn/ui Input OTP Alphanumeric](https://ui.shadcn.com/docs/components/base/input-otp.md#alphanumeric).'
      }
    }
  },
  render: () => (
    <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS} validationType="alphanumeric">
      <SixDigitSlots />
    </InputOTP>
  )
}
Alphanumeric.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await userEvent.type(canvas.getAllByRole('textbox')[0], 'A1!')

  await expect(
    canvas
      .getAllByRole('textbox')
      .map((input) => (input as HTMLInputElement).value)
      .join('')
  ).toBe('A1')
}

export const Form: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Covers verification form layout from [shadcn/ui Input OTP Form](https://ui.shadcn.com/docs/components/base/input-otp.md#form).'
      }
    }
  },
  render: () => (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle>Verify your login</CardTitle>
        <CardDescription>
          Enter the verification code we sent to your email address: <span className="font-medium">m@example.com</span>.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Field>
          <div className="flex items-center justify-between">
            <FieldLabel htmlFor="otp-verification">Verification code</FieldLabel>
            <Button size="xs" variant="outline">
              <RefreshCwIcon />
              Resend Code
            </Button>
          </div>
          <InputOTP id="otp-verification" maxLength={6} required>
            <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator className="mx-2" />
            <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <FieldDescription>
            <a href="#otp-verification">I no longer have access to this email address.</a>
          </FieldDescription>
        </Field>
      </CardContent>
      <CardFooter>
        <Field>
          <Button className="w-full" type="submit">
            Verify
          </Button>
          <div className="text-muted-foreground text-sm">
            Having trouble signing in?{' '}
            <a className="underline underline-offset-4 transition-colors hover:text-primary" href="#otp-verification">
              Contact support
            </a>
          </div>
        </Field>
      </CardFooter>
    </Card>
  )
}
Form.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(canvas.getByText('Verify your login')).toBeVisible()
  await expect(canvas.getAllByRole('textbox')[0]).toBeRequired()
  await expect(canvas.getByRole('button', { name: /Resend Code/ })).toBeVisible()
}
