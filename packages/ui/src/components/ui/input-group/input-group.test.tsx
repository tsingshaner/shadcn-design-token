import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import { InputGroup, InputGroupAddon, InputGroupInput } from './input-group'

describe('InputGroup', () => {
  afterEach(() => {
    cleanup()
  })

  test('renders grouped input addons', () => {
    render(
      <InputGroup>
        <InputGroupAddon>$</InputGroupAddon>
        <InputGroupInput aria-label="Amount" />
      </InputGroup>
    )

    expect(screen.getByLabelText('Amount')).toHaveAttribute('data-slot', 'input-group-input')
    expect(screen.getByText('$')).toHaveAttribute('data-slot', 'input-group-addon')
  })
})
