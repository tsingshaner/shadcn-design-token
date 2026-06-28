import { ScrollArea as ScrollAreaPrimitive } from '@base-ui/react/scroll-area'

import { cn } from '@/lib/utils'

type ScrollAreaProps = ScrollAreaPrimitive.Root.Props
type ScrollBarProps = ScrollAreaPrimitive.Scrollbar.Props

const ScrollArea = ({ children, className, ...props }: ScrollAreaProps) => (
  <ScrollAreaPrimitive.Root className={cn('relative overflow-hidden', className)} data-slot="scroll-area" {...props}>
    <ScrollAreaPrimitive.Viewport className="size-full rounded-[inherit]" data-slot="scroll-area-viewport">
      <ScrollAreaPrimitive.Content data-slot="scroll-area-content">{children}</ScrollAreaPrimitive.Content>
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner data-slot="scroll-area-corner" />
  </ScrollAreaPrimitive.Root>
)

const ScrollBar = ({ className, orientation = 'vertical', ...props }: ScrollBarProps) => (
  <ScrollAreaPrimitive.Scrollbar
    className={cn(
      'flex touch-none select-none transition-colors data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:h-full data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col',
      className
    )}
    data-slot="scroll-area-scrollbar"
    orientation={orientation}
    {...props}
  >
    <ScrollAreaPrimitive.Thumb className="relative flex-1 rounded-full bg-border" data-slot="scroll-area-thumb" />
  </ScrollAreaPrimitive.Scrollbar>
)

export type { ScrollAreaProps, ScrollBarProps }
export { ScrollArea, ScrollBar }
