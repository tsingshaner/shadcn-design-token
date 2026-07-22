import { expect, userEvent, within } from 'storybook/test'

import type { Meta, StoryObj } from '@storybook/react-vite'
import type { SVGProps } from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs'

type IconProps = SVGProps<SVGSVGElement>

const AppWindowIcon = (props: IconProps) => (
  <svg
    aria-hidden="true"
    className="size-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    {...props}
  >
    <rect height="14" rx="2" width="18" x="3" y="5" />
    <path d="M3 9h18" />
  </svg>
)

const CodeIcon = (props: IconProps) => (
  <svg
    aria-hidden="true"
    className="size-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="m10 16 4-8" />
    <path d="m6 8-4 4 4 4" />
    <path d="m18 8 4 4-4 4" />
  </svg>
)

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
  title: 'Material Design 3/Tabs'
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
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(canvas.getByRole('tab', { name: 'Account' })).toHaveAttribute('aria-selected', 'true')
  await expect(canvas.getByText('Make changes to your account here.')).toBeVisible()

  await userEvent.click(canvas.getByRole('tab', { name: 'Password' }))

  await expect(canvas.getByRole('tab', { name: 'Password' })).toHaveAttribute('aria-selected', 'true')
  await expect(canvas.getByText('Change your password here.')).toBeVisible()
}

export const Line: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Covers `TabsList variant="line"` from [shadcn/ui Tabs Line](https://ui.shadcn.com/docs/components/base/tabs.md#line).'
      }
    }
  },
  render: () => (
    <Tabs defaultValue="overview">
      <TabsList variant="line">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
Line.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(canvas.getByRole('tablist')).toHaveAttribute('data-variant', 'line')
  await expect(canvas.getByRole('tab', { name: 'Overview' })).toHaveAttribute('aria-selected', 'true')
}

export const Vertical: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Covers `orientation="vertical"` from [shadcn/ui Tabs Vertical](https://ui.shadcn.com/docs/components/base/tabs.md#vertical).'
      }
    }
  },
  render: () => (
    <Tabs className="flex-row" defaultValue="account" orientation="vertical">
      <TabsList className="h-auto flex-col">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
Vertical.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(canvas.getByRole('tablist')).toHaveAttribute('aria-orientation', 'vertical')
}

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Covers disabled tab triggers from [shadcn/ui Tabs Disabled](https://ui.shadcn.com/docs/components/base/tabs.md#disabled).'
      }
    }
  },
  render: () => (
    <Tabs defaultValue="home">
      <TabsList>
        <TabsTrigger value="home">Home</TabsTrigger>
        <TabsTrigger disabled value="settings">
          Disabled
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
Disabled.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(canvas.getByRole('tab', { name: 'Disabled' })).toHaveAttribute('data-disabled')
}

export const Icons: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Covers icon labels from [shadcn/ui Tabs Icons](https://ui.shadcn.com/docs/components/base/tabs.md#icons).'
      }
    }
  },
  render: () => (
    <Tabs defaultValue="preview">
      <TabsList>
        <TabsTrigger value="preview">
          <AppWindowIcon />
          Preview
        </TabsTrigger>
        <TabsTrigger value="code">
          <CodeIcon />
          Code
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
