import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import { DirectionProvider, useDirection } from './direction'

const DirectionValue = () => {
  const direction = useDirection()

  return <span>{direction}</span>
}

afterEach(cleanup)

describe('DirectionProvider', () => {
  test('provides text direction to descendants', () => {
    render(
      <DirectionProvider direction="rtl">
        <DirectionValue />
      </DirectionProvider>
    )

    expect(screen.getByText('rtl')).toBeInTheDocument()
  })
})
