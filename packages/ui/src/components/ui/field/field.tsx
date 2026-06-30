import { type ComponentProps, type ReactNode, useMemo } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

import { cn } from '@/lib/utils'

import { Label, type LabelProps } from '../label'
import { Separator } from '../separator'

const fieldVariants = tv({
  base: 'cn-field group/field flex w-full',
  defaultVariants: {
    orientation: 'vertical'
  },
  variants: {
    orientation: {
      horizontal:
        'cn-field-orientation-horizontal flex-row items-center has-[>[data-slot=field-content]]:items-start *:data-[slot=field-label]:flex-auto has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px',
      responsive:
        'cn-field-orientation-responsive flex-col *:w-full @md/field-group:flex-row @md/field-group:items-center @md/field-group:*:w-auto @md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:*:data-[slot=field-label]:flex-auto [&>.sr-only]:w-auto @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px',
      vertical: 'cn-field-orientation-vertical flex-col *:w-full [&>.sr-only]:w-auto'
    }
  }
})

type FieldProps = ComponentProps<'div'> & VariantProps<typeof fieldVariants>
type FieldLabelProps = LabelProps
type FieldDescriptionProps = ComponentProps<'p'>
type FieldErrorProps = ComponentProps<'div'> & {
  errors?: Array<{ message?: string } | undefined>
}
type FieldGroupProps = ComponentProps<'div'>
type FieldContentProps = ComponentProps<'div'>
type FieldSetProps = ComponentProps<'fieldset'>
type FieldLegendProps = ComponentProps<'legend'> & {
  variant?: 'label' | 'legend'
}
type FieldTitleProps = ComponentProps<'div'>
type FieldSeparatorProps = ComponentProps<'div'> & {
  children?: ReactNode
}

const Field = ({ className, orientation = 'vertical', ...props }: FieldProps) => (
  // biome-ignore lint/a11y/useSemanticElements: shadcn v4 uses role="group" for field layout without fieldset semantics.
  <div
    className={cn(fieldVariants({ orientation }), className)}
    data-orientation={orientation}
    data-slot="field"
    role="group"
    {...props}
  />
)

const FieldGroup = ({ className, ...props }: FieldGroupProps) => (
  <div
    className={cn('cn-field-group group/field-group @container/field-group flex w-full flex-col gap-4', className)}
    data-slot="field-group"
    {...props}
  />
)

const FieldSet = ({ className, ...props }: FieldSetProps) => (
  <fieldset className={cn('cn-field-set flex flex-col gap-4', className)} data-slot="field-set" {...props} />
)

const FieldLegend = ({ className, variant = 'legend', ...props }: FieldLegendProps) => (
  <legend
    className={cn(
      'font-medium text-foreground',
      'cn-field-legend',
      variant === 'legend' && 'mb-2 text-base',
      variant === 'label' && 'text-sm leading-none',
      className
    )}
    data-slot="field-legend"
    data-variant={variant}
    {...props}
  />
)

const FieldContent = ({ className, ...props }: FieldContentProps) => (
  <div
    className={cn('cn-field-content group/field-content flex flex-1 flex-col gap-1.5 leading-snug', className)}
    data-slot="field-content"
    {...props}
  />
)

const FieldLabel = ({ className, ...props }: FieldLabelProps) => (
  <Label
    className={cn(
      'group/field-label peer/field-label flex w-fit has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col',
      'cn-field-label',
      className
    )}
    data-slot="field-label"
    {...props}
  />
)

const FieldDescription = ({ className, ...props }: FieldDescriptionProps) => (
  <p
    className={cn(
      'nth-last-2:-mt-1 font-normal text-muted-foreground text-sm leading-normal last:mt-0 group-has-data-[orientation=horizontal]/field:text-balance [&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4',
      'cn-field-description',
      className
    )}
    data-slot="field-description"
    {...props}
  />
)

const FieldTitle = ({ className, ...props }: FieldTitleProps) => (
  <div
    className={cn('cn-field-title flex w-fit items-center font-medium text-sm leading-none', className)}
    data-slot="field-title"
    {...props}
  />
)

const FieldSeparator = ({ children, className, ...props }: FieldSeparatorProps) => (
  <div
    className={cn('cn-field-separator relative flex h-5 items-center', className)}
    data-content={!!children}
    data-slot="field-separator"
    {...props}
  >
    <Separator className="absolute inset-x-0 top-1/2" />
    {children && (
      <span
        className="cn-field-separator-content relative mx-auto block w-fit bg-background px-2 text-muted-foreground text-sm"
        data-slot="field-separator-content"
      >
        {children}
      </span>
    )}
  </div>
)

const FieldError = ({ children, className, errors, ...props }: FieldErrorProps) => {
  const content = useMemo(() => {
    if (children) {
      return children
    }

    if (!errors || errors.length === 0) {
      return null
    }

    const uniqueErrorMessages = [...new Set(errors.map((error) => error?.message).filter((message) => message))]

    if (uniqueErrorMessages.length === 1) {
      return uniqueErrorMessages[0]
    }

    return (
      <ul className="ml-4 flex list-disc flex-col gap-1">
        {uniqueErrorMessages.map((message) => (
          <li key={message}>{message}</li>
        ))}
      </ul>
    )
  }, [children, errors])

  if (!content) {
    return null
  }

  return (
    <div
      className={cn('cn-field-error font-normal text-destructive text-sm', className)}
      data-slot="field-error"
      role="alert"
      {...props}
    >
      {content}
    </div>
  )
}

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
