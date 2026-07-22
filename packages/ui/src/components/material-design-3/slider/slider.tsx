import { Slider as SliderPrimitive } from '@base-ui/react/slider'
import { tv } from 'tailwind-variants'

import type { CSSProperties, ReactNode } from 'react'

import { cn } from '@/lib/utils'

type SliderValue = number | readonly number[]
type SliderSize = 'lg' | 'md' | 'sm' | 'xl' | 'xs'
type SliderVariant = 'centered' | 'standard'
type SliderProps = SliderPrimitive.Root.Props<SliderValue> & {
  icon?: ReactNode
  showStops?: boolean
  showValueIndicator?: boolean
  size?: SliderSize
  thumbCount?: number
  variant?: SliderVariant
}

const sliderVariants = tv({
  defaultVariants: {
    size: 'xs'
  },
  slots: {
    control: 'cn-slider relative flex size-full touch-none select-none items-center data-vertical:flex-col',
    indicator:
      'cn-slider-range absolute select-none rounded-[2px] bg-primary data-horizontal:h-full data-vertical:w-full data-disabled:bg-foreground/[0.38]',
    root: 'group/slider relative shrink-0 [--slider-track-gap:8px] data-dragging:[--slider-track-gap:7px] data-horizontal:w-full data-vertical:h-full data-vertical:min-h-40',
    thumb:
      'cn-slider-thumb group/thumb relative z-10 block shrink-0 select-none rounded-[2px] border-0 bg-primary text-primary-foreground shadow-[0_0_0_6px_var(--background)] outline-none transition-[width,height] after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:bg-primary-foreground after:opacity-0 hover:after:opacity-[0.08] has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ring data-dragging:after:opacity-[0.1] data-dragging:data-horizontal:w-0.5 data-dragging:data-vertical:h-0.5 data-disabled:pointer-events-none data-disabled:bg-foreground/[0.38] data-disabled:text-background data-disabled:after:hidden data-horizontal:w-1 data-vertical:h-1',
    track:
      'cn-slider-track relative grow select-none bg-secondary data-horizontal:w-full data-vertical:h-full data-disabled:bg-foreground/[0.1]'
  },
  variants: {
    size: {
      lg: {
        root: '[--slider-track-radius:16px] data-horizontal:h-[68px] data-vertical:w-[68px]',
        thumb: 'data-horizontal:h-[68px] data-vertical:w-[68px]',
        track: 'rounded-2xl data-horizontal:h-14 data-vertical:w-14'
      },
      md: {
        root: '[--slider-track-radius:12px] data-horizontal:h-[52px] data-vertical:w-[52px]',
        thumb: 'data-horizontal:h-[52px] data-vertical:w-[52px]',
        track: 'rounded-xl data-horizontal:h-10 data-vertical:w-10'
      },
      sm: {
        root: '[--slider-track-radius:8px] data-horizontal:h-11 data-vertical:w-11',
        thumb: 'data-horizontal:h-11 data-vertical:w-11',
        track: 'rounded-lg data-horizontal:h-6 data-vertical:w-6'
      },
      xl: {
        root: '[--slider-track-radius:28px] data-horizontal:h-[108px] data-vertical:w-[108px]',
        thumb: 'data-horizontal:h-[108px] data-vertical:w-[108px]',
        track: 'rounded-[28px] data-horizontal:h-24 data-vertical:w-24'
      },
      xs: {
        root: '[--slider-track-radius:8px] data-horizontal:h-11 data-vertical:w-11',
        thumb: 'data-horizontal:h-11 data-vertical:w-11',
        track: 'rounded-2xl data-horizontal:h-4 data-vertical:w-4'
      }
    }
  }
})

const getSliderValues = (
  value: SliderValue | undefined,
  defaultValue: SliderValue | undefined,
  min: number
): readonly number[] => {
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

  return [min]
}

const getStops = (min: number, max: number, step: number) => {
  if (!(step > 0 && max > min)) {
    return []
  }

  const intervalCount = Math.floor((max - min) / step)
  const stops = Array.from({ length: intervalCount + 1 }, (_, index) => min + index * step)

  if (stops.at(-1) !== max) {
    stops.push(max)
  }

  return stops
}

const isActiveValue = (stop: number, values: readonly number[], min: number, max: number, variant: SliderVariant) => {
  if (values.length > 1) {
    return stop >= values[0] && stop <= (values.at(-1) ?? values[0])
  }

  const value = values[0] ?? min
  const origin = variant === 'centered' ? (min + max) / 2 : min

  return stop >= Math.min(origin, value) && stop <= Math.max(origin, value)
}

