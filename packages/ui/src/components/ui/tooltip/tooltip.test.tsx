import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import { Tooltip, TooltipContent, TooltipProvider } from './tooltip'

describe('Tooltip', () => {
  afterEach(() => {
    cleanup()
  })

  test('renders tooltip content when open', () => {
    render(
      <TooltipProvider delay={0}>
        <Tooltip defaultOpen>
          <TooltipContent>Helpful hint</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )

    expect(screen.getByText('Helpful hint')).toHaveAttribute('data-scope', 'tooltip')
    expect(screen.getByText('Helpful hint')).toHaveAttribute('data-slot', 'content')

    expect(document.querySelector('[data-scope="tooltip"][data-slot="arrow"]')).toHaveAttribute('data-scope', 'tooltip')
    expect(document.querySelector('[data-scope="tooltip"][data-slot="arrow"]')).toHaveAttribute('data-slot', 'arrow')
  })
})
