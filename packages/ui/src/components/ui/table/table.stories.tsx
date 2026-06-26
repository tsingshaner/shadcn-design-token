import type { Meta, StoryObj } from '@storybook/react-vite'

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './table'

const meta = {
  component: Table,
  tags: ['autodocs'],
  title: 'UI/Table'
} satisfies Meta<typeof Table>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Table>
      <TableCaption>Recent token syncs</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Component</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Tokens</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Button</TableCell>
          <TableCell>Synced</TableCell>
          <TableCell className="text-right">18</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Card</TableCell>
          <TableCell>Synced</TableCell>
          <TableCell className="text-right">12</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
