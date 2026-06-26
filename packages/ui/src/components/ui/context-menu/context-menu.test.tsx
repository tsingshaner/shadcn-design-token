import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from './context-menu'

afterEach(cleanup)

describe('ContextMenu', () => {
  test('opens menu content from a context menu event', () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>Open context menu</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Rename token</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    )

    fireEvent.contextMenu(screen.getByText('Open context menu'))

    expect(screen.getByRole('menuitem', { name: 'Rename token' })).toBeInTheDocument()
  })
})
