import type { Meta, StoryObj } from '@storybook/react-vite'

import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs'

const meta = {
  component: Tabs,
  parameters: {
    docs: {
      description: {
        component:
          'A tabbed interface for switching between related panels. Examples and guidance reference the [shadcn/ui Tabs documentation](https://ui.shadcn.com/docs/components/base/tabs.md).'
      }
    }
  },
  tags: ['autodocs'],
  title: 'UI/Tabs'
} satisfies Meta<typeof Tabs>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Tabs className="w-[400px]" defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">Make changes to your account here.</TabsContent>
      <TabsContent value="password">Change your password here.</TabsContent>
    </Tabs>
  )
}
