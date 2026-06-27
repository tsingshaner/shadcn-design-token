import { expect, userEvent, within } from 'storybook/test'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './carousel'

const meta = {
  component: Carousel,
  parameters: {
    docs: {
      description: {
        component:
          'A content region for browsing a set of slides or panels. Examples and guidance reference the [shadcn/ui Carousel documentation](https://ui.shadcn.com/docs/components/base/carousel.md).'
      }
    }
  },
  tags: ['autodocs'],
  title: 'Components/Carousel'
} satisfies Meta<typeof Carousel>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Basic carousel with previous and next controls. Reference: [shadcn/ui Carousel Basic example](https://ui.shadcn.com/docs/components/base/carousel.md#basic)'
      }
    }
  },
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
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(canvas.getByRole('button', { name: 'Previous slide' })).toBeDisabled()
  await expect(canvas.getByRole('button', { name: 'Next slide' })).toBeEnabled()

  await userEvent.click(canvas.getByRole('button', { name: 'Next slide' }))

  await expect(canvas.getByRole('button', { name: 'Previous slide' })).toBeEnabled()

  await userEvent.click(canvas.getByRole('button', { name: 'Next slide' }))

  await expect(canvas.getByRole('button', { name: 'Next slide' })).toBeDisabled()
}

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Change carousel size by constraining the root width. Reference: [shadcn/ui Carousel Sizes example](https://ui.shadcn.com/docs/components/base/carousel.md#sizes)'
      }
    }
  },
  render: () => (
    <div className="flex flex-wrap items-start gap-8">
      {['w-56', 'w-80'].map((widthClass) => (
        <Carousel className={widthClass} itemCount={3} key={widthClass}>
          <CarouselContent>
            {[1, 2, 3].map((item) => (
              <CarouselItem key={item}>
                <div className="flex aspect-square items-center justify-center rounded-md border bg-muted font-medium text-xl">
                  {item}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      ))}
    </div>
  )
}
Sizes.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(canvasElement.querySelectorAll('[data-slot="carousel"]')).toHaveLength(2)
  await expect(canvas.getAllByRole('button', { name: 'Previous slide' })[0]).toBeDisabled()
  await expect(canvas.getAllByRole('button', { name: 'Next slide' })[1]).toBeEnabled()
}

export const Spacing: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Add spacing between carousel items with item padding. Reference: [shadcn/ui Carousel Spacing example](https://ui.shadcn.com/docs/components/base/carousel.md#spacing)'
      }
    }
  },
  render: () => (
    <Carousel className="w-80" itemCount={3}>
      <CarouselContent className="-ml-4">
        {[1, 2, 3].map((item) => (
          <CarouselItem className="pl-4" key={item}>
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
Spacing.play = async ({ canvasElement }) => {
  await expect(canvasElement.querySelector('[data-slot="carousel-content"]')).toHaveClass('-ml-4')
  await expect(canvasElement.querySelectorAll('[data-slot="carousel-item"]')).toHaveLength(3)
}

export const Orientation: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use vertical orientation for stacked slide movement. Reference: [shadcn/ui Carousel Orientation example](https://ui.shadcn.com/docs/components/base/carousel.md#orientation)'
      }
    }
  },
  render: () => (
    <Carousel className="w-64" itemCount={3} orientation="vertical">
      <CarouselContent className="h-64">
        {[1, 2, 3].map((item) => (
          <CarouselItem key={item}>
            <div className="flex h-64 items-center justify-center rounded-md border bg-muted font-medium text-2xl">
              {item}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="-top-4 left-1/2 -translate-x-1/2 translate-y-0 rotate-90" />
      <CarouselNext className="top-auto -bottom-4 left-1/2 -translate-x-1/2 translate-y-0 rotate-90" />
    </Carousel>
  )
}
Orientation.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(canvasElement.querySelector('[data-slot="carousel"]')).toHaveAttribute('data-orientation', 'vertical')
  await userEvent.click(canvas.getByRole('button', { name: 'Next slide' }))

  await expect(canvas.getByRole('button', { name: 'Previous slide' })).toBeEnabled()
}
