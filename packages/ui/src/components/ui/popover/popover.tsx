import { Popover as PopoverPrimitive } from '@base-ui/react/popover'

import { cn } from '@/lib/utils'

type PopoverProps = PopoverPrimitive.Root.Props
type PopoverTriggerProps = PopoverPrimitive.Trigger.Props
type PopoverContentProps = PopoverPrimitive.Popup.Props &
  Pick<PopoverPrimitive.Positioner.Props, 'align' | 'side' | 'sideOffset'>
type PopoverCloseProps = PopoverPrimitive.Close.Props

const Popover = (props: PopoverProps) => <PopoverPrimitive.Root {...props} />

const PopoverTrigger = ({ className, ...props }: PopoverTriggerProps) => (
  <PopoverPrimitive.Trigger
    className={cn('outline-none focus-visible:ring-3 focus-visible:ring-ring/50', className)}
    data-slot="popover-trigger"
    {...props}
  />
)

const PopoverContent = ({
  align = 'center',
  className,
  side = 'bottom',
  sideOffset = 4,
  ...props
}: PopoverContentProps) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Positioner align={align} side={side} sideOffset={sideOffset}>
      <PopoverPrimitive.Popup
        className={cn(
          'z-50 w-72 rounded-md border bg-background p-4 text-foreground shadow-md outline-none',
          className
        )}
        data-slot="popover-content"
        {...props}
      />
    </PopoverPrimitive.Positioner>
  </PopoverPrimitive.Portal>
)

const PopoverClose = ({ className, ...props }: PopoverCloseProps) => (
  <PopoverPrimitive.Close
    className={cn('outline-none focus-visible:ring-3 focus-visible:ring-ring/50', className)}
    data-slot="popover-close"
    {...props}
  />
)

export type { PopoverCloseProps, PopoverContentProps, PopoverProps, PopoverTriggerProps }
export { Popover, PopoverClose, PopoverContent, PopoverTrigger }
