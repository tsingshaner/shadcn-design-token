import { Popover as PopoverPrimitive } from '@base-ui/react/popover'
import { cn } from 'cn'

import type { ComponentProps } from 'react'

type PopoverProps = PopoverPrimitive.Root.Props
type PopoverTriggerProps = PopoverPrimitive.Trigger.Props
type PopoverContentProps = PopoverPrimitive.Popup.Props &
  Pick<PopoverPrimitive.Positioner.Props, 'align' | 'alignOffset' | 'side' | 'sideOffset'>
type PopoverHeaderProps = ComponentProps<'div'>
type PopoverTitleProps = PopoverPrimitive.Title.Props
type PopoverDescriptionProps = PopoverPrimitive.Description.Props

const Popover = (props: PopoverProps) => <PopoverPrimitive.Root data-scope="popover" data-slot="root" {...props} />

const PopoverTrigger = (props: PopoverTriggerProps) => (
  <PopoverPrimitive.Trigger data-scope="popover" data-slot="trigger" {...props} />
)

const PopoverContent = ({
  align = 'center',
  alignOffset = 0,
  className,
  side = 'bottom',
  sideOffset = 4,
  ...props
}: PopoverContentProps) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Positioner
      align={align}
      alignOffset={alignOffset}
      className="isolate z-50"
      side={side}
      sideOffset={sideOffset}
    >
      <PopoverPrimitive.Popup
        className={cn(
          'z-50 w-72 origin-(--transform-origin) rounded-md border bg-background p-4 text-foreground shadow-md outline-hidden',
          className
        )}
        data-scope="popover"
        data-slot="content"
        {...props}
      />
    </PopoverPrimitive.Positioner>
  </PopoverPrimitive.Portal>
)

const PopoverHeader = ({ className, ...props }: PopoverHeaderProps) => (
  <div className={cn('grid gap-1.5', className)} data-scope="popover" data-slot="header" {...props} />
)

const PopoverTitle = ({ className, ...props }: PopoverTitleProps) => (
  <PopoverPrimitive.Title
    className={cn('font-medium leading-none', className)}
    data-scope="popover"
    data-slot="title"
    {...props}
  />
)

const PopoverDescription = ({ className, ...props }: PopoverDescriptionProps) => (
  <PopoverPrimitive.Description
    className={cn('text-muted-foreground text-sm', className)}
    data-scope="popover"
    data-slot="description"
    {...props}
  />
)

export type {
  PopoverContentProps,
  PopoverDescriptionProps,
  PopoverHeaderProps,
  PopoverProps,
  PopoverTitleProps,
  PopoverTriggerProps
}
export { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger }
