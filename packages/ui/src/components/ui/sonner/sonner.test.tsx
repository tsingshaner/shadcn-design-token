import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import { Sonner, sonnerToast } from './sonner'

afterEach(() => {
  sonnerToast.dismiss()
  cleanup()
})

describe('Sonner', () => {
  test('renders sonner toasts from the shared manager', async () => {
    render(<Sonner timeout={0} />)

    sonnerToast.success('Token published')

    expect(await screen.findByText('Token published')).toBeInTheDocument()
  })
})
