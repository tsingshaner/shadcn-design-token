import type { Meta, StoryObj } from '@storybook/react-vite'
import type { SVGProps } from 'react'

import { Button } from '../button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../dropdown-menu'
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from './table'

type IconProps = SVGProps<SVGSVGElement>

const MoreHorizontalIcon = (props: IconProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M12 12h.01" />
    <path d="M19 12h.01" />
    <path d="M5 12h.01" />
  </svg>
)

const meta = {
  component: Table,
  parameters: {
    docs: {
      description: {
        component:
          'Semantic table primitives for structured row and column content. Examples and guidance reference the [shadcn/ui Table documentation](https://ui.shadcn.com/docs/components/base/table.md).'
      }
    }
  },
  tags: ['autodocs'],
  title: 'UI/Table'
} satisfies Meta<typeof Table>

export default meta

type Story = StoryObj<typeof meta>

const invoices = [
  { invoice: 'INV001', paymentMethod: 'Credit Card', paymentStatus: 'Paid', totalAmount: '$250.00' },
  { invoice: 'INV002', paymentMethod: 'PayPal', paymentStatus: 'Pending', totalAmount: '$150.00' },
  { invoice: 'INV003', paymentMethod: 'Bank Transfer', paymentStatus: 'Unpaid', totalAmount: '$350.00' }
]

const products = [
  { name: 'Wireless Mouse', price: '$29.99' },
  { name: 'Mechanical Keyboard', price: '$129.99' },
  { name: 'USB-C Hub', price: '$49.99' }
]

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use TableFooter to add a summary row. Reference: [shadcn/ui Table Footer example](https://ui.shadcn.com/docs/components/base/table.md#footer)'
      }
    }
  },
  render: () => (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="font-medium">{invoice.invoice}</TableCell>
            <TableCell>{invoice.paymentStatus}</TableCell>
            <TableCell>{invoice.paymentMethod}</TableCell>
            <TableCell className="text-right">{invoice.totalAmount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$750.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}

export const Actions: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use DropdownMenu inside table rows for row actions. Reference: [shadcn/ui Table Actions example](https://ui.shadcn.com/docs/components/base/table.md#actions)'
      }
    }
  },
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead>Price</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.name}>
            <TableCell className="font-medium">{product.name}</TableCell>
            <TableCell>{product.price}</TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger render={<Button className="size-8" size="icon" variant="ghost" />}>
                  <MoreHorizontalIcon />
                  <span className="sr-only">Open menu</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Duplicate</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive focus:text-destructive">Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
