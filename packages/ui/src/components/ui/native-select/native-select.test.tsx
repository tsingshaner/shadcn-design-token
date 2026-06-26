import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import { NativeSelect } from './native-select'

describe('NativeSelect', () => {
  afterEach(() => {
    cleanup()
  })

  test('renders a native combobox', () => {
    render(
      <NativeSelect aria-label="Component">
        <option>Button</option>
      </NativeSelect>
    )

    expect(screen.getByRole('combobox', { name: 'Component' })).toHaveAttribute('data-slot', 'native-select')
  })
})
