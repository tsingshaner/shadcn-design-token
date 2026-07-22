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

  test('uses stacked viewport and toast styles', async () => {
    render(
      <ToastProvider timeout={0}>
        <ToastViewport />
      </ToastProvider>
    )

    toast.success('First toast')
    toast.success('Second toast')

    expect(await screen.findByText('Second toast')).toBeInTheDocument()
    expect(screen.getByTestId('toast-viewport-top-right')).toHaveClass('h-[calc(var(--toast-frontmost-height)_+_2rem)]')
    expect(screen.getByText('Second toast').closest('[data-slot="toast"]')).toHaveClass(
      'min-h-12',
      'rounded-[4px]',
      'bg-foreground',
      '[transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)_+_var(--toast-stack-direction)_*_min(var(--toast-index),2)_*_0.75rem))_scale(calc(1_-_min(var(--toast-index),2)_*_0.05))]'
    )
  })
})
