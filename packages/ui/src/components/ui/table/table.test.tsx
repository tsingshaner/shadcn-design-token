import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './table'

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
      </Table>
    )

    expect(screen.getByRole('table')).toHaveAttribute('data-slot', 'table')
    expect(screen.getByRole('columnheader', { name: 'Name' })).toHaveAttribute('data-slot', 'table-head')
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
