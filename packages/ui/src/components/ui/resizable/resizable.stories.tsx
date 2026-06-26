import type { Meta, StoryObj } from '@storybook/react-vite'

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from './resizable'

const meta = {
  component: ResizablePanelGroup,
  title: 'Components/Resizable'
} satisfies Meta<typeof ResizablePanelGroup>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
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
