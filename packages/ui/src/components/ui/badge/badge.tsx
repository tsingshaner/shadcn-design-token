import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { cn } from 'cn'

import { cva, type VariantProps } from '@/lib/cva'

type BadgeVariantsProps = VariantProps<typeof badgeVariants>

const badgeVariants = cva({
  base: 'group/badge inline-flex w-fit shrink-0 items-center justify-center overflow-hidden rounded-md border px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3',
  defaultVariants: {
    variant: 'primary'
  },
  variants: {
    variant: {
      destructive: 'border-transparent bg-destructive text-white',
      ghost: 'border-transparent bg-transparent text-foreground',
      link: 'border-transparent bg-transparent text-primary underline-offset-4 hover:underline',
      outline: 'text-foreground',
      primary: 'border-transparent bg-primary text-primary-foreground',
      secondary: 'border-transparent bg-secondary text-secondary-foreground'
    }
  }
})

type BadgeProps = useRender.ComponentProps<'span'> & BadgeVariantsProps

const Badge = ({ className, render, variant = 'primary', ...props }: BadgeProps) => {
  return useRender({
    defaultTagName: 'span',
    props: mergeProps<'span'>(
      {
        className: badgeVariants({ className, variant }),
        ...({ 'data-scope': 'badge', 'data-slot': 'root' } as Record<'data-scope' | 'data-slot', string>)
      },
      props
    ),
    render,
    state: {
      scope: 'badge',
      slot: 'root',
      variant
    }
  })
}

export type { BadgeProps }
export { Badge, badgeVariants }
