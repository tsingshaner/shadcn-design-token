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
    expect(screen.getByText('Left').parentElement).toHaveClass('cn-resizable-panel-group')
    expect(screen.getByLabelText('Resize panels')).toHaveAttribute('data-slot', 'resizable-handle')
    expect(screen.getByLabelText('Resize panels')).toHaveClass('cn-resizable-handle')
    expect(document.querySelector('[data-slot="resizable-handle-grip"]')).toHaveClass('cn-resizable-handle-icon')
  })
})
