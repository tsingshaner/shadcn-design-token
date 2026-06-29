import { expect, within } from 'storybook/test'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { Field, FieldLabel } from '../field'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../select'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from './pagination'

const meta = {
  component: Pagination,
  parameters: {
    docs: {
      description: {
        component:
          'Navigation controls for moving between pages of content. Examples and guidance reference the [shadcn/ui Pagination documentation](https://ui.shadcn.com/docs/components/base/pagination.md).'
      }
    }
  },
  tags: ['autodocs'],
  title: 'UI/Pagination'
} satisfies Meta<typeof Pagination>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'A simple pagination with only page numbers. Reference: [shadcn/ui Pagination Simple example](https://ui.shadcn.com/docs/components/base/pagination.md#simple)'
      }
    }
  },
  render: () => (
    <Pagination>
      <PaginationContent>
        {[1, 2, 3, 4, 5].map((page) => (
          <PaginationItem key={page}>
            <PaginationLink href="#" isActive={page === 2}>
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
      </PaginationContent>
    </Pagination>
  )
}
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(canvas.getByRole('navigation', { name: 'pagination' })).toHaveAttribute('data-slot', 'pagination')
  await expect(canvas.getByRole('button', { name: '2' })).toHaveAttribute('aria-current', 'page')
  await expect(canvas.getAllByRole('button')).toHaveLength(5)
}

export const IconsOnly: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use previous and next controls without page numbers for compact pagination. Reference: [shadcn/ui Pagination Icons Only example](https://ui.shadcn.com/docs/components/base/pagination.md#icons-only)'
      }
    }
  },
  render: () => (
    <div className="flex items-center justify-between gap-4">
      <Field className="w-fit grid-cols-[auto_auto] items-center">
        <FieldLabel htmlFor="select-rows-per-page">Rows per page</FieldLabel>
        <Select defaultValue="25" items={['10', '25', '50', '100']}>
          <SelectTrigger className="w-20" id="select-rows-per-page">
            <SelectValue />
          </SelectTrigger>
          <SelectContent align="start">
            <SelectGroup>
              {['10', '25', '50', '100'].map((value) => (
                <SelectItem key={value} value={value}>
                  {value}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>
      <Pagination className="mx-0 w-auto">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
IconsOnly.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(canvas.getByText('Rows per page')).toBeVisible()
  await expect(canvas.getByRole('button', { name: 'Go to previous page' })).toHaveAttribute(
    'data-slot',
    'pagination-link'
  )
  await expect(canvas.getByRole('button', { name: 'Go to next page' })).toHaveAttribute('data-slot', 'pagination-link')
}
