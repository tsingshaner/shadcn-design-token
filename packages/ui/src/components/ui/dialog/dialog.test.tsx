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
    expect(screen.getByText('Publish these tokens?')).toHaveAttribute('data-slot', 'dialog-description')
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
