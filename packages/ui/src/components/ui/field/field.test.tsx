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
    expect(field).toHaveAttribute('data-scope', 'field')
    expect(field).toHaveAttribute('data-slot', 'root')
    expect(field).toHaveAttribute('data-orientation', 'vertical')
    expect(label).toHaveAttribute('data-scope', 'field')
    expect(label).toHaveAttribute('data-slot', 'label')

    expect(description).toHaveAttribute('data-scope', 'field')
    expect(description).toHaveAttribute('data-slot', 'description')
    expect(error).toHaveTextContent('Required.')
    expect(error).toHaveAttribute('data-scope', 'field')
    expect(error).toHaveAttribute('data-slot', 'error')
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
    expect(field).toHaveAttribute('data-scope', 'field')
    expect(field).toHaveAttribute('data-slot', 'root')

    expect(document.querySelector('[data-scope="field"][data-slot="content"]')).toHaveAttribute('data-scope', 'field')
    expect(document.querySelector('[data-scope="field"][data-slot="content"]')).toHaveAttribute('data-slot', 'content')
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

    expect(screen.getByText('Profile')).toHaveAttribute('data-scope', 'field')
    expect(screen.getByText('Profile')).toHaveAttribute('data-slot', 'legend')

    expect(screen.getByText('Newsletter')).toHaveAttribute('data-scope', 'field')
    expect(screen.getByText('Newsletter')).toHaveAttribute('data-slot', 'title')

    expect(document.querySelector('[data-scope="field"][data-slot="set"]')).toHaveAttribute('data-scope', 'field')
    expect(document.querySelector('[data-scope="field"][data-slot="set"]')).toHaveAttribute('data-slot', 'set')
    expect(document.querySelector('[data-scope="field"][data-slot="group"]')).toHaveAttribute('data-scope', 'field')
    expect(document.querySelector('[data-scope="field"][data-slot="group"]')).toHaveAttribute('data-slot', 'group')
    expect(document.querySelector('[data-scope="field"][data-slot="separator"]')).toHaveAttribute('data-scope', 'field')
    expect(document.querySelector('[data-scope="field"][data-slot="separator"]')).toHaveAttribute(
      'data-slot',
      'separator'
    )
  })

  test('renders separator content slot when children are provided', () => {
    render(<FieldSeparator>or</FieldSeparator>)

    expect(screen.getByText('or')).toHaveAttribute('data-scope', 'field')
    expect(screen.getByText('or')).toHaveAttribute('data-slot', 'separator-content')

    expect(document.querySelector('[data-scope="field"][data-slot="separator"]')).toHaveAttribute(
      'data-content',
      'true'
    )
  })
})
