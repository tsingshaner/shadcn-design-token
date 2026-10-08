import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { cn } from 'cn'

import { cva, type VariantProps } from '@/lib/cva'

type BubbleVariantsProps = VariantProps<typeof bubbleVariants>

const bubbleVariants = cva({
  base: 'group/bubble relative flex w-fit min-w-0 flex-col',
  defaultVariants: {
    variant: 'default'
  },
  variants: {
    variant: {
      default: '',
      destructive: '',
      ghost: '',
      muted: '',
      outline: '',
      secondary: '',
      tinted: ''
    }
  }
})

type BubbleReactionsVariantsProps = VariantProps<typeof bubbleReactionsVariants>

const bubbleReactionsVariants = cva({
  base: 'absolute z-10 flex w-fit items-center justify-center',
  defaultVariants: {
    align: 'end',
    side: 'bottom'
  },
  variants: {
    align: {
      end: '',
      start: ''
    },
    side: {
      bottom: '',
      top: ''
    }
  }
})

type BubbleGroupProps = React.ComponentProps<'div'>
type BubbleProps = React.ComponentProps<'div'> &
  BubbleVariantsProps & {
    align?: 'end' | 'start'
  }
type BubbleContentProps = useRender.ComponentProps<'div'>
type BubbleReactionsProps = React.ComponentProps<'div'> & BubbleReactionsVariantsProps

const BubbleGroup = ({ className, ...props }: BubbleGroupProps) => (
  <div className={cn('flex min-w-0 flex-col', className)} data-scope="bubble" data-slot="group" {...props} />
)

const Bubble = ({ align = 'start', className, variant = 'default', ...props }: BubbleProps) => (
  <div
    className={bubbleVariants({ className, variant })}
    data-align={align}
    data-scope="bubble"
    data-slot="root"
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
          'w-fit max-w-full min-w-0 overflow-hidden wrap-break-word [button]:text-left [button,a]:transition-colors',
          className
        )
      },
      props
    ),
    render,
    state: {
      scope: 'bubble',
      slot: 'content'
    }
  })

const BubbleReactions = ({ align = 'end', className, side = 'bottom', ...props }: BubbleReactionsProps) => (
  <div
    className={bubbleReactionsVariants({ align, className, side })}
    data-align={align}
    data-scope="bubble"
    data-side={side}
    data-slot="reactions"
    {...props}
  />
)

export type { BubbleContentProps, BubbleGroupProps, BubbleProps, BubbleReactionsProps }
export { Bubble, BubbleContent, BubbleGroup, BubbleReactions, bubbleReactionsVariants, bubbleVariants }
