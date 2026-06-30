import { Command as CommandPrimitive } from 'cmdk'
import { CheckIcon, SearchIcon } from 'lucide-react'

import type { ComponentProps, ReactNode } from 'react'

import { cn } from '@/lib/utils'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../dialog'
import { InputGroup, InputGroupAddon } from '../input-group'

type CommandProps = ComponentProps<typeof CommandPrimitive>
type CommandDialogProps = Omit<ComponentProps<typeof Dialog>, 'children'> & {
  children: ReactNode
  className?: string
  description?: string
  showCloseButton?: boolean
  title?: string
}
type CommandInputProps = ComponentProps<typeof CommandPrimitive.Input>
type CommandListProps = ComponentProps<typeof CommandPrimitive.List>
type CommandEmptyProps = ComponentProps<typeof CommandPrimitive.Empty>
type CommandGroupProps = ComponentProps<typeof CommandPrimitive.Group>
type CommandGroupHeadingProps = ComponentProps<'div'>
type CommandSeparatorProps = ComponentProps<typeof CommandPrimitive.Separator>
type CommandItemProps = ComponentProps<typeof CommandPrimitive.Item>
type CommandShortcutProps = ComponentProps<'span'>

const Command = ({ className, ...props }: CommandProps) => (
  <CommandPrimitive
    className={cn(
      'cn-command flex size-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground',
      className
    )}
    data-slot="command"
    {...props}
  />
)

const CommandDialog = ({
  children,
  className,
  description = 'Search for a command to run...',
  showCloseButton = false,
  title = 'Command Palette',
  ...props
}: CommandDialogProps) => (
  <Dialog {...props}>
    <DialogHeader className="sr-only">
      <DialogTitle>{title}</DialogTitle>
      <DialogDescription>{description}</DialogDescription>
    </DialogHeader>
    <DialogContent
      className={cn('cn-command-dialog top-1/3 translate-y-0 overflow-hidden p-0', className)}
      showCloseButton={showCloseButton}
    >
      <Command>{children}</Command>
    </DialogContent>
  </Dialog>
)

const CommandInput = ({ className, ...props }: CommandInputProps) => (
  <div className="cn-command-input-wrapper border-b" data-slot="command-input-wrapper">
    <InputGroup className="cn-command-input-group rounded-none border-0 shadow-none focus-within:ring-0">
      <CommandPrimitive.Input
        className={cn(
          'cn-command-input flex h-10 w-full bg-transparent px-3 py-3 text-sm outline-hidden placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        data-slot="command-input"
        {...props}
      />
      <InputGroupAddon align="inline-start" className="order-first px-3">
        <SearchIcon className="cn-command-input-icon size-4 opacity-50" />
      </InputGroupAddon>
    </InputGroup>
  </div>
)

const CommandList = ({ className, ...props }: CommandListProps) => (
  <CommandPrimitive.List
    className={cn('cn-command-list max-h-80 overflow-y-auto overflow-x-hidden p-1', className)}
    data-slot="command-list"
    {...props}
  />
)

const CommandEmpty = ({ className, ...props }: CommandEmptyProps) => (
  <CommandPrimitive.Empty
    className={cn('cn-command-empty px-2 py-6 text-center text-muted-foreground text-sm', className)}
    data-slot="command-empty"
    {...props}
  />
)

const CommandGroup = ({ className, heading, ...props }: CommandGroupProps) => (
  <CommandPrimitive.Group
    className={cn(
      'cn-command-group overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:text-xs',
      className
    )}
    data-slot="command-group"
    heading={heading ? <span data-slot="command-group-heading">{heading}</span> : undefined}
    {...props}
  />
)

const CommandGroupHeading = ({ className, ...props }: CommandGroupHeadingProps) => (
  <div className={cn(className)} data-slot="command-group-heading" {...props} />
)

const CommandSeparator = ({ className, ...props }: CommandSeparatorProps) => (
  <CommandPrimitive.Separator
    className={cn('cn-command-separator -mx-1 my-1 h-px bg-border', className)}
    data-slot="command-separator"
    {...props}
  />
)

const CommandItem = ({ children, className, ...props }: CommandItemProps) => (
  <CommandPrimitive.Item
    className={cn(
      'cn-command-item group/command-item relative flex w-full cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm outline-none transition-colors data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
      className
    )}
    data-slot="command-item"
    {...props}
  >
    {children}
    <CheckIcon className="cn-command-item-indicator ml-auto opacity-0 group-has-data-[slot=command-shortcut]/command-item:hidden group-data-[checked=true]/command-item:opacity-100" />
  </CommandPrimitive.Item>
)

const CommandShortcut = ({ className, ...props }: CommandShortcutProps) => (
  <span
    className={cn('cn-command-shortcut ml-auto text-muted-foreground text-xs tracking-widest', className)}
    data-slot="command-shortcut"
    {...props}
  />
)

export type {
  CommandDialogProps,
  CommandEmptyProps,
  CommandGroupHeadingProps,
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
