import { expect, userEvent, within } from 'storybook/test'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { Field, FieldDescription, FieldLabel } from '../../ui/field'
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
  title: 'Material Design 3/Select'
} satisfies Meta<typeof Select>

export default meta

type Story = StoryObj<typeof meta>

const northAmerica = [
  { label: 'Eastern Standard Time', value: 'est' },
  { label: 'Central Standard Time', value: 'cst' },
  { label: 'Mountain Standard Time', value: 'mst' },
  { label: 'Pacific Standard Time', value: 'pst' },
  { label: 'Alaska Standard Time', value: 'akst' },
  { label: 'Hawaii Standard Time', value: 'hst' }
]
const europeAfrica = [
  { label: 'Greenwich Mean Time', value: 'gmt' },
  { label: 'Central European Time', value: 'cet' },
  { label: 'Eastern European Time', value: 'eet' },
  { label: 'Western European Summer Time', value: 'west' },
  { label: 'Central Africa Time', value: 'cat' },
  { label: 'East Africa Time', value: 'eat' }
]
const asia = [
  { label: 'Moscow Time', value: 'msk' },
  { label: 'India Standard Time', value: 'ist' },
  { label: 'China Standard Time', value: 'cst_china' },
  { label: 'Japan Standard Time', value: 'jst' },
  { label: 'Korea Standard Time', value: 'kst' },
  { label: 'Indonesia Central Standard Time', value: 'ist_indonesia' }
]
const australiaPacific = [
  { label: 'Australian Western Standard Time', value: 'awst' },
  { label: 'Australian Central Standard Time', value: 'acst' },
  { label: 'Australian Eastern Standard Time', value: 'aest' },
  { label: 'New Zealand Standard Time', value: 'nzst' },
  { label: 'Fiji Time', value: 'fjt' }
]
const southAmerica = [
  { label: 'Argentina Time', value: 'art' },
  { label: 'Bolivia Time', value: 'bot' },
  { label: 'Brasilia Time', value: 'brt' },
  { label: 'Chile Standard Time', value: 'clt' }
]
const timezoneGroups = [
  { items: northAmerica, label: 'North America' },
  { items: europeAfrica, label: 'Europe & Africa' },
  { items: asia, label: 'Asia' },
  { items: australiaPacific, label: 'Australia & Pacific' },
  { items: southAmerica, label: 'South America' }
]
const timezones = timezoneGroups.flatMap((group) => group.items)

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
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const page = within(canvasElement.ownerDocument.body)

  await userEvent.click(canvas.getByRole('combobox'))

  await expect(await page.findByText('Theme')).toHaveAttribute('data-slot', 'select-label')
  await expect(page.getByRole('option', { name: 'System' })).toHaveAttribute('data-slot', 'select-item')

  await userEvent.click(page.getByRole('option', { name: 'Light' }))

  await expect(canvas.getByRole('combobox')).toHaveTextContent('Light')
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
WithField.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const page = within(canvasElement.ownerDocument.body)

  await expect(canvas.getByLabelText('Department')).toHaveTextContent('engineering')
  await userEvent.click(canvas.getByLabelText('Department'))

  await expect(await page.findByRole('option', { name: 'Design' })).toHaveAttribute('data-slot', 'select-item')
  await expect(canvas.getByText('Select your department or area of work.')).toBeVisible()
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
Disabled.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(canvas.getByRole('combobox')).toBeDisabled()
  await expect(canvas.getByRole('combobox')).toHaveTextContent('system')
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
Invalid.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(canvas.getByLabelText('Theme')).toHaveAttribute('aria-invalid', 'true')
  await expect(canvas.getByText('Please select a valid theme.')).toBeVisible()
}

export const Scrollable: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use a constrained SelectContent for long option lists that scroll. Reference: [shadcn/ui Select Scrollable example](https://ui.shadcn.com/docs/components/base/select.md#scrollable)'
      }
    }
  },
  render: () => (
    <Select items={timezones}>
      <SelectTrigger className="w-full max-w-64">
        <SelectValue placeholder="Select a timezone" />
      </SelectTrigger>
      <SelectContent>
        {timezoneGroups.map((group) => (
          <SelectGroup key={group.label}>
            <SelectLabel>{group.label}</SelectLabel>
            {group.items.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  )
}
Scrollable.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const page = within(canvasElement.ownerDocument.body)

  await userEvent.click(canvas.getByRole('combobox'))

  await expect(await page.findByText('Australia & Pacific')).toHaveAttribute('data-slot', 'select-label')
  await expect(page.getByRole('option', { name: 'Japan Standard Time' })).toHaveAttribute('data-slot', 'select-item')
}
