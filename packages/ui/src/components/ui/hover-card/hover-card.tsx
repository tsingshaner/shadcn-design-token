import { PreviewCard as HoverCardPrimitive } from '@base-ui/react/preview-card'
import { cn } from 'cn'

type HoverCardProps = HoverCardPrimitive.Root.Props
type HoverCardTriggerProps = HoverCardPrimitive.Trigger.Props
type HoverCardContentProps = HoverCardPrimitive.Popup.Props &
  Pick<HoverCardPrimitive.Positioner.Props, 'align' | 'alignOffset' | 'side' | 'sideOffset'>

const HoverCard = (props: HoverCardProps) => (
  <HoverCardPrimitive.Root data-scope="hover-card" data-slot="root" {...props} />
)

const HoverCardTrigger = (props: HoverCardTriggerProps) => (
  <HoverCardPrimitive.Trigger data-scope="hover-card" data-slot="trigger" {...props} />
)

const HoverCardContent = ({
  align = 'center',
  alignOffset = 4,
  className,
  side = 'bottom',
  sideOffset = 4,
  ...props
}: HoverCardContentProps) => (
  <HoverCardPrimitive.Portal data-scope="hover-card" data-slot="portal">
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
        data-scope="hover-card"
        data-slot="content"
        {...props}
      />
    </HoverCardPrimitive.Positioner>
  </HoverCardPrimitive.Portal>
)

export type { HoverCardContentProps, HoverCardProps, HoverCardTriggerProps }
export { HoverCard, HoverCardContent, HoverCardTrigger }
