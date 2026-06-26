import type { ComponentProps } from 'react'

import { cn } from '../../../lib/utils'

type KbdProps = ComponentProps<'kbd'>

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

export type { KbdProps }
export { Kbd }
