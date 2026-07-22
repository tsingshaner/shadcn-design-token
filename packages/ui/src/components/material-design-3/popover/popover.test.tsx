import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle } from './popover'

describe('Popover', () => {
  afterEach(() => {
    cleanup()
  })

  test('renders popover content when open', () => {
    render(
      <Popover defaultOpen>
        <PopoverContent>Popover content</PopoverContent>
      </Popover>
    )

    expect(screen.getByText('Popover content')).toHaveAttribute('data-slot', 'popover-content')
    expect(screen.getByText('Popover content')).toHaveClass('cn-popover-content', 'cn-popover-content-logical')
  })

  test('applies shadcn v4 popover heading slot classes', () => {
    render(
      <Popover defaultOpen>
        <PopoverContent>
          <PopoverHeader>
            <PopoverTitle>Dimensions</PopoverTitle>
            <PopoverDescription>Set component size.</PopoverDescription>
          </PopoverHeader>
        </PopoverContent>
      </Popover>
    )

    expect(screen.getByText('Dimensions')).toHaveClass('cn-popover-title')
    expect(screen.getByText('Set component size.')).toHaveClass('cn-popover-description')
    expect(screen.getByText('Dimensions').parentElement).toHaveClass('cn-popover-header')
  })
})
