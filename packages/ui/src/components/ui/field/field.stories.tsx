import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../button'
import { Checkbox } from '../checkbox'
import { Input } from '../input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../select'
import { Switch } from '../switch'
import { Textarea } from '../textarea'
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle
} from './field'

const departments = [
  { label: 'Engineering', value: 'engineering' },
  { label: 'Design', value: 'design' },
  { label: 'Marketing', value: 'marketing' },
  { label: 'Sales', value: 'sales' }
]

const meta = {
  component: Field,
  parameters: {
    docs: {
      description: {
        component:
          'Form field primitives for labels, descriptions, validation messages, and layout grouping. Examples and guidance reference the [shadcn/ui Field documentation](https://ui.shadcn.com/docs/components/base/field.md).'
      }
    }
  },
  tags: ['autodocs'],
  title: 'UI/Field'
} satisfies Meta<typeof Field>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Compose Field, FieldLabel, FieldDescription, and Input for common form rows. Reference: [shadcn/ui Field Input example](https://ui.shadcn.com/docs/components/base/field.md#input)'
      }
    }
  },
  render: () => (
    <FieldSet className="max-w-sm">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="name">Name</FieldLabel>
          <Input id="name" placeholder="Design token set" />
          <FieldDescription>Use a short name that describes this token collection.</FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="slug">Slug</FieldLabel>
          <Input aria-invalid id="slug" placeholder="tokens" />
          <FieldError>Slug is already in use.</FieldError>
        </Field>
      </FieldGroup>
    </FieldSet>
  )
}

export const TextareaExample: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use the same Field structure with Textarea for longer form content. Reference: [shadcn/ui Field Textarea example](https://ui.shadcn.com/docs/components/base/field.md#textarea)'
      }
    }
  },
  render: () => (
    <FieldSet className="max-w-sm">
      <Field>
        <FieldLabel htmlFor="feedback">Feedback</FieldLabel>
        <Textarea id="feedback" placeholder="Your feedback helps us improve..." rows={4} />
        <FieldDescription>Share your thoughts about our service.</FieldDescription>
      </Field>
    </FieldSet>
  )
}

export const SelectExample: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Compose Select with FieldLabel and FieldDescription for option picking. Reference: [shadcn/ui Field Select example](https://ui.shadcn.com/docs/components/base/field.md#select)'
      }
    }
  },
  render: () => (
    <Field className="max-w-sm">
      <FieldLabel htmlFor="department">Department</FieldLabel>
      <Select defaultValue="engineering" items={departments}>
        <SelectTrigger id="department">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {departments.map((department) => (
              <SelectItem key={department.value} value={department.value}>
                {department.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <FieldDescription>Select your department or area of work.</FieldDescription>
    </Field>
  )
}

export const CheckboxExample: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use horizontal Field composition for checkbox labels. Reference: [shadcn/ui Field Checkbox example](https://ui.shadcn.com/docs/components/base/field.md#checkbox)'
      }
    }
  },
  render: () => (
    <FieldSet className="max-w-sm">
      <FieldLegend variant="label">Show these items on the desktop</FieldLegend>
      <FieldDescription>Select the items you want to show on the desktop.</FieldDescription>
      <FieldGroup className="gap-3">
        {['Hard disks', 'External disks', 'CDs, DVDs, and iPods'].map((item) => (
          <Field className="grid-cols-[auto_1fr] gap-x-3" key={item}>
            <Checkbox id={`field-checkbox-${item.toLowerCase().replaceAll(/[^a-z]+/g, '-')}`} />
            <FieldLabel
              className="font-normal"
              htmlFor={`field-checkbox-${item.toLowerCase().replaceAll(/[^a-z]+/g, '-')}`}
            >
              {item}
            </FieldLabel>
          </Field>
        ))}
      </FieldGroup>
    </FieldSet>
  )
}

export const SwitchExample: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Pair Switch with FieldContent when the label needs a description. Reference: [shadcn/ui Field Switch example](https://ui.shadcn.com/docs/components/base/field.md#switch)'
      }
    }
  },
  render: () => (
    <Field className="max-w-sm grid-cols-[1fr_auto] items-center gap-x-3">
      <FieldContent>
        <FieldLabel htmlFor="field-switch-marketing">Marketing emails</FieldLabel>
        <FieldDescription>Receive emails about new products and features.</FieldDescription>
      </FieldContent>
      <Switch id="field-switch-marketing" />
    </Field>
  )
}

export const FieldsetExample: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use FieldGroup and grid layout for related field sets. Reference: [shadcn/ui Field Fieldset example](https://ui.shadcn.com/docs/components/base/field.md#fieldset)'
      }
    }
  },
  render: () => (
    <FieldSet className="max-w-sm">
      <FieldLegend>Address Information</FieldLegend>
      <FieldDescription>We need your address to deliver your order.</FieldDescription>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="street">Street Address</FieldLabel>
          <Input id="street" placeholder="123 Main St" type="text" />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor="city">City</FieldLabel>
            <Input id="city" placeholder="New York" type="text" />
          </Field>
          <Field>
            <FieldLabel htmlFor="zip">Postal Code</FieldLabel>
            <Input id="zip" placeholder="90502" type="text" />
          </Field>
        </div>
      </FieldGroup>
    </FieldSet>
  )
}

export const FieldSeparatorExample: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use FieldSeparator to divide sections in a long FieldGroup. Reference: [shadcn/ui Field FieldSeparator API](https://ui.shadcn.com/docs/components/base/field.md#fieldseparator)'
      }
    }
  },
  render: () => (
    <FieldGroup className="max-w-sm">
      <FieldSet>
        <FieldLegend>Payment Method</FieldLegend>
        <FieldDescription>All transactions are secure and encrypted.</FieldDescription>
      </FieldSet>
      <FieldSeparator />
      <FieldSet>
        <FieldLegend>Billing Address</FieldLegend>
        <FieldDescription>The billing address associated with your payment method.</FieldDescription>
      </FieldSet>
      <Field className="flex-row justify-end">
        <Button type="button" variant="outline">
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </Field>
    </FieldGroup>
  )
}

export const FieldTitleExample: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use FieldTitle when the control is not labelable or the title is paired with a non-input control. Reference: [shadcn/ui Field FieldTitle API](https://ui.shadcn.com/docs/components/base/field.md#fieldtitle)'
      }
    }
  },
  render: () => (
    <Field className="max-w-sm">
      <FieldTitle>Price Range</FieldTitle>
      <FieldDescription>Use this title pattern for composite controls such as sliders.</FieldDescription>
    </Field>
  )
}
