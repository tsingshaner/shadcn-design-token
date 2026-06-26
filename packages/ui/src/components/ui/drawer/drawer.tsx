import { Drawer as DrawerPrimitive } from '@base-ui/react/drawer'

import type { ComponentProps } from 'react'

import { cn } from '../../../lib/utils'

type DrawerProps = DrawerPrimitive.Root.Props
type DrawerTriggerProps = DrawerPrimitive.Trigger.Props
type DrawerPortalProps = DrawerPrimitive.Portal.Props
type DrawerOverlayProps = DrawerPrimitive.Backdrop.Props
type DrawerViewportProps = DrawerPrimitive.Viewport.Props
type DrawerContentProps = DrawerPrimitive.Popup.Props
type DrawerTitleProps = DrawerPrimitive.Title.Props
type DrawerDescriptionProps = DrawerPrimitive.Description.Props
type DrawerCloseProps = DrawerPrimitive.Close.Props

const Drawer = (props: DrawerProps) => <DrawerPrimitive.Root {...props} />

const DrawerTrigger = ({ className, ...props }: DrawerTriggerProps) => (
  <DrawerPrimitive.Trigger
    className={cn('outline-none focus-visible:ring-3 focus-visible:ring-ring/50', className)}
    data-slot="drawer-trigger"
    {...props}
  />
)

const DrawerPortal = (props: DrawerPortalProps) => <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />

const DrawerOverlay = ({ className, ...props }: DrawerOverlayProps) => (
  <DrawerPrimitive.Backdrop
    className={cn(
      'fixed inset-0 z-50 bg-black/50 data-[ending-style]:animate-out data-[starting-style]:animate-in',
      className
    )}
    data-slot="drawer-overlay"
    {...props}
  />
)

const DrawerViewport = ({ className, ...props }: DrawerViewportProps) => (
  <DrawerPrimitive.Viewport
    className={cn('pointer-events-none fixed inset-0 z-50', className)}
    data-slot="drawer-viewport"
    {...props}
  />
)

const DrawerContent = ({ children, className, ...props }: DrawerContentProps) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerViewport>
      <DrawerPrimitive.Popup
        className={cn(
          'pointer-events-auto fixed inset-x-0 bottom-0 mt-24 flex max-h-[80vh] flex-col rounded-t-lg border bg-background shadow-lg',
          className
        )}
        data-slot="drawer-content"
        {...props}
      >
        <div className="mx-auto mt-4 h-2 w-24 rounded-full bg-muted" data-slot="drawer-handle" />
        <DrawerPrimitive.Content className="flex flex-col gap-4 p-6" data-slot="drawer-body">
          {children}
        </DrawerPrimitive.Content>
      </DrawerPrimitive.Popup>
    </DrawerViewport>
  </DrawerPortal>
)

const DrawerHeader = ({ className, ...props }: ComponentProps<'div'>) => (
  <div className={cn('grid gap-2 text-center sm:text-left', className)} data-slot="drawer-header" {...props} />
)

const DrawerFooter = ({ className, ...props }: ComponentProps<'div'>) => (
  <div
    className={cn('mt-auto flex flex-col gap-2 sm:flex-row sm:justify-end', className)}
    data-slot="drawer-footer"
    {...props}
  />
)

const DrawerTitle = ({ className, ...props }: DrawerTitleProps) => (
  <DrawerPrimitive.Title
    className={cn('font-semibold text-lg leading-none', className)}
    data-slot="drawer-title"
    {...props}
  />
)

const DrawerDescription = ({ className, ...props }: DrawerDescriptionProps) => (
  <DrawerPrimitive.Description
    className={cn('text-muted-foreground text-sm', className)}
    data-slot="drawer-description"
    {...props}
  />
)

const DrawerClose = ({ className, ...props }: DrawerCloseProps) => (
  <DrawerPrimitive.Close
    className={cn('outline-none focus-visible:ring-3 focus-visible:ring-ring/50', className)}
    data-slot="drawer-close"
    {...props}
  />
)

export type {
  DrawerCloseProps,
  DrawerContentProps,
  DrawerDescriptionProps,
  DrawerOverlayProps,
  DrawerPortalProps,
  DrawerProps,
  DrawerTitleProps,
  DrawerTriggerProps,
  DrawerViewportProps
}
export {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
  DrawerViewport
}
