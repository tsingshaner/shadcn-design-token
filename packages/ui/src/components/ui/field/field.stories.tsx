import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../button'
import { Input } from '../input'
import { Textarea } from '../textarea'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from './field'

const meta = {
  component: Field,
  parameters: {
    docs: {
      description: {
        component:
          'Form field primitives for labels, descriptions, validation messages, and layout grouping. Examples and guidance reference the [shadcn/ui Field documentation](https://ui.shadcn.com/docs/components/base/field.md).'
      }
    }
  },
  tags: ['autodocs'],
  title: 'UI/Field'
} satisfies Meta<typeof Field>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Compose Field, FieldLabel, FieldDescription, and Input for common form rows. Reference: [shadcn/ui Field Input example](https://ui.shadcn.com/docs/components/base/field.md#input)'
      }
    }
  },
  render: () => (
    <FieldGroup className="max-w-sm">
      <Field>
        <FieldLabel htmlFor="name">Name</FieldLabel>
        <Input id="name" placeholder="Design token set" />
        <FieldDescription>Use a short name that describes this token collection.</FieldDescription>
      </Field>
      <Field>
        <FieldLabel htmlFor="slug">Slug</FieldLabel>
        <Input aria-invalid id="slug" placeholder="tokens" />
        <FieldError>Slug is already in use.</FieldError>
      </Field>
    </FieldGroup>
  )
}

export const TextareaExample: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use the same Field structure with Textarea for longer form content. Reference: [shadcn/ui Field Textarea example](https://ui.shadcn.com/docs/components/base/field.md#textarea)'
      }
    }
  },
  render: () => (
    <FieldGroup className="max-w-sm">
      <Field>
        <FieldLabel htmlFor="feedback">Feedback</FieldLabel>
        <Textarea id="feedback" placeholder="Your feedback helps us improve..." rows={4} />
        <FieldDescription>Share your thoughts about our service.</FieldDescription>
      </Field>
    </FieldGroup>
  )
}

export const AddressForm: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use FieldGroup and grid layout for related field sets. Reference: [shadcn/ui Field Fieldset example](https://ui.shadcn.com/docs/components/base/field.md#fieldset)'
      }
    }
  },
  render: () => (
    <FieldGroup className="max-w-sm">
      <Field>
        <FieldLabel htmlFor="street">Street Address</FieldLabel>
        <Input id="street" placeholder="123 Main St" type="text" />
        <FieldDescription>We need your address to deliver your order.</FieldDescription>
      </Field>
      <div className="grid grid-cols-2 gap-4">
        <Field>
          <FieldLabel htmlFor="city">City</FieldLabel>
          <Input id="city" placeholder="New York" type="text" />
        </Field>
        <Field>
          <FieldLabel htmlFor="zip">Postal Code</FieldLabel>
          <Input id="zip" placeholder="90502" type="text" />
        </Field>
      </div>
      <Field className="flex-row justify-end">
        <Button type="button" variant="outline">
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </Field>
    </FieldGroup>
  )
}
