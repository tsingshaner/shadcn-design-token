import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import { Dialog, DialogContent, DialogDescription, DialogTitle } from './dialog'

describe('Dialog', () => {
  afterEach(() => {
    cleanup()
  })

  test('renders dialog content when open', () => {
    render(
      <Dialog defaultOpen>
        <DialogContent>
          <DialogTitle>Confirm publish</DialogTitle>
          <DialogDescription>Publish these tokens?</DialogDescription>
        </DialogContent>
      </Dialog>
    )

    expect(screen.getByRole('dialog', { name: 'Confirm publish' })).toHaveAttribute('data-scope', 'dialog')
    expect(screen.getByRole('dialog', { name: 'Confirm publish' })).toHaveAttribute('data-slot', 'content')

    expect(screen.getByText('Publish these tokens?')).toHaveAttribute('data-scope', 'dialog')
    expect(screen.getByText('Publish these tokens?')).toHaveAttribute('data-slot', 'description')
  })

  test('applies MD3 dialog surface classes', () => {
    render(
      <Dialog defaultOpen>
        <DialogContent>
          <DialogTitle>Slot classes</DialogTitle>
          <DialogDescription>Dialog slot class coverage.</DialogDescription>
        </DialogContent>
      </Dialog>
    )

    expect(document.querySelector('[data-scope="dialog"][data-slot="overlay"]')).toHaveAttribute('data-scope', 'dialog')
    expect(document.querySelector('[data-scope="dialog"][data-slot="overlay"]')).toHaveAttribute('data-slot', 'overlay')
    expect(document.querySelector('[data-scope="dialog"][data-slot="overlay"]')).toHaveClass('isolate')
    expect(screen.getByRole('dialog', { name: 'Slot classes' })).toHaveAttribute('data-scope', 'dialog')
    expect(screen.getByRole('dialog', { name: 'Slot classes' })).toHaveAttribute('data-slot', 'content')
    expect(screen.getByRole('dialog', { name: 'Slot classes' })).toHaveClass(
      'outline-none',
      'rounded-[28px]',
      'min-w-[280px]',
      'max-w-[560px]',
      'gap-6'
    )
    expect(screen.getByText('Slot classes')).toHaveAttribute('data-scope', 'dialog')
    expect(screen.getByText('Slot classes')).toHaveAttribute('data-slot', 'title')
    expect(screen.getByText('Slot classes')).toHaveClass('text-2xl')
  })

  test('uses an opt-in MD3 close button', () => {
    render(
      <Dialog defaultOpen>
        <DialogContent showCloseButton>
          <DialogTitle>Close button</DialogTitle>
        </DialogContent>
      </Dialog>
    )

    expect(screen.getByRole('button', { name: 'Close' })).toHaveAttribute('data-scope', 'dialog')
    expect(screen.getByRole('button', { name: 'Close' })).toHaveAttribute('data-slot', 'close')
    expect(screen.getByRole('button', { name: 'Close' })).toHaveAttribute('data-variant', 'ghost')
    expect(screen.getByRole('button', { name: 'Close' })).toContainElement(
      document.querySelector('[data-scope="ripple"][data-slot="root"]')
    )
  })
})
