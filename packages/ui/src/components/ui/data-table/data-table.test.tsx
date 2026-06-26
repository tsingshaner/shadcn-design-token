import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import { DataTable, type DataTableColumn } from './data-table'

type Task = {
  priority: string
  title: string
}

const columns: DataTableColumn<Task>[] = [
  { accessorKey: 'title', header: 'Title', id: 'title', sortable: true },
  { accessorKey: 'priority', header: 'Priority', id: 'priority' }
]

afterEach(cleanup)

describe('DataTable', () => {
  it('sorts rows by sortable columns', () => {
    render(
      <DataTable
        columns={columns}
        data={[
          { priority: 'Low', title: 'Write docs' },
          { priority: 'High', title: 'Fix bug' }
        ]}
        getRowId={(task) => task.title}
      />
    )

    fireEvent.click(screen.getByRole('button', { name: /title/i }))

    const rows = screen.getAllByRole('row')

    expect(rows[1]).toHaveTextContent('Fix bug')
  })
})
