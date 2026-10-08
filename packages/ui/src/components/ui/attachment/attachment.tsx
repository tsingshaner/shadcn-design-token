import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { cn } from 'cn'

import { cva, type VariantProps } from '@/lib/cva'

import { Button } from '../button'

type AttachmentVariantsProps = VariantProps<typeof attachmentVariants>

const attachmentVariants = cva({
  base: 'group/attachment relative flex max-w-full min-w-0 shrink-0 flex-wrap border bg-card text-card-foreground transition-colors has-[>a,>button]:hover:bg-muted/50 data-[state=error]:border-destructive/30 data-[state=idle]:border-dashed',
  variants: {
    orientation: {
      horizontal: 'items-center',
      vertical: 'flex-col'
    },
    size: {
      md: '',
      sm: '',
      xs: ''
    }
  }
})

type AttachmentMediaVariantsProps = VariantProps<typeof attachmentMediaVariants>

const attachmentMediaVariants = cva({
  base: 'relative flex aspect-square shrink-0 items-center justify-center overflow-hidden group-data-[state=error]/attachment:bg-destructive/10 group-data-[state=error]/attachment:text-destructive [&_svg]:pointer-events-none',
  defaultVariants: {
    variant: 'icon'
  },
  variants: {
    variant: {
      icon: '',
      image: '*:[img]:aspect-square *:[img]:w-full *:[img]:object-cover'
    }
  }
})

type AttachmentProps = React.ComponentProps<'div'> &
  AttachmentVariantsProps & {
    state?: 'done' | 'error' | 'idle' | 'processing' | 'uploading'
  }
type AttachmentMediaProps = React.ComponentProps<'div'> & AttachmentMediaVariantsProps
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
  size = 'md',
  state = 'done',
  ...props
}: AttachmentProps) => (
  <div
    className={attachmentVariants({ className, orientation, size })}
    data-orientation={orientation}
    data-scope="attachment"
    data-size={size}
    data-slot="root"
    data-state={state}
    {...props}
  />
)

const AttachmentMedia = ({ className, variant = 'icon', ...props }: AttachmentMediaProps) => (
  <div
    className={cn(attachmentMediaVariants({ variant }), className)}
    data-scope="attachment"
    data-slot="media"
    data-variant={variant}
    {...props}
  />
)

const AttachmentContent = ({ className, ...props }: AttachmentContentProps) => (
  <div className={cn('min-w-0 max-w-full flex-1', className)} data-scope="attachment" data-slot="content" {...props} />
)

const AttachmentTitle = ({ className, ...props }: AttachmentTitleProps) => (
  <span
    className={cn(
      'group-data-[state=processing]/attachment:shimmer group-data-[state=uploading]/attachment:shimmer block min-w-0 max-w-full truncate',
      className
    )}
    data-scope="attachment"
    data-slot="title"
    {...props}
  />
)

const AttachmentDescription = ({ className, ...props }: AttachmentDescriptionProps) => (
  <span
    className={cn(
      'block min-w-0 max-w-full truncate text-muted-foreground group-data-[state=error]/attachment:text-destructive/80',
      className
    )}
    data-scope="attachment"
    data-slot="description"
    {...props}
  />
)

const AttachmentActions = ({ className, ...props }: AttachmentActionsProps) => (
  <div className={cn('flex shrink-0 items-center', className)} data-scope="attachment" data-slot="actions" {...props} />
)

const AttachmentAction = ({ className, size = 'icon-xs', variant = 'ghost', ...props }: AttachmentActionProps) => (
  <Button className={className} data-scope="attachment" data-slot="action" size={size} variant={variant} {...props} />
)

const AttachmentTrigger = ({ className, render, type, ...props }: AttachmentTriggerProps) =>
  useRender({
    defaultTagName: 'button',
    props: mergeProps<'button'>(
      {
        className: cn('absolute inset-0 z-10 outline-none', className),
        type: render ? type : (type ?? 'button')
      },
      props
    ),
    render,
    state: {
      scope: 'attachment',
      slot: 'trigger'
    }
  })

const AttachmentGroup = ({ className, ...props }: AttachmentGroupProps) => (
  <div
    className={cn(
      'scroll-fade-x scrollbar-none flex min-w-0 snap-x snap-mandatory overflow-x-auto overscroll-x-contain *:data-[scope=attachment]:data-[slot=root]:flex-none *:data-[scope=attachment]:data-[slot=root]:snap-start',
      className
    )}
    data-scope="attachment"
    data-slot="group"
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
