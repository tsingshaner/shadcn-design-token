import { useState } from 'react'
import { expect, userEvent, within } from 'storybook/test'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { Field, FieldDescription, FieldLabel } from '../field'
import { Label } from '../label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../table'
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
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const checkbox = canvas.getByRole('checkbox', { name: 'Accept terms and conditions' })

  await expect(checkbox).not.toBeChecked()

  await userEvent.click(checkbox)

  await expect(checkbox).toBeChecked()
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
Checked.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(canvas.getByRole('checkbox', { name: 'Checked' })).toBeChecked()
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
Disabled.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(canvas.getByRole('checkbox', { name: 'Enable sync' })).toHaveAttribute('aria-disabled', 'true')
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

const tableData = [
  { email: 'sarah.chen@example.com', id: '1', name: 'Sarah Chen', role: 'Admin' },
  { email: 'marcus.rodriguez@example.com', id: '2', name: 'Marcus Rodriguez', role: 'User' },
  { email: 'priya.patel@example.com', id: '3', name: 'Priya Patel', role: 'User' },
  { email: 'david.kim@example.com', id: '4', name: 'David Kim', role: 'Editor' }
]

export const TableExample: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use Checkbox controls in table headers and rows for selection. Reference: [shadcn/ui Checkbox Table example](https://ui.shadcn.com/docs/components/base/checkbox.md#table)'
      }
    }
  },
  render: function CheckboxTable() {
    const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set(['1']))
    const selectAll = selectedRows.size === tableData.length

    const handleSelectAll = (checked: boolean) => {
      setSelectedRows(checked ? new Set(tableData.map((row) => row.id)) : new Set())
    }

    const handleSelectRow = (id: string, checked: boolean) => {
      const nextSelected = new Set(selectedRows)

      if (checked) {
        nextSelected.add(id)
      } else {
        nextSelected.delete(id)
      }

      setSelectedRows(nextSelected)
    }

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-8">
              <Checkbox checked={selectAll} id="select-all-checkbox" onCheckedChange={handleSelectAll} />
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData.map((row) => (
            <TableRow data-state={selectedRows.has(row.id) ? 'selected' : undefined} key={row.id}>
              <TableCell>
                <Checkbox
                  checked={selectedRows.has(row.id)}
                  id={`row-${row.id}-checkbox`}
                  onCheckedChange={(checked) => handleSelectRow(row.id, checked === true)}
                />
              </TableCell>
              <TableCell className="font-medium">{row.name}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
}
TableExample.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const selectAll = canvas.getAllByRole('checkbox')[0]

  await expect(canvas.getByRole('row', { name: /Sarah Chen/ })).toHaveAttribute('data-state', 'selected')

  await userEvent.click(selectAll)

  await expect(selectAll).toBeChecked()
  await expect(canvas.getByRole('row', { name: /David Kim/ })).toHaveAttribute('data-state', 'selected')
}
