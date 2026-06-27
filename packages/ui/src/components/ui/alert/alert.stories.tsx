import { expect, within } from 'storybook/test'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../button'
import { Alert, AlertDescription, AlertTitle } from './alert'

const TerminalIcon = () => (
  <svg
    aria-hidden="true"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path d="m4 17 6-6-6-6" />
    <path d="M12 19h8" />
  </svg>
)

const meta = {
  component: Alert,
  parameters: {
    docs: {
      description: {
        component:
          'A callout for important contextual messages and status feedback. Examples and guidance reference the [shadcn/ui Alert documentation](https://ui.shadcn.com/docs/components/base/alert.md).'
      }
    }
  },
  tags: ['autodocs'],
  title: 'UI/Alert'
} satisfies Meta<typeof Alert>

export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Basic alert for contextual status content. Reference: [shadcn/ui Alert Basic example](https://ui.shadcn.com/docs/components/base/alert.md#basic)'
      }
    }
  },
  render: () => (
    <Alert>
      <TerminalIcon />
      <AlertTitle>Heads up</AlertTitle>
      <AlertDescription>You can add components to your app using the CLI.</AlertDescription>
    </Alert>
  )
}
Basic.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const alert = canvas.getByRole('alert')

  await expect(alert).toBeInTheDocument()
  await expect(canvas.getByText('Heads up')).toHaveAttribute('data-slot', 'alert-title')
  await expect(canvas.getByText('You can add components to your app using the CLI.')).toHaveAttribute(
    'data-slot',
    'alert-description'
  )
}

export const Action: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Add an inline action to alerts that need a direct response. Reference: [shadcn/ui Alert Action example](https://ui.shadcn.com/docs/components/base/alert.md#action)'
      }
    }
  },
  render: () => (
    <Alert className="max-w-xl">
      <TerminalIcon />
      <AlertTitle>Update available</AlertTitle>
      <AlertDescription className="flex items-center justify-between gap-4">
        A new token build is ready to publish.
        <Button size="sm" variant="outline">
          Review
        </Button>
      </AlertDescription>
    </Alert>
  )
}
Action.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(canvas.getByRole('alert')).toHaveTextContent('A new token build is ready to publish.')
  await expect(canvas.getByRole('button', { name: 'Review' })).toBeEnabled()
}

export const Destructive: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use destructive alerts for critical or failed states. Reference: [shadcn/ui Alert Destructive example](https://ui.shadcn.com/docs/components/base/alert.md#destructive)'
      }
    }
  },
  render: () => (
    <Alert variant="destructive">
      <AlertTitle>Unable to sync</AlertTitle>
      <AlertDescription>Check your token source and try again.</AlertDescription>
    </Alert>
  )
}
Destructive.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(canvas.getByRole('alert')).toHaveClass('text-destructive')
  await expect(canvas.getByText('Unable to sync')).toBeVisible()
}

export const CustomColors: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Customize alert colors with className for domain-specific statuses. Reference: [shadcn/ui Alert Custom Colors example](https://ui.shadcn.com/docs/components/base/alert.md#custom-colors)'
      }
    }
  },
  render: () => (
    <Alert className="max-w-xl border-blue-200 bg-blue-50 text-blue-950">
      <TerminalIcon />
      <AlertTitle>Preview environment ready</AlertTitle>
      <AlertDescription className="text-blue-800">A temporary preview was deployed for review.</AlertDescription>
    </Alert>
  )
}
