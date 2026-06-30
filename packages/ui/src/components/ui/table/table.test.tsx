import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from './table'

describe('Table', () => {
  afterEach(() => {
    cleanup()
  })

  test('renders table sections and cells', () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Button</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>Total</TableCell>
          </TableRow>
        </TableFooter>
        <TableCaption>Components</TableCaption>
      </Table>
    )

    const table = screen.getByRole('table')
    const columnHeader = screen.getByRole('columnheader', { name: 'Name' })
    const bodyCell = screen.getByRole('cell', { name: 'Button' })
    const footerCell = screen.getByRole('cell', { name: 'Total' })
    expect(table.parentElement).toHaveClass('cn-table-container')
    expect(table).toHaveAttribute('data-slot', 'table')
    expect(table).toHaveClass('cn-table')
    expect(columnHeader).toHaveAttribute('data-slot', 'table-head')
    expect(columnHeader).toHaveClass('cn-table-head')
    expect(bodyCell).toHaveClass('cn-table-cell')
    expect(footerCell.closest('tfoot')).toHaveClass('cn-table-footer')
    expect(screen.getByText('Components')).toHaveClass('cn-table-caption')
  })

  test('supports expanded row state styling', () => {
    render(
      <Table>
        <TableBody>
          <TableRow aria-expanded="true">
            <TableCell>Details</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )

    expect(screen.getByRole('row')).toHaveClass('has-aria-expanded:bg-muted/50')
  })
})
