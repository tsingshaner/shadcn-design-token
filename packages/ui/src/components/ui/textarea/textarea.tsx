import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

type TextareaProps = ComponentProps<'textarea'>

const Textarea = ({ className, ...props }: TextareaProps) => (
  <textarea
    className={cn(
      'field-sizing-content flex min-h-16 w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs outline-none transition-colors placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
      'focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20',
      className
    )}
    data-slot="textarea"
    {...props}
  />
)

export type { TextareaProps }
export { Textarea }