const getStandardOuterRadius = (
  range: boolean,
  orientation: 'horizontal' | 'vertical',
  variant: SliderVariant
): CSSProperties => {
  if (range || variant !== 'standard') {
    return {}
  }

  const outerRadius = 'var(--slider-track-radius)'

  return orientation === 'vertical'
    ? {
        borderBottomLeftRadius: outerRadius,
        borderBottomRightRadius: outerRadius
      }
    : {
        borderEndStartRadius: outerRadius,
        borderStartStartRadius: outerRadius
      }
}

const getIndicatorStyle = (
  style: CSSProperties | undefined,
  values: readonly number[],
  min: number,
  max: number,
  orientation: 'horizontal' | 'vertical',
  variant: SliderVariant
): CSSProperties => {
  const positions = values.map((value) => ((value - min) / (max - min)) * 100)
  const value = positions[0] ?? 0
  const range = positions.length > 1
  const centered = variant === 'centered' && !range
  const start = range ? value : centered ? Math.min(50, value) : 0
  const end = range ? (positions.at(-1) ?? value) : centered ? Math.max(50, value) : value
  const gapAtStart = range || (centered && value < 50)
  const startEdge = orientation === 'vertical' ? 'bottom' : 'insetInlineStart'
  const mainSize = orientation === 'vertical' ? 'height' : 'width'
  const gaps = range ? 'var(--slider-track-gap) - var(--slider-track-gap)' : 'var(--slider-track-gap)'

  return {
    ...style,
    ...getStandardOuterRadius(range, orientation, variant),
    [startEdge]: gapAtStart ? `calc(${start}% + var(--slider-track-gap))` : `${start}%`,
    [mainSize]: `max(0px, calc(${end - start}% - ${gaps}))`
  }
}

type SliderStopsProps = {
  max: number
  min: number
  showStops: boolean
  step: number
  variant: SliderVariant
}

const SliderStops = ({ max, min, showStops, step, variant }: SliderStopsProps) => {
  const stops = getStops(min, max, step)

  if (showStops) {
    return (
      <SliderPrimitive.Value
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 flex items-center justify-between px-1 data-vertical:flex-col-reverse data-vertical:px-0 data-vertical:py-1"
        data-slot="slider-stops"
      >
        {(_, values) =>
          stops.map((stop) => {
            const active = isActiveValue(stop, values, min, max, variant)

            return (
              <span
                className={cn(
                  'size-1 shrink-0 rounded-full',
                  active
                    ? 'bg-primary-foreground group-data-disabled/slider:bg-background'
                    : 'bg-secondary-foreground group-data-disabled/slider:bg-foreground/[0.38]'
                )}
                data-slot="slider-stop"
                key={stop}
              />
            )
          })
        }
      </SliderPrimitive.Value>
    )
  }

  return (
    <SliderPrimitive.Value
      aria-hidden="true"
      className="group/stops pointer-events-none absolute inset-0 z-10"
      data-slot="slider-edge-stops"
    >
      {(_, values) => {
        const range = values.length > 1
        const stopValues = range ? [min, (min + max) / 2, max] : variant === 'centered' ? [min, max] : [max]

        return stopValues.map((stop) => (
          <span
            className={cn(
              'absolute size-1 rounded-full',
              stop === min &&
                'group-data-[orientation=horizontal]/stops:start-1 group-data-[orientation=horizontal]/stops:top-1/2 group-data-[orientation=vertical]/stops:bottom-1 group-data-[orientation=vertical]/stops:left-1/2 group-data-[orientation=vertical]/stops:-translate-x-1/2 group-data-[orientation=horizontal]/stops:-translate-y-1/2',
              stop === max &&
                'group-data-[orientation=horizontal]/stops:end-1 group-data-[orientation=horizontal]/stops:top-1/2 group-data-[orientation=vertical]/stops:top-1 group-data-[orientation=vertical]/stops:left-1/2 group-data-[orientation=vertical]/stops:-translate-x-1/2 group-data-[orientation=horizontal]/stops:-translate-y-1/2',
              stop !== min && stop !== max && '-translate-1/2 top-1/2 left-1/2',
              isActiveValue(stop, values, min, max, variant)
                ? 'bg-primary-foreground group-data-disabled/slider:bg-background'
                : 'bg-secondary-foreground group-data-disabled/slider:bg-foreground/[0.38]'
            )}
            data-slot="slider-edge-stop"
            key={stop}
          />
        ))
      }}
    </SliderPrimitive.Value>
  )
}

