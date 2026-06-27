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
