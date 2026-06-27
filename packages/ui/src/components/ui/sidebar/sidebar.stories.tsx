import type { Meta, StoryObj } from '@storybook/react-vite'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger
} from './sidebar'

const meta = {
  component: Sidebar,
  parameters: {
    docs: {
      description: {
        component:
          'A navigation shell for app layouts with persistent or collapsible side content. Examples and guidance reference the [shadcn/ui Sidebar documentation](https://ui.shadcn.com/docs/components/base/sidebar.md).'
      }
    }
  },
  tags: ['autodocs'],
  title: 'Components/Sidebar'
} satisfies Meta<typeof Sidebar>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <SidebarProvider className="h-[360px] min-h-0 rounded-lg border">
      <Sidebar className="h-full">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton isActive>Acme Studio</SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Workspace</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>Projects</SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    Issues
                    <SidebarMenuBadge>12</SidebarMenuBadge>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <div className="flex h-12 items-center gap-2 border-b px-4">
          <SidebarTrigger aria-label="Toggle sidebar" />
          <span className="font-medium text-sm">Dashboard</span>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
