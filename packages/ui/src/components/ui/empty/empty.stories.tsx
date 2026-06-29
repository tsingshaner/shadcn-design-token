import { expect, within } from 'storybook/test'

import type { Meta, StoryObj } from '@storybook/react-vite'
import type { SVGProps } from 'react'

import { Button } from '../button'
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from './empty'

type IconProps = SVGProps<SVGSVGElement>

const CloudIcon = (props: IconProps) => (
  <svg
    aria-hidden="true"
    className="size-6"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M17.5 19H7a5 5 0 1 1 1.3-9.8A7 7 0 0 1 21 13.5 4.5 4.5 0 0 1 17.5 19Z" />
  </svg>
)

const meta = {
  component: Empty,
  parameters: {
    docs: {
      description: {
        component:
          'A placeholder state for views without content or results. Examples and guidance reference the [shadcn/ui Empty documentation](https://ui.shadcn.com/docs/components/base/empty.md).'
      }
    }
  },
  tags: ['autodocs'],
  title: 'UI/Empty'
} satisfies Meta<typeof Empty>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Empty>
      <EmptyMedia>0</EmptyMedia>
      <EmptyHeader>
        <EmptyTitle>No tokens found</EmptyTitle>
        <EmptyDescription>Create a token set to start generating component themes.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button>Create token set</Button>
      </EmptyContent>
    </Empty>
  )
}
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(canvas.getByText('No tokens found')).toHaveAttribute('data-slot', 'empty-title')
  await expect(canvas.getByText('Create a token set to start generating component themes.')).toHaveAttribute(
    'data-slot',
    'empty-description'
  )
  await expect(canvas.getByRole('button', { name: 'Create token set' })).toBeEnabled()
}

export const Outline: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Covers outlined empty states from [shadcn/ui Empty Outline](https://ui.shadcn.com/docs/components/base/empty.md#outline).'
      }
    }
  },
  render: () => (
    <Empty className="border border-dashed">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <CloudIcon />
        </EmptyMedia>
        <EmptyTitle>Cloud Storage Empty</EmptyTitle>
        <EmptyDescription>Upload files to your cloud storage to access them anywhere.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size="sm" variant="outline">
          Upload Files
        </Button>
      </EmptyContent>
    </Empty>
  )
}
Outline.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(canvasElement.querySelector('[data-slot="empty-icon"]')).toHaveAttribute('data-variant', 'icon')
  await expect(canvas.getByRole('button', { name: 'Upload Files' })).toBeEnabled()
}
