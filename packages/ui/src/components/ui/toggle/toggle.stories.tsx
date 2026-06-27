import type { Meta, StoryObj } from '@storybook/react-vite'
import type { SVGProps } from 'react'

import { Toggle } from './toggle'

type IconProps = SVGProps<SVGSVGElement>

const BoldIcon = (props: IconProps) => (
  <svg
    aria-hidden="true"
    className="size-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M6 4h8a4 4 0 0 1 0 8H6z" />
    <path d="M6 12h9a4 4 0 0 1 0 8H6z" />
  </svg>
)

const ItalicIcon = (props: IconProps) => (
  <svg
    aria-hidden="true"
    className="size-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M10 4h8" />
    <path d="M6 20h8" />
    <path d="m14 4-4 16" />
  </svg>
)

const meta = {
  args: {
    children: 'Bold'
  },
  component: Toggle,
  parameters: {
    docs: {
      description: {
        component:
          'A two-state button control for enabling and disabling an option. Examples and guidance reference the [shadcn/ui Toggle documentation](https://ui.shadcn.com/docs/components/base/toggle.md).'
      }
    }
  },
  tags: ['autodocs'],
  title: 'UI/Toggle'
} satisfies Meta<typeof Toggle>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Outline: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Covers outline toggles from [shadcn/ui Toggle Outline](https://ui.shadcn.com/docs/components/base/toggle.md#outline).'
      }
    }
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Toggle aria-label="Toggle italic" variant="outline">
        <ItalicIcon />
        Italic
      </Toggle>
      <Toggle aria-label="Toggle bold" variant="outline">
        <BoldIcon />
        Bold
      </Toggle>
    </div>
  )
}

export const WithText: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Covers icon plus text labels from [shadcn/ui Toggle With Text](https://ui.shadcn.com/docs/components/base/toggle.md#with-text).'
      }
    }
  },
  render: () => (
    <Toggle aria-label="Toggle italic">
      <ItalicIcon />
      Italic
    </Toggle>
  )
}

export const Size: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Covers toggle sizes from [shadcn/ui Toggle Size](https://ui.shadcn.com/docs/components/base/toggle.md#size).'
      }
    }
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Toggle aria-label="Toggle small" size="sm" variant="outline">
        Small
      </Toggle>
      <Toggle aria-label="Toggle default" size="default" variant="outline">
        Default
      </Toggle>
      <Toggle aria-label="Toggle large" size="lg" variant="outline">
        Large
      </Toggle>
    </div>
  )
}

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Covers disabled toggles from [shadcn/ui Toggle Disabled](https://ui.shadcn.com/docs/components/base/toggle.md#disabled).'
      }
    }
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Toggle aria-label="Toggle disabled" disabled>
        Disabled
      </Toggle>
      <Toggle aria-label="Toggle disabled outline" disabled variant="outline">
        Disabled
      </Toggle>
    </div>
  )
}
