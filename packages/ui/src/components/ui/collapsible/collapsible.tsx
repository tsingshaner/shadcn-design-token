import { Collapsible as CollapsiblePrimitive } from '@base-ui/react/collapsible'

type CollapsibleProps = CollapsiblePrimitive.Root.Props
type CollapsibleTriggerProps = CollapsiblePrimitive.Trigger.Props
type CollapsibleContentProps = CollapsiblePrimitive.Panel.Props

const Collapsible = (props: CollapsibleProps) => <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />

const CollapsibleTrigger = (props: CollapsibleTriggerProps) => (
  <CollapsiblePrimitive.Trigger data-slot="collapsible-trigger" {...props} />
)

const CollapsibleContent = (props: CollapsibleContentProps) => (
  <CollapsiblePrimitive.Panel data-slot="collapsible-content" {...props} />
)

export type { CollapsibleContentProps, CollapsibleProps, CollapsibleTriggerProps }
export { Collapsible, CollapsibleContent, CollapsibleTrigger }
