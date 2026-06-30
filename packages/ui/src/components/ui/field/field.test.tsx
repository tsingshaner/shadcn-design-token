import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle
} from './field'

describe('Field', () => {
  afterEach(() => {
    cleanup()
  })

  test('renders label, description, and error slots', () => {
    render(
      <Field>
        <FieldLabel htmlFor="name">Name</FieldLabel>
        <FieldDescription>Helpful text.</FieldDescription>
        <FieldError>Required.</FieldError>
      </Field>
    )

    const field = screen.getByRole('group')
    const label = screen.getByText('Name')
    const description = screen.getByText('Helpful text.')
    const error = screen.getByRole('alert')
    expect(field).toHaveClass('cn-field', 'cn-field-orientation-vertical')
    expect(label).toHaveAttribute('data-slot', 'field-label')
    expect(label).toHaveClass('cn-field-label')
    expect(description).toHaveClass('cn-field-description')
    expect(error).toHaveTextContent('Required.')
    expect(error).toHaveClass('cn-field-error')
  })

  test('renders orientation metadata and unique validation errors', () => {
    render(
      <Field orientation="horizontal">
        <FieldContent>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <FieldDescription>Used for account notifications.</FieldDescription>
        </FieldContent>
        <FieldError errors={[{ message: 'Required.' }, { message: 'Required.' }, { message: 'Invalid format.' }]} />
      </Field>
    )

    const field = screen.getByRole('group')
    expect(field).toHaveAttribute('data-orientation', 'horizontal')
    expect(field).toHaveClass('cn-field-orientation-horizontal')
    expect(document.querySelector('[data-slot="field-content"]')).toHaveClass('cn-field-content')
    expect(screen.getByRole('alert')).toHaveTextContent('Required.')
    expect(screen.getByRole('alert')).toHaveTextContent('Invalid format.')
    expect(screen.getAllByRole('listitem')).toHaveLength(2)
  })

  test('renders semantic field grouping slots', () => {
    render(
      <FieldSet>
        <FieldLegend>Profile</FieldLegend>
        <FieldDescription>This appears on invoices and emails.</FieldDescription>
        <FieldGroup>
          <Field>
            <FieldTitle>Newsletter</FieldTitle>
            <FieldSeparator />
          </Field>
        </FieldGroup>
      </FieldSet>
    )

    expect(screen.getByText('Profile')).toHaveAttribute('data-slot', 'field-legend')
    expect(screen.getByText('Profile')).toHaveClass('cn-field-legend')
    expect(screen.getByText('Newsletter')).toHaveAttribute('data-slot', 'field-title')
    expect(screen.getByText('Newsletter')).toHaveClass('cn-field-title')
    expect(document.querySelector('[data-slot="field-set"]')).toHaveClass('cn-field-set')
    expect(document.querySelector('[data-slot="field-group"]')).toHaveClass('cn-field-group')
    expect(document.querySelector('[data-slot="field-separator"]')).toHaveClass('cn-field-separator')
  })

  test('renders separator content slot when children are provided', () => {
    render(<FieldSeparator>or</FieldSeparator>)

    expect(screen.getByText('or')).toHaveAttribute('data-slot', 'field-separator-content')
    expect(screen.getByText('or')).toHaveClass('cn-field-separator-content')
    expect(document.querySelector('[data-slot="field-separator"]')).toHaveAttribute('data-content', 'true')
  })
})
