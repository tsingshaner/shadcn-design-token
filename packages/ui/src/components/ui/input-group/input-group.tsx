import type { ComponentProps } from 'react'

import { cn } from '../../../lib/utils'

type InputGroupProps = ComponentProps<'div'>
type InputGroupInputProps = ComponentProps<'input'>
type InputGroupAddonProps = ComponentProps<'div'> & {
  align?: 'block-end' | 'block-start' | 'inline-end' | 'inline-start'
}
type InputGroupButtonProps = ComponentProps<'button'>
type InputGroupTextProps = ComponentProps<'span'>
type InputGroupTextareaProps = ComponentProps<'textarea'>

const InputGroup = ({ className, ...props }: InputGroupProps) => (
  <div
    className={cn(
      'flex min-h-9 w-full min-w-0 items-center rounded-md border border-input bg-transparent shadow-xs transition-colors focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50 has-data-[slot=input-group-textarea]:items-end',
      className
    )}
    data-slot="input-group"
    {...props}
  />
)

const InputGroupInput = ({ className, ...props }: InputGroupInputProps) => (
  <input
    className={cn(
      'flex h-full min-w-0 flex-1 bg-transparent px-3 py-1 text-base outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
      className
    )}
    data-slot="input-group-input"
    {...props}
  />
)

const InputGroupAddon = ({ align = 'inline-start', className, ...props }: InputGroupAddonProps) => (
  <div
    className={cn(
      'flex min-h-9 shrink-0 items-center gap-2 px-3 text-muted-foreground text-sm',
      align === 'inline-end' && 'ml-auto',
      align === 'block-end' && 'self-end',
      align === 'block-start' && 'self-start',
      className
    )}
    data-align={align}
    data-slot="input-group-addon"
    {...props}
  />
)

const InputGroupButton = ({ className, type = 'button', ...props }: InputGroupButtonProps) => (
  <button
    className={cn(
      'inline-flex h-7 shrink-0 items-center justify-center rounded-sm px-2 text-sm outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50',
      className
    )}
    data-slot="input-group-button"
    type={type}
    {...props}
  />
)

const InputGroupText = ({ className, ...props }: InputGroupTextProps) => (
  <span className={cn('text-muted-foreground text-sm', className)} data-slot="input-group-text" {...props} />
)

const InputGroupTextarea = ({ className, ...props }: InputGroupTextareaProps) => (
  <textarea
    className={cn(
      'min-h-20 min-w-0 flex-1 resize-none bg-transparent px-3 py-2 text-base outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
      className
    )}
    data-slot="input-group-textarea"
    {...props}
  />
)

export type {
  InputGroupAddonProps,
  InputGroupButtonProps,
  InputGroupInputProps,
  InputGroupProps,
  InputGroupTextareaProps,
  InputGroupTextProps
}
export { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText, InputGroupTextarea }
