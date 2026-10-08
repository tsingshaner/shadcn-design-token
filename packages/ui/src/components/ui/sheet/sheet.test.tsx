import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import { Button } from '../button'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './sheet'

afterEach(cleanup)

describe('Sheet', () => {
  test('opens sheet content from the trigger', () => {
    render(
      <Sheet>
        <SheetTrigger render={<Button />}>Open sheet</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Token settings</SheetTitle>
            <SheetDescription>Manage token sync preferences.</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    )

    fireEvent.click(screen.getByRole('button', { name: 'Open sheet' }))

    expect(screen.getByRole('dialog', { name: 'Token settings' })).toHaveAttribute('data-scope', 'sheet')
    expect(screen.getByRole('dialog', { name: 'Token settings' })).toHaveAttribute('data-slot', 'content')
    expect(screen.getByText('Token settings')).toHaveAttribute('data-scope', 'sheet')
    expect(screen.getByText('Token settings')).toHaveAttribute('data-slot', 'title')
    expect(screen.getByText('Manage token sync preferences.')).toHaveAttribute('data-scope', 'sheet')
    expect(screen.getByText('Manage token sync preferences.')).toHaveAttribute('data-slot', 'description')
    expect(screen.getByText('Token settings').parentElement).toHaveAttribute('data-scope', 'sheet')
    expect(screen.getByText('Token settings').parentElement).toHaveAttribute('data-slot', 'header')
    expect(document.querySelector('[data-scope="sheet"][data-slot="overlay"]')).toHaveAttribute('data-scope', 'sheet')
    expect(document.querySelector('[data-scope="sheet"][data-slot="overlay"]')).toHaveAttribute('data-slot', 'overlay')
    expect(screen.getByRole('button', { name: 'Close' })).toHaveAttribute('data-scope', 'sheet')
    expect(screen.getByRole('button', { name: 'Close' })).toHaveAttribute('data-slot', 'close')
  })

  test('can hide the default close button', () => {
    render(
      <Sheet defaultOpen>
        <SheetContent showCloseButton={false}>
          <SheetHeader>
            <SheetTitle>No close button</SheetTitle>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    )

    expect(screen.getByRole('dialog', { name: 'No close button' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Close' })).not.toBeInTheDocument()
  })

  test('applies shadcn v4 side transition classes', () => {
    render(
      <Sheet defaultOpen>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Animated sheet</SheetTitle>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    )

    expect(screen.getByRole('dialog', { name: 'Animated sheet' })).toHaveAttribute('data-scope', 'sheet')
    expect(screen.getByRole('dialog', { name: 'Animated sheet' })).toHaveAttribute('data-slot', 'content')
    expect(screen.getByRole('dialog', { name: 'Animated sheet' })).toHaveClass(
      'data-[side=right]:data-starting-style:translate-x-[2.5rem]'
    )
  })
})
