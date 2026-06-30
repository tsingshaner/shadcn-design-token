import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea
} from './input-group'

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

    expect(screen.getByLabelText('Amount')).toHaveAttribute('data-slot', 'input-group-control')
    expect(screen.getByLabelText('Amount')).toHaveClass('cn-input-group-input')
    expect(screen.getByText('$')).toHaveAttribute('data-slot', 'input-group-addon')
    expect(screen.getByText('$')).toHaveClass('cn-input-group-addon', 'cn-input-group-addon-align-inline-start')
    expect(screen.getByLabelText('Amount').parentElement).toHaveClass('cn-input-group')
  })

  test('applies shadcn v4 text, button, and textarea classes', () => {
    render(
      <InputGroup>
        <InputGroupText>https://</InputGroupText>
        <InputGroupTextarea aria-label="Description" />
        <InputGroupButton>Save</InputGroupButton>
      </InputGroup>
    )

    expect(screen.getByText('https://')).toHaveClass('cn-input-group-text')
    expect(screen.getByRole('textbox', { name: 'Description' })).toHaveAttribute('data-slot', 'input-group-control')
    expect(screen.getByRole('textbox', { name: 'Description' })).toHaveClass('cn-input-group-textarea')
    expect(screen.getByRole('button', { name: 'Save' })).toHaveClass(
      'cn-input-group-button',
      'cn-input-group-button-size-xs'
    )
  })
})
