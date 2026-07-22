import { Slider as SliderPrimitive } from '@base-ui/react/slider'

import { cn } from '@/lib/utils'

import { Ripple } from '../ripple'

type SliderValue = number | readonly number[]
type SliderProps = SliderPrimitive.Root.Props<SliderValue> & {
  thumbCount?: number
}

const getSliderValues = (
  value: SliderValue | undefined,
  defaultValue: SliderValue | undefined,
  min: number,
  max: number
) => {
  if (Array.isArray(value)) {
    return value
  }

  if (Array.isArray(defaultValue)) {
    return defaultValue
  }

  if (typeof value === 'number') {
    return [value]
  }

  if (typeof defaultValue === 'number') {
    return [defaultValue]
  }

  return [min, max]
}

const getThumbCount = (values: readonly number[], thumbCount?: number) => {
  if (thumbCount) {
    return thumbCount
  }

  return values.length
}

const Slider = ({ className, defaultValue, max = 100, min = 0, thumbCount, value, ...props }: SliderProps) => {
  const values = getSliderValues(value, defaultValue, min, max)
  const thumbs = Array.from({ length: getThumbCount(values, thumbCount) }, (_, index) => ({
    id: `slider-thumb-${index}`,
    index
  }))

  return (
    <SliderPrimitive.Root
      className={cn('data-vertical:h-full data-horizontal:w-full', className)}
      data-slot="slider"
      defaultValue={defaultValue}
      max={max}
      min={min}
      thumbAlignment="edge"
      value={value}
      {...props}
    >
      <SliderPrimitive.Control
        className="cn-slider relative flex w-full touch-none select-none items-center data-vertical:h-full data-vertical:min-h-40 data-vertical:w-auto data-vertical:flex-col data-disabled:opacity-50"
        data-slot="slider-control"
      >
        <SliderPrimitive.Track
          className="cn-slider-track relative grow select-none overflow-hidden rounded-full bg-primary/20 data-horizontal:h-1 data-vertical:h-full data-horizontal:w-full data-vertical:w-1"
          data-slot="slider-track"
        >
          <SliderPrimitive.Indicator
            className="cn-slider-range select-none bg-primary data-horizontal:h-full data-vertical:w-full"
            data-slot="slider-range"
          />
        </SliderPrimitive.Track>
        {thumbs.map((thumb) => (
          <SliderPrimitive.Thumb
            className="cn-slider-thumb relative block size-5 shrink-0 select-none rounded-full border-0 bg-primary text-primary shadow-sm outline-none transition-[width,height,box-shadow] after:pointer-events-none after:absolute after:-inset-2.5 after:rounded-full after:bg-primary after:opacity-0 focus-visible:after:opacity-[0.1] active:size-3 disabled:pointer-events-none disabled:opacity-[0.38]"
            data-slot="slider-thumb"
            index={thumb.index}
            key={thumb.id}
          >
            <Ripple unbounded />
          </SliderPrimitive.Thumb>
        ))}
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  )
}

export type { SliderProps }
export { Slider }
