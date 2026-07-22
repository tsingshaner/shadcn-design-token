import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test, vi } from 'vitest'

import { Toggle } from '../toggle'
import { ToggleGroup, ToggleGroupItem } from './toggle-group'

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

  test('renders toggle group item with group metadata', () => {
    render(
      <ToggleGroup spacing={2} variant="outline">
        <ToggleGroupItem value="all" variant="outline">
          All
        </ToggleGroupItem>
      </ToggleGroup>
    )

    expect(screen.getByRole('group')).toHaveAttribute('data-variant', 'outline')
    expect(screen.getByRole('group')).toHaveClass('cn-toggle-group')
    expect(screen.getByRole('button', { name: 'All' })).toHaveAttribute('data-slot', 'toggle-group-item')
    expect(screen.getByRole('button', { name: 'All' })).toHaveClass(
      'cn-toggle-group-item',
      'cn-toggle-variant-outline',
      'cn-toggle-size-default'
    )
  })
})
