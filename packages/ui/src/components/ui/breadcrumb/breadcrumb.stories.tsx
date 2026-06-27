import type { Meta, StoryObj } from '@storybook/react-vite'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from './breadcrumb'

const meta = {
  component: Breadcrumb,
  parameters: {
    docs: {
      description: {
        component:
          'A navigation trail that shows the current page location within a hierarchy. Examples and guidance reference the [shadcn/ui Breadcrumb documentation](https://ui.shadcn.com/docs/components/base/breadcrumb.md).'
      }
    }
  },
  tags: ['autodocs'],
  title: 'UI/Breadcrumb'
} satisfies Meta<typeof Breadcrumb>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Button</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
