import { Dialog as SheetPrimitive } from '@base-ui/react/dialog'

import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

type SheetProps = SheetPrimitive.Root.Props
type SheetTriggerProps = SheetPrimitive.Trigger.Props
type SheetPortalProps = SheetPrimitive.Portal.Props
type SheetOverlayProps = SheetPrimitive.Backdrop.Props
type SheetContentProps = SheetPrimitive.Popup.Props & {
  showCloseButton?: boolean
  side?: 'top' | 'right' | 'bottom' | 'left'
}
type SheetTitleProps = SheetPrimitive.Title.Props
type SheetDescriptionProps = SheetPrimitive.Description.Props
type SheetCloseProps = SheetPrimitive.Close.Props

const Sheet = (props: SheetProps) => <SheetPrimitive.Root {...props} />

const SheetTrigger = ({ className, ...props }: SheetTriggerProps) => (
  <SheetPrimitive.Trigger
    className={cn('outline-none focus-visible:ring-3 focus-visible:ring-ring/50', className)}
    data-slot="sheet-trigger"
    {...props}
  />
)

const SheetPortal = (props: SheetPortalProps) => <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />

const SheetOverlay = ({ className, ...props }: SheetOverlayProps) => (
  <SheetPrimitive.Backdrop
    className={cn(
      'fixed inset-0 z-50 bg-black/50 data-[ending-style]:animate-out data-[starting-style]:animate-in',
      className
    )}
    data-slot="sheet-overlay"
    {...props}
  />
)

const sheetSideClasses = {
  bottom: 'inset-x-0 bottom-0 border-t',
  left: 'inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm',
  right: 'inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm',
  top: 'inset-x-0 top-0 border-b'
}

const SheetContent = ({ children, className, showCloseButton = true, side = 'right', ...props }: SheetContentProps) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Popup
      className={cn('fixed z-50 gap-4 bg-background p-6 shadow-lg', sheetSideClasses[side], className)}
      data-side={side}
      data-slot="sheet-content"
      {...props}
    >
      {showCloseButton ? (
        <SheetPrimitive.Close
          aria-label="Close"
          className="absolute top-4 right-4 rounded-sm opacity-70 outline-none transition-opacity hover:opacity-100 focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none"
          data-slot="sheet-close-button"
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
        </SheetPrimitive.Close>
      ) : null}
      {children}
    </SheetPrimitive.Popup>
  </SheetPortal>
)

const SheetHeader = ({ className, ...props }: ComponentProps<'div'>) => (
  <div className={cn('flex flex-col gap-2 text-center sm:text-left', className)} data-slot="sheet-header" {...props} />
)

const SheetFooter = ({ className, ...props }: ComponentProps<'div'>) => (
  <div
    className={cn('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', className)}
    data-slot="sheet-footer"
    {...props}
  />
)

const SheetTitle = ({ className, ...props }: SheetTitleProps) => (
  <SheetPrimitive.Title
    className={cn('font-semibold text-lg leading-none', className)}
    data-slot="sheet-title"
    {...props}
  />
)

const SheetDescription = ({ className, ...props }: SheetDescriptionProps) => (
  <SheetPrimitive.Description
    className={cn('text-muted-foreground text-sm', className)}
    data-slot="sheet-description"
    {...props}
  />
)

const SheetClose = ({ className, ...props }: SheetCloseProps) => (
  <SheetPrimitive.Close
    className={cn('outline-none focus-visible:ring-3 focus-visible:ring-ring/50', className)}
    data-slot="sheet-close"
    {...props}
  />
)

export type {
  SheetCloseProps,
  SheetContentProps,
  SheetDescriptionProps,
  SheetOverlayProps,
  SheetPortalProps,
  SheetProps,
  SheetTitleProps,
  SheetTriggerProps
}
export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger
}
