import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

type TypographyH1Props = ComponentProps<'h1'>
type TypographyH2Props = ComponentProps<'h2'>
type TypographyH3Props = ComponentProps<'h3'>
type TypographyH4Props = ComponentProps<'h4'>
type TypographyPProps = ComponentProps<'p'>
type TypographyBlockquoteProps = ComponentProps<'blockquote'>
type TypographyListProps = ComponentProps<'ul'>
type TypographyInlineCodeProps = ComponentProps<'code'>
type TypographyLeadProps = ComponentProps<'p'>
type TypographyLargeProps = ComponentProps<'div'>
type TypographySmallProps = ComponentProps<'small'>
type TypographyMutedProps = ComponentProps<'p'>

const TypographyH1 = ({ className, ...props }: TypographyH1Props) => (
  <h1
    className={cn('scroll-m-20 font-extrabold text-4xl tracking-tight lg:text-5xl', className)}
    data-slot="typography-h1"
    {...props}
  />
)

const TypographyH2 = ({ className, ...props }: TypographyH2Props) => (
  <h2
    className={cn('scroll-m-20 border-b pb-2 font-semibold text-3xl tracking-tight first:mt-0', className)}
    data-slot="typography-h2"
    {...props}
  />
)

const TypographyH3 = ({ className, ...props }: TypographyH3Props) => (
  <h3
    className={cn('scroll-m-20 font-semibold text-2xl tracking-tight', className)}
    data-slot="typography-h3"
    {...props}
  />
)

const TypographyH4 = ({ className, ...props }: TypographyH4Props) => (
  <h4
    className={cn('scroll-m-20 font-semibold text-xl tracking-tight', className)}
    data-slot="typography-h4"
    {...props}
  />
)

const TypographyP = ({ className, ...props }: TypographyPProps) => (
  <p className={cn('leading-7 [&:not(:first-child)]:mt-6', className)} data-slot="typography-p" {...props} />
)

const TypographyBlockquote = ({ className, ...props }: TypographyBlockquoteProps) => (
  <blockquote className={cn('mt-6 border-l-2 pl-6 italic', className)} data-slot="typography-blockquote" {...props} />
)

const TypographyList = ({ className, ...props }: TypographyListProps) => (
  <ul className={cn('my-6 ml-6 list-disc [&>li]:mt-2', className)} data-slot="typography-list" {...props} />
)

const TypographyInlineCode = ({ className, ...props }: TypographyInlineCodeProps) => (
  <code
    className={cn('relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm', className)}
    data-slot="typography-inline-code"
    {...props}
  />
)

const TypographyLead = ({ className, ...props }: TypographyLeadProps) => (
  <p className={cn('text-muted-foreground text-xl', className)} data-slot="typography-lead" {...props} />
)

const TypographyLarge = ({ className, ...props }: TypographyLargeProps) => (
  <div className={cn('font-semibold text-lg', className)} data-slot="typography-large" {...props} />
)

const TypographySmall = ({ className, ...props }: TypographySmallProps) => (
  <small className={cn('font-medium text-sm leading-none', className)} data-slot="typography-small" {...props} />
)

const TypographyMuted = ({ className, ...props }: TypographyMutedProps) => (
  <p className={cn('text-muted-foreground text-sm', className)} data-slot="typography-muted" {...props} />
)

export type {
  TypographyBlockquoteProps,
  TypographyH1Props,
  TypographyH2Props,
  TypographyH3Props,
  TypographyH4Props,
  TypographyInlineCodeProps,
  TypographyLargeProps,
  TypographyLeadProps,
  TypographyListProps,
  TypographyMutedProps,
  TypographyPProps,
  TypographySmallProps
}
export {
  TypographyBlockquote,
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyInlineCode,
  TypographyLarge,
  TypographyLead,
  TypographyList,
  TypographyMuted,
  TypographyP,
  TypographySmall
}
