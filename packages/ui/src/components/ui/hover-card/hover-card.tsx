import { PreviewCard as HoverCardPrimitive } from '@base-ui/react/preview-card'

import { cn } from '@/lib/utils'

type HoverCardProps = HoverCardPrimitive.Root.Props
type HoverCardTriggerProps = HoverCardPrimitive.Trigger.Props
type HoverCardContentProps = HoverCardPrimitive.Popup.Props &
  Pick<HoverCardPrimitive.Positioner.Props, 'align' | 'side' | 'sideOffset'>

const HoverCard = (props: HoverCardProps) => <HoverCardPrimitive.Root {...props} />

const HoverCardTrigger = ({ className, ...props }: HoverCardTriggerProps) => (
  <HoverCardPrimitive.Trigger
    className={cn('outline-none focus-visible:ring-3 focus-visible:ring-ring/50', className)}
    data-slot="hover-card-trigger"
    {...props}
  />
)

const HoverCardContent = ({
  align = 'center',
  className,
  side = 'bottom',
  sideOffset = 4,
  ...props
}: HoverCardContentProps) => (
  <HoverCardPrimitive.Portal>
    <HoverCardPrimitive.Positioner align={align} side={side} sideOffset={sideOffset}>
      <HoverCardPrimitive.Popup
        className={cn(
          'z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none',
          className
        )}
        data-slot="hover-card-content"
        {...props}
      />
    </HoverCardPrimitive.Positioner>
  </HoverCardPrimitive.Portal>
)

export type { HoverCardContentProps, HoverCardProps, HoverCardTriggerProps }
export { HoverCard, HoverCardContent, HoverCardTrigger }
