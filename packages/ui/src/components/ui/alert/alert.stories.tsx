import type { Meta, StoryObj } from '@storybook/react-vite'

import { Alert, AlertDescription, AlertTitle } from './alert'

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

export const Default: Story = {
  render: () => (
    <Alert>
      <AlertTitle>Heads up</AlertTitle>
      <AlertDescription>You can add components to your app using the CLI.</AlertDescription>
    </Alert>
  )
}

export const Destructive: Story = {
  render: () => (
    <Alert variant="destructive">
      <AlertTitle>Unable to sync</AlertTitle>
      <AlertDescription>Check your token source and try again.</AlertDescription>
    </Alert>
  )
}
