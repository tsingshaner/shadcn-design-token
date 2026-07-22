import { expect, userEvent, within } from 'storybook/test'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { Field, FieldDescription, FieldLabel } from '../../ui/field'
import { Button } from '../button'
import { Textarea } from './textarea'

const meta = {
  args: {
    placeholder: 'Type your message here.'
  },
  component: Textarea,
  parameters: {
    docs: {
      description: {
        component:
          'A multi-line text input for longer form content. Examples and guidance reference the [shadcn/ui Textarea documentation](https://ui.shadcn.com/docs/components/base/textarea.md).'
      }
    }
  },
  tags: ['autodocs'],
  title: 'Material Design 3/Textarea'
} satisfies Meta<typeof Textarea>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const textarea = canvas.getByPlaceholderText('Type your message here.')

  await userEvent.type(textarea, 'Ship the token update')

  await expect(textarea).toHaveValue('Ship the token update')
}

export const FieldExample: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use Field, FieldLabel, and FieldDescription to pair a textarea with supporting copy. Reference: [shadcn/ui Textarea Field example](https://ui.shadcn.com/docs/components/base/textarea.md#field)'
      }
    }
  },
  render: () => (
    <Field className="max-w-sm">
      <FieldLabel htmlFor="textarea-message">Message</FieldLabel>
      <FieldDescription>Enter your message below.</FieldDescription>
      <Textarea id="textarea-message" placeholder="Type your message here." />
    </Field>
  )
}

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use disabled on Textarea and data-disabled on Field when the wrapper should share the disabled state. Reference: [shadcn/ui Textarea Disabled example](https://ui.shadcn.com/docs/components/base/textarea.md#disabled)'
      }
    }
  },
  render: () => (
    <Field className="max-w-sm" data-disabled>
      <FieldLabel htmlFor="textarea-disabled">Message</FieldLabel>
      <Textarea disabled id="textarea-disabled" placeholder="Type your message here." />
    </Field>
  )
}
Disabled.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(canvas.getByLabelText('Message')).toBeDisabled()
}

export const Invalid: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use aria-invalid on Textarea and data-invalid on Field for validation feedback. Reference: [shadcn/ui Textarea Invalid example](https://ui.shadcn.com/docs/components/base/textarea.md#invalid)'
      }
    }
  },
  render: () => (
    <Field className="max-w-sm" data-invalid>
      <FieldLabel htmlFor="textarea-invalid">Message</FieldLabel>
      <Textarea aria-invalid id="textarea-invalid" placeholder="Type your message here." />
      <FieldDescription>Please enter a valid message.</FieldDescription>
    </Field>
  )
}
Invalid.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(canvas.getByLabelText('Message')).toHaveAttribute('aria-invalid', 'true')
  await expect(canvas.getByText('Please enter a valid message.')).toBeVisible()
}

export const WithButton: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Pair Textarea with Button for a compact submit flow. Reference: [shadcn/ui Textarea Button example](https://ui.shadcn.com/docs/components/base/textarea.md#button)'
      }
    }
  },
  render: () => (
    <div className="grid w-full max-w-sm gap-2">
      <Textarea placeholder="Type your message here." />
      <Button>Send message</Button>
    </div>
  )
}
WithButton.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(canvas.getByRole('textbox')).toBeEnabled()
  await expect(canvas.getByRole('button', { name: 'Send message' })).toBeEnabled()
}
