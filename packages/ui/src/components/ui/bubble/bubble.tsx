import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { type ClassValue, cn } from 'cn'

type BubbleVariantsProps = {
  variant?: 'default' | 'destructive' | 'ghost' | 'muted' | 'outline' | 'secondary' | 'tinted' | null
}

const bubbleVariants = ({
  variant = 'default',
  class: classValue,
  className
}: BubbleVariantsProps & { class?: ClassValue; className?: ClassValue } = {}) =>
  cn(
    'cn-bubble group/bubble relative flex w-fit min-w-0 flex-col',
    variant === 'default' && 'cn-bubble-variant-default',
    variant === 'destructive' && 'cn-bubble-variant-destructive',
    variant === 'ghost' && 'cn-bubble-variant-ghost',
    variant === 'muted' && 'cn-bubble-variant-muted',
    variant === 'outline' && 'cn-bubble-variant-outline',
    variant === 'secondary' && 'cn-bubble-variant-secondary',
    variant === 'tinted' && 'cn-bubble-variant-tinted',
    classValue,
    className
  )

type BubbleReactionsVariantsProps = {
  align?: 'end' | 'start' | null
  side?: 'bottom' | 'top' | null
}

const bubbleReactionsVariants = ({
  align = 'end',
  side = 'bottom',
  class: classValue,
  className
}: BubbleReactionsVariantsProps & { class?: ClassValue; className?: ClassValue } = {}) =>
  cn(
    'cn-bubble-reactions absolute z-10 flex w-fit items-center justify-center',
    align === 'end' && 'cn-bubble-reactions-align-end',
    align === 'start' && 'cn-bubble-reactions-align-start',
    side === 'bottom' && 'cn-bubble-reactions-side-bottom',
    side === 'top' && 'cn-bubble-reactions-side-top',
    classValue,
    className
  )

type BubbleGroupProps = React.ComponentProps<'div'>
type BubbleProps = React.ComponentProps<'div'> &
  BubbleVariantsProps & {
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
