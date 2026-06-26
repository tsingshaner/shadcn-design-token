import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import { ScrollArea, ScrollBar } from './scroll-area'

afterEach(cleanup)

describe('ScrollArea', () => {
  test('renders scrollable content and scrollbar slots', () => {
    render(
      <ScrollArea>
        <p>Scrollable token list</p>
      </ScrollArea>
    )

    expect(screen.getByText('Scrollable token list')).toBeInTheDocument()
    expect(document.querySelector('[data-slot="scroll-area-viewport"]')).toBeInTheDocument()
  })

  test('supports horizontal scrollbars', () => {
    render(
      <ScrollArea>
        <ScrollBar keepMounted orientation="horizontal" />
      </ScrollArea>
    )

    expect(document.querySelector('[data-orientation="horizontal"]')).toBeInTheDocument()
  })
})
