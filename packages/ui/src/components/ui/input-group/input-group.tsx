import { cn } from 'cn'

import type { ComponentProps } from 'react'

import { cva, type VariantProps } from '@/lib/cva'

const inputGroupAddonVariants = cva({
  base: 'flex min-h-9 shrink-0 cursor-text select-none items-center justify-center gap-2 px-3 text-muted-foreground text-sm',
  variants: {
    align: {
      'block-end': 'order-last w-full justify-start self-end',
      'block-start': 'order-first w-full justify-start self-start',
      'inline-end': 'order-last ml-auto',
      'inline-start': 'order-first'
    }
  }
})

type InputGroupProps = ComponentProps<'div'>
type InputGroupInputProps = ComponentProps<'input'>
type InputGroupAddonProps = ComponentProps<'div'> & VariantProps<typeof inputGroupAddonVariants>
type InputGroupButtonProps = ComponentProps<'button'> & VariantProps<typeof inputGroupButtonVariants>
type InputGroupTextProps = ComponentProps<'span'>
type InputGroupTextareaProps = ComponentProps<'textarea'>

const InputGroup = ({ className, ...props }: InputGroupProps) => (
  <div
    className={cn(
      'group/input-group flex min-h-9 w-full min-w-0 items-center rounded-md border border-input bg-transparent shadow-xs outline-none transition-colors focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50 has-[textarea[data-scope=input-group][data-slot=control]]:items-end',
      className
    )}
    data-scope="input-group"
    data-slot="root"
    {...props}
  />
)

const InputGroupInput = ({ className, ...props }: InputGroupInputProps) => (
  <input
    className={cn(
      'flex h-full min-w-0 flex-1 bg-transparent px-3 py-1 text-base outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
      className
    )}
    data-scope="input-group"
    data-slot="control"
    {...props}
  />
)

const InputGroupAddon = ({ align = 'inline-start', className, ...props }: InputGroupAddonProps) => (
  <div
    className={inputGroupAddonVariants({ align, className })}
    data-align={align}
    data-scope="input-group"
    data-slot="addon"
    {...props}
  />
)

const inputGroupButtonVariants = cva({
  base: 'inline-flex shrink-0 items-center justify-center rounded-sm text-sm shadow-none outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50',
  defaultVariants: { size: 'xs' },
  variants: { size: { 'icon-sm': 'size-8 px-0', 'icon-xs': 'size-7 px-0', sm: 'h-8 px-2.5', xs: 'h-7 px-2' } }
})

const InputGroupButton = ({ className, size = 'xs', type = 'button', ...props }: InputGroupButtonProps) => (
  <button
    className={inputGroupButtonVariants({ className, size })}
    data-scope="input-group"
    data-size={size}
    data-slot="button"
    type={type}
    {...props}
  />
)

const InputGroupText = ({ className, ...props }: InputGroupTextProps) => (
  <span
    className={cn('flex items-center text-muted-foreground text-sm [&_svg]:pointer-events-none', className)}
    data-scope="input-group"
    data-slot="text"
    {...props}
  />
)

const InputGroupTextarea = ({ className, ...props }: InputGroupTextareaProps) => (
  <textarea
    className={cn(
      'min-h-20 min-w-0 flex-1 resize-none bg-transparent px-3 py-2 text-base outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
      className
    )}
    data-scope="input-group"
    data-slot="control"
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
