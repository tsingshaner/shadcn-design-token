import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test, vi } from 'vitest'

import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from './input-otp'

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

    expect(screen.getAllByRole('textbox')[0].closest('[data-scope="input-otp"][data-slot="root"]')).toHaveAttribute(
      'data-scope',
      'input-otp'
    )
    expect(screen.getAllByRole('textbox')[0].closest('[data-scope="input-otp"][data-slot="root"]')).toHaveAttribute(
      'data-slot',
      'root'
    )
    expect(screen.getAllByRole('textbox')[0].parentElement).toHaveAttribute('data-scope', 'input-otp')
    expect(screen.getAllByRole('textbox')[0].parentElement).toHaveAttribute('data-slot', 'group')
    expect(screen.getAllByRole('textbox')[0]).toHaveAttribute('data-scope', 'input-otp')
    expect(screen.getAllByRole('textbox')[0]).toHaveAttribute('data-slot', 'slot')
    expect(onValueChange).toHaveBeenCalledWith('1', expect.any(Object))
  })

  test('supports shadcn maxLength and onChange aliases', () => {
    const onChange = vi.fn()

    render(
      <InputOTP maxLength={2} onChange={onChange}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
        </InputOTPGroup>
      </InputOTP>
    )

    fireEvent.change(screen.getAllByRole('textbox')[0], { target: { value: '7' } })

    expect(onChange).toHaveBeenCalledWith('7')
  })

  test('renders separator with the shadcn v4 slot class', () => {
    render(
      <InputOTP maxLength={2}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSeparator />
          <InputOTPSlot index={1} />
        </InputOTPGroup>
      </InputOTP>
    )

    expect(document.querySelector('[data-scope="input-otp"][data-slot="separator"]')).toHaveAttribute(
      'data-scope',
      'input-otp'
    )
    expect(document.querySelector('[data-scope="input-otp"][data-slot="separator"]')).toHaveAttribute(
      'data-slot',
      'separator'
    )
  })
})
