import { Collapsible as CollapsiblePrimitive } from '@base-ui/react/collapsible'

type CollapsibleProps = CollapsiblePrimitive.Root.Props
type CollapsibleTriggerProps = CollapsiblePrimitive.Trigger.Props
type CollapsibleContentProps = CollapsiblePrimitive.Panel.Props

const Collapsible = (props: CollapsibleProps) => (
  <CollapsiblePrimitive.Root data-scope="collapsible" data-slot="root" {...props} />
)

const CollapsibleTrigger = (props: CollapsibleTriggerProps) => (
  <CollapsiblePrimitive.Trigger data-scope="collapsible" data-slot="trigger" {...props} />
)

const CollapsibleContent = (props: CollapsibleContentProps) => (
  <CollapsiblePrimitive.Panel data-scope="collapsible" data-slot="content" {...props} />
)

export type { CollapsibleContentProps, CollapsibleProps, CollapsibleTriggerProps }
export { Collapsible, CollapsibleContent, CollapsibleTrigger }
