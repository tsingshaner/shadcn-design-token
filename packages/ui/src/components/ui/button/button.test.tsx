import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import { Button } from './button'

describe('Button', () => {
  afterEach(() => {
    cleanup()
  })

  test('renders as a button by default', () => {
    render(<Button>Save</Button>)

    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument()
  })

  test('applies variant and size classes', () => {
    render(
      <Button size="sm" variant="outline">
        Save
      </Button>
    )

    expect(screen.getByRole('button', { name: 'Save' })).toHaveClass('border', 'h-7')
  })

  test('supports Base UI render composition', () => {
    render(
      <Button nativeButton={false} render={<div />}>
        Save
      </Button>
    )

    expect(screen.getByRole('button', { name: 'Save' })).toHaveAttribute('data-slot', 'button')
  })
})
