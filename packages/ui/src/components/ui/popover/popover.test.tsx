import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import { Popover, PopoverContent } from './popover'

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
  })
})
