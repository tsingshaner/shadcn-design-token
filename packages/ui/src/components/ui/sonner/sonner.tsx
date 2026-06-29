import type { ComponentProps } from 'react'

import { ToastProvider, ToastViewport, toastManager } from '../toast'

type SonnerPosition = 'bottom-center' | 'bottom-left' | 'bottom-right' | 'top-center' | 'top-left' | 'top-right'
type SonnerToastOptions = {
  description?: string
  position?: SonnerPosition
}

type SonnerProps = ComponentProps<typeof ToastProvider> & {
  className?: string
}

const getToastOptions = ({ description, position }: SonnerToastOptions = {}) => ({
  data: { position },
  description
})

const addToast = (title: string, options?: SonnerToastOptions & { type?: string }) =>
  toastManager.add({
    ...getToastOptions(options),
    title,
    type: options?.type
  })

const sonnerToast = {
  close: toastManager.close,
  custom: toastManager.add,
  dismiss: toastManager.close,
  error: (title: string, options?: SonnerToastOptions) => addToast(title, { ...options, type: 'error' }),
  info: (title: string, options?: SonnerToastOptions) => addToast(title, { ...options, type: 'info' }),
  loading: (description: string) => toastManager.add({ description, timeout: 0, type: 'loading' }),
  promise: toastManager.promise,
  success: (title: string, options?: SonnerToastOptions) => addToast(title, { ...options, type: 'success' }),
  toast: (title: string, options?: SonnerToastOptions) => addToast(title, options),
  update: toastManager.update
}

const Sonner = ({ children, className, ...props }: SonnerProps) => (
  <ToastProvider toastManager={toastManager} {...props}>
    {children}
    <ToastViewport
      className={className}
      getPosition={(toast) => toast.data?.position}
      position="top-right"
      renderPositionedViewports
    />
  </ToastProvider>
)

export type { SonnerProps }
export { Sonner, sonnerToast }
