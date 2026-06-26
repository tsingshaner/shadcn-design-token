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

    expect(screen.getByText('Helpful hint')).toHaveAttribute('data-slot', 'tooltip-content')
  })
})
