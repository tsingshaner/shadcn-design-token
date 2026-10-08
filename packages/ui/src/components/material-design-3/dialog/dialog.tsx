import { Dialog as DialogPrimitive } from '@base-ui/react/dialog'
import { cn } from 'cn'
import { XIcon } from 'lucide-react'

import type { ComponentProps } from 'react'

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

const Dialog = (props: DialogProps) => <DialogPrimitive.Root data-scope="dialog" data-slot="root" {...props} />

const DialogTrigger = (props: DialogTriggerProps) => (
  <DialogPrimitive.Trigger data-scope="dialog" data-slot="trigger" {...props} />
)

const DialogPortal = (props: DialogPortalProps) => (
  <DialogPrimitive.Portal data-scope="dialog" data-slot="portal" {...props} />
)

const DialogOverlay = ({ className, ...props }: DialogOverlayProps) => (
  <DialogPrimitive.Backdrop
    className={cn(
      'fixed inset-0 isolate z-50 bg-black/32 data-[ending-style]:animate-out data-[starting-style]:animate-in',
      className
    )}
    data-scope="dialog"
    data-slot="overlay"
    {...props}
  />
)

const DialogContent = ({ children, className, showCloseButton = false, ...props }: DialogContentProps) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Popup
      className={cn(
        'fixed top-1/2 left-1/2 z-50 grid w-[calc(100%-3rem)] min-w-[280px] max-w-[560px] -translate-x-1/2 -translate-y-1/2 gap-6 rounded-[28px] border-0 bg-muted p-6 shadow-xl outline-none',
        className
      )}
      data-scope="dialog"
      data-slot="content"
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close
          data-scope="dialog"
          data-slot="close"
          render={
            <Button
              className="absolute top-4 right-4 opacity-70 hover:opacity-100"
              data-scope="dialog"
              data-slot="close"
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
  <div className={cn('flex flex-col gap-4 text-left', className)} data-scope="dialog" data-slot="header" {...props} />
)

const DialogFooter = ({ children, className, showCloseButton = false, ...props }: DialogFooterProps) => (
  <div className={cn('flex flex-row justify-end gap-2', className)} data-scope="dialog" data-slot="footer" {...props}>
    {children}
    {showCloseButton && <DialogPrimitive.Close render={<Button variant="ghost" />}>Close</DialogPrimitive.Close>}
  </div>
)

const DialogTitle = ({ className, ...props }: DialogTitleProps) => (
  <DialogPrimitive.Title
    className={cn('font-normal text-2xl leading-8', className)}
    data-scope="dialog"
    data-slot="title"
    {...props}
  />
)

const DialogDescription = ({ className, ...props }: DialogDescriptionProps) => (
  <DialogPrimitive.Description
    className={cn('text-muted-foreground text-sm', className)}
    data-scope="dialog"
    data-slot="description"
    {...props}
  />
)

const DialogClose = (props: DialogCloseProps) => (
  <DialogPrimitive.Close data-scope="dialog" data-slot="close" {...props} />
)

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
