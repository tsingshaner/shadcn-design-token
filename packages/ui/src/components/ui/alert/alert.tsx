import { type ClassValue, cn } from 'cn'

import type { ComponentProps } from 'react'

type AlertVariantsProps = {
  variant?: 'default' | 'destructive' | null
}

const alertVariants = ({
  variant = 'default',
  class: classValue,
  className
}: AlertVariantsProps & { class?: ClassValue; className?: ClassValue } = {}) =>
  cn(
    'cn-alert group/alert relative grid w-full grid-cols-[0_1fr] items-start gap-y-0.5 rounded-lg border px-4 py-3 text-sm has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] has-[>svg]:gap-x-3 [&>svg]:size-4 [&>svg]:translate-y-0.5',
    variant === 'default' && 'cn-alert-variant-default bg-card text-card-foreground',
    variant === 'destructive' &&
      'cn-alert-variant-destructive border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-current',
    classValue,
    className
  )

type AlertProps = ComponentProps<'div'> & AlertVariantsProps
type AlertTitleProps = ComponentProps<'div'>
type AlertDescriptionProps = ComponentProps<'div'>
type AlertActionProps = ComponentProps<'div'>

const Alert = ({ className, variant, ...props }: AlertProps) => (
  <div className={alertVariants({ className, variant })} data-slot="alert" role="alert" {...props} />
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
