import { type ReactNode, useMemo, useState } from 'react'

import { Button } from '../button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../table'

type DataTableColumn<TData> = {
  accessorKey?: keyof TData
  cell?: (row: TData) => ReactNode
  header: ReactNode
  id: string
  sortable?: boolean
}
type DataTableSort = {
  direction: 'asc' | 'desc'
  id: string
}
type DataTableProps<TData> = {
  columns: DataTableColumn<TData>[]
  data: TData[]
  emptyMessage?: ReactNode
  getRowId?: (row: TData, index: number) => string
}

const getCellValue = <TData,>(row: TData, column: DataTableColumn<TData>) => {
  if (!column.accessorKey) {
    return undefined
  }

  return row[column.accessorKey]
}

const DataTable = <TData,>({ columns, data, emptyMessage = 'No results.', getRowId }: DataTableProps<TData>) => {
  const [sort, setSort] = useState<DataTableSort | null>(null)
  const sortedData = useMemo(() => {
    if (!sort) {
      return data
    }

    const column = columns.find((item) => item.id === sort.id)

    if (!column) {
      return data
    }

    return [...data].sort((row, nextRow) => {
      const value = getCellValue(row, column)
      const nextValue = getCellValue(nextRow, column)
      const result = String(value ?? '').localeCompare(String(nextValue ?? ''), undefined, { numeric: true })

      return sort.direction === 'asc' ? result : -result
    })
  }, [columns, data, sort])

  const toggleSort = (column: DataTableColumn<TData>) => {
    if (!column.sortable) {
      return
    }

    setSort((currentSort) => ({
      direction: currentSort?.id === column.id && currentSort.direction === 'asc' ? 'desc' : 'asc',
      id: column.id
    }))
  }

  return (
    <Table data-slot="data-table">
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={column.id}>
              {column.sortable ? (
                <Button className="-ml-2 h-8 px-2" onClick={() => toggleSort(column)} size="sm" variant="ghost">
                  {column.header}
                  <span aria-hidden="true" className="text-muted-foreground">
                    {sort?.id === column.id && sort.direction === 'desc' ? '↓' : '↑'}
                  </span>
                </Button>
              ) : (
                column.header
              )}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedData.length > 0 ? (
          sortedData.map((row, index) => (
            <TableRow key={getRowId?.(row, index) ?? index}>
              {columns.map((column) => (
                <TableCell key={column.id}>
                  {column.cell ? column.cell(row) : String(getCellValue(row, column) ?? '')}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell className="h-24 text-center text-muted-foreground" colSpan={columns.length}>
              {emptyMessage}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

export type { DataTableColumn, DataTableProps, DataTableSort }
export { DataTable }
