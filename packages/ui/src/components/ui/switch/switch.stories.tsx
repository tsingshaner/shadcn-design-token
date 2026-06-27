import type { Meta, StoryObj } from '@storybook/react-vite'

import { Field, FieldDescription, FieldLabel } from '../field'
import { Label } from '../label'
import { Switch } from './switch'

const meta = {
  args: {
    defaultChecked: false
  },
  component: Switch,
  parameters: {
    docs: {
      description: {
        component:
          'A binary on/off control for settings and preferences. Examples and guidance reference the [shadcn/ui Switch documentation](https://ui.shadcn.com/docs/components/base/switch.md).'
      }
    }
  },
  tags: ['autodocs'],
  title: 'UI/Switch'
} satisfies Meta<typeof Switch>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Basic switch paired with a label. Reference: [shadcn/ui Switch Description example](https://ui.shadcn.com/docs/components/base/switch.md#description)'
      }
    }
  },
  render: (args) => (
    <div className="flex items-center gap-2">
      <Switch id="airplane-mode" {...args} />
      <Label htmlFor="airplane-mode">Airplane mode</Label>
    </div>
  )
}

export const WithDescription: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use FieldDescription to explain a switch setting. Reference: [shadcn/ui Switch Description example](https://ui.shadcn.com/docs/components/base/switch.md#description)'
      }
    }
  },
  render: () => (
    <Field className="max-w-sm grid-cols-[1fr_auto] items-center gap-x-3">
      <div className="grid gap-1.5">
        <FieldLabel htmlFor="switch-marketing">Marketing emails</FieldLabel>
        <FieldDescription>Receive emails about new products and features.</FieldDescription>
      </div>
      <Switch id="switch-marketing" />
    </Field>
  )
}

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use disabled for settings that cannot be changed. Reference: [shadcn/ui Switch Disabled example](https://ui.shadcn.com/docs/components/base/switch.md#disabled)'
      }
    }
  },
  render: () => (
    <Field className="max-w-sm grid-cols-[1fr_auto] items-center gap-x-3" data-disabled>
      <FieldLabel htmlFor="switch-disabled">Sync disabled</FieldLabel>
      <Switch disabled id="switch-disabled" />
    </Field>
  )
}

export const Checked: Story = {
  args: {
    defaultChecked: true
  },
  render: (args) => (
    <div className="flex items-center gap-2">
      <Switch id="notifications" {...args} />
      <Label htmlFor="notifications">Notifications</Label>
    </div>
  )
}
