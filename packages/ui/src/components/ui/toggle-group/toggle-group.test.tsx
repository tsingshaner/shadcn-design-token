import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test, vi } from 'vitest'

import { Toggle } from '../toggle'
import { ToggleGroup } from './toggle-group'

describe('ToggleGroup', () => {
  afterEach(() => {
    cleanup()
  })

  test('reports selected toggle values', () => {
    const onValueChange = vi.fn()

    render(
      <ToggleGroup onValueChange={onValueChange}>
        <Toggle value="left">Left</Toggle>
        <Toggle value="center">Center</Toggle>
      </ToggleGroup>
    )

    fireEvent.click(screen.getByRole('button', { name: 'Center' }))

    expect(onValueChange).toHaveBeenCalledWith(['center'], expect.any(Object))
  })
})
