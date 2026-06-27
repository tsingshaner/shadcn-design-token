import { type ComponentProps, cloneElement, isValidElement, type ReactElement } from 'react'
import { tv, type VariantProps } from 'tailwind-variants/lite'

import { cn } from '../../../lib/utils'

const badgeVariants = tv({
  base: 'inline-flex w-fit shrink-0 items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 [&>svg]:pointer-events-none [&>svg]:size-3',
  defaultVariants: {
    variant: 'default'
  },
  variants: {
    variant: {
      default: 'border-transparent bg-primary text-primary-foreground',
      destructive: 'border-transparent bg-destructive text-white',
      ghost: 'border-transparent bg-transparent text-foreground',
      link: 'border-transparent bg-transparent text-primary underline-offset-4 hover:underline',
      outline: 'text-foreground',
      secondary: 'border-transparent bg-secondary text-secondary-foreground'
    }
  }
})

type BadgeProps = ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & {
    render?: ReactElement<{ className?: string; 'data-slot'?: string }>
  }

const Badge = ({ className, render, variant, ...props }: BadgeProps) => {
  const badgeClassName = cn(badgeVariants({ variant }), render?.props.className, className)

  if (isValidElement(render)) {
    return cloneElement(render, {
      ...props,
      className: badgeClassName,
      'data-slot': 'badge'
    })
  }

  return <span className={badgeClassName} data-slot="badge" {...props} />
}

export type { BadgeProps }
export { Badge, badgeVariants }
