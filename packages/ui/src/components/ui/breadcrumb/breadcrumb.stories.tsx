import { expect, within } from 'storybook/test'

import type { Meta, StoryObj } from '@storybook/react-vite'
import type { SVGProps } from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '../dropdown-menu'
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from './breadcrumb'

type IconProps = SVGProps<SVGSVGElement>

const DotIcon = (props: IconProps) => (
  <svg aria-hidden="true" className="size-3" fill="currentColor" viewBox="0 0 24 24" {...props}>
    <circle cx="12" cy="12" r="3" />
  </svg>
)

const ChevronDownIcon = (props: IconProps) => (
  <svg
    aria-hidden="true"
    className="size-3.5"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
)

const RouterLink = ({ href, ...props }: React.ComponentProps<'a'>) => <a href={href} {...props} />

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

const BasicTrail = ({ dot = false }: { dot?: boolean }) => (
  <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator>{dot ? <DotIcon /> : undefined}</BreadcrumbSeparator>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Components</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator>{dot ? <DotIcon /> : undefined}</BreadcrumbSeparator>
      <BreadcrumbItem>
        <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
)

export const Basic: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Covers the trail structure from [shadcn/ui Breadcrumb Basic](https://ui.shadcn.com/docs/components/base/breadcrumb.md#basic).'
      }
    }
  },
  render: () => <BasicTrail />
}
Basic.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(canvas.getByRole('navigation', { name: 'breadcrumb' })).toHaveAttribute('data-slot', 'breadcrumb')
  await expect(canvas.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '#')
  await expect(canvas.getByText('Breadcrumb')).toHaveAttribute('aria-current', 'page')
}

export const CustomSeparator: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Covers custom separators from [shadcn/ui Breadcrumb Custom separator](https://ui.shadcn.com/docs/components/base/breadcrumb.md#custom-separator).'
      }
    }
  },
  render: () => <BasicTrail dot />
}

export const Dropdown: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Covers dropdown composition from [shadcn/ui Breadcrumb Dropdown](https://ui.shadcn.com/docs/components/base/breadcrumb.md#dropdown).'
      }
    }
  },
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <DotIcon />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger render={<button className="flex items-center gap-1" type="button" />}>
              Components
              <ChevronDownIcon data-icon="inline-end" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuGroup>
                <DropdownMenuItem>Documentation</DropdownMenuItem>
                <DropdownMenuItem>Themes</DropdownMenuItem>
                <DropdownMenuItem>GitHub</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <DotIcon />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
Dropdown.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const trigger = canvas.getByRole('button', { name: /Components/ })

  await expect(trigger).toHaveAttribute('aria-haspopup', 'menu')
  await expect(trigger).toBeEnabled()
  await expect(canvas.getByText('Breadcrumb')).toHaveAttribute('aria-current', 'page')
}

export const Collapsed: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Covers long trails with ellipsis from [shadcn/ui Breadcrumb Collapsed](https://ui.shadcn.com/docs/components/base/breadcrumb.md#collapsed).'
      }
    }
  },
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbEllipsis />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export const LinkComponent: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Covers custom routing links from [shadcn/ui Breadcrumb Link component](https://ui.shadcn.com/docs/components/base/breadcrumb.md#link-component).'
      }
    }
  },
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink render={<RouterLink href="#link-component" />}>Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink render={<RouterLink href="#link-component" />}>Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
LinkComponent.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(canvas.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '#link-component')
  await expect(canvas.getByRole('link', { name: 'Components' })).toHaveAttribute('href', '#link-component')
}
