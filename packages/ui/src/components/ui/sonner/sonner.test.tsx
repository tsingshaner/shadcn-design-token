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

  test('renders description and positioned viewport data', async () => {
    render(<Sonner timeout={0} />)

    sonnerToast.toast('Event has been created', {
      description: 'Monday, January 3rd at 6:00pm',
      position: 'bottom-left'
    })

    expect(await screen.findByText('Event has been created')).toBeInTheDocument()
    expect(screen.getByText('Monday, January 3rd at 6:00pm')).toBeInTheDocument()
    expect(screen.getByTestId('toast-viewport-bottom-left')).toHaveAttribute('data-position', 'bottom-left')
  })
})
