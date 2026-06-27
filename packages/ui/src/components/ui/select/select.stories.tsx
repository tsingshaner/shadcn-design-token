import type { Meta, StoryObj } from '@storybook/react-vite'

import { Field, FieldDescription, FieldLabel } from '../field'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue
} from './select'

const meta = {
  component: Select,
  parameters: {
    docs: {
      description: {
        component:
          'A custom select control for choosing from a list of options. Examples and guidance reference the [shadcn/ui Select documentation](https://ui.shadcn.com/docs/components/base/select.md).'
      }
    }
  },
  tags: ['autodocs'],
  title: 'UI/Select'
} satisfies Meta<typeof Select>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Basic grouped select with label and separator. Reference: [shadcn/ui Select Groups example](https://ui.shadcn.com/docs/components/base/select.md#groups)'
      }
    }
  },
  render: () => (
    <Select
      defaultValue="system"
      items={{
        dark: 'Dark',
        light: 'Light',
        system: 'System'
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Theme</SelectLabel>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectSeparator />
          <SelectItem value="system">System</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export const WithField: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Pair Select with FieldLabel and FieldDescription for form usage. Reference: [shadcn/ui Select Align Item With Trigger example](https://ui.shadcn.com/docs/components/base/select.md#align-item-with-trigger)'
      }
    }
  },
  render: () => (
    <Field className="max-w-sm">
      <FieldLabel htmlFor="select-department">Department</FieldLabel>
      <Select defaultValue="engineering" items={['engineering', 'design', 'marketing']}>
        <SelectTrigger id="select-department">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="engineering">Engineering</SelectItem>
            <SelectItem value="design">Design</SelectItem>
            <SelectItem value="marketing">Marketing</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <FieldDescription>Select your department or area of work.</FieldDescription>
    </Field>
  )
}

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use disabled on SelectTrigger for unavailable selections. Reference: [shadcn/ui Select Disabled example](https://ui.shadcn.com/docs/components/base/select.md#disabled)'
      }
    }
  },
  render: () => (
    <Select defaultValue="system" items={['light', 'dark', 'system']}>
      <SelectTrigger className="w-[180px]" disabled>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export const Invalid: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use aria-invalid on SelectTrigger for validation feedback. Reference: [shadcn/ui Select Invalid example](https://ui.shadcn.com/docs/components/base/select.md#invalid)'
      }
    }
  },
  render: () => (
    <Field className="max-w-sm" data-invalid>
      <FieldLabel htmlFor="select-invalid">Theme</FieldLabel>
      <Select items={['light', 'dark', 'system']}>
        <SelectTrigger aria-invalid id="select-invalid">
          <SelectValue placeholder="Select theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <FieldDescription>Please select a valid theme.</FieldDescription>
    </Field>
  )
}
