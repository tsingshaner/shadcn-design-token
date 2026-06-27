import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import { Button } from '../button'
import { ButtonGroup } from './button-group'

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
  })

  test('supports vertical orientation', () => {
    render(
      <ButtonGroup aria-label="Media controls" orientation="vertical">
        <Button>Increase</Button>
        <Button>Decrease</Button>
      </ButtonGroup>
    )

    expect(screen.getByLabelText('Media controls')).toHaveAttribute('data-orientation', 'vertical')
  })
})
