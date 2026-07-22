import { expect, userEvent, within } from 'storybook/test'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { Field, FieldContent, FieldDescription, FieldLabel, FieldLegend, FieldSet, FieldTitle } from '../../ui/field'
import { Label } from '../../ui/label'
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
  title: 'Material Design 3/RadioGroup'
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
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(canvas.getByRole('radio', { name: 'Comfortable' })).toBeChecked()
  await userEvent.click(canvas.getByRole('radio', { name: 'Compact' }))

  await expect(canvas.getByRole('radio', { name: 'Compact' })).toBeChecked()
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
WithDescription.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(canvas.getByRole('radio', { name: 'Comfortable' })).toBeChecked()
  await expect(canvas.getByText('More spacing for touch-heavy layouts.')).toBeVisible()
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
Disabled.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(canvas.getByRole('radio', { name: 'Basic' })).toBeChecked()
  await expect(canvas.getByRole('radio', { name: 'Enterprise' })).toHaveAttribute('aria-disabled', 'true')
}

export const ChoiceCard: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use FieldLabel to wrap the entire Field for card-style radio choices. Reference: [shadcn/ui Radio Group Choice Card example](https://ui.shadcn.com/docs/components/base/radio-group.md#choice-card)'
      }
    }
  },
  render: () => (
    <RadioGroup className="max-w-sm" defaultValue="plus">
      {[
        ['plus', 'Plus', 'For individuals and small teams.'],
        ['pro', 'Pro', 'For growing businesses.'],
        ['enterprise', 'Enterprise', 'For large teams and enterprises.']
      ].map(([value, title, description]) => (
        <FieldLabel htmlFor={`${value}-plan`} key={value}>
          <Field className="grid-cols-[1fr_auto] rounded-md border p-4">
            <FieldContent>
              <FieldTitle>{title}</FieldTitle>
              <FieldDescription>{description}</FieldDescription>
            </FieldContent>
            <RadioGroupItem id={`${value}-plan`} value={value} />
          </Field>
        </FieldLabel>
      ))}
    </RadioGroup>
  )
}
ChoiceCard.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(canvas.getByRole('radio', { name: 'Plus For individuals and small teams.' })).toBeChecked()
  await userEvent.click(canvas.getByRole('radio', { name: 'Pro For growing businesses.' }))

  await expect(canvas.getByRole('radio', { name: 'Pro For growing businesses.' })).toBeChecked()
}

export const Fieldset: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use FieldSet and FieldLegend to group radio items with a label and description. Reference: [shadcn/ui Radio Group Fieldset example](https://ui.shadcn.com/docs/components/base/radio-group.md#fieldset)'
      }
    }
  },
  render: () => (
    <FieldSet className="w-full max-w-xs">
      <FieldLegend variant="label">Subscription Plan</FieldLegend>
      <FieldDescription>Yearly and lifetime plans offer significant savings.</FieldDescription>
      <RadioGroup defaultValue="monthly">
        {[
          ['monthly', 'Monthly ($9.99/month)'],
          ['yearly', 'Yearly ($99.99/year)'],
          ['lifetime', 'Lifetime ($299.99)']
        ].map(([value, label]) => (
          <Field className="grid-cols-[auto_1fr]" key={value}>
            <RadioGroupItem id={`plan-${value}`} value={value} />
            <FieldLabel className="font-normal" htmlFor={`plan-${value}`}>
              {label}
            </FieldLabel>
          </Field>
        ))}
      </RadioGroup>
    </FieldSet>
  )
}
Fieldset.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(canvas.getByText('Subscription Plan')).toBeVisible()
  await expect(canvas.getByRole('radio', { name: 'Monthly ($9.99/month)' })).toBeChecked()
}

export const Invalid: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use aria-invalid on RadioGroupItem and data-invalid on Field for validation errors. Reference: [shadcn/ui Radio Group Invalid example](https://ui.shadcn.com/docs/components/base/radio-group.md#invalid)'
      }
    }
  },
  render: () => (
    <FieldSet className="w-full max-w-xs">
      <FieldLegend variant="label">Notification Preferences</FieldLegend>
      <FieldDescription>Choose how you want to receive notifications.</FieldDescription>
      <RadioGroup defaultValue="email">
        {[
          ['email', 'Email only'],
          ['sms', 'SMS only'],
          ['both', 'Both Email & SMS']
        ].map(([value, label]) => (
          <Field className="grid-cols-[auto_1fr]" data-invalid key={value}>
            <RadioGroupItem aria-invalid id={`invalid-${value}`} value={value} />
            <FieldLabel className="font-normal" htmlFor={`invalid-${value}`}>
              {label}
            </FieldLabel>
          </Field>
        ))}
      </RadioGroup>
    </FieldSet>
  )
}
Invalid.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(canvas.getByRole('radio', { name: 'Email only' })).toHaveAttribute('aria-invalid', 'true')
  await expect(canvas.getByRole('radio', { name: 'Email only' })).toBeChecked()
}
