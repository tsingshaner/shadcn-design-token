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

  test('applies shadcn v4 dialog slot classes', () => {
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
    expect(screen.getByRole('dialog', { name: 'Slot classes' })).toHaveClass('outline-none')
    expect(screen.getByText('Slot classes')).toHaveAttribute('data-scope', 'dialog')
    expect(screen.getByText('Slot classes')).toHaveAttribute('data-slot', 'title')
  })

  test('can hide the default close button', () => {
    render(
      <Dialog defaultOpen>
        <DialogContent showCloseButton={false}>
          <DialogTitle>No close button</DialogTitle>
        </DialogContent>
      </Dialog>
    )

    expect(screen.getByRole('dialog', { name: 'No close button' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Close' })).not.toBeInTheDocument()
  })
})
