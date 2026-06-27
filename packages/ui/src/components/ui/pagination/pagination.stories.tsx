import type { Meta, StoryObj } from '@storybook/react-vite'

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
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
