import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import {
  Field,
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

    expect(screen.getByText('Name')).toHaveAttribute('data-slot', 'field-label')
    expect(screen.getByRole('alert')).toHaveTextContent('Required.')
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
    expect(screen.getByText('Newsletter')).toHaveAttribute('data-slot', 'field-title')
    expect(document.querySelector('[data-slot="field-set"]')).toBeInTheDocument()
    expect(document.querySelector('[data-slot="field-separator"]')).toBeInTheDocument()
  })
})
