import { expect, userEvent, within } from 'storybook/test'

import type { Meta, StoryObj } from '@storybook/react-vite'
import type { SVGProps } from 'react'

import { Button } from '../button'
import { Input } from '../input'
import { ButtonGroup, ButtonGroupSeparator } from './button-group'

type IconProps = SVGProps<SVGSVGElement>

const PlusIcon = (props: IconProps) => (
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
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </svg>
)

const MinusIcon = (props: IconProps) => (
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
    <path d="M5 12h14" />
  </svg>
)

const SearchIcon = (props: IconProps) => (
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
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
)

const meta = {
  component: ButtonGroup,
  parameters: {
    docs: {
      description: {
        component:
          'A layout wrapper for grouping related button actions as a single control. Examples and guidance reference the [shadcn/ui Button Group documentation](https://ui.shadcn.com/docs/components/base/button-group.md).'
      }
    }
  },
  tags: ['autodocs'],
  title: 'UI/ButtonGroup'
} satisfies Meta<typeof ButtonGroup>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use ButtonGroupSeparator when non-outline buttons need a visual divider. Reference: [shadcn/ui Button Group Separator example](https://ui.shadcn.com/docs/components/base/button-group.md#separator)'
      }
    }
  },
  render: () => (
    <ButtonGroup>
      <Button variant="outline">Copy</Button>
      <Button variant="outline">Paste</Button>
      <ButtonGroupSeparator />
      <Button variant="outline">More</Button>
    </ButtonGroup>
  )
}
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(canvasElement.querySelector('[data-slot="button-group"]')).toHaveAttribute(
    'data-orientation',
    'horizontal'
  )
  await expect(canvas.getByRole('button', { name: 'Copy' })).toBeEnabled()
  await expect(canvasElement.querySelector('[data-slot="button-group-separator"]')).toBeInTheDocument()
}

export const Orientation: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Set `orientation="vertical"` to stack grouped actions. Reference: [shadcn/ui Button Group Orientation example](https://ui.shadcn.com/docs/components/base/button-group.md#orientation).'
      }
    }
  },
  render: () => (
    <ButtonGroup aria-label="Media controls" className="h-fit" orientation="vertical">
      <Button aria-label="Increase" size="icon" variant="outline">
        <PlusIcon />
      </Button>
      <Button aria-label="Decrease" size="icon" variant="outline">
        <MinusIcon />
      </Button>
    </ButtonGroup>
  )
}
Orientation.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(canvas.getByLabelText('Media controls')).toHaveAttribute('data-orientation', 'vertical')
  await expect(canvas.getByRole('button', { name: 'Increase' })).toBeEnabled()
}

export const Size: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Control grouped button density by setting size on each Button. Reference: [shadcn/ui Button Group Size example](https://ui.shadcn.com/docs/components/base/button-group.md#size)'
      }
    }
  },
  render: () => (
    <div className="flex flex-col items-start gap-4">
      <ButtonGroup>
        <Button size="sm" variant="outline">
          Small
        </Button>
        <Button size="sm" variant="outline">
          Button
        </Button>
        <Button size="icon-sm" variant="outline">
          <PlusIcon />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline">Default</Button>
        <Button variant="outline">Button</Button>
        <Button size="icon" variant="outline">
          <PlusIcon />
        </Button>
      </ButtonGroup>
    </div>
  )
}

export const Split: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Create a split button by separating a primary action and icon action. Reference: [shadcn/ui Button Group Split example](https://ui.shadcn.com/docs/components/base/button-group.md#split)'
      }
    }
  },
  render: () => (
    <ButtonGroup>
      <Button variant="secondary">Create</Button>
      <ButtonGroupSeparator />
      <Button aria-label="Add another" size="icon" variant="secondary">
        <PlusIcon />
      </Button>
    </ButtonGroup>
  )
}

export const WithInput: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Wrap Input with ButtonGroup when an input and action should read as one control. Reference: [shadcn/ui Button Group Input example](https://ui.shadcn.com/docs/components/base/button-group.md#input)'
      }
    }
  },
  render: () => (
    <ButtonGroup className="w-full max-w-sm [&_[data-slot=button]]:rounded-l-none [&_[data-slot=input]]:rounded-r-none [&_[data-slot=input]]:shadow-none">
      <Input placeholder="Search..." />
      <Button aria-label="Search" variant="outline">
        <SearchIcon />
      </Button>
    </ButtonGroup>
  )
}
WithInput.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const input = canvas.getByPlaceholderText('Search...')

  await userEvent.type(input, 'accordion')

  await expect(input).toHaveValue('accordion')
  await expect(canvas.getByRole('button', { name: 'Search' })).toBeEnabled()
}
