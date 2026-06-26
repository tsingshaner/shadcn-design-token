import { Tooltip as TooltipPrimitive } from '@base-ui/react/tooltip'

import { cn } from '../../../lib/utils'

type TooltipProviderProps = TooltipPrimitive.Provider.Props
type TooltipProps = TooltipPrimitive.Root.Props
type TooltipTriggerProps = TooltipPrimitive.Trigger.Props
type TooltipContentProps = TooltipPrimitive.Popup.Props &
  Pick<TooltipPrimitive.Positioner.Props, 'align' | 'side' | 'sideOffset'>

const TooltipProvider = (props: TooltipProviderProps) => <TooltipPrimitive.Provider {...props} />

const Tooltip = (props: TooltipProps) => <TooltipPrimitive.Root {...props} />

const TooltipTrigger = ({ className, ...props }: TooltipTriggerProps) => (
  <TooltipPrimitive.Trigger
    className={cn('outline-none focus-visible:ring-3 focus-visible:ring-ring/50', className)}
    data-slot="tooltip-trigger"
    {...props}
  />
)

const TooltipContent = ({
  align = 'center',
  className,
  side = 'top',
  sideOffset = 4,
  ...props
}: TooltipContentProps) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Positioner align={align} side={side} sideOffset={sideOffset}>
      <TooltipPrimitive.Popup
        className={cn('z-50 rounded-md bg-primary px-3 py-1.5 text-primary-foreground text-xs shadow-md', className)}
        data-slot="tooltip-content"
        {...props}
      />
    </TooltipPrimitive.Positioner>
  </TooltipPrimitive.Portal>
)

export type { TooltipContentProps, TooltipProps, TooltipProviderProps, TooltipTriggerProps }
export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger }
