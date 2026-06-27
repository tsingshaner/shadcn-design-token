import { type ComponentProps, createContext, type ReactNode, useContext, useMemo, useState } from 'react'

import { cn } from '../../../lib/utils'
import { Dialog, DialogContent, type DialogProps } from '../dialog'

type CommandContextValue = {
  query: string
  setQuery: (query: string) => void
}

const CommandContext = createContext<CommandContextValue | null>(null)

type CommandProps = ComponentProps<'div'> & {
  defaultQuery?: string
}
type CommandDialogProps = Omit<DialogProps, 'children'> & {
  children?: ReactNode
}
type CommandInputProps = ComponentProps<'input'>
type CommandListProps = ComponentProps<'div'>
type CommandEmptyProps = ComponentProps<'div'>
type CommandGroupProps = ComponentProps<'div'> & {
  heading?: ReactNode
}
type CommandSeparatorProps = ComponentProps<'hr'>
type CommandItemProps = ComponentProps<'button'> & {
  value?: string
}
type CommandShortcutProps = ComponentProps<'span'>

const useCommand = () => useContext(CommandContext)

const getTextValue = (children: ReactNode) => {
  if (typeof children === 'string' || typeof children === 'number') {
    return String(children)
  }

  return ''
}

const Command = ({ className, defaultQuery = '', ...props }: CommandProps) => {
  const [query, setQuery] = useState(defaultQuery)
  const value = useMemo(() => ({ query, setQuery }), [query])

  return (
    <CommandContext.Provider value={value}>
      <div
        className={cn(
          'flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground',
          className
        )}
        data-slot="command"
        {...props}
      />
    </CommandContext.Provider>
  )
}

const CommandDialog = ({ children, ...props }: CommandDialogProps) => (
  <Dialog {...props}>
    <DialogContent className="overflow-hidden p-0">
      <Command>{children}</Command>
    </DialogContent>
  </Dialog>
)

const CommandInput = ({ className, onChange, ...props }: CommandInputProps) => {
  const command = useCommand()

  return (
    <div className="flex items-center border-b px-3" data-slot="command-input-wrapper">
      <svg
        aria-hidden="true"
        className="mr-2 size-4 shrink-0 opacity-50"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
      <input
        className={cn(
          'flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        data-slot="command-input"
        onChange={(event) => {
          command?.setQuery(event.currentTarget.value)
          onChange?.(event)
        }}
        {...props}
      />
    </div>
  )
}

const CommandList = ({ className, ...props }: CommandListProps) => (
  <div
    className={cn('max-h-80 overflow-y-auto overflow-x-hidden p-1', className)}
    data-slot="command-list"
    role="listbox"
    {...props}
  />
)

const CommandEmpty = ({ className, ...props }: CommandEmptyProps) => (
  <div
    className={cn('px-2 py-6 text-center text-muted-foreground text-sm', className)}
    data-slot="command-empty"
    {...props}
  />
)

const CommandGroup = ({ children, className, heading, ...props }: CommandGroupProps) => (
  <div
    className={cn(
      'overflow-hidden p-1 text-foreground [&_[data-slot=command-group-heading]]:px-2 [&_[data-slot=command-group-heading]]:py-1.5 [&_[data-slot=command-group-heading]]:font-medium [&_[data-slot=command-group-heading]]:text-muted-foreground [&_[data-slot=command-group-heading]]:text-xs',
      className
    )}
    data-slot="command-group"
    {...props}
  >
    {heading ? <CommandGroupHeading>{heading}</CommandGroupHeading> : null}
    {children}
  </div>
)

const CommandGroupHeading = ({ className, ...props }: ComponentProps<'div'>) => (
  <div className={cn(className)} data-slot="command-group-heading" {...props} />
)

const CommandSeparator = ({ className, ...props }: CommandSeparatorProps) => (
  <hr className={cn('-mx-1 my-1 h-px bg-border', className)} data-slot="command-separator" {...props} />
)

const CommandItem = ({ children, className, value, ...props }: CommandItemProps) => {
  const command = useCommand()
  const itemValue = value ?? getTextValue(children)
  const hidden = command?.query ? !itemValue.toLowerCase().includes(command.query.toLowerCase()) : false

  if (hidden) {
    return null
  }

  return (
    <button
      className={cn(
        'relative flex w-full cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
        className
      )}
      data-slot="command-item"
      role="option"
      type="button"
      {...props}
    >
      {children}
    </button>
  )
}

const CommandShortcut = ({ className, ...props }: CommandShortcutProps) => (
  <span
    className={cn('ml-auto text-muted-foreground text-xs tracking-widest', className)}
    data-slot="command-shortcut"
    {...props}
  />
)

export type {
  CommandDialogProps,
  CommandEmptyProps,
  CommandGroupProps,
  CommandInputProps,
  CommandItemProps,
  CommandListProps,
  CommandProps,
  CommandSeparatorProps,
  CommandShortcutProps
}
export {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandGroupHeading,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut
}
