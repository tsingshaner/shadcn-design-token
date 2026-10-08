import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { cn } from 'cn'

import type { ComponentProps } from 'react'

import { cva, type VariantProps } from '@/lib/cva'

import { Separator } from '../separator'

type ButtonGroupVariantsProps = VariantProps<typeof buttonGroupVariants>

const buttonGroupVariants = cva({
  base: "flex w-fit items-stretch *:focus-visible:relative *:focus-visible:z-10 [&>[data-scope=select][data-slot=trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1",
  defaultVariants: {
    orientation: 'horizontal'
  },
  variants: {
    orientation: {
      horizontal:
        '*:data-slot:rounded-r-none [&>[data-slot]~[data-slot]]:rounded-l-none [&>[data-slot]~[data-slot]]:border-l-0 inline-flex rounded-lg shadow-xs **:data-[scope=button]:data-[slot=root]:rounded-none [&_[data-scope=button][data-slot=root]:first-child]:rounded-l-lg [&_[data-scope=button][data-slot=root]:last-child]:rounded-r-lg [&_[data-scope=button][data-slot=root]:not(:first-child)]:-ml-px',
      vertical:
        'flex-col *:data-slot:rounded-b-none [&>[data-slot]~[data-slot]]:rounded-t-none [&>[data-slot]~[data-slot]]:border-t-0 rounded-lg shadow-xs **:data-[scope=button]:data-[slot=root]:rounded-none [&_[data-scope=button][data-slot=root]:first-child]:rounded-t-lg [&_[data-scope=button][data-slot=root]:first-child]:rounded-l-none [&_[data-scope=button][data-slot=root]:last-child]:rounded-r-none [&_[data-scope=button][data-slot=root]:last-child]:rounded-b-lg [&_[data-scope=button][data-slot=root]:not(:first-child)]:-mt-px [&_[data-scope=button][data-slot=root]:not(:first-child)]:ml-0'
    }
  }
})

type ButtonGroupProps = ComponentProps<'div'> & ButtonGroupVariantsProps
type ButtonGroupTextProps = useRender.ComponentProps<'div'>
type ButtonGroupSeparatorProps = ComponentProps<typeof Separator>

const ButtonGroup = ({ className, orientation = 'horizontal', ...props }: ButtonGroupProps) => (
  <div
    className={buttonGroupVariants({ className, orientation })}
    data-orientation={orientation}
    data-scope="button-group"
    data-slot="root"
    {...props}
  />
)

const ButtonGroupText = ({ className, render, ...props }: ButtonGroupTextProps) =>
  useRender({
    defaultTagName: 'div',
    props: mergeProps<'div'>(
      {
        className: cn('flex items-center [&_svg]:pointer-events-none', className),
        ...({ 'data-scope': 'button-group', 'data-slot': 'text' } as Record<'data-scope' | 'data-slot', string>)
      },
      props
    ),
    render,
    state: {
      scope: 'button-group',
      slot: 'text'
    }
  })

const ButtonGroupSeparator = ({ className, orientation = 'vertical', ...props }: ButtonGroupSeparatorProps) => (
  <Separator
    className={cn(
      'relative self-stretch data-horizontal:mx-px data-vertical:my-px data-vertical:h-auto data-horizontal:w-auto',
      className
    )}
    data-scope="button-group"
    data-slot="separator"
    orientation={orientation}
    {...props}
  />
)

export type { ButtonGroupProps, ButtonGroupSeparatorProps, ButtonGroupTextProps }
export { ButtonGroup, ButtonGroupSeparator, ButtonGroupText, buttonGroupVariants }
