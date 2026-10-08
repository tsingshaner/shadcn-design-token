import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from './resizable'

afterEach(cleanup)

describe('Resizable', () => {
  it('renders panel group with a handle', () => {
    render(
      <ResizablePanelGroup>
        <ResizablePanel defaultSize={40}>Left</ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel>Right</ResizablePanel>
      </ResizablePanelGroup>
    )

    expect(screen.getByText('Left')).toHaveStyle({ flexBasis: '40%' })
    expect(screen.getByText('Left').parentElement).toHaveAttribute('data-scope', 'resizable')
    expect(screen.getByText('Left').parentElement).toHaveAttribute('data-slot', 'panel-group')
    expect(screen.getByLabelText('Resize panels')).toHaveAttribute('data-scope', 'resizable')
    expect(screen.getByLabelText('Resize panels')).toHaveAttribute('data-slot', 'handle')

    expect(document.querySelector('[data-scope="resizable"][data-slot="handle-grip"]')).toHaveAttribute(
      'data-scope',
      'resizable'
    )
    expect(document.querySelector('[data-scope="resizable"][data-slot="handle-grip"]')).toHaveAttribute(
      'data-slot',
      'handle-grip'
    )
  })
})
