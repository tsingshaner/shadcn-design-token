import { Tabs as TabsPrimitive } from '@base-ui/react/tabs'
import { cn } from 'cn'

import { cva, type VariantProps } from '@/lib/cva'

import { Ripple } from '../ripple'

type TabsProps = TabsPrimitive.Root.Props
type TabsListProps = TabsPrimitive.List.Props & TabsListVariantsProps
type TabsTriggerProps = TabsPrimitive.Tab.Props
type TabsContentProps = TabsPrimitive.Panel.Props

type TabsListVariantsProps = VariantProps<typeof tabsListVariants>

const tabsListVariants = cva({
  base: 'inline-flex w-fit items-center justify-center text-muted-foreground group-data-horizontal/tabs:min-h-12 group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col',
  defaultVariants: {
    variant: 'default'
  },
  variants: {
    variant: {
      default: 'bg-transparent',
      line: 'gap-1 bg-transparent'
    }
  }
})

const Tabs = ({ className, orientation = 'horizontal', ...props }: TabsProps) => (
  <TabsPrimitive.Root
    className={cn('group/tabs flex gap-2 data-horizontal:flex-col', className)}
    data-orientation={orientation}
    data-scope="tabs"
    data-slot="root"
    orientation={orientation}
    {...props}
  />
)

const TabsList = ({ className, variant = 'default', ...props }: TabsListProps) => (
  <TabsPrimitive.List
    className={tabsListVariants({ className, variant })}
    data-scope="tabs"
    data-slot="list"
    data-variant={variant}
    {...props}
  />
)

const TabsTrigger = ({ children, className, ...props }: TabsTriggerProps) => (
  <TabsPrimitive.Tab
    className={cn(
      "relative inline-flex min-h-12 flex-1 items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-none border border-transparent px-4 py-2 font-medium text-muted-foreground text-sm outline-none transition-colors after:pointer-events-none hover:text-foreground focus-visible:bg-primary/10 disabled:pointer-events-none disabled:opacity-[0.38] has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3 aria-disabled:pointer-events-none aria-disabled:opacity-[0.38] group-data-vertical/tabs:w-full group-data-vertical/tabs:justify-start [&_svg:not([class*='size-'])]:size-4.5 [&_svg]:pointer-events-none [&_svg]:shrink-0",
      'group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-active:bg-transparent dark:group-data-[variant=line]/tabs-list:data-active:border-transparent dark:group-data-[variant=line]/tabs-list:data-active:bg-transparent',
      'data-active:bg-transparent data-active:text-primary',
      'after:absolute after:bg-primary after:opacity-0 after:transition-opacity data-active:after:opacity-100 group-data-horizontal/tabs:after:inset-x-4 group-data-vertical/tabs:after:inset-y-2 group-data-vertical/tabs:after:right-0 group-data-horizontal/tabs:after:bottom-0 group-data-horizontal/tabs:after:h-0.75 group-data-vertical/tabs:after:w-0.75 group-data-horizontal/tabs:after:rounded-t-full',
      className
    )}
    data-scope="tabs"
    data-slot="trigger"
    {...props}
  >
    {children}
    <Ripple />
  </TabsPrimitive.Tab>
)

const TabsContent = ({ className, ...props }: TabsContentProps) => (
  <TabsPrimitive.Panel
    className={cn('flex-1 text-sm outline-none', className)}
    data-scope="tabs"
    data-slot="content"
    {...props}
  />
)

export type { TabsContentProps, TabsListProps, TabsProps, TabsTriggerProps }
export { Tabs, TabsContent, TabsList, TabsTrigger, tabsListVariants }
