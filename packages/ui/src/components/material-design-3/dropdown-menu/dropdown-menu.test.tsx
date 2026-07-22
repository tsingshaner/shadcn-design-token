import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import { Button } from '../button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './dropdown-menu'

afterEach(cleanup)

describe('DropdownMenu', () => {
  test('opens menu content from the trigger', () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button />}>Open menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Sync tokens</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )

    fireEvent.click(screen.getByRole('button', { name: 'Open menu' }))

    expect(screen.getByRole('menuitem', { name: 'Sync tokens' })).toHaveClass('min-h-12', 'rounded-none')
    expect(screen.getByRole('menu')).toHaveClass('rounded-[4px]', 'bg-muted')
  })
})
