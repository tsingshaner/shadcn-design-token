import { Tabs as TabsPrimitive } from '@base-ui/react/tabs'
import { tv, type VariantProps } from 'tailwind-variants'

import { cn } from '@/lib/utils'

type TabsProps = TabsPrimitive.Root.Props
type TabsListProps = TabsPrimitive.List.Props & VariantProps<typeof tabsListVariants>
type TabsTriggerProps = TabsPrimitive.Tab.Props
type TabsContentProps = TabsPrimitive.Panel.Props

const tabsListVariants = tv({
  base: 'cn-tabs-list inline-flex w-fit items-center justify-center text-muted-foreground group-data-horizontal/tabs:min-h-12 group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col',
  defaultVariants: {
    variant: 'default'
  },
  variants: {
    variant: {
      default: 'cn-tabs-list-variant-default bg-transparent',
      line: 'cn-tabs-list-variant-line gap-1 bg-transparent'
    }
  }
})

const Tabs = ({ className, orientation = 'horizontal', ...props }: TabsProps) => (
  <TabsPrimitive.Root
    className={cn('cn-tabs group/tabs flex gap-2 data-horizontal:flex-col', className)}
    data-orientation={orientation}
    data-slot="tabs"
    orientation={orientation}
    {...props}
  />
)

const TabsList = ({ className, variant = 'default', ...props }: TabsListProps) => (
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
      "cn-tabs-trigger relative inline-flex min-h-12 flex-1 items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-none border border-transparent px-4 py-2 font-medium text-muted-foreground text-sm outline-none transition-colors after:pointer-events-none hover:text-foreground focus-visible:bg-primary/10 disabled:pointer-events-none disabled:opacity-[0.38] has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3 aria-disabled:pointer-events-none aria-disabled:opacity-[0.38] group-data-vertical/tabs:w-full group-data-vertical/tabs:justify-start [&_svg:not([class*='size-'])]:size-[18px] [&_svg]:pointer-events-none [&_svg]:shrink-0",
      'group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-active:bg-transparent dark:group-data-[variant=line]/tabs-list:data-active:border-transparent dark:group-data-[variant=line]/tabs-list:data-active:bg-transparent',
      'data-active:bg-transparent data-active:text-primary',
      'after:absolute after:bg-primary after:opacity-0 after:transition-opacity data-active:after:opacity-100 group-data-horizontal/tabs:after:inset-x-4 group-data-vertical/tabs:after:inset-y-2 group-data-vertical/tabs:after:right-0 group-data-horizontal/tabs:after:bottom-0 group-data-horizontal/tabs:after:h-[3px] group-data-vertical/tabs:after:w-[3px] group-data-horizontal/tabs:after:rounded-t-full',
      className
    )}
    data-slot="tabs-trigger"
    {...props}
  />
)

const TabsContent = ({ className, ...props }: TabsContentProps) => (
  <TabsPrimitive.Panel
    className={cn('cn-tabs-content flex-1 text-sm outline-none', className)}
    data-slot="tabs-content"
    {...props}
  />
)

export type { TabsContentProps, TabsListProps, TabsProps, TabsTriggerProps }
export { Tabs, TabsContent, TabsList, TabsTrigger, tabsListVariants }
