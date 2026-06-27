import { expect } from 'storybook/test'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { Skeleton } from './skeleton'

const meta = {
  component: Skeleton,
  parameters: {
    docs: {
      description: {
        component:
          'A placeholder loading state that mirrors the shape of pending content. Examples and guidance reference the [shadcn/ui Skeleton documentation](https://ui.shadcn.com/docs/components/base/skeleton.md).'
      }
    }
  },
  tags: ['autodocs'],
  title: 'UI/Skeleton'
} satisfies Meta<typeof Skeleton>

export default meta

type Story = StoryObj<typeof meta>

export const Avatar: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use circular skeletons for avatar loading states. Reference: [shadcn/ui Skeleton Avatar example](https://ui.shadcn.com/docs/components/base/skeleton.md#avatar)'
      }
    }
  },
  render: () => (
    <div className="flex items-center gap-4">
      <Skeleton className="size-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-4 w-32" />
      </div>
    </div>
  )
}
Avatar.play = async ({ canvasElement }) => {
  const skeletons = canvasElement.querySelectorAll('[data-slot="skeleton"]')

  await expect(skeletons).toHaveLength(3)
  await expect(skeletons[0]).toHaveClass('rounded-full')
}

export const Card: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Build card-shaped placeholders from multiple skeleton blocks. Reference: [shadcn/ui Skeleton Card example](https://ui.shadcn.com/docs/components/base/skeleton.md#card)'
      }
    }
  },
  render: () => (
    <div className="w-80 space-y-3 rounded-lg border p-4">
      <Skeleton className="aspect-video w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  )
}
Card.play = async ({ canvasElement }) => {
  const skeletons = canvasElement.querySelectorAll('[data-slot="skeleton"]')

  await expect(skeletons).toHaveLength(3)
  await expect(skeletons[0]).toHaveClass('aspect-video')
}

export const Text: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use stacked lines for text loading states. Reference: [shadcn/ui Skeleton Text example](https://ui.shadcn.com/docs/components/base/skeleton.md#text)'
      }
    }
  },
  render: () => (
    <div className="w-80 space-y-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  )
}

export const Form: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use skeleton rows to reserve form layout while data loads. Reference: [shadcn/ui Skeleton Form example](https://ui.shadcn.com/docs/components/base/skeleton.md#form)'
      }
    }
  },
  render: () => (
    <div className="w-80 space-y-4">
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-9 w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-20 w-full" />
      </div>
    </div>
  )
}

export const Table: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use repeated skeleton rows for loading tables. Reference: [shadcn/ui Skeleton Table example](https://ui.shadcn.com/docs/components/base/skeleton.md#table)'
      }
    }
  },
  render: () => (
    <div className="w-[28rem] space-y-2">
      <div className="grid grid-cols-3 gap-4">
        <Skeleton className="h-4" />
        <Skeleton className="h-4" />
        <Skeleton className="h-4" />
      </div>
      {[1, 2, 3].map((row) => (
        <div className="grid grid-cols-3 gap-4" key={row}>
          <Skeleton className="h-8" />
          <Skeleton className="h-8" />
          <Skeleton className="h-8" />
        </div>
      ))}
    </div>
  )
}
Table.play = async ({ canvasElement }) => {
  await expect(canvasElement.querySelectorAll('[data-slot="skeleton"]')).toHaveLength(12)
}
