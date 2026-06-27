import { expect, within } from 'storybook/test'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { Separator } from './separator'

const meta = {
  component: Separator,
  parameters: {
    docs: {
      description: {
        component:
          'A visual divider for separating content or menu groups. Examples and guidance reference the [shadcn/ui Separator documentation](https://ui.shadcn.com/docs/components/base/separator.md).'
      }
    }
  },
  tags: ['autodocs'],
  title: 'UI/Separator'
} satisfies Meta<typeof Separator>

export default meta

type Story = StoryObj<typeof meta>

export const Vertical: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use vertical orientation to divide inline items. Reference: [shadcn/ui Separator Vertical example](https://ui.shadcn.com/docs/components/base/separator.md#vertical)'
      }
    }
  },
  render: () => (
    <div className="w-72">
      <div className="space-y-1">
        <h4 className="font-medium text-sm leading-none">Design tokens</h4>
        <p className="text-muted-foreground text-sm">Shared primitives for components.</p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center gap-4 text-sm">
        <span>Color</span>
        <Separator orientation="vertical" />
        <span>Radius</span>
        <Separator orientation="vertical" />
        <span>Type</span>
      </div>
    </div>
  )
}
Vertical.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const separators = canvasElement.querySelectorAll('[data-slot="separator"]')

  await expect(canvas.getByText('Design tokens')).toBeVisible()
  await expect(separators).toHaveLength(3)
  await expect(separators[1]).toHaveAttribute('data-orientation', 'vertical')
}

export const Menu: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use separators to divide menu groups. Reference: [shadcn/ui Separator Menu example](https://ui.shadcn.com/docs/components/base/separator.md#menu)'
      }
    }
  },
  render: () => (
    <div className="grid w-48 gap-1 rounded-md border p-1 text-sm">
      <button className="rounded-sm px-2 py-1.5 text-left hover:bg-accent" type="button">
        Profile
      </button>
      <button className="rounded-sm px-2 py-1.5 text-left hover:bg-accent" type="button">
        Billing
      </button>
      <Separator className="my-1" />
      <button className="rounded-sm px-2 py-1.5 text-left text-destructive hover:bg-accent" type="button">
        Delete
      </button>
    </div>
  )
}
Menu.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(canvas.getByRole('button', { name: 'Profile' })).toBeEnabled()
  await expect(canvasElement.querySelector('[data-slot="separator"]')).toHaveAttribute('data-orientation', 'horizontal')
}

export const List: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use separators between repeated list rows. Reference: [shadcn/ui Separator List example](https://ui.shadcn.com/docs/components/base/separator.md#list)'
      }
    }
  },
  render: () => (
    <div className="w-72 rounded-md border">
      {['Color tokens', 'Typography scale', 'Radius values'].map((item, index) => (
        <div key={item}>
          <div className="px-4 py-3 text-sm">{item}</div>
          {index < 2 ? <Separator /> : null}
        </div>
      ))}
    </div>
  )
}
