import { Button as ButtonPrimitive } from '@base-ui/react/button'
import { tv, type VariantProps } from 'tailwind-variants'

import { cn } from '@/lib/utils'

import { Ripple } from '../ripple'

const buttonVariants = tv({
  base: "cn-button group/button relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap outline-none select-none transition-[background-color,box-shadow,color] after:pointer-events-none after:absolute after:inset-0 after:bg-current after:opacity-0 after:transition-opacity focus-visible:after:opacity-[0.1] disabled:pointer-events-none disabled:opacity-[0.38] disabled:after:hidden aria-invalid:ring-3 aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-[18px]",
  defaultVariants: {
    size: 'default',
    variant: 'default'
  },
  variants: {
    size: {
      default:
        'cn-button-size-default h-10 gap-2 px-6 has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4',
      icon: 'cn-button-size-icon size-10',
      'icon-lg': 'cn-button-size-icon-lg size-12',
      'icon-sm': 'cn-button-size-icon-sm size-9 in-data-[slot=button-group]:rounded-full',
      'icon-xs':
        "cn-button-size-icon-xs size-8 in-data-[slot=button-group]:rounded-full [&_svg:not([class*='size-'])]:size-4",
      lg: 'cn-button-size-lg h-12 gap-2 px-8 has-data-[icon=inline-end]:pr-6 has-data-[icon=inline-start]:pl-6',
      sm: "cn-button-size-sm h-9 gap-2 px-5 text-[0.8rem] in-data-[slot=button-group]:rounded-full has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3 [&_svg:not([class*='size-'])]:size-4",
      xs: "cn-button-size-xs h-8 gap-1.5 px-4 text-xs in-data-[slot=button-group]:rounded-full has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3 [&_svg:not([class*='size-'])]:size-4"
    },
    variant: {
      default: 'cn-button-variant-default bg-primary text-primary-foreground shadow-sm',
      destructive: 'cn-button-variant-destructive bg-destructive text-white focus-visible:ring-destructive/20',
      ghost: 'cn-button-variant-ghost text-primary aria-expanded:bg-primary/10',
      link: 'cn-button-variant-link text-primary underline-offset-4 hover:underline',
      outline:
        'cn-button-variant-outline border-muted-foreground bg-transparent text-primary aria-expanded:bg-primary/10',
      secondary:
        'cn-button-variant-secondary bg-secondary text-secondary-foreground shadow-sm aria-expanded:bg-secondary'
    }
  }
})

const Button = ({
  children,
  className,
  variant = 'default',
  size = 'default',
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) => {
  const resolvedClassName = buttonVariants({ size, variant })

  return (
    <ButtonPrimitive
      className={
        typeof className === 'function'
          ? (state) => cn(resolvedClassName, className(state))
          : cn(resolvedClassName, className)
      }
      data-slot="button"
      {...props}
    >
      {children}
      <Ripple />
    </ButtonPrimitive>
  )
}

export type { ButtonProps } from '@base-ui/react'

export { Button, buttonVariants }
