import { expect, userEvent, within } from 'storybook/test'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel, FieldTitle } from '../field'
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
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const control = canvas.getByRole('switch', { name: 'Airplane mode' })

  await expect(control).not.toBeChecked()

  await userEvent.click(control)

  await expect(control).toBeChecked()
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

export const ChoiceCard: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Wrap card-style Field controls in FieldLabel for clickable switch choices. Reference: [shadcn/ui Switch Choice Card example](https://ui.shadcn.com/docs/components/base/switch.md#choice-card)'
      }
    }
  },
  render: () => (
    <FieldGroup className="w-full max-w-sm">
      <FieldLabel htmlFor="switch-share">
        <Field className="grid-cols-[1fr_auto] rounded-md border p-4">
          <FieldContent>
            <FieldTitle>Share across devices</FieldTitle>
            <FieldDescription>Focus is shared across devices, and turns off when you leave the app.</FieldDescription>
          </FieldContent>
          <Switch id="switch-share" />
        </Field>
      </FieldLabel>
      <FieldLabel htmlFor="switch-notifications">
        <Field className="grid-cols-[1fr_auto] rounded-md border p-4">
          <FieldContent>
            <FieldTitle>Enable notifications</FieldTitle>
            <FieldDescription>Receive notifications when focus mode is enabled or disabled.</FieldDescription>
          </FieldContent>
          <Switch defaultChecked id="switch-notifications" />
        </Field>
      </FieldLabel>
    </FieldGroup>
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
Disabled.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(canvas.getByRole('switch', { name: 'Sync disabled' })).toHaveAttribute('aria-disabled', 'true')
}

export const Invalid: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use aria-invalid on Switch and data-invalid on Field for validation state. Reference: [shadcn/ui Switch Invalid example](https://ui.shadcn.com/docs/components/base/switch.md#invalid)'
      }
    }
  },
  render: () => (
    <Field className="max-w-sm grid-cols-[1fr_auto] items-center gap-x-3" data-invalid>
      <FieldContent>
        <FieldLabel htmlFor="switch-terms">Accept terms and conditions</FieldLabel>
        <FieldDescription>You must accept the terms and conditions to continue.</FieldDescription>
      </FieldContent>
      <Switch aria-invalid id="switch-terms" />
    </Field>
  )
}

export const Size: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use the size prop to change switch dimensions. Reference: [shadcn/ui Switch Size example](https://ui.shadcn.com/docs/components/base/switch.md#size)'
      }
    }
  },
  render: () => (
    <FieldGroup className="w-full max-w-[10rem]">
      <Field className="grid-cols-[auto_1fr] items-center">
        <Switch id="switch-size-sm" size="sm" />
        <FieldLabel htmlFor="switch-size-sm">Small</FieldLabel>
      </Field>
      <Field className="grid-cols-[auto_1fr] items-center">
        <Switch id="switch-size-default" />
        <FieldLabel htmlFor="switch-size-default">Default</FieldLabel>
      </Field>
    </FieldGroup>
  )
}
Size.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(canvas.getByRole('switch', { name: 'Small' })).toHaveAttribute('data-size', 'sm')
  await expect(canvas.getByRole('switch', { name: 'Default' })).toHaveAttribute('data-size', 'default')
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
Checked.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(canvas.getByRole('switch', { name: 'Notifications' })).toBeChecked()
}
