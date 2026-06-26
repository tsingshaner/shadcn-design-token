import type { Meta, StoryObj } from '@storybook/react-vite'

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './carousel'

const meta = {
  component: Carousel,
  title: 'Components/Carousel'
} satisfies Meta<typeof Carousel>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Carousel className="w-80" itemCount={3}>
      <CarouselContent>
        {[1, 2, 3].map((item) => (
          <CarouselItem key={item}>
            <div className="flex aspect-video items-center justify-center rounded-md border bg-muted font-medium text-2xl">
              {item}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
