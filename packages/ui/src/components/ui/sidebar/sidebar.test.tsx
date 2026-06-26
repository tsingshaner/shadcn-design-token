import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import { Sidebar, SidebarProvider, SidebarTrigger } from './sidebar'

afterEach(cleanup)

describe('Sidebar', () => {
  it('toggles between expanded and collapsed states', () => {
    render(
      <SidebarProvider>
        <Sidebar aria-label="Primary sidebar" />
        <SidebarTrigger aria-label="Toggle sidebar" />
      </SidebarProvider>
    )

    expect(screen.getByLabelText('Primary sidebar')).toHaveAttribute('data-state', 'expanded')

    fireEvent.click(screen.getByLabelText('Toggle sidebar'))

    expect(screen.getByLabelText('Primary sidebar')).toHaveAttribute('data-state', 'collapsed')
  })
})
