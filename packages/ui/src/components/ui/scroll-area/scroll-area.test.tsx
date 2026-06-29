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
    expect(document.querySelector('[data-slot="scroll-area"]')).toHaveClass('cn-scroll-area')
    expect(document.querySelector('[data-slot="scroll-area-viewport"]')).toHaveClass('cn-scroll-area-viewport')
    expect(document.querySelector('[data-slot="scroll-area-content"]')).not.toBeInTheDocument()
  })

  test('supports horizontal scrollbars', () => {
    render(
      <ScrollArea>
        <ScrollBar keepMounted orientation="horizontal" />
      </ScrollArea>
    )

    expect(document.querySelector('[data-orientation="horizontal"]')).toBeInTheDocument()
    expect(document.querySelector('[data-orientation="horizontal"]')).toHaveClass('cn-scroll-area-scrollbar')
    expect(document.querySelector('[data-slot="scroll-area-thumb"]')).toHaveClass('cn-scroll-area-thumb')
  })
})
