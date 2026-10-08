import { Slider as SliderPrimitive } from '@base-ui/react/slider'
import { cn } from 'cn'

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
      data-scope="slider"
      data-slot="root"
      defaultValue={defaultValue}
      max={max}
      min={min}
      thumbAlignment="edge"
      value={value}
      {...props}
    >
      <SliderPrimitive.Control
        className="relative flex w-full touch-none select-none items-center data-vertical:h-full data-vertical:min-h-40 data-vertical:w-auto data-vertical:flex-col data-disabled:opacity-50"
        data-scope="slider"
        data-slot="control"
      >
        <SliderPrimitive.Track
          className="relative grow select-none overflow-hidden rounded-full bg-muted data-horizontal:h-1 data-vertical:h-full data-horizontal:w-full data-vertical:w-1"
          data-scope="slider"
          data-slot="track"
        >
          <SliderPrimitive.Indicator
            className="select-none bg-primary data-horizontal:h-full data-vertical:w-full"
            data-scope="slider"
            data-slot="range"
          />
        </SliderPrimitive.Track>
        {thumbs.map((thumb) => (
          <SliderPrimitive.Thumb
            className="relative block size-3 shrink-0 select-none rounded-full border border-ring bg-white ring-ring/50 transition-[color,box-shadow] after:absolute after:-inset-2 hover:ring-3 focus-visible:outline-hidden focus-visible:ring-3 active:ring-3 disabled:pointer-events-none disabled:opacity-50"
            data-scope="slider"
            data-slot="thumb"
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
