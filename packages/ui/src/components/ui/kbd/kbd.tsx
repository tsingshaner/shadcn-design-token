import { cn } from 'cn'

import type { ComponentProps } from 'react'

type KbdProps = ComponentProps<'kbd'>
type KbdGroupProps = ComponentProps<'div'>

const Kbd = ({ className, ...props }: KbdProps) => (
  <kbd
    className={cn(
      'pointer-events-none inline-flex h-5 min-w-5 select-none items-center justify-center gap-1 rounded border bg-muted px-1 font-medium font-mono text-[0.75rem] text-muted-foreground',
      className
    )}
    data-scope="kbd"
    data-slot="root"
    {...props}
  />
)

const KbdGroup = ({ className, ...props }: KbdGroupProps) => (
  <kbd className={cn('inline-flex items-center gap-1', className)} data-scope="kbd" data-slot="group" {...props} />
)

export type { KbdGroupProps, KbdProps }
export { Kbd, KbdGroup }
