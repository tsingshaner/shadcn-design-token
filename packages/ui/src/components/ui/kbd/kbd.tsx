import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

type KbdProps = ComponentProps<'kbd'>
type KbdGroupProps = ComponentProps<'div'>

const Kbd = ({ className, ...props }: KbdProps) => (
  <kbd
    className={cn(
      'pointer-events-none inline-flex h-5 min-w-5 select-none items-center justify-center gap-1 rounded border bg-muted px-1 font-medium font-mono text-[0.75rem] text-muted-foreground',
      className
    )}
    data-slot="kbd"
    {...props}
  />
)

const KbdGroup = ({ className, ...props }: KbdGroupProps) => (
  <kbd className={cn('inline-flex items-center gap-1', className)} data-slot="kbd-group" {...props} />
)

export type { KbdGroupProps, KbdProps }
export { Kbd, KbdGroup }