type SliderThumbProps = {
  index: number
  showValueIndicator: boolean
  styles: ReturnType<typeof sliderVariants>
}

const SliderThumb = ({ index, showValueIndicator, styles }: SliderThumbProps) => (
  <SliderPrimitive.Thumb
    className={(state) =>
      cn(
        styles.thumb(),
        state.values.length === 2 &&
          state.values[0] === state.values[1] &&
          (index === 0
            ? 'data-horizontal:-ms-[5px] data-vertical:-mb-[5px]'
            : 'data-horizontal:ms-[5px] data-vertical:mb-[5px]')
      )
    }
    data-slot="slider-thumb"
    index={index}
  >
    {showValueIndicator && (
      <SliderPrimitive.Value
        aria-hidden="true"
        className="pointer-events-none absolute z-20 flex h-11 min-w-12 items-center justify-center rounded-full bg-foreground px-4 font-medium text-background text-sm leading-5 tracking-[0.1px] opacity-0 transition-opacity group-has-[:focus-visible]/slider:opacity-100 data-vertical:top-1/2 data-vertical:right-[calc(100%+4px)] data-horizontal:bottom-[calc(100%+4px)] data-horizontal:left-1/2 data-horizontal:-translate-x-1/2 data-vertical:-translate-y-1/2 group-data-dragging/slider:opacity-100"
        data-slot="slider-value-indicator"
      >
        {(formattedValues) => formattedValues[index]}
      </SliderPrimitive.Value>
    )}
  </SliderPrimitive.Thumb>
)

const Slider = ({
  className,
  defaultValue,
  icon,
  max = 100,
  min = 0,
  showStops = false,
  showValueIndicator = false,
  size = 'xs',
  step = 1,
  thumbCount,
  value,
  variant = 'standard',
  ...props
}: SliderProps) => {
  const initialValues = getSliderValues(value, defaultValue, min)
  const range = initialValues.length > 1
  const resolvedVariant = range ? 'range' : variant
  const styles = sliderVariants({ size })
  const thumbs = Array.from({ length: thumbCount ?? initialValues.length }, (_, index) => index)
  const showIcon = icon && variant === 'standard' && ['md', 'lg', 'xl'].includes(size)

  return (
    <SliderPrimitive.Root
      {...props}
      className={
        typeof className === 'function' ? (state) => cn(styles.root(), className(state)) : cn(styles.root(), className)
      }
      data-size={size}
      data-slot="slider"
      data-variant={resolvedVariant}
      defaultValue={defaultValue}
      max={max}
      min={min}
      step={step}
      thumbAlignment="edge"
      value={value}
    >
      <SliderPrimitive.Control className={styles.control()} data-slot="slider-control">
        <SliderPrimitive.Track className={styles.track()} data-slot="slider-track">
          <SliderPrimitive.Indicator
            className={styles.indicator()}
            data-slot="slider-range"
            render={(indicatorProps, state) => (
              <div
                {...indicatorProps}
                style={getIndicatorStyle(
                  indicatorProps.style,
                  state.values,
                  state.min,
                  state.max,
                  state.orientation,
                  variant
                )}
              />
            )}
          />
        </SliderPrimitive.Track>
        <SliderStops max={max} min={min} showStops={showStops} step={step} variant={variant} />
        {showIcon && (
          <SliderPrimitive.Value
            aria-hidden="true"
            className={cn(
              'pointer-events-none absolute z-10 flex items-center justify-center data-horizontal:start-2 data-horizontal:top-1/2 data-vertical:bottom-2 data-vertical:left-1/2 data-vertical:-translate-x-1/2 data-horizontal:-translate-y-1/2',
              size === 'xl' ? 'size-8' : 'size-6'
            )}
            data-slot="slider-icon"
          >
            {(_, values) => (
              <span className={(values[0] ?? min) > min ? 'text-primary-foreground' : 'text-secondary-foreground'}>
                {icon}
              </span>
            )}
          </SliderPrimitive.Value>
        )}
        {thumbs.map((index) => (
          <SliderThumb index={index} key={index} showValueIndicator={showValueIndicator} styles={styles} />
        ))}
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  )
}

export type { SliderProps, SliderSize, SliderVariant }
export { Slider }
