import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

type TextareaProps = ComponentProps<'textarea'>

const Textarea = ({ className, ...props }: TextareaProps) => (
  <textarea
    className={cn(
      'cn-textarea field-sizing-content flex min-h-28 w-full rounded-[4px] border border-muted-foreground bg-transparent px-4 py-4 text-base outline-none transition-colors placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-[0.38]',
      'focus-visible:border-2 focus-visible:border-primary focus-visible:px-[15px] focus-visible:py-[15px] aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20',
      className
    )}
    data-slot="textarea"
    {...props}
  />
)

export type { TextareaProps }
export { Textarea }
