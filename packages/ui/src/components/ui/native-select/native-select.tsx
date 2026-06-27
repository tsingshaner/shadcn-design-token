import type { ComponentProps } from 'react'

import { cn } from '../../../lib/utils'

type NativeSelectProps = ComponentProps<'select'>
type NativeSelectOptGroupProps = ComponentProps<'optgroup'>
type NativeSelectOptionProps = ComponentProps<'option'>

const NativeSelect = ({ className, ...props }: NativeSelectProps) => (
  <select
    className={cn(
      'flex h-9 w-full appearance-none rounded-md border border-input bg-transparent px-3 py-1 pr-8 text-base shadow-xs outline-none transition-colors disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
      'focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20',
      className
    )}
    data-slot="native-select"
    {...props}
  />
)

const NativeSelectOptGroup = (props: NativeSelectOptGroupProps) => (
  <optgroup data-slot="native-select-optgroup" {...props} />
)

const NativeSelectOption = (props: NativeSelectOptionProps) => <option data-slot="native-select-option" {...props} />

export type { NativeSelectOptGroupProps, NativeSelectOptionProps, NativeSelectProps }
export { NativeSelect, NativeSelectOptGroup, NativeSelectOption }
