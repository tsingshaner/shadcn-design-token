import { ScrollArea as ScrollAreaPrimitive } from '@base-ui/react/scroll-area'

import { cn } from '@/lib/utils'

type ScrollAreaProps = ScrollAreaPrimitive.Root.Props
type ScrollBarProps = ScrollAreaPrimitive.Scrollbar.Props

const ScrollArea = ({ children, className, ...props }: ScrollAreaProps) => (
  <ScrollAreaPrimitive.Root className={cn('cn-scroll-area relative', className)} data-slot="scroll-area" {...props}>
    <ScrollAreaPrimitive.Viewport
      className="cn-scroll-area-viewport size-full rounded-[inherit] outline-none transition-[color,box-shadow] focus-visible:outline-1 focus-visible:ring-[3px] focus-visible:ring-ring/50"
      data-slot="scroll-area-viewport"
    >
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
)

const ScrollBar = ({ className, orientation = 'vertical', ...props }: ScrollBarProps) => (
  <ScrollAreaPrimitive.Scrollbar
    className={cn(
      'cn-scroll-area-scrollbar flex touch-none select-none p-px transition-colors data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:h-full data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col',
      className
    )}
    data-orientation={orientation}
    data-slot="scroll-area-scrollbar"
    orientation={orientation}
    {...props}
  >
    <ScrollAreaPrimitive.Thumb
      className="cn-scroll-area-thumb relative flex-1 bg-border"
      data-slot="scroll-area-thumb"
    />
  </ScrollAreaPrimitive.Scrollbar>
)

export type { ScrollAreaProps, ScrollBarProps }
export { ScrollArea, ScrollBar }
