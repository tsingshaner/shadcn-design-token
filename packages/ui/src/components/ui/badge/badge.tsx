import { tv, type VariantProps } from 'tailwind-variants/lite'

import type { ComponentProps } from 'react'

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
      outline: 'text-foreground',
      secondary: 'border-transparent bg-secondary text-secondary-foreground'
    }
  }
})

type BadgeProps = ComponentProps<'span'> & VariantProps<typeof badgeVariants>

const Badge = ({ className, variant, ...props }: BadgeProps) => (
  <span className={cn(badgeVariants({ variant }), className)} data-slot="badge" {...props} />
)

export type { BadgeProps }
export { Badge, badgeVariants }
