import { type ComponentProps, createContext, useCallback, useContext, useMemo, useState } from 'react'

import { cn } from '../../../lib/utils'
import { Button, type ButtonProps } from '../button'

type CarouselContextValue = {
  index: number
  itemCount: number
  orientation: 'horizontal' | 'vertical'
  scrollNext: () => void
  scrollPrevious: () => void
}

const CarouselContext = createContext<CarouselContextValue | null>(null)

type CarouselProps = ComponentProps<'div'> & {
  defaultIndex?: number
  itemCount?: number
  onIndexChange?: (index: number) => void
  orientation?: 'horizontal' | 'vertical'
}
type CarouselContentProps = ComponentProps<'div'>
type CarouselItemProps = ComponentProps<'div'>
type CarouselPreviousProps = ButtonProps
type CarouselNextProps = ButtonProps

const useCarousel = () => {
  const context = useContext(CarouselContext)

  if (!context) {
    throw new Error('useCarousel must be used within Carousel')
  }

  return context
}

const Carousel = ({
  className,
  defaultIndex = 0,
  itemCount = 1,
  onIndexChange,
  orientation = 'horizontal',
  ...props
}: CarouselProps) => {
  const [index, setIndex] = useState(defaultIndex)
  const setBoundedIndex = useCallback(
    (nextIndex: number) => {
      const boundedIndex = Math.min(Math.max(nextIndex, 0), Math.max(itemCount - 1, 0))
      setIndex(boundedIndex)
      onIndexChange?.(boundedIndex)
    },
    [itemCount, onIndexChange]
  )
  const value = useMemo(
    () => ({
      index,
      itemCount,
      orientation,
      scrollNext: () => setBoundedIndex(index + 1),
      scrollPrevious: () => setBoundedIndex(index - 1)
    }),
    [index, itemCount, orientation, setBoundedIndex]
  )

  return (
    <CarouselContext.Provider value={value}>
      <div className={cn('relative', className)} data-orientation={orientation} data-slot="carousel" {...props} />
    </CarouselContext.Provider>
  )
}

const CarouselContent = ({ className, style, ...props }: CarouselContentProps) => {
  const { index, orientation } = useCarousel()
  const transform = orientation === 'vertical' ? `translateY(-${index * 100}%)` : `translateX(-${index * 100}%)`

  return (
    <div className="overflow-hidden" data-slot="carousel-viewport">
      <div
        className={cn(
          'flex transition-transform duration-300 ease-out data-[orientation=vertical]:flex-col',
          className
        )}
        data-orientation={orientation}
        data-slot="carousel-content"
        style={{ transform, ...style }}
        {...props}
      />
    </div>
  )
}

const CarouselItem = ({ className, ...props }: CarouselItemProps) => (
  <div className={cn('min-w-0 shrink-0 grow-0 basis-full', className)} data-slot="carousel-item" {...props} />
)

const CarouselPrevious = ({ children, className, onClick, ...props }: CarouselPreviousProps) => {
  const { index, scrollPrevious } = useCarousel()

  return (
    <Button
      aria-label="Previous slide"
      className={cn('absolute top-1/2 left-2 -translate-y-1/2', className)}
      data-slot="carousel-previous"
      disabled={index === 0}
      onClick={(event) => {
        scrollPrevious()
        onClick?.(event)
      }}
      size="icon"
      variant="outline"
      {...props}
    >
      {children ?? (
        <svg
          aria-hidden="true"
          className="size-4"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
      )}
    </Button>
  )
}

const CarouselNext = ({ children, className, onClick, ...props }: CarouselNextProps) => {
  const { index, itemCount, scrollNext } = useCarousel()

  return (
    <Button
      aria-label="Next slide"
      className={cn('absolute top-1/2 right-2 -translate-y-1/2', className)}
      data-slot="carousel-next"
      disabled={index >= itemCount - 1}
      onClick={(event) => {
        scrollNext()
        onClick?.(event)
      }}
      size="icon"
      variant="outline"
      {...props}
    >
      {children ?? (
        <svg
          aria-hidden="true"
          className="size-4"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      )}
    </Button>
  )
}

export type { CarouselContentProps, CarouselItemProps, CarouselNextProps, CarouselPreviousProps, CarouselProps }
export { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, useCarousel }
