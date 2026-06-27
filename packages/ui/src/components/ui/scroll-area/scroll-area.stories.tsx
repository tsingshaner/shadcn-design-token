import type { Meta, StoryObj } from '@storybook/react-vite'

import { Separator } from '../separator'
import { ScrollArea, ScrollBar } from './scroll-area'

const meta = {
  component: ScrollArea,
  parameters: {
    docs: {
      description: {
        component:
          'A styled scroll container with custom scrollbars. Examples and guidance reference the [shadcn/ui Scroll Area documentation](https://ui.shadcn.com/docs/components/base/scroll-area.md).'
      }
    }
  },
  tags: ['autodocs'],
  title: 'UI/ScrollArea'
} satisfies Meta<typeof ScrollArea>

export default meta

type Story = StoryObj<typeof meta>

const tags = Array.from({ length: 24 }, (_, index) => `Token ${index + 1}`)
const works = [
  {
    art: 'https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80',
    artist: 'Ornella Binni'
  },
  {
    art: 'https://images.unsplash.com/photo-1548516173-3cabfa4607e9?auto=format&fit=crop&w=300&q=80',
    artist: 'Tom Byrom'
  },
  {
    art: 'https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80',
    artist: 'Vladimir Malyavko'
  }
]

export const Default: Story = {
  render: () => (
    <ScrollArea className="h-72 w-48 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 font-medium text-sm leading-none">Tokens</h4>
        {tags.map((tag) => (
          <div key={tag}>
            <div className="py-2 text-sm">{tag}</div>
            <Separator />
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}

export const Horizontal: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use ScrollBar with orientation="horizontal" for horizontal scrolling. Reference: [shadcn/ui Scroll Area Horizontal example](https://ui.shadcn.com/docs/components/base/scroll-area.md#horizontal)'
      }
    }
  },
  render: () => (
    <ScrollArea className="w-96 whitespace-nowrap rounded-md border">
      <div className="flex w-max space-x-4 p-4">
        {works.map((artwork) => (
          <figure className="shrink-0" key={artwork.artist}>
            <div className="overflow-hidden rounded-md">
              <img
                alt={`Artwork by ${artwork.artist}`}
                className="aspect-[3/4] h-[240px] w-[180px] object-cover"
                src={artwork.art}
              />
            </div>
            <figcaption className="pt-2 text-muted-foreground text-xs">
              Photo by <span className="font-semibold text-foreground">{artwork.artist}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
