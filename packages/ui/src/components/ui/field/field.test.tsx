import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import { Field, FieldDescription, FieldError, FieldLabel } from './field'

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
})
