import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { type ClassValue, cn } from 'cn'

type BadgeVariantsProps = {
  variant?: 'default' | 'destructive' | 'ghost' | 'link' | 'outline' | 'secondary' | null
}

const badgeVariants = ({
  variant = 'default',
  class: classValue,
  className
}: BadgeVariantsProps & { class?: ClassValue; className?: ClassValue } = {}) =>
  cn(
    'cn-badge group/badge inline-flex w-fit shrink-0 items-center justify-center overflow-hidden rounded-md border px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3',
    variant === 'default' && 'cn-badge-variant-default border-transparent bg-primary text-primary-foreground',
    variant === 'destructive' && 'cn-badge-variant-destructive border-transparent bg-destructive text-white',
    variant === 'ghost' && 'cn-badge-variant-ghost border-transparent bg-transparent text-foreground',
    variant === 'link' &&
      'cn-badge-variant-link border-transparent bg-transparent text-primary underline-offset-4 hover:underline',
    variant === 'outline' && 'cn-badge-variant-outline text-foreground',
    variant === 'secondary' && 'cn-badge-variant-secondary border-transparent bg-secondary text-secondary-foreground',
    classValue,
    className
  )

type BadgeProps = useRender.ComponentProps<'span'> & BadgeVariantsProps

const Badge = ({ className, render, variant = 'default', ...props }: BadgeProps) => {
  return useRender({
    defaultTagName: 'span',
    props: mergeProps<'span'>(
      {
        className: cn(badgeVariants({ variant }), className),
        ...({ 'data-slot': 'badge' } as Record<'data-slot', string>)
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
