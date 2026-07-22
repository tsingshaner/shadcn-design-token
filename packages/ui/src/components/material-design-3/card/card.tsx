import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

type CardProps = ComponentProps<'div'> & {
  size?: 'default' | 'sm'
}

const Card = ({ className, size = 'default', ...props }: CardProps) => (
  <div
    className={cn(
      'cn-card group/card flex flex-col gap-6 rounded-xl border border-transparent bg-muted py-6 text-card-foreground shadow-sm data-[size=sm]:gap-4 data-[size=sm]:py-4',
      className
    )}
    data-size={size}
    data-slot="card"
    {...props}
  />
)

const CardHeader = ({ className, ...props }: ComponentProps<'div'>) => (
  <div
    className={cn(
      'cn-card-header group/card-header @container/card-header grid auto-rows-min items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] group-data-[size=sm]/card:px-4',
      className
    )}
    data-slot="card-header"
    {...props}
  />
)

const CardTitle = ({ className, ...props }: ComponentProps<'div'>) => (
  <div
    className={cn('cn-card-title cn-font-heading font-semibold leading-none', className)}
    data-slot="card-title"
    {...props}
  />
)

const CardDescription = ({ className, ...props }: ComponentProps<'div'>) => (
  <div
    className={cn('cn-card-description text-muted-foreground text-sm', className)}
    data-slot="card-description"
    {...props}
  />
)

const CardAction = ({ className, ...props }: ComponentProps<'div'>) => (
  <div
    className={cn('cn-card-action col-start-2 row-span-2 row-start-1 self-start justify-self-end', className)}
    data-slot="card-action"
    {...props}
  />
)

const CardContent = ({ className, ...props }: ComponentProps<'div'>) => (
  <div
    className={cn('cn-card-content px-6 group-data-[size=sm]/card:px-4', className)}
    data-slot="card-content"
    {...props}
  />
)

const CardFooter = ({ className, ...props }: ComponentProps<'div'>) => (
  <div
    className={cn('cn-card-footer flex items-center px-6 group-data-[size=sm]/card:px-4', className)}
    data-slot="card-footer"
    {...props}
  />
)

export type { CardProps }
export { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle }
