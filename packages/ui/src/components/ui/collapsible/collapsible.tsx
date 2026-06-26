import { Collapsible as CollapsiblePrimitive } from '@base-ui/react/collapsible'

import { cn } from '../../../lib/utils'

type CollapsibleProps = CollapsiblePrimitive.Root.Props
type CollapsibleTriggerProps = CollapsiblePrimitive.Trigger.Props
type CollapsibleContentProps = CollapsiblePrimitive.Panel.Props

const Collapsible = ({ className, ...props }: CollapsibleProps) => (
  <CollapsiblePrimitive.Root className={cn('space-y-2', className)} data-slot="collapsible" {...props} />
)

const CollapsibleTrigger = ({ className, ...props }: CollapsibleTriggerProps) => (
  <CollapsiblePrimitive.Trigger
    className={cn(
      'inline-flex items-center justify-center gap-2 rounded-md text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50',
      className
    )}
    data-slot="collapsible-trigger"
    {...props}
  />
)

const CollapsibleContent = ({ className, ...props }: CollapsibleContentProps) => (
  <CollapsiblePrimitive.Panel
    className={cn('overflow-hidden text-sm', className)}
    data-slot="collapsible-content"
    {...props}
  />
)

export type { CollapsibleContentProps, CollapsibleProps, CollapsibleTriggerProps }
export { Collapsible, CollapsibleContent, CollapsibleTrigger }
