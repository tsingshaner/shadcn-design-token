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

    expect(screen.getByLabelText('Text actions')).toHaveAttribute('data-slot', 'button-group')
    expect(screen.getByLabelText('Text actions')).toHaveClass(
      'cn-button-group',
      'cn-button-group-orientation-horizontal'
    )
  })

  test('supports vertical orientation', () => {
    render(
      <ButtonGroup aria-label="Media controls" orientation="vertical">
        <Button>Increase</Button>
        <Button>Decrease</Button>
      </ButtonGroup>
    )

    expect(screen.getByLabelText('Media controls')).toHaveAttribute('data-orientation', 'vertical')
    expect(screen.getByLabelText('Media controls')).toHaveClass('cn-button-group-orientation-vertical')
  })

  test('renders text and separator slots', () => {
    render(
      <ButtonGroup aria-label="Amount">
        <ButtonGroupText>USD</ButtonGroupText>
        <ButtonGroupSeparator data-testid="separator" />
        <Button>Apply</Button>
      </ButtonGroup>
    )

    expect(screen.getByText('USD')).toHaveAttribute('data-slot', 'button-group-text')
    expect(screen.getByText('USD')).toHaveClass('cn-button-group-text')
    expect(screen.getByTestId('separator')).toHaveClass('cn-button-group-separator')
  })
})
