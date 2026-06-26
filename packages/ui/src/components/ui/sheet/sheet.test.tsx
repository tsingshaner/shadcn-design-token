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

    expect(screen.getByRole('dialog', { name: 'Token settings' })).toBeInTheDocument()
  })
})
