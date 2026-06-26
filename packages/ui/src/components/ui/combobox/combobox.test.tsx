import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import {
  Combobox,
  ComboboxContent,
  ComboboxInput,
  ComboboxInputGroup,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger
} from './combobox'

afterEach(cleanup)

describe('Combobox', () => {
  it('renders an input and open item list', () => {
    render(
      <Combobox defaultOpen items={['Next.js', 'Remix']}>
        <ComboboxInputGroup>
          <ComboboxInput placeholder="Search framework" />
          <ComboboxTrigger />
        </ComboboxInputGroup>
        <ComboboxContent>
          <ComboboxList>
            <ComboboxItem value="Next.js">Next.js</ComboboxItem>
            <ComboboxItem value="Remix">Remix</ComboboxItem>
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    )

    expect(screen.getByPlaceholderText('Search framework')).toBeInTheDocument()
    expect(screen.getByText('Next.js')).toBeInTheDocument()
  })
})
