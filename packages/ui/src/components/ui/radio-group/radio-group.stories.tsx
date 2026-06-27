import type { Meta, StoryObj } from '@storybook/react-vite'

import { Field, FieldDescription, FieldLabel } from '../field'
import { Label } from '../label'
import { RadioGroup, RadioGroupItem } from './radio-group'

const meta = {
  component: RadioGroup,
  parameters: {
    docs: {
      description: {
        component:
          'A single-choice selection group with mutually exclusive options. Examples and guidance reference the [shadcn/ui Radio Group documentation](https://ui.shadcn.com/docs/components/base/radio-group.md).'
      }
    }
  },
  tags: ['autodocs'],
  title: 'UI/RadioGroup'
} satisfies Meta<typeof RadioGroup>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use RadioGroup for mutually exclusive choices. Reference: [shadcn/ui Radio Group Description example](https://ui.shadcn.com/docs/components/base/radio-group.md#description)'
      }
    }
  },
  render: () => (
    <RadioGroup defaultValue="comfortable">
      <div className="flex items-center gap-2">
        <RadioGroupItem id="default" value="default" />
        <Label htmlFor="default">Default</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem id="comfortable" value="comfortable" />
        <Label htmlFor="comfortable">Comfortable</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem id="compact" value="compact" />
        <Label htmlFor="compact">Compact</Label>
      </div>
    </RadioGroup>
  )
}

export const WithDescription: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Pair radio options with FieldDescription for choice details. Reference: [shadcn/ui Radio Group Description example](https://ui.shadcn.com/docs/components/base/radio-group.md#description)'
      }
    }
  },
  render: () => (
    <RadioGroup className="max-w-sm" defaultValue="comfortable">
      <Field className="grid-cols-[auto_1fr] gap-x-3">
        <RadioGroupItem id="radio-default" value="default" />
        <div className="grid gap-1.5">
          <FieldLabel htmlFor="radio-default">Default</FieldLabel>
          <FieldDescription>Standard density for most interfaces.</FieldDescription>
        </div>
      </Field>
      <Field className="grid-cols-[auto_1fr] gap-x-3">
        <RadioGroupItem id="radio-comfortable" value="comfortable" />
        <div className="grid gap-1.5">
          <FieldLabel htmlFor="radio-comfortable">Comfortable</FieldLabel>
          <FieldDescription>More spacing for touch-heavy layouts.</FieldDescription>
        </div>
      </Field>
    </RadioGroup>
  )
}

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use disabled for radio choices that are unavailable. Reference: [shadcn/ui Radio Group Disabled example](https://ui.shadcn.com/docs/components/base/radio-group.md#disabled)'
      }
    }
  },
  render: () => (
    <RadioGroup className="max-w-sm" defaultValue="basic">
      <div className="flex items-center gap-2">
        <RadioGroupItem id="radio-basic" value="basic" />
        <Label htmlFor="radio-basic">Basic</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem disabled id="radio-enterprise" value="enterprise" />
        <Label htmlFor="radio-enterprise">Enterprise</Label>
      </div>
    </RadioGroup>
  )
}
