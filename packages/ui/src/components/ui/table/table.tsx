import { cn } from 'cn'

import type { ComponentProps } from 'react'

type TableProps = ComponentProps<'table'>

const Table = ({ className, ...props }: TableProps) => (
  <div className="relative w-full overflow-x-auto" data-scope="table" data-slot="container">
    <table className={cn('w-full caption-bottom text-sm', className)} data-scope="table" data-slot="root" {...props} />
  </div>
)

const TableHeader = ({ className, ...props }: ComponentProps<'thead'>) => (
  <thead className={cn('[&_tr]:border-b', className)} data-scope="table" data-slot="header" {...props} />
)

const TableBody = ({ className, ...props }: ComponentProps<'tbody'>) => (
  <tbody className={cn('[&_tr:last-child]:border-0', className)} data-scope="table" data-slot="body" {...props} />
)

const TableFooter = ({ className, ...props }: ComponentProps<'tfoot'>) => (
  <tfoot
    className={cn('border-t bg-muted/50 font-medium [&>tr]:last:border-b-0', className)}
    data-scope="table"
    data-slot="footer"
    {...props}
  />
)

const TableRow = ({ className, ...props }: ComponentProps<'tr'>) => (
  <tr
    className={cn(
      'border-b transition-colors hover:bg-muted/50 has-aria-expanded:bg-muted/50 data-[state=selected]:bg-muted',
      className
    )}
    data-scope="table"
    data-slot="row"
    {...props}
  />
)

const TableHead = ({ className, ...props }: ComponentProps<'th'>) => (
  <th
    className={cn('h-10 whitespace-nowrap px-2 text-left align-middle font-medium text-muted-foreground', className)}
    data-scope="table"
    data-slot="head"
    {...props}
  />
)

const TableCell = ({ className, ...props }: ComponentProps<'td'>) => (
  <td className={cn('whitespace-nowrap p-2 align-middle', className)} data-scope="table" data-slot="cell" {...props} />
)

const TableCaption = ({ className, ...props }: ComponentProps<'caption'>) => (
  <caption
    className={cn('mt-4 text-muted-foreground text-sm', className)}
    data-scope="table"
    data-slot="caption"
    {...props}
  />
)

export type { TableProps }
export { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow }
