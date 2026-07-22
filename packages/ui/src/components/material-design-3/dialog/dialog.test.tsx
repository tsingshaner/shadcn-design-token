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

    expect(screen.getByRole('dialog', { name: 'Confirm publish' })).toHaveAttribute('data-slot', 'dialog-content')
    expect(screen.getByRole('dialog', { name: 'Confirm publish' })).toHaveClass('cn-dialog-content')
    expect(screen.getByText('Publish these tokens?')).toHaveAttribute('data-slot', 'dialog-description')
    expect(screen.getByText('Publish these tokens?')).toHaveClass('cn-dialog-description')
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

    expect(document.querySelector('[data-slot="dialog-overlay"]')).toHaveClass('cn-dialog-overlay', 'isolate')
    expect(screen.getByRole('dialog', { name: 'Slot classes' })).toHaveClass(
      'cn-dialog-content',
      'outline-none',
      'rounded-[28px]'
    )
    expect(screen.getByText('Slot classes')).toHaveClass('cn-dialog-title', 'cn-font-heading')
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
