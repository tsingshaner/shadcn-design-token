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

    expect(screen.getByRole('alertdialog', { name: 'Delete token?' })).toHaveAttribute('data-scope', 'alert-dialog')
    expect(screen.getByRole('alertdialog', { name: 'Delete token?' })).toHaveAttribute('data-slot', 'content')
    expect(screen.getByRole('alertdialog', { name: 'Delete token?' })).toHaveClass('rounded-[28px]')
    expect(screen.getByText('Delete token?')).toHaveAttribute('data-scope', 'alert-dialog')
    expect(screen.getByText('Delete token?')).toHaveAttribute('data-slot', 'title')
    expect(screen.getByText('This cannot be undone.')).toHaveAttribute('data-scope', 'alert-dialog')
    expect(screen.getByText('This cannot be undone.')).toHaveAttribute('data-slot', 'description')
    expect(document.querySelector('[data-scope="alert-dialog"][data-slot="overlay"]')).toHaveAttribute(
      'data-scope',
      'alert-dialog'
    )
    expect(document.querySelector('[data-scope="alert-dialog"][data-slot="overlay"]')).toHaveAttribute(
      'data-slot',
      'overlay'
    )
    expect(document.querySelector('[data-scope="alert-dialog"][data-slot="overlay"]')).toHaveClass('isolate')
    expect(screen.getByRole('button', { name: 'Cancel' })).toHaveAttribute('data-scope', 'alert-dialog')
    expect(screen.getByRole('button', { name: 'Cancel' })).toHaveAttribute('data-slot', 'cancel')
    expect(screen.getByRole('button', { name: 'Continue' })).toHaveAttribute('data-scope', 'alert-dialog')
    expect(screen.getByRole('button', { name: 'Continue' })).toHaveAttribute('data-slot', 'action')
  })
})
