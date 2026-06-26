import type { Meta, StoryObj } from '@storybook/react-vite'

import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from './input-otp'

const meta = {
  component: InputOTP,
  tags: ['autodocs'],
  title: 'UI/InputOTP'
} satisfies Meta<typeof InputOTP>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <InputOTP length={6}>
      <InputOTPGroup>
        <InputOTPSlot aria-label="Digit 1" />
        <InputOTPSlot aria-label="Digit 2" />
        <InputOTPSlot aria-label="Digit 3" />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot aria-label="Digit 4" />
        <InputOTPSlot aria-label="Digit 5" />
        <InputOTPSlot aria-label="Digit 6" />
      </InputOTPGroup>
    </InputOTP>
  )
}
