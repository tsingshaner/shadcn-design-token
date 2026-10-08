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

    expect(screen.getByLabelText('Amount')).toHaveAttribute('data-scope', 'input-group')
    expect(screen.getByLabelText('Amount')).toHaveAttribute('data-slot', 'control')

    expect(screen.getByText('$')).toHaveAttribute('data-scope', 'input-group')
    expect(screen.getByText('$')).toHaveAttribute('data-slot', 'addon')

    expect(screen.getByText('$')).toHaveAttribute('data-align', 'inline-start')
    expect(screen.getByLabelText('Amount').parentElement).toHaveAttribute('data-scope', 'input-group')
    expect(screen.getByLabelText('Amount').parentElement).toHaveAttribute('data-slot', 'root')
  })

  test('applies shadcn v4 text, button, and textarea classes', () => {
    render(
      <InputGroup>
        <InputGroupText>https://</InputGroupText>
        <InputGroupTextarea aria-label="Description" />
        <InputGroupButton>Save</InputGroupButton>
        <InputGroupButton aria-label="Open menu" size="icon-sm" />
      </InputGroup>
    )

    expect(screen.getByText('https://')).toHaveAttribute('data-scope', 'input-group')
    expect(screen.getByText('https://')).toHaveAttribute('data-slot', 'text')
    expect(screen.getByRole('textbox', { name: 'Description' })).toHaveAttribute('data-scope', 'input-group')
    expect(screen.getByRole('textbox', { name: 'Description' })).toHaveAttribute('data-slot', 'control')

    expect(screen.getByRole('button', { name: 'Save' })).toHaveAttribute('data-scope', 'input-group')
    expect(screen.getByRole('button', { name: 'Save' })).toHaveAttribute('data-slot', 'button')
    expect(screen.getByRole('button', { name: 'Save' })).toHaveAttribute('data-size', 'xs')
    expect(screen.getByRole('button', { name: 'Open menu' })).toHaveAttribute('data-size', 'icon-sm')
    expect(screen.getByRole('button', { name: 'Open menu' })).toHaveAttribute('data-scope', 'input-group')
    expect(screen.getByRole('button', { name: 'Open menu' })).toHaveAttribute('data-slot', 'button')
  })

  test('supports shadcn v4 input group button size classes', () => {
    render(
      <InputGroup>
        <InputGroupButton size="sm">Small</InputGroupButton>
        <InputGroupButton aria-label="Icon xs" size="icon-xs" />
      </InputGroup>
    )

    expect(screen.getByRole('button', { name: 'Small' })).toHaveAttribute('data-scope', 'input-group')
    expect(screen.getByRole('button', { name: 'Small' })).toHaveAttribute('data-slot', 'button')
    expect(screen.getByRole('button', { name: 'Small' })).toHaveAttribute('data-size', 'sm')
    expect(screen.getByRole('button', { name: 'Icon xs' })).toHaveAttribute('data-scope', 'input-group')
    expect(screen.getByRole('button', { name: 'Icon xs' })).toHaveAttribute('data-slot', 'button')
    expect(screen.getByRole('button', { name: 'Icon xs' })).toHaveAttribute('data-size', 'icon-xs')
  })
})
