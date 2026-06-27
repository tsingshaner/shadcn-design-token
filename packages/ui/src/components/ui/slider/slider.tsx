import { Slider as SliderPrimitive } from '@base-ui/react/slider'

import { cn } from '../../../lib/utils'

type SliderValue = number | readonly number[]
type SliderProps = SliderPrimitive.Root.Props<SliderValue> & {
  thumbCount?: number
}

const getThumbCount = (value: SliderValue | undefined, defaultValue: SliderValue | undefined, thumbCount?: number) => {
  if (thumbCount) {
    return thumbCount
  }

  if (Array.isArray(value)) {
    return value.length
  }

  if (Array.isArray(defaultValue)) {
    return defaultValue.length
  }

  return 1
}

const Slider = ({ className, defaultValue = 0, thumbCount, value, ...props }: SliderProps) => {
  const thumbs = Array.from({ length: getThumbCount(value, defaultValue, thumbCount) }, (_, index) => ({
    id: `slider-thumb-${index}`,
    index
  }))

  return (
    <SliderPrimitive.Root
      className={cn(
        'relative flex w-full touch-none select-none items-center data-[orientation=vertical]:h-full data-[orientation=vertical]:w-auto data-[orientation=vertical]:justify-center data-[disabled]:opacity-50',
        className
      )}
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      {...props}
    >
      <SliderPrimitive.Control
        className="relative flex w-full items-center py-2 data-[orientation=vertical]:h-full data-[orientation=vertical]:w-auto data-[orientation=vertical]:px-2 data-[orientation=vertical]:py-0"
        data-slot="slider-control"
      >
        <SliderPrimitive.Track
          className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20 data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5"
          data-slot="slider-track"
        >
          <SliderPrimitive.Indicator className="absolute h-full bg-primary" data-slot="slider-indicator" />
        </SliderPrimitive.Track>
        {thumbs.map((thumb) => (
          <SliderPrimitive.Thumb
            className="block size-4 rounded-full border border-primary bg-background shadow-sm outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50"
            data-slot="slider-thumb"
            index={thumb.index}
            key={thumb.id}
          />
        ))}
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  )
}

export type { SliderProps }
export { Slider }
