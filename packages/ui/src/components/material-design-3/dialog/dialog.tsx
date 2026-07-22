import { Dialog as DialogPrimitive } from '@base-ui/react/dialog'
import { XIcon } from 'lucide-react'

import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

import { Button } from '../button'

type DialogProps = DialogPrimitive.Root.Props
type DialogTriggerProps = DialogPrimitive.Trigger.Props
type DialogPortalProps = DialogPrimitive.Portal.Props
type DialogOverlayProps = DialogPrimitive.Backdrop.Props
type DialogContentProps = DialogPrimitive.Popup.Props & {
  showCloseButton?: boolean
}
type DialogFooterProps = ComponentProps<'div'> & {
  showCloseButton?: boolean
}
type DialogTitleProps = DialogPrimitive.Title.Props
type DialogDescriptionProps = DialogPrimitive.Description.Props
type DialogCloseProps = DialogPrimitive.Close.Props

const Dialog = (props: DialogProps) => <DialogPrimitive.Root data-slot="dialog" {...props} />

const DialogTrigger = (props: DialogTriggerProps) => <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />

const DialogPortal = (props: DialogPortalProps) => <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />

const DialogOverlay = ({ className, ...props }: DialogOverlayProps) => (
  <DialogPrimitive.Backdrop
    className={cn(
      'cn-dialog-overlay fixed inset-0 isolate z-50 bg-black/32 data-[ending-style]:animate-out data-[starting-style]:animate-in',
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
        'cn-dialog-content fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-[28px] border-0 bg-muted p-6 shadow-xl outline-none sm:max-w-[560px]',
        className
      )}
      data-slot="dialog-content"
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close
          data-slot="dialog-close"
          render={
            <Button
              className="cn-dialog-close absolute top-4 right-4 opacity-70 hover:opacity-100"
              size="icon-sm"
              variant="ghost"
            />
          }
        >
          <XIcon />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      )}
    </DialogPrimitive.Popup>
  </DialogPortal>
)

const DialogHeader = ({ className, ...props }: ComponentProps<'div'>) => (
  <div
    className={cn('cn-dialog-header flex flex-col gap-2 text-center sm:text-left', className)}
    data-slot="dialog-header"
    {...props}
  />
)

const DialogFooter = ({ children, className, showCloseButton = false, ...props }: DialogFooterProps) => (
  <div
    className={cn('cn-dialog-footer flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', className)}
    data-slot="dialog-footer"
    {...props}
  >
    {children}
    {showCloseButton && <DialogPrimitive.Close render={<Button variant="outline" />}>Close</DialogPrimitive.Close>}
  </div>
)

const DialogTitle = ({ className, ...props }: DialogTitleProps) => (
  <DialogPrimitive.Title
    className={cn('cn-dialog-title cn-font-heading font-normal text-2xl leading-8', className)}
    data-slot="dialog-title"
    {...props}
  />
)

const DialogDescription = ({ className, ...props }: DialogDescriptionProps) => (
  <DialogPrimitive.Description
    className={cn('cn-dialog-description text-muted-foreground text-sm', className)}
    data-slot="dialog-description"
    {...props}
  />
)

const DialogClose = (props: DialogCloseProps) => <DialogPrimitive.Close data-slot="dialog-close" {...props} />

export type {
  DialogCloseProps,
  DialogContentProps,
  DialogDescriptionProps,
  DialogFooterProps,
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
