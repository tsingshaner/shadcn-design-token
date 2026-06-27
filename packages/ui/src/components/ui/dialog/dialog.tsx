import { Dialog as DialogPrimitive } from '@base-ui/react/dialog'

import type { ComponentProps } from 'react'

import { cn } from '../../../lib/utils'

type DialogProps = DialogPrimitive.Root.Props
type DialogTriggerProps = DialogPrimitive.Trigger.Props
type DialogPortalProps = DialogPrimitive.Portal.Props
type DialogOverlayProps = DialogPrimitive.Backdrop.Props
type DialogContentProps = DialogPrimitive.Popup.Props & {
  showCloseButton?: boolean
}
type DialogTitleProps = DialogPrimitive.Title.Props
type DialogDescriptionProps = DialogPrimitive.Description.Props
type DialogCloseProps = DialogPrimitive.Close.Props

const Dialog = (props: DialogProps) => <DialogPrimitive.Root {...props} />

const DialogTrigger = ({ className, ...props }: DialogTriggerProps) => (
  <DialogPrimitive.Trigger
    className={cn('outline-none focus-visible:ring-3 focus-visible:ring-ring/50', className)}
    data-slot="dialog-trigger"
    {...props}
  />
)

const DialogPortal = (props: DialogPortalProps) => <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />

const DialogOverlay = ({ className, ...props }: DialogOverlayProps) => (
  <DialogPrimitive.Backdrop
    className={cn(
      'fixed inset-0 z-50 bg-black/50 data-[ending-style]:animate-out data-[starting-style]:animate-in',
      className
    )}
    data-slot="dialog-overlay"
    {...props}
  />
)

const DialogContent = ({ children, className, showCloseButton = true, ...props }: DialogContentProps) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Popup
      className={cn(
        'fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border bg-background p-6 shadow-lg sm:max-w-lg',
        className
      )}
      data-slot="dialog-content"
      {...props}
    >
      {showCloseButton ? (
        <DialogPrimitive.Close
          aria-label="Close"
          className="absolute top-4 right-4 rounded-sm opacity-70 outline-none transition-opacity hover:opacity-100 focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none"
          data-slot="dialog-close-button"
        >
          <svg
            aria-hidden="true"
            className="size-4"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </DialogPrimitive.Close>
      ) : null}
      {children}
    </DialogPrimitive.Popup>
  </DialogPortal>
)

const DialogHeader = ({ className, ...props }: ComponentProps<'div'>) => (
  <div className={cn('flex flex-col gap-2 text-center sm:text-left', className)} data-slot="dialog-header" {...props} />
)

const DialogFooter = ({ className, ...props }: ComponentProps<'div'>) => (
  <div
    className={cn('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', className)}
    data-slot="dialog-footer"
    {...props}
  />
)

const DialogTitle = ({ className, ...props }: DialogTitleProps) => (
  <DialogPrimitive.Title
    className={cn('font-semibold text-lg leading-none', className)}
    data-slot="dialog-title"
    {...props}
  />
)

const DialogDescription = ({ className, ...props }: DialogDescriptionProps) => (
  <DialogPrimitive.Description
    className={cn('text-muted-foreground text-sm', className)}
    data-slot="dialog-description"
    {...props}
  />
)

const DialogClose = ({ className, ...props }: DialogCloseProps) => (
  <DialogPrimitive.Close
    className={cn('outline-none focus-visible:ring-3 focus-visible:ring-ring/50', className)}
    data-slot="dialog-close"
    {...props}
  />
)

export type {
  DialogCloseProps,
  DialogContentProps,
  DialogDescriptionProps,
  DialogOverlayProps,
  DialogPortalProps,
  DialogProps,
  DialogTitleProps,
  DialogTriggerProps
}
export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger
}
