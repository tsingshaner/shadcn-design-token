import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import {
  Item,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemSeparator,
  ItemTitle
} from './item'

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

  test('renders item grouping and media slots', () => {
    render(
      <ItemGroup>
        <Item size="sm" variant="outline">
          <ItemHeader>Header</ItemHeader>
          <ItemMedia variant="icon">I</ItemMedia>
          <ItemContent>
            <ItemTitle>Grouped item</ItemTitle>
          </ItemContent>
          <ItemFooter>Footer</ItemFooter>
        </Item>
        <ItemSeparator />
      </ItemGroup>
    )

    expect(screen.getByText('Grouped item').closest('[data-slot="item"]')).toHaveAttribute('data-variant', 'outline')
    expect(screen.getByText('I')).toHaveAttribute('data-variant', 'icon')
    expect(document.querySelector('[data-slot="item-group"]')).toBeInTheDocument()
    expect(document.querySelector('[data-slot="item-header"]')).toBeInTheDocument()
    expect(document.querySelector('[data-slot="item-footer"]')).toBeInTheDocument()
    expect(document.querySelector('[data-slot="item-separator"]')).toBeInTheDocument()
  })
})
