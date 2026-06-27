import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import { NativeSelect, NativeSelectOptGroup, NativeSelectOption } from './native-select'

describe('NativeSelect', () => {
  afterEach(() => {
    cleanup()
  })

  test('renders a native combobox', () => {
    render(
      <NativeSelect aria-label="Component">
        <NativeSelectOption>Button</NativeSelectOption>
      </NativeSelect>
    )

    expect(screen.getByRole('combobox', { name: 'Component' })).toHaveAttribute('data-slot', 'native-select')
  })

  test('renders grouped options', () => {
    render(
      <NativeSelect aria-label="Department">
        <NativeSelectOptGroup label="Engineering">
          <NativeSelectOption value="frontend">Frontend</NativeSelectOption>
        </NativeSelectOptGroup>
      </NativeSelect>
    )

    expect(screen.getByRole('group', { name: 'Engineering' })).toHaveAttribute('data-slot', 'native-select-optgroup')
  })
})
