import { Tooltip as TooltipPrimitive } from '@base-ui/react/tooltip'

import { cn } from '@/lib/utils'

type TooltipProviderProps = TooltipPrimitive.Provider.Props
type TooltipProps = TooltipPrimitive.Root.Props
type TooltipTriggerProps = TooltipPrimitive.Trigger.Props
type TooltipContentProps = TooltipPrimitive.Popup.Props &
  Pick<TooltipPrimitive.Positioner.Props, 'align' | 'alignOffset' | 'side' | 'sideOffset'>

const TooltipProvider = ({ delay = 0, ...props }: TooltipProviderProps) => (
  <TooltipPrimitive.Provider data-slot="tooltip-provider" delay={delay} {...props} />
)

const Tooltip = (props: TooltipProps) => <TooltipPrimitive.Root data-slot="tooltip" {...props} />

const TooltipTrigger = (props: TooltipTriggerProps) => (
  <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
)

const TooltipContent = ({
  align = 'center',
  alignOffset = 0,
  children,
  className,
  side = 'top',
  sideOffset = 4,
  ...props
}: TooltipContentProps) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Positioner
      align={align}
      alignOffset={alignOffset}
      className="isolate z-50"
      side={side}
      sideOffset={sideOffset}
    >
      <TooltipPrimitive.Popup
        className={cn(
          'cn-tooltip-content cn-tooltip-content-logical data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95 data-open:fade-in-0 data-open:zoom-in-95 data-closed:fade-out-0 data-closed:zoom-out-95 z-50 inline-flex min-h-6 w-fit max-w-xs origin-(--transform-origin) items-center gap-1 rounded-sm bg-foreground px-2 py-1 text-background text-xs has-data-[slot=kbd]:pr-1 data-[state=delayed-open]:animate-in data-closed:animate-out data-open:animate-in **:data-[slot=kbd]:relative **:data-[slot=kbd]:isolate **:data-[slot=kbd]:z-50 **:data-[slot=kbd]:rounded-sm',
          className
        )}
        data-slot="tooltip-content"
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className="cn-tooltip-arrow cn-tooltip-arrow-logical hidden" />
      </TooltipPrimitive.Popup>
    </TooltipPrimitive.Positioner>
  </TooltipPrimitive.Portal>
)

export type { TooltipContentProps, TooltipProps, TooltipProviderProps, TooltipTriggerProps }
export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger }
