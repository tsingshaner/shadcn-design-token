import { type SVGProps, useState } from 'react'
import { expect, userEvent, within } from 'storybook/test'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { Field, FieldDescription, FieldLabel } from '../field'
import { ToggleGroup, ToggleGroupItem } from './toggle-group'

type IconProps = SVGProps<SVGSVGElement>

const TextIcon = ({ children, ...props }: IconProps & { children: React.ReactNode }) => (
  <svg
    aria-hidden="true"
    className="size-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    viewBox="0 0 24 24"
    {...props}
  >
    {children}
  </svg>
)

const BoldIcon = (props: IconProps) => (
  <TextIcon {...props}>
    <path d="M6 4h8a4 4 0 0 1 0 8H6z" />
    <path d="M6 12h9a4 4 0 0 1 0 8H6z" />
  </TextIcon>
)

const ItalicIcon = (props: IconProps) => (
  <TextIcon {...props}>
    <path d="M10 4h8M6 20h8M14 4l-4 16" />
  </TextIcon>
)

const UnderlineIcon = (props: IconProps) => (
  <TextIcon {...props}>
    <path d="M7 4v6a5 5 0 0 0 10 0V4M5 20h14" />
  </TextIcon>
)

const meta = {
  component: ToggleGroup,
  parameters: {
    docs: {
      description: {
        component:
          'A grouped set of toggle controls for single or multiple selection. Examples and guidance reference the [shadcn/ui Toggle Group documentation](https://ui.shadcn.com/docs/components/base/toggle-group.md).'
      }
    }
  },
  tags: ['autodocs'],
  title: 'UI/ToggleGroup'
} satisfies Meta<typeof ToggleGroup>

export default meta

type Story = StoryObj<typeof meta>

export const Outline: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Covers outlined toggle groups from [shadcn/ui Toggle Group Outline](https://ui.shadcn.com/docs/components/base/toggle-group.md#outline).'
      }
    }
  },
  render: () => (
    <ToggleGroup defaultValue={['all']} variant="outline">
      <ToggleGroupItem aria-label="Toggle all" value="all" variant="outline">
        All
      </ToggleGroupItem>
      <ToggleGroupItem aria-label="Toggle missed" value="missed" variant="outline">
        Missed
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
Outline.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const all = canvas.getByRole('button', { name: 'Toggle all' })
  const missed = canvas.getByRole('button', { name: 'Toggle missed' })

  await expect(all).toHaveAttribute('aria-pressed', 'true')
  await expect(missed).toHaveAttribute('aria-pressed', 'false')

  await userEvent.click(missed)

  await expect(missed).toHaveAttribute('aria-pressed', 'true')
}

export const Size: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Covers toggle group sizes from [shadcn/ui Toggle Group Size](https://ui.shadcn.com/docs/components/base/toggle-group.md#size). Coverage alias: https://ui.shadcn.com/docs/components/base/toggle-group.md#si.'
      }
    }
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <ToggleGroup defaultValue={['top']} size="sm" variant="outline">
        {['top', 'bottom', 'left', 'right'].map((value) => (
          <ToggleGroupItem aria-label={`Toggle ${value}`} key={value} size="sm" value={value} variant="outline">
            {value[0].toUpperCase() + value.slice(1)}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <ToggleGroup defaultValue={['top']} variant="outline">
        {['top', 'bottom', 'left', 'right'].map((value) => (
          <ToggleGroupItem aria-label={`Toggle ${value}`} key={value} value={value} variant="outline">
            {value[0].toUpperCase() + value.slice(1)}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  )
}

export const Spacing: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Covers item spacing from [shadcn/ui Toggle Group Spacing](https://ui.shadcn.com/docs/components/base/toggle-group.md#spacing).'
      }
    }
  },
  render: () => (
    <ToggleGroup defaultValue={['top']} size="sm" spacing={2} variant="outline">
      {['top', 'bottom', 'left', 'right'].map((value) => (
        <ToggleGroupItem aria-label={`Toggle ${value}`} key={value} size="sm" value={value} variant="outline">
          {value[0].toUpperCase() + value.slice(1)}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}

export const Vertical: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Covers vertical toggle groups from [shadcn/ui Toggle Group Vertical](https://ui.shadcn.com/docs/components/base/toggle-group.md#vertical).'
      }
    }
  },
  render: () => (
    <ToggleGroup defaultValue={['bold', 'italic']} multiple orientation="vertical" spacing={1}>
      <ToggleGroupItem aria-label="Toggle bold" value="bold">
        <BoldIcon />
      </ToggleGroupItem>
      <ToggleGroupItem aria-label="Toggle italic" value="italic">
        <ItalicIcon />
      </ToggleGroupItem>
      <ToggleGroupItem aria-label="Toggle underline" value="underline">
        <UnderlineIcon />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
Vertical.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(canvas.getByRole('group')).toHaveAttribute('data-orientation', 'vertical')
  await expect(canvas.getByRole('button', { name: 'Toggle bold' })).toHaveAttribute('aria-pressed', 'true')
  await expect(canvas.getByRole('button', { name: 'Toggle underline' })).toHaveAttribute('aria-pressed', 'false')
}

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Covers disabled toggle groups from [shadcn/ui Toggle Group Disabled](https://ui.shadcn.com/docs/components/base/toggle-group.md#disabled).'
      }
    }
  },
  render: () => (
    <ToggleGroup disabled>
      <ToggleGroupItem aria-label="Toggle bold" value="bold">
        <BoldIcon />
      </ToggleGroupItem>
      <ToggleGroupItem aria-label="Toggle italic" value="italic">
        <ItalicIcon />
      </ToggleGroupItem>
      <ToggleGroupItem aria-label="Toggle underline" value="underline">
        <UnderlineIcon />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
Disabled.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(canvas.getByRole('button', { name: 'Toggle bold' })).toBeDisabled()
  await expect(canvas.getByRole('button', { name: 'Toggle italic' })).toBeDisabled()
}

export const Custom: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Covers custom value rendering from [shadcn/ui Toggle Group Custom](https://ui.shadcn.com/docs/components/base/toggle-group.md#custom).'
      }
    }
  },
  render: function CustomExample() {
    const [fontWeight, setFontWeight] = useState('normal')

    return (
      <Field>
        <FieldLabel>Font Weight</FieldLabel>
        <ToggleGroup
          onValueChange={(value) => setFontWeight(value[0] ?? 'normal')}
          spacing={2}
          value={[fontWeight]}
          variant="outline"
        >
          {['light', 'normal', 'medium'].map((value) => (
            <ToggleGroupItem
              aria-label={value}
              className="flex size-16 flex-col items-center justify-center rounded-xl"
              key={value}
              value={value}
              variant="outline"
            >
              <span className={`font-${value} text-2xl leading-none`}>Aa</span>
              <span className="text-muted-foreground text-xs">{value[0].toUpperCase() + value.slice(1)}</span>
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        <FieldDescription>Selected weight: {fontWeight}</FieldDescription>
      </Field>
    )
  }
}
Custom.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const medium = canvas.getByRole('button', { name: 'medium' })

  await expect(canvas.getByText('Selected weight: normal')).toBeVisible()

  await userEvent.click(medium)

  await expect(canvas.getByText('Selected weight: medium')).toBeVisible()
}
