import { Dialog as SheetPrimitive } from '@base-ui/react/dialog'
import { XIcon } from 'lucide-react'

import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

import { Button } from '../button'

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

const Sheet = (props: SheetProps) => <SheetPrimitive.Root data-slot="sheet" {...props} />

const SheetTrigger = (props: SheetTriggerProps) => <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />

const SheetPortal = (props: SheetPortalProps) => <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />

const SheetOverlay = ({ className, ...props }: SheetOverlayProps) => (
  <SheetPrimitive.Backdrop
    className={cn(
      'cn-sheet-overlay fixed inset-0 z-50 bg-black/32 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0',
      className
    )}
    data-slot="sheet-overlay"
    {...props}
  />
)

const sheetSideClasses = {
  bottom: 'inset-x-0 bottom-0 rounded-t-[28px]',
  left: 'inset-y-0 left-0 h-full w-3/4 rounded-r-[16px] sm:max-w-[400px]',
  right: 'inset-y-0 right-0 h-full w-3/4 rounded-l-[16px] sm:max-w-[400px]',
  top: 'inset-x-0 top-0 rounded-b-[28px]'
}

const SheetContent = ({ children, className, showCloseButton = true, side = 'right', ...props }: SheetContentProps) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Popup
      className={cn(
        'cn-sheet-content fixed z-50 flex flex-col gap-4 bg-muted p-6 shadow-xl data-[side=left]:data-ending-style:translate-x-[-2.5rem] data-[side=left]:data-starting-style:translate-x-[-2.5rem] data-[side=right]:data-ending-style:translate-x-[2.5rem] data-[side=right]:data-starting-style:translate-x-[2.5rem] data-[side=bottom]:data-ending-style:translate-y-[2.5rem] data-[side=bottom]:data-starting-style:translate-y-[2.5rem] data-[side=top]:data-ending-style:translate-y-[-2.5rem] data-[side=top]:data-starting-style:translate-y-[-2.5rem] data-ending-style:opacity-0 data-starting-style:opacity-0',
        sheetSideClasses[side],
        className
      )}
      data-side={side}
      data-slot="sheet-content"
      {...props}
    >
      {children}
      {showCloseButton && (
        <SheetPrimitive.Close
          data-slot="sheet-close"
          render={
            <Button
              className="cn-sheet-close absolute top-4 right-4 opacity-70 hover:opacity-100"
              size="icon-sm"
              variant="ghost"
            />
          }
        >
          <XIcon />
          <span className="sr-only">Close</span>
        </SheetPrimitive.Close>
      )}
    </SheetPrimitive.Popup>
  </SheetPortal>
)

const SheetHeader = ({ className, ...props }: ComponentProps<'div'>) => (
  <div
    className={cn('cn-sheet-header flex flex-col gap-2 text-center sm:text-left', className)}
    data-slot="sheet-header"
    {...props}
  />
)

const SheetFooter = ({ className, ...props }: ComponentProps<'div'>) => (
  <div
    className={cn('cn-sheet-footer mt-auto flex flex-col gap-2 sm:flex-row sm:justify-end', className)}
    data-slot="sheet-footer"
    {...props}
  />
)

const SheetTitle = ({ className, ...props }: SheetTitleProps) => (
  <SheetPrimitive.Title
    className={cn('cn-sheet-title cn-font-heading font-normal text-2xl leading-8', className)}
    data-slot="sheet-title"
    {...props}
  />
)

const SheetDescription = ({ className, ...props }: SheetDescriptionProps) => (
  <SheetPrimitive.Description
    className={cn('cn-sheet-description text-muted-foreground text-sm', className)}
    data-slot="sheet-description"
    {...props}
  />
)

const SheetClose = (props: SheetCloseProps) => <SheetPrimitive.Close data-slot="sheet-close" {...props} />

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
