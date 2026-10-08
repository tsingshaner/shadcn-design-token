import { cn } from 'cn'

type MessageGroupProps = React.ComponentProps<'div'>
type MessageProps = React.ComponentProps<'div'> & {
  align?: 'end' | 'start'
}
type MessageAvatarProps = React.ComponentProps<'div'>
type MessageContentProps = React.ComponentProps<'div'>
type MessageHeaderProps = React.ComponentProps<'div'>
type MessageFooterProps = React.ComponentProps<'div'>

const MessageGroup = ({ className, ...props }: MessageGroupProps) => (
  <div className={cn('flex min-w-0 flex-col', className)} data-scope="message" data-slot="group" {...props} />
)

const Message = ({ align = 'start', className, ...props }: MessageProps) => (
  <div
    className={cn('group/message relative flex w-full min-w-0 data-[align=end]:flex-row-reverse', className)}
    data-align={align}
    data-scope="message"
    data-slot="root"
    {...props}
  />
)

const MessageAvatar = ({ className, ...props }: MessageAvatarProps) => (
  <div
    className={cn(
      'flex w-fit shrink-0 items-center justify-center self-end overflow-hidden rounded-full bg-muted',
      className
    )}
    data-scope="message"
    data-slot="avatar"
    {...props}
  />
)

const MessageContent = ({ className, ...props }: MessageContentProps) => (
  <div
    className={cn('wrap-break-word flex w-full min-w-0 flex-col', className)}
    data-scope="message"
    data-slot="content"
    {...props}
  />
)

const MessageHeader = ({ className, ...props }: MessageHeaderProps) => (
  <div
    className={cn('flex min-w-0 max-w-full items-center', className)}
    data-scope="message"
    data-slot="header"
    {...props}
  />
)

const MessageFooter = ({ className, ...props }: MessageFooterProps) => (
  <div
    className={cn('flex min-w-0 max-w-full items-center group-data-[align=end]/message:justify-end', className)}
    data-scope="message"
    data-slot="footer"
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
