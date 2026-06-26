import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import { Skeleton } from './skeleton'

describe('Skeleton', () => {
  afterEach(() => {
    cleanup()
  })

  test('renders a skeleton slot', () => {
    render(<Skeleton aria-label="Loading" />)

    expect(screen.getByLabelText('Loading')).toHaveAttribute('data-slot', 'skeleton')
  })
})
