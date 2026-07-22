import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import { Button } from '../button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from './alert-dialog'

afterEach(cleanup)

describe('AlertDialog', () => {
  test('opens alert content from the trigger', () => {
    render(
      <AlertDialog>
        <AlertDialogTrigger render={<Button />}>Open</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete token?</AlertDialogTitle>
            <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel render={<Button variant="outline" />}>Cancel</AlertDialogCancel>
            <AlertDialogAction render={<Button />}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )

    fireEvent.click(screen.getByRole('button', { name: 'Open' }))

    expect(screen.getByRole('alertdialog', { name: 'Delete token?' })).toHaveClass(
      'cn-alert-dialog-content',
      'rounded-[28px]'
    )
    expect(screen.getByText('Delete token?')).toHaveClass('cn-alert-dialog-title', 'cn-font-heading')
    expect(screen.getByText('This cannot be undone.')).toHaveClass('cn-alert-dialog-description')
    expect(document.querySelector('[data-slot="alert-dialog-overlay"]')).toHaveClass(
      'cn-alert-dialog-overlay',
      'isolate'
    )
    expect(screen.getByRole('button', { name: 'Cancel' })).toHaveClass('cn-alert-dialog-cancel')
    expect(screen.getByRole('button', { name: 'Continue' })).toHaveClass('cn-alert-dialog-action')
  })
})
