import { Tooltip as TooltipPrimitive } from '@base-ui/react/tooltip'
import { cn } from 'cn'

type TooltipProviderProps = TooltipPrimitive.Provider.Props
type TooltipProps = TooltipPrimitive.Root.Props
type TooltipTriggerProps = TooltipPrimitive.Trigger.Props
type TooltipContentProps = TooltipPrimitive.Popup.Props &
  Pick<TooltipPrimitive.Positioner.Props, 'align' | 'alignOffset' | 'side' | 'sideOffset'>

const TooltipProvider = ({ delay = 0, ...props }: TooltipProviderProps) => (
  <TooltipPrimitive.Provider data-scope="tooltip" data-slot="provider" delay={delay} {...props} />
)

const Tooltip = (props: TooltipProps) => <TooltipPrimitive.Root data-scope="tooltip" data-slot="root" {...props} />

const TooltipTrigger = (props: TooltipTriggerProps) => (
  <TooltipPrimitive.Trigger data-scope="tooltip" data-slot="trigger" {...props} />
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
          'data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95 data-open:fade-in-0 data-open:zoom-in-95 data-closed:fade-out-0 data-closed:zoom-out-95 z-50 inline-flex min-h-6 w-fit max-w-xs origin-(--transform-origin) items-center gap-1 rounded-sm bg-foreground px-2 py-1 text-background text-xs has-[[data-scope=kbd][data-slot=root]]:pr-1 data-[state=delayed-open]:animate-in data-closed:animate-out data-open:animate-in **:data-[scope=kbd]:data-[slot=root]:relative **:data-[scope=kbd]:data-[slot=root]:isolate **:data-[scope=kbd]:data-[slot=root]:z-50 **:data-[scope=kbd]:data-[slot=root]:rounded-sm',
          className
        )}
        data-scope="tooltip"
        data-slot="content"
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className="hidden" data-scope="tooltip" data-slot="arrow" />
      </TooltipPrimitive.Popup>
    </TooltipPrimitive.Positioner>
  </TooltipPrimitive.Portal>
)

export type { TooltipContentProps, TooltipProps, TooltipProviderProps, TooltipTriggerProps }
export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger }
