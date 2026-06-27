import { expect, within } from 'storybook/test'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from './resizable'

const meta = {
  component: ResizablePanelGroup,
  parameters: {
    docs: {
      description: {
        component:
          'Resizable panel primitives for adjustable layouts. Examples and guidance reference the [shadcn/ui Resizable documentation](https://ui.shadcn.com/docs/components/base/resizable.md).'
      }
    }
  },
  tags: ['autodocs'],
  title: 'Components/Resizable'
} satisfies Meta<typeof ResizablePanelGroup>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use ResizablePanelGroup, ResizablePanel, and ResizableHandle for adjustable horizontal layouts. Reference: [shadcn/ui Resizable Handle example](https://ui.shadcn.com/docs/components/base/resizable.md#handle)'
      }
    }
  },
  render: () => (
    <ResizablePanelGroup className="h-64 max-w-lg">
      <ResizablePanel className="p-4" defaultSize={50}>
        Sidebar
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel className="p-4">Content</ResizablePanel>
    </ResizablePanelGroup>
  )
}
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(canvas.getByText('Sidebar')).toBeVisible()
  await expect(canvas.getByText('Content')).toBeVisible()
  await expect(canvas.getByLabelText('Resize panels')).toHaveAttribute('data-slot', 'resizable-handle')
}

export const Vertical: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use orientation="vertical" for vertical resizing. Reference: [shadcn/ui Resizable Vertical example](https://ui.shadcn.com/docs/components/base/resizable.md#vertical)'
      }
    }
  },
  render: () => (
    <ResizablePanelGroup className="min-h-[200px] max-w-sm rounded-lg border" orientation="vertical">
      <ResizablePanel defaultSize={25}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Header</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={75}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Content</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
Vertical.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(canvasElement.querySelector('[data-slot="resizable-panel-group"]')).toHaveAttribute(
    'data-direction',
    'vertical'
  )
  await expect(canvas.getByText('Header')).toBeVisible()
}

export const Handle: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use withHandle on ResizableHandle to show a visible handle. Reference: [shadcn/ui Resizable Handle example](https://ui.shadcn.com/docs/components/base/resizable.md#handle)'
      }
    }
  },
  render: () => (
    <ResizablePanelGroup className="min-h-[200px] max-w-sm rounded-lg border" orientation="horizontal">
      <ResizablePanel defaultSize={25}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Sidebar</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={75}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Content</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
Handle.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(
    canvas.getByLabelText('Resize panels').querySelector('[data-slot="resizable-handle-grip"]')
  ).toBeVisible()
}
