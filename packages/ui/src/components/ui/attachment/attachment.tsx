import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { tv, type VariantProps } from 'tailwind-variants'

import { cn } from '@/lib/utils'

import { Button } from '../button'

const attachmentVariants = tv({
  base: 'cn-attachment group/attachment relative flex max-w-full min-w-0 shrink-0 flex-wrap border bg-card text-card-foreground transition-colors has-[>a,>button]:hover:bg-muted/50 data-[state=error]:border-destructive/30 data-[state=idle]:border-dashed',
  variants: {
    orientation: {
      horizontal: 'cn-attachment-orientation-horizontal items-center',
      vertical: 'cn-attachment-orientation-vertical flex-col'
    },
    size: {
      default: 'cn-attachment-size-default',
      sm: 'cn-attachment-size-sm',
      xs: 'cn-attachment-size-xs'
    }
  }
})

const attachmentMediaVariants = tv({
  base: 'cn-attachment-media relative flex aspect-square shrink-0 items-center justify-center overflow-hidden group-data-[state=error]/attachment:bg-destructive/10 group-data-[state=error]/attachment:text-destructive [&_svg]:pointer-events-none',
  defaultVariants: {
    variant: 'icon'
  },
  variants: {
    variant: {
      icon: 'cn-attachment-media-variant-icon',
      image: 'cn-attachment-media-variant-image *:[img]:aspect-square *:[img]:w-full *:[img]:object-cover'
    }
  }
})

type AttachmentProps = React.ComponentProps<'div'> &
  VariantProps<typeof attachmentVariants> & {
    state?: 'done' | 'error' | 'idle' | 'processing' | 'uploading'
  }
type AttachmentMediaProps = React.ComponentProps<'div'> & VariantProps<typeof attachmentMediaVariants>
type AttachmentContentProps = React.ComponentProps<'div'>
type AttachmentTitleProps = React.ComponentProps<'span'>
type AttachmentDescriptionProps = React.ComponentProps<'span'>
type AttachmentActionsProps = React.ComponentProps<'div'>
type AttachmentActionProps = React.ComponentProps<typeof Button>
type AttachmentTriggerProps = useRender.ComponentProps<'button'>
type AttachmentGroupProps = React.ComponentProps<'div'>

const Attachment = ({
  className,
  orientation = 'horizontal',
  size = 'default',
  state = 'done',
  ...props
}: AttachmentProps) => (
  <div
    className={cn(attachmentVariants({ orientation, size }), className)}
    data-orientation={orientation}
    data-size={size}
    data-slot="attachment"
    data-state={state}
    {...props}
  />
)

const AttachmentMedia = ({ className, variant = 'icon', ...props }: AttachmentMediaProps) => (
  <div
    className={cn(attachmentMediaVariants({ variant }), className)}
    data-slot="attachment-media"
    data-variant={variant}
    {...props}
  />
)

const AttachmentContent = ({ className, ...props }: AttachmentContentProps) => (
  <div
    className={cn('cn-attachment-content min-w-0 max-w-full flex-1', className)}
    data-slot="attachment-content"
    {...props}
  />
)

const AttachmentTitle = ({ className, ...props }: AttachmentTitleProps) => (
  <span
    className={cn(
      'cn-attachment-title group-data-[state=processing]/attachment:shimmer group-data-[state=uploading]/attachment:shimmer block min-w-0 max-w-full truncate',
      className
    )}
    data-slot="attachment-title"
    {...props}
  />
)

const AttachmentDescription = ({ className, ...props }: AttachmentDescriptionProps) => (
  <span
    className={cn(
      'cn-attachment-description block min-w-0 max-w-full truncate text-muted-foreground group-data-[state=error]/attachment:text-destructive/80',
      className
    )}
    data-slot="attachment-description"
    {...props}
  />
)

const AttachmentActions = ({ className, ...props }: AttachmentActionsProps) => (
  <div
    className={cn('cn-attachment-actions flex shrink-0 items-center', className)}
    data-slot="attachment-actions"
    {...props}
  />
)

const AttachmentAction = ({ className, size = 'icon-xs', variant = 'ghost', ...props }: AttachmentActionProps) => (
  <Button
    className={cn('cn-attachment-action', className)}
    data-slot="attachment-action"
    size={size}
    variant={variant}
    {...props}
  />
)

const AttachmentTrigger = ({ className, render, type, ...props }: AttachmentTriggerProps) =>
  useRender({
    defaultTagName: 'button',
    props: mergeProps<'button'>(
      {
        className: cn('cn-attachment-trigger absolute inset-0 z-10 outline-none', className),
        type: render ? type : (type ?? 'button')
      },
      props
    ),
    render,
    state: {
      slot: 'attachment-trigger'
    }
  })

const AttachmentGroup = ({ className, ...props }: AttachmentGroupProps) => (
  <div
    className={cn(
      'cn-attachment-group scroll-fade-x scrollbar-none flex min-w-0 snap-x snap-mandatory overflow-x-auto overscroll-x-contain *:data-[slot=attachment]:flex-none *:data-[slot=attachment]:snap-start',
      className
    )}
    data-slot="attachment-group"
    {...props}
  />
)

export type {
  AttachmentActionProps,
  AttachmentActionsProps,
  AttachmentContentProps,
  AttachmentDescriptionProps,
  AttachmentGroupProps,
  AttachmentMediaProps,
  AttachmentProps,
  AttachmentTitleProps,
  AttachmentTriggerProps
}
export {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentTrigger,
  attachmentVariants
}
