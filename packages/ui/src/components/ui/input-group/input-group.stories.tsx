import { expect, userEvent, within } from 'storybook/test'

import type { Meta, StoryObj } from '@storybook/react-vite'
import type { SVGProps } from 'react'

import { Kbd } from '../kbd'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText } from './input-group'

type IconProps = SVGProps<SVGSVGElement>

const CheckIcon = (props: IconProps) => (
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
    <path d="m5 12 4 4L19 6" />
  </svg>
)

const CreditCardIcon = (props: IconProps) => (
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
    <rect height="14" rx="2" width="20" x="2" y="5" />
    <path d="M2 10h20" />
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
  component: InputGroup,
  parameters: {
    docs: {
      description: {
        component:
          'A composed input wrapper for inline text, icons, and adjacent controls. Examples and guidance reference the [shadcn/ui Input Group documentation](https://ui.shadcn.com/docs/components/base/input-group.md).'
      }
    }
  },
  tags: ['autodocs'],
  title: 'UI/InputGroup'
} satisfies Meta<typeof InputGroup>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use InputGroupText for inline protocol or prefix text. Reference: [shadcn/ui Input Group Text example](https://ui.shadcn.com/docs/components/base/input-group.md#text)'
      }
    }
  },
  render: () => (
    <InputGroup className="max-w-sm">
      <InputGroupAddon>
        <InputGroupText>https://</InputGroupText>
      </InputGroupAddon>
      <InputGroupInput aria-label="URL" placeholder="tokens.example.com" />
      <InputGroupAddon>
        <InputGroupButton>Copy</InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  )
}
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const input = canvas.getByRole('textbox', { name: 'URL' })

  await userEvent.type(input, 'docs')

  await expect(input).toHaveValue('docs')
  await expect(canvas.getByText('https://')).toHaveAttribute('data-slot', 'input-group-text')
  await expect(canvas.getByRole('button', { name: 'Copy' })).toHaveAttribute('data-slot', 'input-group-button')
}

export const WithIcons: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Place icons in InputGroupAddon for search, email, or payment inputs. Reference: [shadcn/ui Input Group Icon example](https://ui.shadcn.com/docs/components/base/input-group.md#icon)'
      }
    }
  },
  render: () => (
    <div className="grid w-full max-w-sm gap-4">
      <InputGroup>
        <InputGroupInput placeholder="Search..." />
        <InputGroupAddon>
          <SearchIcon className="size-4" />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="Card number" />
        <InputGroupAddon>
          <CreditCardIcon className="size-4" />
        </InputGroupAddon>
        <InputGroupAddon className="ml-auto">
          <CheckIcon className="size-4" />
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}

export const WithButton: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use InputGroupButton for compact actions inside the input frame. Reference: [shadcn/ui Input Group Button example](https://ui.shadcn.com/docs/components/base/input-group.md#button)'
      }
    }
  },
  render: () => (
    <InputGroup className="max-w-sm">
      <InputGroupInput placeholder="Type to search..." />
      <InputGroupAddon className="ml-auto">
        <InputGroupButton>Search</InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  )
}
WithButton.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(canvas.getByPlaceholderText('Type to search...')).toBeEnabled()
  await expect(canvas.getByRole('button', { name: 'Search' })).toBeEnabled()
}

export const WithKbd: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Pair InputGroup with Kbd to show keyboard shortcuts. Reference: [shadcn/ui Input Group Kbd example](https://ui.shadcn.com/docs/components/base/input-group.md#kbd)'
      }
    }
  },
  render: () => (
    <InputGroup className="max-w-sm">
      <InputGroupInput placeholder="Search..." />
      <InputGroupAddon>
        <SearchIcon className="size-4" />
      </InputGroupAddon>
      <InputGroupAddon className="ml-auto">
        <Kbd>⌘K</Kbd>
      </InputGroupAddon>
    </InputGroup>
  )
}
WithKbd.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(canvas.getByText('⌘K')).toHaveAttribute('data-slot', 'kbd')
  await expect(canvas.getByPlaceholderText('Search...')).toBeEnabled()
}
