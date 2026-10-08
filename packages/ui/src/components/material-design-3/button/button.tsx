import { Button as ButtonPrimitive, type ButtonState } from '@base-ui/react/button'
import { cn } from 'cn'

import { cva, type VariantProps } from '@/lib/cva'

import { Ripple } from '../ripple'

type ButtonVariantsProps = VariantProps<typeof buttonVariants>

const buttonVariants = cva({
  base: "group/button relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap outline-none select-none transition-[background-color,box-shadow,color] after:pointer-events-none after:absolute after:inset-0 after:bg-current after:opacity-0 after:transition-opacity focus-visible:after:opacity-[0.1] disabled:pointer-events-none disabled:opacity-[0.38] disabled:after:hidden aria-invalid:ring-3 aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-[18px]",
  defaultVariants: {
    size: 'md',
    variant: 'primary'
  },
  variants: {
    size: {
      icon: 'size-10',
      'icon-lg': 'size-12',
      'icon-sm': 'size-9 in-[[data-scope=button-group][data-slot=root]]:rounded-full',
      'icon-xs':
        "size-8 in-[[data-scope=button-group][data-slot=root]]:rounded-full [&_svg:not([class*='size-'])]:size-4",
      lg: 'h-12 gap-2 px-8 has-data-[icon=inline-end]:pr-6 has-data-[icon=inline-start]:pl-6',
      md: 'h-10 gap-2 px-6 has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4',
      sm: "h-9 gap-2 px-5 text-[0.8rem] in-[[data-scope=button-group][data-slot=root]]:rounded-full has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3 [&_svg:not([class*='size-'])]:size-4",
      xs: "h-8 gap-1.5 px-4 text-xs in-[[data-scope=button-group][data-slot=root]]:rounded-full has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3 [&_svg:not([class*='size-'])]:size-4"
    },
    variant: {
      destructive: 'bg-destructive text-white focus-visible:ring-destructive/20',
      ghost: 'text-primary aria-expanded:bg-primary/10',
      link: 'text-primary underline-offset-4 hover:underline',
      outline: 'border-muted-foreground bg-transparent text-primary aria-expanded:bg-primary/10',
      primary: 'bg-primary text-primary-foreground shadow-sm',
      secondary: 'bg-secondary text-secondary-foreground shadow-sm aria-expanded:bg-secondary'
    }
  }
})

type ButtonProps = ButtonPrimitive.Props & ButtonVariantsProps

const Button = ({ children, className, variant = 'primary', size = 'md', ...props }: ButtonProps) => {
  const classNameValue =
    typeof className === 'function'
      ? (state: ButtonState) => buttonVariants({ className: className(state), size, variant })
      : buttonVariants({ className, size, variant })

  return (
    <ButtonPrimitive
      className={classNameValue}
      data-scope="button"
      data-size={size}
      data-slot="root"
      data-variant={variant}
      {...props}
    >
      {children}
      <Ripple />
    </ButtonPrimitive>
  )
}

export type { ButtonProps }
export { Button, buttonVariants }
