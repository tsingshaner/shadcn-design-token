import { AlertDialog as AlertDialogPrimitive } from '@base-ui/react/alert-dialog'
import { cn } from 'cn'

import type { ComponentProps } from 'react'

import { cva, type VariantProps } from '@/lib/cva'

import { Button } from '../button'

const alertDialogContentVariants = cva({
  base: 'group/alert-dialog-content fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-[28px] border-0 bg-muted p-6 shadow-xl outline-none sm:max-w-[560px]',
  variants: {
    size: {
      md: '',
      sm: 'sm:max-w-sm'
    }
  }
})

type AlertDialogProps = AlertDialogPrimitive.Root.Props
type AlertDialogTriggerProps = AlertDialogPrimitive.Trigger.Props
type AlertDialogPortalProps = AlertDialogPrimitive.Portal.Props
type AlertDialogOverlayProps = AlertDialogPrimitive.Backdrop.Props
type AlertDialogContentProps = AlertDialogPrimitive.Popup.Props & VariantProps<typeof alertDialogContentVariants>
type AlertDialogTitleProps = AlertDialogPrimitive.Title.Props
type AlertDialogDescriptionProps = AlertDialogPrimitive.Description.Props
type AlertDialogButtonProps = ComponentProps<typeof Button>
type AlertDialogCancelProps = AlertDialogPrimitive.Close.Props & Pick<AlertDialogButtonProps, 'size' | 'variant'>
type AlertDialogActionProps = AlertDialogButtonProps
type AlertDialogMediaProps = ComponentProps<'div'>

const AlertDialog = (props: AlertDialogProps) => (
  <AlertDialogPrimitive.Root data-scope="alert-dialog" data-slot="root" {...props} />
)

const AlertDialogTrigger = (props: AlertDialogTriggerProps) => (
  <AlertDialogPrimitive.Trigger data-scope="alert-dialog" data-slot="trigger" {...props} />
)

const AlertDialogPortal = (props: AlertDialogPortalProps) => (
  <AlertDialogPrimitive.Portal data-scope="alert-dialog" data-slot="portal" {...props} />
)

const AlertDialogOverlay = ({ className, ...props }: AlertDialogOverlayProps) => (
  <AlertDialogPrimitive.Backdrop
    className={cn(
      'fixed inset-0 isolate z-50 bg-black/32 data-ending-style:animate-out data-starting-style:animate-in',
      className
    )}
    data-scope="alert-dialog"
    data-slot="overlay"
    {...props}
  />
)

const AlertDialogContent = ({ className, size = 'md', ...props }: AlertDialogContentProps) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Popup
      className={alertDialogContentVariants({ className, size })}
      data-scope="alert-dialog"
      data-size={size}
      data-slot="content"
      {...props}
    />
  </AlertDialogPortal>
)

const AlertDialogHeader = ({ className, ...props }: ComponentProps<'div'>) => (
  <div
    className={cn(
      'flex flex-col gap-2 text-center group-data-[size=sm]/alert-dialog-content:text-center sm:text-left',
      className
    )}
    data-scope="alert-dialog"
    data-slot="header"
    {...props}
  />
)

const AlertDialogFooter = ({ className, ...props }: ComponentProps<'div'>) => (
  <div
    className={cn(
      'flex flex-col-reverse gap-2 group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-cols-2 sm:flex-row sm:justify-end',
      className
    )}
    data-scope="alert-dialog"
    data-slot="footer"
    {...props}
  />
)

const AlertDialogTitle = ({ className, ...props }: AlertDialogTitleProps) => (
  <AlertDialogPrimitive.Title
    className={cn('font-normal text-2xl leading-8', className)}
    data-scope="alert-dialog"
    data-slot="title"
    {...props}
  />
)

const AlertDialogDescription = ({ className, ...props }: AlertDialogDescriptionProps) => (
  <AlertDialogPrimitive.Description
    className={cn('text-muted-foreground text-sm', className)}
    data-scope="alert-dialog"
    data-slot="description"
    {...props}
  />
)

const AlertDialogMedia = ({ className, ...props }: AlertDialogMediaProps) => (
  <div
    className={cn(
      'mx-auto flex size-10 items-center justify-center rounded-full bg-muted text-muted-foreground sm:mx-0 [&_svg:not([class*=size-])]:size-5',
      className
    )}
    data-scope="alert-dialog"
    data-slot="media"
    {...props}
  />
)

const AlertDialogAction = ({ className, ...props }: AlertDialogActionProps) => (
  <Button className={className} data-scope="alert-dialog" data-slot="action" {...props} />
)

const AlertDialogCancel = ({ className, size = 'md', variant = 'outline', ...props }: AlertDialogCancelProps) => (
  <AlertDialogPrimitive.Close
    className={className}
    data-scope="alert-dialog"
    data-slot="cancel"
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
