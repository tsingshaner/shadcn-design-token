import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { tv, type VariantProps } from 'tailwind-variants'

import { cn } from '@/lib/utils'

const markerVariants = tv({
  base: 'cn-marker group/marker relative flex w-full items-center',
  variants: {
    variant: {
      border: 'cn-marker-variant-border',
      default: 'cn-marker-variant-default',
      separator: 'cn-marker-variant-separator'
    }
  }
})

type MarkerProps = useRender.ComponentProps<'div'> & VariantProps<typeof markerVariants>
type MarkerIconProps = React.ComponentProps<'span'>
type MarkerContentProps = React.ComponentProps<'span'>

const Marker = ({ className, render, variant = 'default', ...props }: MarkerProps) =>
  useRender({
    defaultTagName: 'div',
    props: mergeProps<'div'>(
      {
        className: cn(markerVariants({ variant }), className)
      },
      props
    ),
    render,
    state: {
      slot: 'marker',
      variant
    }
  })

const MarkerIcon = ({ className, ...props }: MarkerIconProps) => (
  <span aria-hidden="true" className={cn('cn-marker-icon shrink-0', className)} data-slot="marker-icon" {...props} />
)

const MarkerContent = ({ className, ...props }: MarkerContentProps) => (
  <span className={cn('cn-marker-content wrap-break-word min-w-0', className)} data-slot="marker-content" {...props} />
)

export type { MarkerContentProps, MarkerIconProps, MarkerProps }
export { Marker, MarkerContent, MarkerIcon, markerVariants }
