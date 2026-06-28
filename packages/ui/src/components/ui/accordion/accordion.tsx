import { Accordion as AccordionPrimitive } from '@base-ui/react/accordion'

import { cn } from '@/lib/utils'

type AccordionProps = AccordionPrimitive.Root.Props
type AccordionItemProps = AccordionPrimitive.Item.Props
type AccordionTriggerProps = AccordionPrimitive.Trigger.Props
type AccordionContentProps = AccordionPrimitive.Panel.Props

const Accordion = ({ className, ...props }: AccordionProps) => (
  <AccordionPrimitive.Root className={cn('w-full', className)} data-slot="accordion" {...props} />
)

const AccordionItem = ({ className, ...props }: AccordionItemProps) => (
  <AccordionPrimitive.Item
    className={cn('border-b last:border-b-0', className)}
    data-slot="accordion-item"
    {...props}
  />
)

const AccordionTrigger = ({ children, className, ...props }: AccordionTriggerProps) => (
  <AccordionPrimitive.Header className="flex" data-slot="accordion-header">
    <AccordionPrimitive.Trigger
      className={cn(
        'flex flex-1 items-center justify-between gap-4 py-4 text-left font-medium text-sm outline-none transition-all hover:underline focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 data-[open]:[&_svg]:rotate-180',
        className
      )}
      data-slot="accordion-trigger"
      {...props}
    >
      {children}
      <svg
        aria-hidden="true"
        className="size-4 shrink-0 text-muted-foreground transition-transform duration-200"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
)

const AccordionContent = ({ children, className, ...props }: AccordionContentProps) => (
  <AccordionPrimitive.Panel className="overflow-hidden text-sm" data-slot="accordion-content" {...props}>
    <div className={cn('pt-0 pb-4', className)}>{children}</div>
  </AccordionPrimitive.Panel>
)

export type { AccordionContentProps, AccordionItemProps, AccordionProps, AccordionTriggerProps }
export { Accordion, AccordionContent, AccordionItem, AccordionTrigger }
