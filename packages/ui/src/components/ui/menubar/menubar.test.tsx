import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from './menubar'

afterEach(cleanup)

describe('Menubar', () => {
  test('opens menu content from a menubar trigger', () => {
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>New token</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    )

    fireEvent.click(screen.getByRole('menuitem', { name: 'File' }))

    expect(screen.getByRole('menuitem', { name: 'New token' })).toBeInTheDocument()
  })
})
