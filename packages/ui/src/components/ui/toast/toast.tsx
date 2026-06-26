import { Toast as ToastPrimitive } from '@base-ui/react/toast'

import { cn } from '../../../lib/utils'

type ToastProviderProps = ToastPrimitive.Provider.Props
type ToastViewportProps = ToastPrimitive.Viewport.Props
type ToastProps = ToastPrimitive.Root.Props
type ToastTitleProps = ToastPrimitive.Title.Props
type ToastDescriptionProps = ToastPrimitive.Description.Props
type ToastActionProps = ToastPrimitive.Action.Props
type ToastCloseProps = ToastPrimitive.Close.Props

const toastManager = ToastPrimitive.createToastManager()

const toast = {
  close: toastManager.close,
  custom: toastManager.add,
  dismiss: toastManager.close,
  error: (description: string) => toastManager.add({ description, type: 'error' }),
  loading: (description: string) => toastManager.add({ description, timeout: 0, type: 'loading' }),
  promise: toastManager.promise,
  success: (description: string) => toastManager.add({ description, type: 'success' }),
  title: (title: string) => toastManager.add({ title }),
  update: toastManager.update
}

const ToastProvider = ({ toastManager: manager = toastManager, ...props }: ToastProviderProps) => (
  <ToastPrimitive.Provider toastManager={manager} {...props} />
)

const Toast = ({ className, ...props }: ToastProps) => (
  <ToastPrimitive.Root
    className={cn(
      'grid w-full max-w-sm gap-1 rounded-md border bg-background p-4 text-foreground shadow-lg data-[limited]:hidden',
      className
    )}
    data-slot="toast"
    {...props}
  />
)

const ToastTitle = ({ className, ...props }: ToastTitleProps) => (
  <ToastPrimitive.Title className={cn('font-semibold text-sm', className)} data-slot="toast-title" {...props} />
)

const ToastDescription = ({ className, ...props }: ToastDescriptionProps) => (
  <ToastPrimitive.Description
    className={cn('text-muted-foreground text-sm', className)}
    data-slot="toast-description"
    {...props}
  />
)

const ToastAction = ({ className, ...props }: ToastActionProps) => (
  <ToastPrimitive.Action
    className={cn(
      'inline-flex h-8 items-center justify-center rounded-md border px-3 font-medium text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
      className
    )}
    data-slot="toast-action"
    {...props}
  />
)

const ToastClose = ({ className, ...props }: ToastCloseProps) => (
  <ToastPrimitive.Close
    className={cn(
      'absolute top-2 right-2 rounded-sm p-1 text-muted-foreground outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50',
      className
    )}
    data-slot="toast-close"
    {...props}
  />
)

const ToastViewport = ({ className, ...props }: ToastViewportProps) => {
  const { toasts } = ToastPrimitive.useToastManager()

  return (
    <ToastPrimitive.Viewport
      className={cn('fixed top-0 right-0 z-100 flex max-h-screen w-full flex-col gap-2 p-4 sm:max-w-sm', className)}
      data-slot="toast-viewport"
      {...props}
    >
      {toasts.map((item) => (
        <Toast key={item.id} toast={item}>
          <ToastTitle>{item.title}</ToastTitle>
          {item.description ? <ToastDescription>{item.description}</ToastDescription> : null}
          {item.actionProps ? <ToastAction {...item.actionProps} /> : null}
          <ToastClose aria-label="Close" />
        </Toast>
      ))}
    </ToastPrimitive.Viewport>
  )
}

const Toaster = (props: ToastProviderProps & { viewportClassName?: string }) => {
  const { children, viewportClassName, ...providerProps } = props

  return (
    <ToastProvider {...providerProps}>
      {children}
      <ToastViewport className={viewportClassName} />
    </ToastProvider>
  )
}

export type {
  ToastActionProps,
  ToastCloseProps,
  ToastDescriptionProps,
  ToastProps,
  ToastProviderProps,
  ToastTitleProps,
  ToastViewportProps
}
export {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  Toaster,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  toast,
  toastManager
}
