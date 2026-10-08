import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { type ClassValue, cn } from 'cn'

import type { ComponentProps } from 'react'

import { Separator } from '../separator'

type ButtonGroupVariantsProps = {
  orientation?: 'horizontal' | 'vertical' | null
}

const buttonGroupVariants = ({
  orientation = 'horizontal',
  class: classValue,
  className
}: ButtonGroupVariantsProps & { class?: ClassValue; className?: ClassValue } = {}) =>
  cn(
    "cn-button-group flex w-fit items-stretch *:focus-visible:relative *:focus-visible:z-10 [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1",
    orientation === 'horizontal' &&
      'cn-button-group-orientation-horizontal *:data-slot:rounded-r-none [&>[data-slot]~[data-slot]]:rounded-l-none [&>[data-slot]~[data-slot]]:border-l-0 inline-flex rounded-lg shadow-xs **:data-[slot=button]:rounded-none [&_[data-slot=button]:first-child]:rounded-l-lg [&_[data-slot=button]:last-child]:rounded-r-lg [&_[data-slot=button]:not(:first-child)]:-ml-px',
    orientation === 'vertical' &&
      'cn-button-group-orientation-vertical flex-col *:data-slot:rounded-b-none [&>[data-slot]~[data-slot]]:rounded-t-none [&>[data-slot]~[data-slot]]:border-t-0 rounded-lg shadow-xs **:data-[slot=button]:rounded-none [&_[data-slot=button]:first-child]:rounded-t-lg [&_[data-slot=button]:first-child]:rounded-l-none [&_[data-slot=button]:last-child]:rounded-r-none [&_[data-slot=button]:last-child]:rounded-b-lg [&_[data-slot=button]:not(:first-child)]:-mt-px [&_[data-slot=button]:not(:first-child)]:ml-0',
    classValue,
    className
  )

type ButtonGroupProps = ComponentProps<'div'> & ButtonGroupVariantsProps
type ButtonGroupTextProps = useRender.ComponentProps<'div'>
type ButtonGroupSeparatorProps = ComponentProps<typeof Separator>

const ButtonGroup = ({ className, orientation = 'horizontal', ...props }: ButtonGroupProps) => (
  <div
    className={cn(buttonGroupVariants({ orientation }), className)}
    data-orientation={orientation}
    data-slot="button-group"
    {...props}
  />
)

const ButtonGroupText = ({ className, render, ...props }: ButtonGroupTextProps) =>
  useRender({
    defaultTagName: 'div',
    props: mergeProps<'div'>(
      {
        className: cn('cn-button-group-text flex items-center [&_svg]:pointer-events-none', className),
        ...({ 'data-slot': 'button-group-text' } as Record<'data-slot', string>)
      },
      props
    ),
    render,
    state: {
      slot: 'button-group-text'
    }
  })

const ButtonGroupSeparator = ({ className, orientation = 'vertical', ...props }: ButtonGroupSeparatorProps) => (
  <Separator
    className={cn(
      'cn-button-group-separator relative self-stretch data-horizontal:mx-px data-vertical:my-px data-vertical:h-auto data-horizontal:w-auto',
      className
    )}
    data-slot="button-group-separator"
    orientation={orientation}
    {...props}
  />
)

export type { ButtonGroupProps, ButtonGroupSeparatorProps, ButtonGroupTextProps }
export { ButtonGroup, ButtonGroupSeparator, ButtonGroupText, buttonGroupVariants }
