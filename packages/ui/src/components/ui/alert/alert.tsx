import { tv, type VariantProps } from 'tailwind-variants'

import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

const alertVariants = tv({
  base: 'cn-alert group/alert relative grid w-full grid-cols-[0_1fr] items-start gap-y-0.5 rounded-lg border px-4 py-3 text-sm has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] has-[>svg]:gap-x-3 [&>svg]:size-4 [&>svg]:translate-y-0.5',
  defaultVariants: {
    variant: 'default'
  },
  variants: {
    variant: {
      default: 'cn-alert-variant-default bg-card text-card-foreground',
      destructive:
        'cn-alert-variant-destructive border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-current'
    }
  }
})

type AlertProps = ComponentProps<'div'> & VariantProps<typeof alertVariants>
type AlertTitleProps = ComponentProps<'div'>
type AlertDescriptionProps = ComponentProps<'div'>
type AlertActionProps = ComponentProps<'div'>

const Alert = ({ className, variant, ...props }: AlertProps) => (
  <div className={cn(alertVariants({ variant }), className)} data-slot="alert" role="alert" {...props} />
)

const AlertTitle = ({ className, ...props }: AlertTitleProps) => (
  <div
    className={cn(
      'col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight [&_a:hover]:text-foreground [&_a]:underline [&_a]:underline-offset-3',
      'cn-alert-title',
      className
    )}
    data-slot="alert-title"
    {...props}
  />
)

const AlertDescription = ({ className, ...props }: AlertDescriptionProps) => (
  <div
    className={cn(
      'col-start-2 grid justify-items-start gap-1 text-muted-foreground text-sm [&_a:hover]:text-foreground [&_a]:underline [&_a]:underline-offset-3 [&_p]:leading-relaxed',
      'cn-alert-description',
      className
    )}
    data-slot="alert-description"
    {...props}
  />
)

const AlertAction = ({ className, ...props }: AlertActionProps) => (
  <div
    className={cn('cn-alert-action col-start-2 mt-2 flex items-center gap-2', className)}
    data-slot="alert-action"
    {...props}
  />
)

export type { AlertActionProps, AlertDescriptionProps, AlertProps, AlertTitleProps }
export { Alert, AlertAction, AlertDescription, AlertTitle, alertVariants }
