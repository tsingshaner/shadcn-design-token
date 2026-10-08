import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { type ClassValue, cn } from 'cn'

type MarkerVariantsProps = {
  variant?: 'border' | 'default' | 'separator' | null
}

const markerVariants = ({
  variant = undefined,
  class: classValue,
  className
}: MarkerVariantsProps & { class?: ClassValue; className?: ClassValue } = {}) =>
  cn(
    'cn-marker group/marker relative flex w-full items-center',
    variant === 'border' && 'cn-marker-variant-border',
    variant === 'default' && 'cn-marker-variant-default',
    variant === 'separator' && 'cn-marker-variant-separator',
    classValue,
    className
  )

type MarkerProps = useRender.ComponentProps<'div'> & MarkerVariantsProps
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
