import { AlertDialog as AlertDialogPrimitive } from '@base-ui/react/alert-dialog'

import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

import { Button } from '../button'

type AlertDialogProps = AlertDialogPrimitive.Root.Props
type AlertDialogTriggerProps = AlertDialogPrimitive.Trigger.Props
type AlertDialogPortalProps = AlertDialogPrimitive.Portal.Props
type AlertDialogOverlayProps = AlertDialogPrimitive.Backdrop.Props
type AlertDialogContentProps = AlertDialogPrimitive.Popup.Props & {
  size?: 'default' | 'sm'
}
type AlertDialogTitleProps = AlertDialogPrimitive.Title.Props
type AlertDialogDescriptionProps = AlertDialogPrimitive.Description.Props
type AlertDialogButtonProps = ComponentProps<typeof Button>
type AlertDialogCancelProps = AlertDialogPrimitive.Close.Props & Pick<AlertDialogButtonProps, 'size' | 'variant'>
type AlertDialogActionProps = AlertDialogButtonProps
type AlertDialogMediaProps = ComponentProps<'div'>

const AlertDialog = (props: AlertDialogProps) => <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />

const AlertDialogTrigger = (props: AlertDialogTriggerProps) => (
  <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
)

const AlertDialogPortal = (props: AlertDialogPortalProps) => (
  <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />
)

const AlertDialogOverlay = ({ className, ...props }: AlertDialogOverlayProps) => (
  <AlertDialogPrimitive.Backdrop
    className={cn(
      'cn-alert-dialog-overlay fixed inset-0 isolate z-50 bg-black/50 data-[ending-style]:animate-out data-[starting-style]:animate-in',
      className
    )}
    data-slot="alert-dialog-overlay"
    {...props}
  />
)

const AlertDialogContent = ({ className, size = 'default', ...props }: AlertDialogContentProps) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Popup
      className={cn(
        'cn-alert-dialog-content group/alert-dialog-content fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-lg border bg-background p-6 shadow-lg outline-none sm:max-w-lg',
        size === 'sm' && 'sm:max-w-sm',
        className
      )}
      data-size={size}
      data-slot="alert-dialog-content"
      {...props}
    />
  </AlertDialogPortal>
)

const AlertDialogHeader = ({ className, ...props }: ComponentProps<'div'>) => (
  <div
    className={cn(
      'cn-alert-dialog-header flex flex-col gap-2 text-center group-data-[size=sm]/alert-dialog-content:text-center sm:text-left',
      className
    )}
    data-slot="alert-dialog-header"
    {...props}
  />
)

const AlertDialogFooter = ({ className, ...props }: ComponentProps<'div'>) => (
  <div
    className={cn(
      'cn-alert-dialog-footer flex flex-col-reverse gap-2 group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-cols-2 sm:flex-row sm:justify-end',
      className
    )}
    data-slot="alert-dialog-footer"
    {...props}
  />
)

const AlertDialogTitle = ({ className, ...props }: AlertDialogTitleProps) => (
  <AlertDialogPrimitive.Title
    className={cn('cn-alert-dialog-title cn-font-heading font-semibold text-lg leading-none', className)}
    data-slot="alert-dialog-title"
    {...props}
  />
)

const AlertDialogDescription = ({ className, ...props }: AlertDialogDescriptionProps) => (
  <AlertDialogPrimitive.Description
    className={cn('cn-alert-dialog-description text-muted-foreground text-sm', className)}
    data-slot="alert-dialog-description"
    {...props}
  />
)

const AlertDialogMedia = ({ className, ...props }: AlertDialogMediaProps) => (
  <div
    className={cn(
      'cn-alert-dialog-media mx-auto flex size-10 items-center justify-center rounded-full bg-muted text-muted-foreground sm:mx-0 [&_svg:not([class*=size-])]:size-5',
      className
    )}
    data-slot="alert-dialog-media"
    {...props}
  />
)

const AlertDialogAction = ({ className, ...props }: AlertDialogActionProps) => (
  <Button className={cn('cn-alert-dialog-action', className)} data-slot="alert-dialog-action" {...props} />
)

const AlertDialogCancel = ({ className, size = 'default', variant = 'outline', ...props }: AlertDialogCancelProps) => (
  <AlertDialogPrimitive.Close
    className={cn('cn-alert-dialog-cancel', className)}
    data-slot="alert-dialog-cancel"
    render={<Button size={size} variant={variant} />}
    {...props}
  />
)

export type {
  AlertDialogActionProps,
  AlertDialogCancelProps,
  AlertDialogContentProps,
  AlertDialogDescriptionProps,
  AlertDialogMediaProps,
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
  AlertDialogMedia,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger
}
