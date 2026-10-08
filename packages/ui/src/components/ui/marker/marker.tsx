import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { cn } from 'cn'

import { cva, type VariantProps } from '@/lib/cva'

type MarkerVariantsProps = VariantProps<typeof markerVariants>

const markerVariants = cva({
  base: 'group/marker relative flex w-full items-center',
  variants: {
    variant: {
      border: '',
      default: '',
      separator: ''
    }
  }
})

type MarkerProps = useRender.ComponentProps<'div'> & MarkerVariantsProps
type MarkerIconProps = React.ComponentProps<'span'>
type MarkerContentProps = React.ComponentProps<'span'>

const Marker = ({ className, render, variant = 'default', ...props }: MarkerProps) =>
  useRender({
    defaultTagName: 'div',
    props: mergeProps<'div'>(
      {
        className: markerVariants({ className, variant })
      },
      props
    ),
    render,
    state: {
      scope: 'marker',
      slot: 'root',
      variant
    }
  })

const MarkerIcon = ({ className, ...props }: MarkerIconProps) => (
  <span aria-hidden="true" className={cn('shrink-0', className)} data-scope="marker" data-slot="icon" {...props} />
)

const MarkerContent = ({ className, ...props }: MarkerContentProps) => (
  <span className={cn('wrap-break-word min-w-0', className)} data-scope="marker" data-slot="content" {...props} />
)

export type { MarkerContentProps, MarkerIconProps, MarkerProps }
export { Marker, MarkerContent, MarkerIcon, markerVariants }
