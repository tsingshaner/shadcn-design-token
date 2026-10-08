import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test, vi } from 'vitest'

import { Button, buttonVariants } from './button'

describe('Button', () => {
  afterEach(() => {
    cleanup()
  })

  test('renders as a button by default', () => {
    render(<Button>Save</Button>)

    const button = screen.getByRole('button', { name: 'Save' })

    expect(button.tagName).toBe('BUTTON')
    expect(button).toHaveAttribute('type', 'button')
    expect(button).toHaveAttribute('data-scope', 'button')
    expect(button).toHaveAttribute('data-slot', 'root')
    expect(button).toHaveClass('inline-flex', 'bg-primary', 'text-primary-foreground', 'h-8')
  })

  test.each([
    ['primary', 'bg-primary'],
    ['secondary', 'bg-secondary'],
    ['destructive', 'bg-destructive/10'],
    ['outline', 'border-border'],
    ['ghost', 'hover:bg-muted'],
    ['link', 'hover:underline']
  ] as const)('applies the %s variant and exposes its data attribute', (variant, className) => {
    render(<Button variant={variant}>Save</Button>)

    const button = screen.getByRole('button', { name: 'Save' })

    expect(button).toHaveClass(className)
    expect(button).toHaveAttribute('data-variant', variant)
  })

  test.each([
    ['md', 'h-8'],
    ['xs', 'h-6'],
    ['sm', 'h-7'],
    ['lg', 'h-9'],
    ['icon', 'size-8'],
    ['icon-xs', 'size-6'],
    ['icon-sm', 'size-7'],
    ['icon-lg', 'size-9']
  ] as const)('applies the %s size and exposes its data attribute', (size, dimension) => {
    render(<Button size={size}>Save</Button>)

    const button = screen.getByRole('button', { name: 'Save' })

    expect(button).toHaveClass(dimension)
    expect(button).toHaveAttribute('data-size', size)
  })

  test('allows custom classes to override size styles', () => {
    render(<Button className="custom-button h-12">Save</Button>)

    const button = screen.getByRole('button', { name: 'Save' })

    expect(button).toHaveClass('inline-flex', 'h-12', 'custom-button')
    expect(button).not.toHaveClass('h-8')
  })

  test('updates className callbacks when disabled changes', () => {
    const className = ({ disabled }: { disabled: boolean }) => (disabled ? 'h-12' : 'h-10')
    const { rerender } = render(<Button className={className}>Save</Button>)
    const button = screen.getByRole('button', { name: 'Save' })

    expect(button).toHaveClass('inline-flex', 'h-10')
    expect(button).not.toHaveClass('h-8')

    rerender(
      <Button className={className} disabled>
        Save
      </Button>
    )

    expect(button).toBeDisabled()
    expect(button).toHaveClass('inline-flex', 'h-12')
    expect(button).not.toHaveClass('h-8')
    expect(button).not.toHaveClass('h-10')
  })

  test.each([false, true])('handles clicks with disabled=%s', (disabled) => {
    const onClick = vi.fn()
    render(
      <Button disabled={disabled} onClick={onClick}>
        Save
      </Button>
    )

    fireEvent.click(screen.getByRole('button', { name: 'Save' }))

    expect(onClick).toHaveBeenCalledTimes(disabled ? 0 : 1)
  })

  test('supports Base UI render composition', () => {
    render(
      <Button nativeButton={false} render={<div />}>
        Save
      </Button>
    )

    const button = screen.getByRole('button', { name: 'Save' })

    expect(button.tagName).toBe('DIV')
    expect(button).toHaveAttribute('data-scope', 'button')
    expect(button).toHaveAttribute('data-slot', 'root')
    expect(button).toHaveClass('inline-flex')
  })
})

describe('buttonVariants', () => {
  test('defaults to primary and md', () => {
    expect(buttonVariants()).toBe(buttonVariants({ size: 'md', variant: 'primary' }))
  })

  test.each(['class', 'className'] as const)('merges custom %s with variant styles', (prop) => {
    const classes = buttonVariants({ [prop]: 'h-12 custom-button', size: 'sm', variant: 'outline' }).split(' ')

    expect(classes).toEqual(expect.arrayContaining(['inline-flex', 'border-border', 'h-12', 'custom-button']))
    expect(classes).not.toContain('h-7')
  })
})
