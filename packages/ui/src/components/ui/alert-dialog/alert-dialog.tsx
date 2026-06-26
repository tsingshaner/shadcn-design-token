import { AlertDialog as AlertDialogPrimitive } from '@base-ui/react/alert-dialog'

import type { ComponentProps } from 'react'

import { cn } from '../../../lib/utils'

type AlertDialogProps = AlertDialogPrimitive.Root.Props
type AlertDialogTriggerProps = AlertDialogPrimitive.Trigger.Props
type AlertDialogPortalProps = AlertDialogPrimitive.Portal.Props
type AlertDialogOverlayProps = AlertDialogPrimitive.Backdrop.Props
type AlertDialogContentProps = AlertDialogPrimitive.Popup.Props
type AlertDialogTitleProps = AlertDialogPrimitive.Title.Props
type AlertDialogDescriptionProps = AlertDialogPrimitive.Description.Props
type AlertDialogCancelProps = AlertDialogPrimitive.Close.Props
type AlertDialogActionProps = AlertDialogPrimitive.Close.Props

const AlertDialog = (props: AlertDialogProps) => <AlertDialogPrimitive.Root {...props} />

const AlertDialogTrigger = ({ className, ...props }: AlertDialogTriggerProps) => (
  <AlertDialogPrimitive.Trigger
    className={cn('outline-none focus-visible:ring-3 focus-visible:ring-ring/50', className)}
    data-slot="alert-dialog-trigger"
    {...props}
  />
)

const AlertDialogPortal = (props: AlertDialogPortalProps) => (
  <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />
)

const AlertDialogOverlay = ({ className, ...props }: AlertDialogOverlayProps) => (
  <AlertDialogPrimitive.Backdrop
    className={cn(
      'fixed inset-0 z-50 bg-black/50 data-[ending-style]:animate-out data-[starting-style]:animate-in',
      className
    )}
    data-slot="alert-dialog-overlay"
    {...props}
  />
)

const AlertDialogContent = ({ className, ...props }: AlertDialogContentProps) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Popup
      className={cn(
        'fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border bg-background p-6 shadow-lg sm:max-w-lg',
        className
      )}
      data-slot="alert-dialog-content"
      {...props}
    />
  </AlertDialogPortal>
)

const AlertDialogHeader = ({ className, ...props }: ComponentProps<'div'>) => (
  <div
    className={cn('flex flex-col gap-2 text-center sm:text-left', className)}
    data-slot="alert-dialog-header"
    {...props}
  />
)

const AlertDialogFooter = ({ className, ...props }: ComponentProps<'div'>) => (
  <div
    className={cn('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', className)}
    data-slot="alert-dialog-footer"
    {...props}
  />
)

const AlertDialogTitle = ({ className, ...props }: AlertDialogTitleProps) => (
  <AlertDialogPrimitive.Title
    className={cn('font-semibold text-lg leading-none', className)}
    data-slot="alert-dialog-title"
    {...props}
  />
)

const AlertDialogDescription = ({ className, ...props }: AlertDialogDescriptionProps) => (
  <AlertDialogPrimitive.Description
    className={cn('text-muted-foreground text-sm', className)}
    data-slot="alert-dialog-description"
    {...props}
  />
)

const AlertDialogAction = ({ className, ...props }: AlertDialogActionProps) => (
  <AlertDialogPrimitive.Close
    className={cn('outline-none focus-visible:ring-3 focus-visible:ring-ring/50', className)}
    data-slot="alert-dialog-action"
    {...props}
  />
)

const AlertDialogCancel = ({ className, ...props }: AlertDialogCancelProps) => (
  <AlertDialogPrimitive.Close
    className={cn('outline-none focus-visible:ring-3 focus-visible:ring-ring/50', className)}
    data-slot="alert-dialog-cancel"
    {...props}
  />
)

export type {
  AlertDialogActionProps,
  AlertDialogCancelProps,
  AlertDialogContentProps,
  AlertDialogDescriptionProps,
  AlertDialogOverlayProps,
  AlertDialogPortalProps,
  AlertDialogProps,
  AlertDialogTitleProps,
  AlertDialogTriggerProps
}
export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger
}
