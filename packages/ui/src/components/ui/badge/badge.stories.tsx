import { expect, within } from 'storybook/test'

import type { Meta, StoryObj } from '@storybook/react-vite'
import type { SVGProps } from 'react'

import { Spinner } from '../spinner'
import { Badge } from './badge'

type IconProps = SVGProps<SVGSVGElement>

const BadgeCheckIcon = (props: IconProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M3.9 12.6 6 10.5l3 3 7-7 2.1 2.1L9 17.7z" />
  </svg>
)

const BookmarkIcon = (props: IconProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M6 4h12v16l-6-4-6 4z" />
  </svg>
)

const meta = {
  args: {
    children: 'Badge',
    variant: 'default'
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline', 'ghost', 'link']
    }
  },
  component: Badge,
  parameters: {
    docs: {
      description: {
        component:
          'A compact label for statuses, counts, and categorical metadata. Examples and guidance reference the [shadcn/ui Badge documentation](https://ui.shadcn.com/docs/components/base/badge.md).'
      }
    }
  },
  tags: ['autodocs'],
  title: 'UI/Badge'
} satisfies Meta<typeof Badge>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(canvas.getByText('Badge')).toHaveAttribute('data-slot', 'badge')
}

export const Variants: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use the variant prop to change Badge emphasis. Reference: [shadcn/ui Badge Variants example](https://ui.shadcn.com/docs/components/base/badge.md#variants)'
      }
    }
  },
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="ghost">Ghost</Badge>
    </div>
  )
}
Variants.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(canvas.getByText('Default')).toHaveClass('bg-primary')
  await expect(canvas.getByText('Secondary')).toHaveClass('bg-secondary')
  await expect(canvas.getByText('Destructive')).toHaveClass('bg-destructive')
}

export const WithIcon: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Render inline icons in badges with data-icon placement hints. Reference: [shadcn/ui Badge With Icon example](https://ui.shadcn.com/docs/components/base/badge.md#with-icon)'
      }
    }
  },
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="secondary">
        <BadgeCheckIcon data-icon="inline-start" />
        Verified
      </Badge>
      <Badge variant="outline">
        Bookmark
        <BookmarkIcon data-icon="inline-end" />
      </Badge>
    </div>
  )
}

export const WithSpinner: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use Spinner inside Badge for transient status labels. Reference: [shadcn/ui Badge With Spinner example](https://ui.shadcn.com/docs/components/base/badge.md#with-spinner)'
      }
    }
  },
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="destructive">
        <Spinner className="size-3" data-icon="inline-start" />
        Deleting
      </Badge>
      <Badge variant="secondary">
        Generating
        <Spinner className="size-3" data-icon="inline-end" />
      </Badge>
    </div>
  )
}

export const Link: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use render to render a link as a badge. Reference: [shadcn/ui Badge Link example](https://ui.shadcn.com/docs/components/base/badge.md#link)'
      }
    }
  },
  render: () => (
    <Badge render={<a href="#link" />} variant="link">
      Open Link
      <BookmarkIcon data-icon="inline-end" />
    </Badge>
  )
}
Link.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(canvas.getByRole('link', { name: 'Open Link' })).toHaveAttribute('href', '#link')
  await expect(canvas.getByRole('link', { name: 'Open Link' })).toHaveAttribute('data-slot', 'badge')
}

export const CustomColors: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Customize badge color by passing className. Reference: [shadcn/ui Badge Custom Colors example](https://ui.shadcn.com/docs/components/base/badge.md#custom-colors)'
      }
    }
  },
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge className="border-transparent bg-blue-50 text-blue-700">Blue</Badge>
      <Badge className="border-transparent bg-green-50 text-green-700">Green</Badge>
      <Badge className="border-transparent bg-sky-50 text-sky-700">Sky</Badge>
      <Badge className="border-transparent bg-red-50 text-red-700">Red</Badge>
    </div>
  )
}
