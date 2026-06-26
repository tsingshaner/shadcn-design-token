import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import { Item, ItemContent, ItemDescription, ItemTitle } from './item'

describe('Item', () => {
  afterEach(() => {
    cleanup()
  })

  test('renders item content slots', () => {
    render(
      <Item>
        <ItemContent>
          <ItemTitle>Token set</ItemTitle>
          <ItemDescription>Shared colors</ItemDescription>
        </ItemContent>
      </Item>
    )

    expect(screen.getByText('Token set')).toHaveAttribute('data-slot', 'item-title')
    expect(screen.getByText('Shared colors')).toHaveAttribute('data-slot', 'item-description')
  })
})
