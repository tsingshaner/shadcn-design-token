import type { Meta, StoryObj } from '@storybook/react-vite'

import { Field, FieldDescription, FieldLabel } from '../field'
import { Label } from '../label'
import { Checkbox } from './checkbox'

const meta = {
  args: {
    defaultChecked: false
  },
  component: Checkbox,
  parameters: {
    docs: {
      description: {
        component:
          'A binary input for selecting one or more options. Examples and guidance reference the [shadcn/ui Checkbox documentation](https://ui.shadcn.com/docs/components/base/checkbox.md).'
      }
    }
  },
  tags: ['autodocs'],
  title: 'UI/Checkbox'
} satisfies Meta<typeof Checkbox>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Basic checkbox paired with a visible label. Reference: [shadcn/ui Checkbox Basic example](https://ui.shadcn.com/docs/components/base/checkbox.md#basic)'
      }
    }
  },
  render: (args) => (
    <div className="flex items-center gap-2">
      <Checkbox id="terms" {...args} />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  )
}

export const Checked: Story = {
  args: {
    defaultChecked: true
  },
  render: (args) => (
    <div className="flex items-center gap-2">
      <Checkbox id="checked" {...args} />
      <Label htmlFor="checked">Checked</Label>
    </div>
  )
}

export const WithDescription: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use FieldDescription for secondary explanatory text. Reference: [shadcn/ui Checkbox Description example](https://ui.shadcn.com/docs/components/base/checkbox.md#description)'
      }
    }
  },
  render: () => (
    <Field className="max-w-sm grid-cols-[auto_1fr] gap-x-3">
      <Checkbox id="checkbox-description" />
      <div className="grid gap-1.5">
        <FieldLabel htmlFor="checkbox-description">Accept terms and conditions</FieldLabel>
        <FieldDescription>You agree to our Terms of Service and Privacy Policy.</FieldDescription>
      </div>
    </Field>
  )
}

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use disabled for unavailable options. Reference: [shadcn/ui Checkbox Disabled example](https://ui.shadcn.com/docs/components/base/checkbox.md#disabled)'
      }
    }
  },
  render: () => (
    <Field className="max-w-sm grid-cols-[auto_1fr] gap-x-3" data-disabled>
      <Checkbox disabled id="checkbox-disabled" />
      <FieldLabel htmlFor="checkbox-disabled">Enable sync</FieldLabel>
    </Field>
  )
}

export const Group: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Group related checkboxes for multi-select preferences. Reference: [shadcn/ui Checkbox Group example](https://ui.shadcn.com/docs/components/base/checkbox.md#group)'
      }
    }
  },
  render: () => (
    <div className="grid max-w-sm gap-3">
      {['Colors', 'Typography', 'Spacing'].map((item) => (
        <div className="flex items-center gap-2" key={item}>
          <Checkbox id={`checkbox-${item.toLowerCase()}`} />
          <Label htmlFor={`checkbox-${item.toLowerCase()}`}>{item}</Label>
        </div>
      ))}
    </div>
  )
}
