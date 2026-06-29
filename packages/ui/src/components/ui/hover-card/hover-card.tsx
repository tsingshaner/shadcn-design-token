import { PreviewCard as HoverCardPrimitive } from '@base-ui/react/preview-card'

import { cn } from '@/lib/utils'

type HoverCardProps = HoverCardPrimitive.Root.Props
type HoverCardTriggerProps = HoverCardPrimitive.Trigger.Props
type HoverCardContentProps = HoverCardPrimitive.Popup.Props &
  Pick<HoverCardPrimitive.Positioner.Props, 'align' | 'alignOffset' | 'side' | 'sideOffset'>

const HoverCard = (props: HoverCardProps) => <HoverCardPrimitive.Root data-slot="hover-card" {...props} />

const HoverCardTrigger = (props: HoverCardTriggerProps) => (
  <HoverCardPrimitive.Trigger data-slot="hover-card-trigger" {...props} />
)

const HoverCardContent = ({
  align = 'center',
  alignOffset = 4,
  className,
  side = 'bottom',
  sideOffset = 4,
  ...props
}: HoverCardContentProps) => (
  <HoverCardPrimitive.Portal data-slot="hover-card-portal">
    <HoverCardPrimitive.Positioner
      align={align}
      alignOffset={alignOffset}
      className="isolate z-50"
      side={side}
      sideOffset={sideOffset}
    >
      <HoverCardPrimitive.Popup
        className={cn(
          'z-50 w-64 origin-(--transform-origin) rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-hidden',
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
