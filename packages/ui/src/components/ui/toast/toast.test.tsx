import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import { ToastProvider, ToastViewport, toast } from './toast'

afterEach(() => {
  toast.dismiss()
  cleanup()
})

describe('Toast', () => {
  test('renders toasts from the shared manager', async () => {
    render(
      <ToastProvider timeout={0}>
        <ToastViewport />
      </ToastProvider>
    )

    toast.success('Token sync completed')

    expect(await screen.findByText('Token sync completed')).toBeInTheDocument()
  })
})
