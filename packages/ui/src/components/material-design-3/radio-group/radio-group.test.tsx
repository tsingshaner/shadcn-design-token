import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test, vi } from 'vitest'

import { RadioGroup, RadioGroupItem } from './radio-group'

describe('RadioGroup', () => {
  afterEach(() => {
    cleanup()
  })

  test('renders radio options and reports changes', () => {
    const onValueChange = vi.fn()

    render(
      <RadioGroup onValueChange={onValueChange}>
        <RadioGroupItem aria-label="Default" value="default" />
        <RadioGroupItem aria-label="Compact" value="compact" />
      </RadioGroup>
    )

    fireEvent.click(screen.getByRole('radio', { name: 'Compact' }))

    expect(onValueChange).toHaveBeenCalledWith('compact', expect.any(Object))
  })

  test('applies the MD3 radio shape and indicator', () => {
    render(
      <RadioGroup data-testid="group" defaultValue="default">
        <RadioGroupItem aria-label="Default" value="default" />
      </RadioGroup>
    )

    const radio = screen.getByRole('radio', { name: 'Default' })

    expect(screen.getByTestId('group')).toHaveAttribute('data-scope', 'radio-group')
    expect(screen.getByTestId('group')).toHaveAttribute('data-slot', 'root')
    expect(radio).toHaveAttribute('data-scope', 'radio-group')
    expect(radio).toHaveAttribute('data-slot', 'item')
    expect(radio).toHaveClass('size-5', 'border-2')
    expect(radio.querySelector('[data-scope="radio-group"][data-slot="indicator"]')).toHaveAttribute(
      'data-scope',
      'radio-group'
    )
    expect(radio.querySelector('[data-scope="radio-group"][data-slot="indicator"]')).toHaveAttribute(
      'data-slot',
      'indicator'
    )
    expect(radio.querySelector('[data-scope="radio-group"][data-slot="indicator-icon"]')).toBeInTheDocument()
  })
})
