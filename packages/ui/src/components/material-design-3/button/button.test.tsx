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
    expect(screen.getByRole('button', { name: 'Save' })).toHaveAttribute('data-scope', 'button')
    expect(screen.getByRole('button', { name: 'Save' })).toHaveAttribute('data-slot', 'root')
    expect(screen.getByRole('button', { name: 'Save' })).toHaveAttribute('data-variant', 'primary')
    expect(screen.getByRole('button', { name: 'Save' })).toHaveAttribute('data-size', 'md')
  })

  test('applies variant and size classes', () => {
    render(
      <Button size="sm" variant="outline">
        Save
      </Button>
    )

    expect(screen.getByRole('button', { name: 'Save' })).toHaveAttribute('data-scope', 'button')
    expect(screen.getByRole('button', { name: 'Save' })).toHaveAttribute('data-slot', 'root')
    expect(screen.getByRole('button', { name: 'Save' })).toHaveAttribute('data-variant', 'outline')
    expect(screen.getByRole('button', { name: 'Save' })).toHaveAttribute('data-size', 'sm')
    expect(screen.getByRole('button', { name: 'Save' })).toHaveClass('border', 'h-9', 'rounded-full')
  })

  test('supports Base UI render composition', () => {
    render(
      <Button nativeButton={false} render={<div />}>
        Save
      </Button>
    )

    expect(screen.getByRole('button', { name: 'Save' })).toHaveAttribute('data-scope', 'button')
    expect(screen.getByRole('button', { name: 'Save' })).toHaveAttribute('data-slot', 'root')
  })

  test('includes the Material Design press state layer', () => {
    render(<Button>Save</Button>)

    expect(screen.getByRole('button', { name: 'Save' })).toContainElement(
      document.querySelector('[data-scope="ripple"][data-slot="root"]')
    )
  })
})
