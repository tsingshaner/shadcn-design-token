import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import { Skeleton } from './skeleton'

describe('Skeleton', () => {
  afterEach(() => {
    cleanup()
  })

  test('renders a skeleton slot', () => {
    render(<Skeleton aria-label="Loading" />)

    const skeleton = screen.getByLabelText('Loading')
    expect(skeleton).toHaveAttribute('data-scope', 'skeleton')
    expect(skeleton).toHaveAttribute('data-slot', 'root')
  })
})
