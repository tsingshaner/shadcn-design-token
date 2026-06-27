import { expect, within } from 'storybook/test'

import type { Meta, StoryObj } from '@storybook/react-vite'
import type { SVGProps } from 'react'

import { Button } from '../button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../dropdown-menu'
import { Avatar, AvatarBadge, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from './avatar'

type IconProps = SVGProps<SVGSVGElement>

const PlusIcon = (props: IconProps) => (
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
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </svg>
)

const people = [
  { alt: '@shadcn', fallback: 'CN', src: 'https://github.com/shadcn.png' },
  { alt: '@maxleiter', fallback: 'LR', src: 'https://github.com/maxleiter.png' },
  { alt: '@evilrabbit', fallback: 'ER', src: 'https://github.com/evilrabbit.png' }
]

const meta = {
  component: Avatar,
  parameters: {
    docs: {
      description: {
        component:
          'A user or entity image with a fallback for missing media. Examples and guidance reference the [shadcn/ui Avatar documentation](https://ui.shadcn.com/docs/components/base/avatar.md).'
      }
    }
  },
  tags: ['autodocs'],
  title: 'UI/Avatar'
} satisfies Meta<typeof Avatar>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'A basic avatar with image and fallback. Reference: [shadcn/ui Avatar Basic example](https://ui.shadcn.com/docs/components/base/avatar.md#basic)'
      }
    }
  },
  render: () => (
    <Avatar>
      <AvatarImage alt="@shadcn" className="grayscale" src="https://github.com/shadcn.png" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(canvas.getByRole('img', { name: '@shadcn' })).toHaveAttribute('data-slot', 'avatar-image')
  await expect(canvasElement.querySelector('[data-slot="avatar"]')).toHaveAttribute('data-size', 'default')
}

export const WithBadge: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use AvatarBadge for status indicators. Reference: [shadcn/ui Avatar Badge example](https://ui.shadcn.com/docs/components/base/avatar.md#badge)'
      }
    }
  },
  render: () => (
    <Avatar>
      <AvatarImage alt="@evilrabbit" src="https://github.com/evilrabbit.png" />
      <AvatarFallback>ER</AvatarFallback>
      <AvatarBadge className="bg-green-600" />
    </Avatar>
  )
}
WithBadge.play = async ({ canvasElement }) => {
  await expect(canvasElement.querySelector('[data-slot="avatar-badge"]')).toHaveClass('bg-green-600')
}

export const BadgeWithIcon: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'AvatarBadge can contain a small icon. Reference: [shadcn/ui Avatar Badge with Icon example](https://ui.shadcn.com/docs/components/base/avatar.md#badge-with-icon)'
      }
    }
  },
  render: () => (
    <Avatar className="grayscale">
      <AvatarImage alt="@pranathip" src="https://github.com/pranathip.png" />
      <AvatarFallback>PP</AvatarFallback>
      <AvatarBadge>
        <PlusIcon />
      </AvatarBadge>
    </Avatar>
  )
}

export const Group: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use AvatarGroup to overlap related avatars. Reference: [shadcn/ui Avatar Group example](https://ui.shadcn.com/docs/components/base/avatar.md#avatar-group)'
      }
    }
  },
  render: () => (
    <AvatarGroup className="grayscale">
      {people.map((person) => (
        <Avatar key={person.alt}>
          <AvatarImage alt={person.alt} src={person.src} />
          <AvatarFallback>{person.fallback}</AvatarFallback>
        </Avatar>
      ))}
    </AvatarGroup>
  )
}

export const GroupCount: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use AvatarGroupCount to summarize additional members. Reference: [shadcn/ui Avatar Group Count example](https://ui.shadcn.com/docs/components/base/avatar.md#avatar-group-count)'
      }
    }
  },
  render: () => (
    <AvatarGroup className="grayscale">
      {people.map((person) => (
        <Avatar key={person.alt}>
          <AvatarImage alt={person.alt} src={person.src} />
          <AvatarFallback>{person.fallback}</AvatarFallback>
        </Avatar>
      ))}
      <AvatarGroupCount>+3</AvatarGroupCount>
    </AvatarGroup>
  )
}
GroupCount.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(canvas.getByText('+3')).toHaveAttribute('data-slot', 'avatar-group-count')
  await expect(canvasElement.querySelectorAll('[data-slot="avatar"]')).toHaveLength(3)
}

export const GroupCountIcon: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'AvatarGroupCount can contain an icon. Reference: [shadcn/ui Avatar Group with Icon example](https://ui.shadcn.com/docs/components/base/avatar.md#avatar-group-with-icon)'
      }
    }
  },
  render: () => (
    <AvatarGroup className="grayscale">
      {people.map((person) => (
        <Avatar key={person.alt}>
          <AvatarImage alt={person.alt} src={person.src} />
          <AvatarFallback>{person.fallback}</AvatarFallback>
        </Avatar>
      ))}
      <AvatarGroupCount>
        <PlusIcon />
      </AvatarGroupCount>
    </AvatarGroup>
  )
}

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use the size prop to change avatar dimensions. Reference: [shadcn/ui Avatar Sizes example](https://ui.shadcn.com/docs/components/base/avatar.md#sizes)'
      }
    }
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-2 grayscale">
      {(['sm', 'default', 'lg'] as const).map((size) => (
        <Avatar key={size} size={size}>
          <AvatarImage alt="@shadcn" src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ))}
    </div>
  )
}
Sizes.play = async ({ canvasElement }) => {
  const avatars = canvasElement.querySelectorAll('[data-slot="avatar"]')

  await expect(avatars[0]).toHaveAttribute('data-size', 'sm')
  await expect(avatars[1]).toHaveAttribute('data-size', 'default')
  await expect(avatars[2]).toHaveAttribute('data-size', 'lg')
}

export const Dropdown: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use Avatar as a DropdownMenu trigger for account menus. Reference: [shadcn/ui Avatar Dropdown example](https://ui.shadcn.com/docs/components/base/avatar.md#dropdown)'
      }
    }
  },
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button className="rounded-full" size="icon" variant="ghost" />}>
        <Avatar>
          <AvatarImage alt="shadcn" src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32">
        <DropdownMenuGroup>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="text-destructive focus:text-destructive">Log out</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
