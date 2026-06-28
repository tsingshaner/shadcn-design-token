import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

type ResizablePanelGroupProps = ComponentProps<'div'> & {
  direction?: 'horizontal' | 'vertical'
  orientation?: 'horizontal' | 'vertical'
}
type ResizablePanelProps = ComponentProps<'div'> & {
  defaultSize?: number
}
type ResizableHandleProps = ComponentProps<'button'> & {
  withHandle?: boolean
}

const ResizablePanelGroup = ({
  className,
  direction,
  orientation = direction ?? 'horizontal',
  ...props
}: ResizablePanelGroupProps) => (
  <div
    className={cn(
      'flex h-full w-full overflow-hidden rounded-md border',
      orientation === 'vertical' ? 'flex-col' : 'flex-row',
      className
    )}
    data-direction={orientation}
    data-slot="resizable-panel-group"
    {...props}
  />
)

const ResizablePanel = ({ className, defaultSize, style, ...props }: ResizablePanelProps) => (
  <div
    className={cn('min-h-0 min-w-0 flex-1 overflow-auto', className)}
    data-slot="resizable-panel"
    style={{ flexBasis: defaultSize ? `${defaultSize}%` : undefined, ...style }}
    {...props}
  />
)

const ResizableHandle = ({ className, withHandle = false, ...props }: ResizableHandleProps) => (
  <button
    aria-label="Resize panels"
    className={cn(
      'relative flex in-data-[direction=vertical]:h-px in-data-[direction=vertical]:w-full w-px items-center justify-center bg-border outline-none transition-colors hover:bg-ring focus-visible:ring-3 focus-visible:ring-ring/50',
      className
    )}
    data-slot="resizable-handle"
    type="button"
    {...props}
  >
    {withHandle ? (
      <span className="z-10 h-4 w-3 rounded-sm border bg-background" data-slot="resizable-handle-grip" />
    ) : null}
  </button>
)

export type { ResizableHandleProps, ResizablePanelGroupProps, ResizablePanelProps }
export { ResizableHandle, ResizablePanel, ResizablePanelGroup }
