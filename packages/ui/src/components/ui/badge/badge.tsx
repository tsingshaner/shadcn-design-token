import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { tv, type VariantProps } from 'tailwind-variants'

import { cn } from '@/lib/utils'

const badgeVariants = tv({
  base: 'group/badge inline-flex w-fit shrink-0 items-center justify-center overflow-hidden rounded-md border px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3',
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

type BadgeProps = useRender.ComponentProps<'span'> & VariantProps<typeof badgeVariants>

const Badge = ({ className, render, variant = 'default', ...props }: BadgeProps) => {
  return useRender({
    defaultTagName: 'span',
    props: mergeProps<'span'>(
      {
        className: cn(badgeVariants({ variant }), className),
        'data-slot': 'badge'
      },
      props
    ),
    render,
    state: {
      slot: 'badge',
      variant
    }
  })
}

export type { BadgeProps }
export { Badge, badgeVariants }
