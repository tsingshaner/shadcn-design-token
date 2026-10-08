import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import { Button } from '../button'
import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from './button-group'

describe('ButtonGroup', () => {
  afterEach(() => {
    cleanup()
  })

  test('renders grouped buttons', () => {
    render(
      <ButtonGroup aria-label="Text actions">
        <Button>Copy</Button>
        <Button>Paste</Button>
      </ButtonGroup>
    )

    expect(screen.getByLabelText('Text actions')).toHaveAttribute('data-scope', 'button-group')
    expect(screen.getByLabelText('Text actions')).toHaveAttribute('data-slot', 'root')

    expect(screen.getByLabelText('Text actions')).toHaveAttribute('data-orientation', 'horizontal')
  })

  test('supports vertical orientation', () => {
    render(
      <ButtonGroup aria-label="Media controls" orientation="vertical">
        <Button>Increase</Button>
        <Button>Decrease</Button>
      </ButtonGroup>
    )

    expect(screen.getByLabelText('Media controls')).toHaveAttribute('data-orientation', 'vertical')
    expect(screen.getByLabelText('Media controls')).toHaveAttribute('data-scope', 'button-group')
    expect(screen.getByLabelText('Media controls')).toHaveAttribute('data-slot', 'root')
  })

  test('renders text and separator slots', () => {
    render(
      <ButtonGroup aria-label="Amount">
        <ButtonGroupText>USD</ButtonGroupText>
        <ButtonGroupSeparator data-testid="separator" />
        <Button>Apply</Button>
      </ButtonGroup>
    )

    expect(screen.getByText('USD')).toHaveAttribute('data-scope', 'button-group')
    expect(screen.getByText('USD')).toHaveAttribute('data-slot', 'text')

    expect(screen.getByTestId('separator')).toHaveAttribute('data-scope', 'button-group')
    expect(screen.getByTestId('separator')).toHaveAttribute('data-slot', 'separator')
  })
})
