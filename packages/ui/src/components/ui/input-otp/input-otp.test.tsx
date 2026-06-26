import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test, vi } from 'vitest'

import { InputOTP, InputOTPGroup, InputOTPSlot } from './input-otp'

afterEach(cleanup)

describe('InputOTP', () => {
  test('calls onValueChange when a slot changes', () => {
    const onValueChange = vi.fn()

    render(
      <InputOTP length={2} onValueChange={onValueChange}>
        <InputOTPGroup>
          <InputOTPSlot />
          <InputOTPSlot aria-label="Second digit" />
        </InputOTPGroup>
      </InputOTP>
    )

    fireEvent.change(screen.getAllByRole('textbox')[0], { target: { value: '1' } })

    expect(onValueChange).toHaveBeenCalledWith('1', expect.any(Object))
  })
})
