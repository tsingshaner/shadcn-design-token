import type { Meta, StoryObj } from '@storybook/react-vite'
import type { SVGProps } from 'react'

import { Button } from '../button'
import { ButtonGroup } from '../button-group'
import { InputGroup, InputGroupAddon, InputGroupInput } from '../input-group'
import { Tooltip, TooltipContent, TooltipTrigger } from '../tooltip'
import { Kbd, KbdGroup } from './kbd'

type IconProps = SVGProps<SVGSVGElement>

const SearchIcon = (props: IconProps) => (
  <svg
    aria-hidden="true"
    className="size-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    {...props}
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
)

const meta = {
  component: Kbd,
  parameters: {
    docs: {
      description: {
        component:
          'A small inline element for displaying keyboard keys and shortcuts. Examples and guidance reference the [shadcn/ui Kbd documentation](https://ui.shadcn.com/docs/components/base/kbd.md).'
      }
    }
  },
  tags: ['autodocs'],
  title: 'UI/Kbd'
} satisfies Meta<typeof Kbd>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="flex items-center gap-1 text-sm">
      <Kbd>⌘</Kbd>
      <Kbd>K</Kbd>
    </div>
  )
}

export const Group: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Covers grouped keys from [shadcn/ui Kbd Group](https://ui.shadcn.com/docs/components/base/kbd.md#group).'
      }
    }
  },
  render: () => (
    <div className="flex flex-col items-center gap-4">
      <p className="text-muted-foreground text-sm">
        Use{' '}
        <KbdGroup>
          <Kbd>Ctrl + B</Kbd>
          <Kbd>Ctrl + K</Kbd>
        </KbdGroup>{' '}
        to open the command palette
      </p>
    </div>
  )
}

export const ButtonExample: Story = {
  name: 'Button',
  parameters: {
    docs: {
      description: {
        story:
          'Covers keyboard hints inside buttons from [shadcn/ui Kbd Button](https://ui.shadcn.com/docs/components/base/kbd.md#button).'
      }
    }
  },
  render: () => (
    <Button variant="outline">
      Accept{' '}
      <Kbd className="translate-x-0.5" data-icon="inline-end">
        ⏎
      </Kbd>
    </Button>
  )
}

export const TooltipExample: Story = {
  name: 'Tooltip',
  parameters: {
    docs: {
      description: {
        story:
          'Covers keyboard hints in tooltips from [shadcn/ui Kbd Tooltip](https://ui.shadcn.com/docs/components/base/kbd.md#tooltip).'
      }
    }
  },
  render: () => (
    <div className="flex flex-wrap gap-4">
      <ButtonGroup>
        <Tooltip>
          <TooltipTrigger render={<Button variant="outline" />}>Save</TooltipTrigger>
          <TooltipContent>
            Save Changes <Kbd>S</Kbd>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger render={<Button variant="outline" />}>Print</TooltipTrigger>
          <TooltipContent>
            Print Document{' '}
            <KbdGroup>
              <Kbd>Ctrl</Kbd>
              <Kbd>P</Kbd>
            </KbdGroup>
          </TooltipContent>
        </Tooltip>
      </ButtonGroup>
    </div>
  )
}

export const InputGroupExample: Story = {
  name: 'Input Group',
  parameters: {
    docs: {
      description: {
        story:
          'Covers keyboard hints in input groups from [shadcn/ui Kbd Input Group](https://ui.shadcn.com/docs/components/base/kbd.md#input-group).'
      }
    }
  },
  render: () => (
    <div className="flex w-full max-w-xs flex-col gap-6">
      <InputGroup>
        <InputGroupInput placeholder="Search..." />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupAddon className="ml-auto">
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
