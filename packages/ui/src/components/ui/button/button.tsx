import { Button as BaseButton, type ButtonProps as BaseButtonProps } from '@base-ui/react/button'
import { tv, type VariantProps } from 'tailwind-variants/lite'

import { cn } from '@/lib/utils'

export const buttonVariants = tv({
  base: 'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50',
  defaultVariants: {
    size: 'default',
    variant: 'default'
  },
  variants: {
    size: {
      default: 'h-10 px-4 py-2',
      icon: 'size-10',
      lg: 'h-11 rounded-md px-8',
      sm: 'h-9 rounded-md px-3'
    },
    variant: {
      default: 'bg-primary text-primary-foreground hover:bg-primary/90',
      destructive: 'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20',
      ghost: 'hover:bg-accent hover:text-accent-foreground',
      link: 'text-primary underline-offset-4 hover:underline',
      outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
    }
  }
})

export type ButtonProps = Omit<BaseButtonProps, 'className'> &
  VariantProps<typeof buttonVariants> & {
    className?: string
  }

export const Button = ({ children, className, size, variant, ...props }: ButtonProps) => {
  const buttonClassName = cn(buttonVariants({ className, size, variant }))

  return (
    <BaseButton className={buttonClassName} data-slot="button" {...props}>
      {children}
    </BaseButton>
  )
}
