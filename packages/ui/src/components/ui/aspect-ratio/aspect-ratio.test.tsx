import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import { AspectRatio } from './aspect-ratio'

describe('AspectRatio', () => {
  afterEach(() => {
    cleanup()
  })

  test('applies ratio as inline aspect-ratio style', () => {
    render(<AspectRatio data-testid="ratio" ratio={4 / 3} />)

    expect(screen.getByTestId('ratio')).toHaveStyle({ aspectRatio: String(4 / 3) })
  })
})
