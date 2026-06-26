import { Slider as SliderPrimitive } from '@base-ui/react/slider'

import { cn } from '../../../lib/utils'

type SliderProps = SliderPrimitive.Root.Props<number>

const Slider = ({ className, defaultValue = 0, ...props }: SliderProps) => (
  <SliderPrimitive.Root
    className={cn('relative flex w-full touch-none select-none items-center data-[disabled]:opacity-50', className)}
    data-slot="slider"
    defaultValue={defaultValue}
    {...props}
  >
    <SliderPrimitive.Control className="relative flex w-full items-center py-2" data-slot="slider-control">
      <SliderPrimitive.Track
        className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20"
        data-slot="slider-track"
      >
        <SliderPrimitive.Indicator className="absolute h-full bg-primary" data-slot="slider-indicator" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        className="block size-4 rounded-full border border-primary bg-background shadow-sm outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50"
        data-slot="slider-thumb"
      />
    </SliderPrimitive.Control>
  </SliderPrimitive.Root>
)

export type { SliderProps }
export { Slider }
