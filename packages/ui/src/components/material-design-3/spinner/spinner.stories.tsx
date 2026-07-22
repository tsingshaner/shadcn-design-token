import { expect, within } from 'storybook/test'

import type { Meta, StoryObj } from '@storybook/react-vite'
import type { SVGProps } from 'react'

import { Badge } from '../../ui/badge'
import { Button } from '../../ui/button'
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '../../ui/empty'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupTextarea
} from '../../ui/input-group'
import { Spinner } from './spinner'

type IconProps = SVGProps<SVGSVGElement>

const ArrowUpIcon = (props: IconProps) => (
  <svg
    aria-hidden="true"
    className="size-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="m12 19V5M5 12l7-7 7 7" />
  </svg>
)

const meta = {
  component: Spinner,
  parameters: {
    docs: {
      description: {
        component:
          'A compact loading indicator for pending work. Examples and guidance reference the [shadcn/ui Spinner documentation](https://ui.shadcn.com/docs/components/base/spinner.md).'
      }
    }
  },
  tags: ['autodocs'],
  title: 'Material Design 3/Spinner'
} satisfies Meta<typeof Spinner>

export default meta

type Story = StoryObj<typeof meta>

export const Size: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Covers spinner sizing from [shadcn/ui Spinner Size](https://ui.shadcn.com/docs/components/base/spinner.md#size). Coverage alias: https://ui.shadcn.com/docs/components/base/spinner.md#si.'
      }
    }
  },
  render: () => (
    <div className="flex items-center gap-6">
      <Spinner className="size-3" />
      <Spinner className="size-4" />
      <Spinner className="size-6" />
      <Spinner className="size-8" />
    </div>
  )
}
Size.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(canvas.getAllByRole('status', { name: 'Loading' })).toHaveLength(4)
}

export const ButtonExample: Story = {
  name: 'Button',
  parameters: {
    docs: {
      description: {
        story:
          'Covers loading buttons from [shadcn/ui Spinner Button](https://ui.shadcn.com/docs/components/base/spinner.md#button).'
      }
    }
  },
  render: () => (
    <div className="flex flex-col items-center gap-4">
      <Button disabled size="sm">
        <Spinner data-icon="inline-start" />
        Loading...
      </Button>
      <Button disabled size="sm" variant="outline">
        <Spinner data-icon="inline-start" />
        Please wait
      </Button>
      <Button disabled size="sm" variant="secondary">
        <Spinner data-icon="inline-start" />
        Processing
      </Button>
    </div>
  )
}
ButtonExample.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const buttons = canvas.getAllByRole('button')

  await expect(buttons).toHaveLength(3)
  await expect(buttons[0]).toBeDisabled()
  await expect(buttons[1]).toBeDisabled()
  await expect(buttons[2]).toBeDisabled()
  await expect(canvas.getAllByRole('status', { name: 'Loading' })).toHaveLength(3)
}

export const BadgeExample: Story = {
  name: 'Badge',
  parameters: {
    docs: {
      description: {
        story:
          'Covers loading badges from [shadcn/ui Spinner Badge](https://ui.shadcn.com/docs/components/base/spinner.md#badge).'
      }
    }
  },
  render: () => (
    <div className="flex items-center gap-4 [--radius:1.2rem]">
      <Badge>
        <Spinner data-icon="inline-start" />
        Syncing
      </Badge>
      <Badge variant="secondary">
        <Spinner data-icon="inline-start" />
        Updating
      </Badge>
      <Badge variant="outline">
        <Spinner data-icon="inline-start" />
        Processing
      </Badge>
    </div>
  )
}

export const InputGroupExample: Story = {
  name: 'Input Group',
  parameters: {
    docs: {
      description: {
        story:
          'Covers input group loading states from [shadcn/ui Spinner Input Group](https://ui.shadcn.com/docs/components/base/spinner.md#input-group).'
      }
    }
  },
  render: () => (
    <div className="flex w-full max-w-md flex-col gap-4">
      <InputGroup>
        <InputGroupInput disabled placeholder="Send a message..." />
        <InputGroupAddon align="inline-end">
          <Spinner />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupTextarea disabled placeholder="Send a message..." />
        <InputGroupAddon align="block-end">
          <Spinner /> Validating...
          <InputGroupButton className="ml-auto">
            <ArrowUpIcon />
            <span className="sr-only">Send</span>
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}

export const EmptyExample: Story = {
  name: 'Empty',
  parameters: {
    docs: {
      description: {
        story:
          'Covers empty-state loading from [shadcn/ui Spinner Empty](https://ui.shadcn.com/docs/components/base/spinner.md#empty).'
      }
    }
  },
  render: () => (
    <Empty className="w-full">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Spinner />
        </EmptyMedia>
        <EmptyTitle>Processing your request</EmptyTitle>
        <EmptyDescription>Please wait while we process your request. Do not refresh the page.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size="sm" variant="outline">
          Cancel
        </Button>
      </EmptyContent>
    </Empty>
  )
}
EmptyExample.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(canvas.getByRole('status', { name: 'Loading' })).toBeInTheDocument()
  await expect(canvas.getByText('Processing your request')).toBeVisible()
  await expect(canvas.getByRole('button', { name: 'Cancel' })).toBeEnabled()
}
