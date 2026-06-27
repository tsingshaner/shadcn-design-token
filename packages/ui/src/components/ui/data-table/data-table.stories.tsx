import type { Meta, StoryObj } from '@storybook/react-vite'

import { DataTable, type DataTableColumn } from './data-table'

type Invoice = {
  amount: number
  customer: string
  status: string
}

const columns: DataTableColumn<Invoice>[] = [
  { accessorKey: 'customer', header: 'Customer', id: 'customer', sortable: true },
  { accessorKey: 'status', header: 'Status', id: 'status' },
  {
    accessorKey: 'amount',
    cell: (invoice) => `$${invoice.amount.toFixed(2)}`,
    header: 'Amount',
    id: 'amount',
    sortable: true
  }
]

const data: Invoice[] = [
  { amount: 250, customer: 'Avery Stone', status: 'Paid' },
  { amount: 125, customer: 'Mia Chen', status: 'Pending' },
  { amount: 540, customer: 'Noah Park', status: 'Paid' }
]

const meta = {
  component: DataTable,
  parameters: {
    docs: {
      description: {
        component:
          'A tabular data view with structured columns and row rendering. Examples and guidance reference the [shadcn/ui Data Table documentation](https://ui.shadcn.com/docs/components/base/data-table.md).'
      }
    }
  },
  tags: ['autodocs'],
  title: 'Components/Data Table'
} satisfies Meta<typeof DataTable>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <DataTable columns={columns} data={data} getRowId={(invoice) => invoice.customer} />
}
