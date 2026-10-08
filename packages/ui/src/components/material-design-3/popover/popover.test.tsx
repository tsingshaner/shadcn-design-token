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

    expect(screen.getByText('Popover content')).toHaveAttribute('data-scope', 'popover')
    expect(screen.getByText('Popover content')).toHaveAttribute('data-slot', 'content')
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

    expect(screen.getByText('Dimensions')).toHaveAttribute('data-scope', 'popover')
    expect(screen.getByText('Dimensions')).toHaveAttribute('data-slot', 'title')
    expect(screen.getByText('Set component size.')).toHaveAttribute('data-scope', 'popover')
    expect(screen.getByText('Set component size.')).toHaveAttribute('data-slot', 'description')
    expect(screen.getByText('Dimensions').parentElement).toHaveAttribute('data-scope', 'popover')
    expect(screen.getByText('Dimensions').parentElement).toHaveAttribute('data-slot', 'header')
  })
})
