import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { tv, type VariantProps } from 'tailwind-variants'

import { cn } from '@/lib/utils'

const bubbleVariants = tv({
  base: 'cn-bubble group/bubble relative flex w-fit min-w-0 flex-col',
  defaultVariants: {
    variant: 'default'
  },
  variants: {
    variant: {
      default: 'cn-bubble-variant-default',
      destructive: 'cn-bubble-variant-destructive',
      ghost: 'cn-bubble-variant-ghost',
      muted: 'cn-bubble-variant-muted',
      outline: 'cn-bubble-variant-outline',
      secondary: 'cn-bubble-variant-secondary',
      tinted: 'cn-bubble-variant-tinted'
    }
  }
})

const bubbleReactionsVariants = tv({
  base: 'cn-bubble-reactions absolute z-10 flex w-fit items-center justify-center',
  defaultVariants: {
    align: 'end',
    side: 'bottom'
  },
  variants: {
    align: {
      end: 'cn-bubble-reactions-align-end',
      start: 'cn-bubble-reactions-align-start'
    },
    side: {
      bottom: 'cn-bubble-reactions-side-bottom',
      top: 'cn-bubble-reactions-side-top'
    }
  }
})

type BubbleGroupProps = React.ComponentProps<'div'>
type BubbleProps = React.ComponentProps<'div'> &
  VariantProps<typeof bubbleVariants> & {
    align?: 'end' | 'start'
  }
type BubbleContentProps = useRender.ComponentProps<'div'>
type BubbleReactionsProps = React.ComponentProps<'div'> & {
  align?: 'end' | 'start'
  side?: 'bottom' | 'top'
}

const BubbleGroup = ({ className, ...props }: BubbleGroupProps) => (
  <div className={cn('cn-bubble-group flex min-w-0 flex-col', className)} data-slot="bubble-group" {...props} />
)

const Bubble = ({ align = 'start', className, variant = 'default', ...props }: BubbleProps) => (
  <div
    className={cn(bubbleVariants({ variant }), className)}
    data-align={align}
    data-slot="bubble"
    data-variant={variant}
    {...props}
  />
)

const BubbleContent = ({ className, render, ...props }: BubbleContentProps) =>
  useRender({
    defaultTagName: 'div',
    props: mergeProps<'div'>(
      {
        className: cn(
          'cn-bubble-content w-fit max-w-full min-w-0 overflow-hidden wrap-break-word [button]:text-left [button,a]:transition-colors',
          className
        )
      },
      props
    ),
    render,
    state: {
      slot: 'bubble-content'
    }
  })

const BubbleReactions = ({ align = 'end', className, side = 'bottom', ...props }: BubbleReactionsProps) => (
  <div
    className={cn(bubbleReactionsVariants({ align, side }), className)}
    data-align={align}
    data-side={side}
    data-slot="bubble-reactions"
    {...props}
  />
)

export type { BubbleContentProps, BubbleGroupProps, BubbleProps, BubbleReactionsProps }
export { Bubble, BubbleContent, BubbleGroup, BubbleReactions, bubbleReactionsVariants, bubbleVariants }
