import { Toast as ToastPrimitive } from '@base-ui/react/toast'

import { cn } from '@/lib/utils'

type ToastProviderProps = ToastPrimitive.Provider.Props
type ToastPosition = 'bottom-center' | 'bottom-left' | 'bottom-right' | 'top-center' | 'top-left' | 'top-right'
type ToastViewportProps = ToastPrimitive.Viewport.Props & {
  getPosition?: (toast: ToastPrimitive.Root.ToastObject) => ToastPosition | undefined
  position?: ToastPosition
  renderPositionedViewports?: boolean
}
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
      'cn-toast absolute right-4 left-4 grid min-h-12 gap-1 rounded-[4px] border-0 bg-foreground px-4 py-3 text-background shadow-lg transition-[transform,opacity] duration-300 ease-out [bottom:var(--toast-anchor-bottom)] [opacity:calc(1_-_min(var(--toast-index),2)_*_0.08)] [top:var(--toast-anchor-top)] [transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)_+_var(--toast-stack-direction)_*_min(var(--toast-index),2)_*_0.75rem))_scale(calc(1_-_min(var(--toast-index),2)_*_0.05))] [z-index:calc(100_-_var(--toast-index))] data-[limited]:hidden data-[expanded]:opacity-100 data-[swiping]:transition-none data-[expanded]:[transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)_+_var(--toast-stack-direction)_*_var(--toast-offset-y)))_scale(1)]',
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
    className={cn('text-background/80 text-sm', className)}
    data-slot="toast-description"
    {...props}
  />
)

const ToastAction = ({ className, ...props }: ToastActionProps) => (
  <ToastPrimitive.Action
    className={cn(
      'inline-flex h-8 items-center justify-center rounded-full border-0 px-3 font-medium text-background text-sm outline-none hover:bg-background/10 focus-visible:ring-3 focus-visible:ring-background/30',
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

const toastViewportPositionClassName: Record<ToastPosition, string> = {
  'bottom-center': 'bottom-0 left-1/2 -translate-x-1/2 [--toast-anchor-bottom:1rem] [--toast-stack-direction:-1]',
  'bottom-left': 'bottom-0 left-0 [--toast-anchor-bottom:1rem] [--toast-stack-direction:-1]',
  'bottom-right': 'right-0 bottom-0 [--toast-anchor-bottom:1rem] [--toast-stack-direction:-1]',
  'top-center': 'top-0 left-1/2 -translate-x-1/2 [--toast-anchor-top:1rem] [--toast-stack-direction:1]',
  'top-left': 'top-0 left-0 [--toast-anchor-top:1rem] [--toast-stack-direction:1]',
  'top-right': 'top-0 right-0 [--toast-anchor-top:1rem] [--toast-stack-direction:1]'
}

const ToastViewport = ({
  className,
  getPosition,
  position = 'top-right',
  renderPositionedViewports = false,
  ...props
}: ToastViewportProps) => {
  const { toasts } = ToastPrimitive.useToastManager()

  const renderViewport = (viewportPosition: ToastPosition, viewportToasts = toasts) => (
    <ToastPrimitive.Viewport
      className={cn(
        'pointer-events-none fixed z-100 h-[calc(var(--toast-frontmost-height)_+_2rem)] max-h-screen w-full overflow-visible sm:max-w-sm [&_[data-slot=toast]]:pointer-events-auto',
        toastViewportPositionClassName[viewportPosition],
        className
      )}
      data-position={viewportPosition}
      data-slot="toast-viewport"
      data-testid={`toast-viewport-${viewportPosition}`}
      {...props}
    >
      {viewportToasts.map((item) => (
        <Toast key={item.id} toast={item}>
          <ToastTitle>{item.title}</ToastTitle>
          {item.description ? <ToastDescription>{item.description}</ToastDescription> : null}
          {item.actionProps ? <ToastAction {...item.actionProps} /> : null}
          <ToastClose aria-label="Close" />
        </Toast>
      ))}
    </ToastPrimitive.Viewport>
  )

  if (!renderPositionedViewports) {
    return renderViewport(position)
  }

  return (
    <>
      {(['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'] as const).map(
        (viewportPosition) =>
          renderViewport(
            viewportPosition,
            toasts.filter((item) => (getPosition?.(item) ?? position) === viewportPosition)
          )
      )}
    </>
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
