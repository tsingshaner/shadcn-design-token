import type { Meta, StoryObj } from '@storybook/react-vite'

import { Input } from '../input'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from './field'

const meta = {
  component: Field,
  tags: ['autodocs'],
  title: 'UI/Field'
} satisfies Meta<typeof Field>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
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
