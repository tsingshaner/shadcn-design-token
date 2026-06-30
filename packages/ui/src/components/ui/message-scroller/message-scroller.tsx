import {
  MessageScroller as MessageScrollerPrimitive,
  useMessageScroller,
  useMessageScrollerScrollable,
  useMessageScrollerVisibility
} from '@shadcn/react/message-scroller'
import { ArrowDownIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

import { Button } from '../button'

type MessageScrollerProviderProps = React.ComponentProps<typeof MessageScrollerPrimitive.Provider>
type MessageScrollerProps = React.ComponentProps<typeof MessageScrollerPrimitive.Root>
type MessageScrollerViewportProps = React.ComponentProps<typeof MessageScrollerPrimitive.Viewport>
type MessageScrollerContentProps = React.ComponentProps<typeof MessageScrollerPrimitive.Content>
type MessageScrollerItemProps = React.ComponentProps<typeof MessageScrollerPrimitive.Item>
type MessageScrollerButtonProps = React.ComponentProps<typeof MessageScrollerPrimitive.Button> &
  Pick<React.ComponentProps<typeof Button>, 'size' | 'variant'>

const MessageScrollerProvider = (props: MessageScrollerProviderProps) => (
  <MessageScrollerPrimitive.Provider {...props} />
)

const MessageScroller = ({ className, ...props }: MessageScrollerProps) => (
  <MessageScrollerPrimitive.Root
    className={cn(
      'cn-message-scroller group/message-scroller relative flex size-full min-h-0 flex-col overflow-hidden',
      className
    )}
    data-slot="message-scroller"
    {...props}
  />
)

const MessageScrollerViewport = ({ className, ...props }: MessageScrollerViewportProps) => (
  <MessageScrollerPrimitive.Viewport
    className={cn(
      'cn-message-scroller-viewport scrollbar-thin scrollbar-gutter-stable scroll-fade-b data-autoscrolling:scrollbar-thumb-transparent data-autoscrolling:scrollbar-track-transparent size-full min-h-0 min-w-0 overflow-y-auto overscroll-contain contain-content',
      className
    )}
    data-slot="message-scroller-viewport"
    {...props}
  />
)

const MessageScrollerContent = ({ className, ...props }: MessageScrollerContentProps) => (
  <MessageScrollerPrimitive.Content
    className={cn('cn-message-scroller-content flex h-max min-h-full flex-col', className)}
    data-slot="message-scroller-content"
    {...props}
  />
)

const MessageScrollerItem = ({ className, scrollAnchor = false, ...props }: MessageScrollerItemProps) => (
  <MessageScrollerPrimitive.Item
    className={cn(
      'cn-message-scroller-item min-w-0 shrink-0 [contain-intrinsic-size:auto_10rem] [content-visibility:auto]',
      className
    )}
    data-slot="message-scroller-item"
    scrollAnchor={scrollAnchor}
    {...props}
  />
)

const MessageScrollerButton = ({
  children,
  className,
  direction = 'end',
  render,
  size = 'icon-sm',
  variant = 'secondary',
  ...props
}: MessageScrollerButtonProps) => (
  <MessageScrollerPrimitive.Button
    className={cn(
      'cn-message-scroller-button absolute inset-s-1/2 -translate-x-1/2 border-border bg-background text-foreground transition-[translate,scale,opacity] duration-200 hover:bg-muted hover:text-foreground data-[direction=end]:data-[active=false]:translate-y-full data-[direction=start]:data-[active=false]:-translate-y-full data-[active=false]:pointer-events-none data-[direction=start]:top-4 data-[direction=end]:bottom-4 data-[active=true]:translate-y-0 data-[active=false]:scale-95 data-[active=true]:scale-100 data-[active=false]:opacity-0 data-[active=true]:opacity-100 data-[active=false]:duration-400 data-[active=false]:ease-[cubic-bezier(0.7,0,0.84,0)] data-[active=true]:ease-[cubic-bezier(0.23,1,0.32,1)] rtl:translate-x-1/2 data-[direction=start]:[&_svg]:rotate-180',
      className
    )}
    data-direction={direction}
    data-size={size}
    data-slot="message-scroller-button"
    data-variant={variant}
    direction={direction}
    render={render ?? <Button size={size} variant={variant} />}
    {...props}
  >
    {children ?? (
      <>
        <ArrowDownIcon />
        <span className="sr-only">{direction === 'end' ? 'Scroll to end' : 'Scroll to start'}</span>
      </>
    )}
  </MessageScrollerPrimitive.Button>
)

export type {
  MessageScrollerButtonProps,
  MessageScrollerContentProps,
  MessageScrollerItemProps,
  MessageScrollerProps,
  MessageScrollerProviderProps,
  MessageScrollerViewportProps
}
export {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
  useMessageScroller,
  useMessageScrollerScrollable,
  useMessageScrollerVisibility
}
