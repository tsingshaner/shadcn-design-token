import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import { Label } from './label'

describe('Label', () => {
  afterEach(() => {
    cleanup()
  })

  test('renders an associated label', () => {
    render(<Label htmlFor="email">Email</Label>)

    expect(screen.getByText('Email')).toHaveAttribute('for', 'email')
  })
})
