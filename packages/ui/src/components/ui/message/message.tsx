import { cn } from '@/lib/utils'

type MessageGroupProps = React.ComponentProps<'div'>
type MessageProps = React.ComponentProps<'div'> & {
  align?: 'end' | 'start'
}
type MessageAvatarProps = React.ComponentProps<'div'>
type MessageContentProps = React.ComponentProps<'div'>
type MessageHeaderProps = React.ComponentProps<'div'>
type MessageFooterProps = React.ComponentProps<'div'>

const MessageGroup = ({ className, ...props }: MessageGroupProps) => (
  <div className={cn('cn-message-group flex min-w-0 flex-col', className)} data-slot="message-group" {...props} />
)

const Message = ({ align = 'start', className, ...props }: MessageProps) => (
  <div
    className={cn('cn-message group/message relative flex w-full min-w-0 data-[align=end]:flex-row-reverse', className)}
    data-align={align}
    data-slot="message"
    {...props}
  />
)

const MessageAvatar = ({ className, ...props }: MessageAvatarProps) => (
  <div
    className={cn(
      'cn-message-avatar flex w-fit shrink-0 items-center justify-center self-end overflow-hidden rounded-full bg-muted',
      className
    )}
    data-slot="message-avatar"
    {...props}
  />
)

const MessageContent = ({ className, ...props }: MessageContentProps) => (
  <div
    className={cn('cn-message-content wrap-break-word flex w-full min-w-0 flex-col', className)}
    data-slot="message-content"
    {...props}
  />
)

const MessageHeader = ({ className, ...props }: MessageHeaderProps) => (
  <div
    className={cn('cn-message-header flex min-w-0 max-w-full items-center', className)}
    data-slot="message-header"
    {...props}
  />
)

const MessageFooter = ({ className, ...props }: MessageFooterProps) => (
  <div
    className={cn(
      'cn-message-footer flex min-w-0 max-w-full items-center group-data-[align=end]/message:justify-end',
      className
    )}
    data-slot="message-footer"
    {...props}
  />
)

export type {
  MessageAvatarProps,
  MessageContentProps,
  MessageFooterProps,
  MessageGroupProps,
  MessageHeaderProps,
  MessageProps
}
export { Message, MessageAvatar, MessageContent, MessageFooter, MessageGroup, MessageHeader }
