import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './carousel'

afterEach(cleanup)

describe('Carousel', () => {
  it('moves to the next slide', () => {
    render(
      <Carousel itemCount={2}>
        <CarouselContent data-testid="content">
          <CarouselItem>Slide one</CarouselItem>
          <CarouselItem>Slide two</CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    )

    fireEvent.click(screen.getByLabelText('Next slide'))

    expect(screen.getByTestId('content')).toHaveStyle({ transform: 'translateX(-100%)' })
  })
})
