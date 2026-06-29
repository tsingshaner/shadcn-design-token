import { ChevronDownIcon } from 'lucide-react'

import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

type NativeSelectProps = Omit<ComponentProps<'select'>, 'size'> & {
  size?: 'default' | 'sm'
}
type NativeSelectOptGroupProps = ComponentProps<'optgroup'>
type NativeSelectOptionProps = ComponentProps<'option'>

const NativeSelect = ({ className, size = 'default', ...props }: NativeSelectProps) => (
  <div
    className={cn(
      'cn-native-select-wrapper group/native-select relative w-fit has-[select:disabled]:opacity-50',
      className
    )}
    data-size={size}
    data-slot="native-select-wrapper"
  >
    <select
      className="cn-native-select flex h-9 w-full appearance-none rounded-md border border-input bg-transparent px-3 py-1 pr-8 text-base shadow-xs outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-[size=sm]:h-8 data-[size=sm]:rounded-[min(var(--radius-md),10px)] md:text-sm"
      data-size={size}
      data-slot="native-select"
      {...props}
    />
    <ChevronDownIcon
      aria-hidden="true"
      className="cn-native-select-icon pointer-events-none absolute top-1/2 right-2 size-4 -translate-y-1/2 select-none text-muted-foreground"
      data-slot="native-select-icon"
    />
  </div>
)

const NativeSelectOptGroup = ({ className, ...props }: NativeSelectOptGroupProps) => (
  <optgroup className={cn('bg-[Canvas] text-[CanvasText]', className)} data-slot="native-select-optgroup" {...props} />
)

const NativeSelectOption = ({ className, ...props }: NativeSelectOptionProps) => (
  <option className={cn('bg-[Canvas] text-[CanvasText]', className)} data-slot="native-select-option" {...props} />
)

export type { NativeSelectOptGroupProps, NativeSelectOptionProps, NativeSelectProps }
export { NativeSelect, NativeSelectOptGroup, NativeSelectOption }
