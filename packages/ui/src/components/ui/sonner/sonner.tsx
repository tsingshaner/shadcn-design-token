import type { ComponentProps } from 'react'

import { ToastProvider, ToastViewport, toastManager } from '../toast'

type SonnerProps = ComponentProps<typeof ToastProvider> & {
  className?: string
}

const sonnerToast = {
  close: toastManager.close,
  custom: toastManager.add,
  dismiss: toastManager.close,
  error: (description: string) => toastManager.add({ description, type: 'error' }),
  loading: (description: string) => toastManager.add({ description, timeout: 0, type: 'loading' }),
  promise: toastManager.promise,
  success: (description: string) => toastManager.add({ description, type: 'success' }),
  update: toastManager.update
}

const Sonner = ({ children, className, ...props }: SonnerProps) => (
  <ToastProvider toastManager={toastManager} {...props}>
    {children}
    <ToastViewport className={className} />
  </ToastProvider>
)

export type { SonnerProps }
export { Sonner, sonnerToast }
