import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import { TypographyH1, TypographyInlineCode, TypographyP } from './typography'

afterEach(cleanup)

describe('Typography', () => {
  test('renders semantic typography primitives', () => {
    render(
      <article>
        <TypographyH1>Design tokens</TypographyH1>
        <TypographyP>
          Use <TypographyInlineCode>color.primary</TypographyInlineCode>
        </TypographyP>
      </article>
    )

    expect(screen.getByRole('heading', { level: 1, name: 'Design tokens' })).toBeInTheDocument()
    expect(screen.getByText('color.primary')).toBeInTheDocument()
  })
})
