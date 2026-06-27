import { Tabs as TabsPrimitive } from '@base-ui/react/tabs'
import { tv, type VariantProps } from 'tailwind-variants/lite'

import { cn } from '../../../lib/utils'

type TabsProps = TabsPrimitive.Root.Props
type TabsListProps = TabsPrimitive.List.Props & VariantProps<typeof tabsListVariants>
type TabsTriggerProps = TabsPrimitive.Tab.Props
type TabsContentProps = TabsPrimitive.Panel.Props

const tabsListVariants = tv({
  base: 'inline-flex h-9 w-fit items-center justify-center text-muted-foreground',
  defaultVariants: {
    variant: 'default'
  },
  variants: {
    variant: {
      default: 'rounded-lg bg-muted p-1',
      line: 'gap-1 rounded-none border-b bg-transparent p-0'
    }
  }
})

const Tabs = ({ className, ...props }: TabsProps) => (
  <TabsPrimitive.Root className={cn('flex flex-col gap-2', className)} data-slot="tabs" {...props} />
)

const TabsList = ({ className, variant, ...props }: TabsListProps) => (
  <TabsPrimitive.List
    className={cn(tabsListVariants({ variant }), className)}
    data-slot="tabs-list"
    data-variant={variant}
    {...props}
  />
)

const TabsTrigger = ({ className, ...props }: TabsTriggerProps) => (
  <TabsPrimitive.Tab
    className={cn(
      'inline-flex h-7 min-w-0 flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-md border border-transparent px-2 py-1 font-medium text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 data-[selected]:bg-background data-[selected]:text-foreground data-[selected]:shadow-sm',
      className
    )}
    data-slot="tabs-trigger"
    {...props}
  />
)

const TabsContent = ({ className, ...props }: TabsContentProps) => (
  <TabsPrimitive.Panel
    className={cn('flex-1 outline-none focus-visible:ring-3 focus-visible:ring-ring/50', className)}
    data-slot="tabs-content"
    {...props}
  />
)

export type { TabsContentProps, TabsListProps, TabsProps, TabsTriggerProps }
export { Tabs, TabsContent, TabsList, TabsTrigger, tabsListVariants }
