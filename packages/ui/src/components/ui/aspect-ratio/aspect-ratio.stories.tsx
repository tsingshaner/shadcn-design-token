import { expect, within } from 'storybook/test'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { AspectRatio } from './aspect-ratio'

const meta = {
  args: {
    ratio: 16 / 9
  },
  argTypes: {
    ratio: {
      control: 'number'
    }
  },
  component: AspectRatio,
  parameters: {
    docs: {
      description: {
        component:
          'A layout primitive that preserves a consistent width-to-height ratio for embedded content. Examples and guidance reference the [shadcn/ui Aspect Ratio documentation](https://ui.shadcn.com/docs/components/base/aspect-ratio.md).'
      }
    }
  },
  tags: ['autodocs'],
  title: 'UI/AspectRatio'
} satisfies Meta<typeof AspectRatio>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <AspectRatio {...args} className="max-w-md rounded-lg bg-muted">
      <div className="flex size-full items-center justify-center text-muted-foreground text-sm">16:9</div>
    </AspectRatio>
  )
}
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const aspectRatio = canvasElement.querySelector('[data-slot="aspect-ratio"]')

  await expect(canvas.getByText('16:9')).toBeVisible()
  await expect(aspectRatio).toHaveStyle({ aspectRatio: '1.7777777777777777' })
}

export const Square: Story = {
  args: {
    ratio: 1
  },
  parameters: {
    docs: {
      description: {
        story:
          'Use a 1:1 ratio for square media or icon previews. Reference: [shadcn/ui Aspect Ratio Square example](https://ui.shadcn.com/docs/components/base/aspect-ratio.md#square)'
      }
    }
  },
  render: (args) => (
    <AspectRatio {...args} className="max-w-56 rounded-lg bg-muted">
      <div className="flex size-full items-center justify-center text-muted-foreground text-sm">1:1</div>
    </AspectRatio>
  )
}
Square.play = async ({ canvasElement }) => {
  await expect(canvasElement.querySelector('[data-slot="aspect-ratio"]')).toHaveStyle({ aspectRatio: '1' })
}

export const Portrait: Story = {
  args: {
    ratio: 3 / 4
  },
  parameters: {
    docs: {
      description: {
        story:
          'Use a portrait ratio for tall media cards. Reference: [shadcn/ui Aspect Ratio Portrait example](https://ui.shadcn.com/docs/components/base/aspect-ratio.md#portrait)'
      }
    }
  },
  render: (args) => (
    <AspectRatio {...args} className="max-w-48 rounded-lg bg-muted">
      <div className="flex size-full items-center justify-center text-muted-foreground text-sm">3:4</div>
    </AspectRatio>
  )
}
Portrait.play = async ({ canvasElement }) => {
  await expect(canvasElement.querySelector('[data-slot="aspect-ratio"]')).toHaveStyle({ aspectRatio: '0.75' })
}
