import { mergeProps, useRender } from '@base-ui/react'
import { Accordion as AccordionPrimitive } from '@base-ui/react/accordion'

import { cn } from '@/lib/utils'

type AccordionProps = AccordionPrimitive.Root.Props
type AccordionItemProps = AccordionPrimitive.Item.Props
type AccordionTriggerProps = AccordionPrimitive.Trigger.Props
type AccordionContentProps = AccordionPrimitive.Panel.Props
type AccordionTriggerIconProps = useRender.ComponentProps<'i'>

const Accordion = ({ className, ...props }: AccordionProps) => (
  <AccordionPrimitive.Root
    className={cn('cn-accordion flex w-full flex-col', className)}
    data-slot="accordion"
    {...props}
  />
)

const AccordionItem = ({ className, ...props }: AccordionItemProps) => (
  <AccordionPrimitive.Item
    className={cn('cn-accordion-item border-b last:border-b-0', className)}
    data-slot="accordion-item"
    {...props}
  />
)

const AccordionTriggerIcon = ({ className, render, ...props }: AccordionTriggerIconProps) =>
  useRender({
    defaultTagName: 'i',
    props: {
      'aria-hidden': true,
      className: cn(
        'icon-[lucide--chevron-down] group-data-[panel-open]/accordion-trigger:icon-[lucide--chevron-up] group-data-[panel-open]/accordion-trigger:size-4',
        'cn-accordion-trigger-icon size-4 shrink-0 text-muted-foreground transition-transform duration-200',
        className
      ),
      'data-slot': 'accordion-trigger-icon',
      ...props
    },
    render
  })

const AccordionTrigger = ({ children, className, ...props }: AccordionTriggerProps) => (
  <AccordionPrimitive.Header className="flex" data-slot="accordion-header">
    <AccordionPrimitive.Trigger
      className={cn(
        'cn-accordion-trigger group/accordion-trigger relative flex flex-1 items-center justify-between gap-4 py-4 text-left font-medium text-sm outline-none transition-all hover:underline focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 data-[open]:[&_svg]:rotate-180',
        className
      )}
      data-slot="accordion-trigger"
      {...props}
    >
      {children}
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
)

const AccordionContent = ({ children, className, ...props }: AccordionContentProps) => (
  <AccordionPrimitive.Panel
    className="cn-accordion-content overflow-hidden text-sm"
    data-slot="accordion-content"
    {...props}
  >
    <div className={cn('cn-accordion-content-inner pt-0 pb-4', className)}>{children}</div>
  </AccordionPrimitive.Panel>
)

export type {
  AccordionContentProps,
  AccordionItemProps,
  AccordionProps,
  AccordionTriggerIconProps,
  AccordionTriggerProps
}
export { Accordion, AccordionContent, AccordionItem, AccordionTrigger, AccordionTriggerIcon }
