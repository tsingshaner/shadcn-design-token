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
})
