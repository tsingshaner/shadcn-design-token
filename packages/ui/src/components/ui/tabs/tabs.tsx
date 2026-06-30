import { Tabs as TabsPrimitive } from '@base-ui/react/tabs'
import { tv, type VariantProps } from 'tailwind-variants'

import { cn } from '@/lib/utils'

type TabsProps = TabsPrimitive.Root.Props
type TabsListProps = TabsPrimitive.List.Props & VariantProps<typeof tabsListVariants>
type TabsTriggerProps = TabsPrimitive.Tab.Props
type TabsContentProps = TabsPrimitive.Panel.Props

const tabsListVariants = tv({
  base: 'cn-tabs-list inline-flex w-fit items-center justify-center rounded-lg p-[3px] text-muted-foreground group-data-horizontal/tabs:h-8 group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col data-[variant=line]:rounded-none',
  defaultVariants: {
    variant: 'default'
  },
  variants: {
    variant: {
      default: 'cn-tabs-list-variant-default bg-muted',
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
      "cn-tabs-trigger relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-md border border-transparent px-1.5 py-0.5 font-medium text-foreground/60 text-sm transition-all hover:text-foreground focus-visible:border-ring focus-visible:outline-1 focus-visible:outline-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 has-data-[icon=inline-end]:pr-1 has-data-[icon=inline-start]:pl-1 aria-disabled:pointer-events-none aria-disabled:opacity-50 group-data-vertical/tabs:w-full group-data-vertical/tabs:justify-start group-data-[variant=default]/tabs-list:aria-selected:shadow-sm group-data-[variant=line]/tabs-list:aria-selected:shadow-none dark:text-muted-foreground dark:hover:text-foreground [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
      'group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-active:bg-transparent dark:group-data-[variant=line]/tabs-list:data-active:border-transparent dark:group-data-[variant=line]/tabs-list:data-active:bg-transparent',
      'data-active:bg-background data-active:text-foreground dark:data-active:border-input dark:data-active:bg-input/30 dark:data-active:text-foreground',
      'after:absolute after:bg-foreground after:opacity-0 after:transition-opacity group-data-horizontal/tabs:after:inset-x-0 group-data-vertical/tabs:after:inset-y-0 group-data-vertical/tabs:after:-right-1 group-data-horizontal/tabs:after:bottom-[-5px] group-data-horizontal/tabs:after:h-0.5 group-data-vertical/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-active:after:opacity-100',
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
