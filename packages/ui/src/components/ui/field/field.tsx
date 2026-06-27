import type { ComponentProps } from 'react'

import { cn } from '../../../lib/utils'

type FieldProps = ComponentProps<'div'>
type FieldLabelProps = ComponentProps<'label'>
type FieldDescriptionProps = ComponentProps<'p'>
type FieldErrorProps = ComponentProps<'p'>
type FieldGroupProps = ComponentProps<'div'>
type FieldContentProps = ComponentProps<'div'>
type FieldSetProps = ComponentProps<'fieldset'>
type FieldLegendProps = ComponentProps<'legend'> & {
  variant?: 'default' | 'label'
}
type FieldTitleProps = ComponentProps<'div'>
type FieldSeparatorProps = ComponentProps<'div'>

const Field = ({ className, ...props }: FieldProps) => (
  <div className={cn('grid gap-2', className)} data-slot="field" {...props} />
)

const FieldGroup = ({ className, ...props }: FieldGroupProps) => (
  <div className={cn('grid gap-4', className)} data-slot="field-group" {...props} />
)

const FieldSet = ({ className, ...props }: FieldSetProps) => (
  <fieldset className={cn('grid gap-4', className)} data-slot="field-set" {...props} />
)

const FieldLegend = ({ className, variant = 'default', ...props }: FieldLegendProps) => (
  <legend
    className={cn(
      'font-medium text-foreground',
      variant === 'default' && 'mb-2 text-base',
      variant === 'label' && 'text-sm leading-none',
      className
    )}
    data-slot="field-legend"
    data-variant={variant}
    {...props}
  />
)

const FieldContent = ({ className, ...props }: FieldContentProps) => (
  <div className={cn('grid gap-1.5', className)} data-slot="field-content" {...props} />
)

const FieldLabel = ({ className, ...props }: FieldLabelProps) => (
  // biome-ignore lint/a11y/noLabelWithoutControl: consumers pass htmlFor or wrap the associated control.
  <label
    className={cn(
      'font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
      className
    )}
    data-slot="field-label"
    {...props}
  />
)

const FieldDescription = ({ className, ...props }: FieldDescriptionProps) => (
  <p className={cn('text-muted-foreground text-sm', className)} data-slot="field-description" {...props} />
)

const FieldTitle = ({ className, ...props }: FieldTitleProps) => (
  <div className={cn('font-medium text-sm leading-none', className)} data-slot="field-title" {...props} />
)

const FieldSeparator = ({ className, ...props }: FieldSeparatorProps) => (
  <div aria-hidden="true" className={cn('h-px w-full bg-border', className)} data-slot="field-separator" {...props} />
)

const FieldError = ({ className, ...props }: FieldErrorProps) => (
  <p
    className={cn('font-medium text-destructive text-sm', className)}
    data-slot="field-error"
    role="alert"
    {...props}
  />
)

export type {
  FieldContentProps,
  FieldDescriptionProps,
  FieldErrorProps,
  FieldGroupProps,
  FieldLabelProps,
  FieldLegendProps,
  FieldProps,
  FieldSeparatorProps,
  FieldSetProps,
  FieldTitleProps
}
export {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle
}
