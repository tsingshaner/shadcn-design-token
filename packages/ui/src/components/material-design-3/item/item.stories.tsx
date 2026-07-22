import { expect, userEvent, within } from 'storybook/test'

import type { Meta, StoryObj } from '@storybook/react-vite'
import type { SVGProps } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar'
import { Button } from '../../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '../../ui/dropdown-menu'
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemSeparator,
  ItemTitle
} from './item'

type IconProps = SVGProps<SVGSVGElement>

const ChevronRightIcon = (props: IconProps) => (
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
    <path d="m9 18 6-6-6-6" />
  </svg>
)

const ChevronDownIcon = (props: IconProps) => (
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
    <path d="m6 9 6 6 6-6" />
  </svg>
)

const ExternalLinkIcon = (props: IconProps) => (
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
    <path d="M15 3h6v6" />
    <path d="M10 14 21 3" />
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
  </svg>
)

const InboxIcon = (props: IconProps) => (
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
    <path d="M22 12h-6l-2 3h-4l-2-3H2" />
    <path d="M5.5 5h13L22 12v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6z" />
  </svg>
)

const ShieldAlertIcon = (props: IconProps) => (
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
    <path d="M20 13c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V5l8-3 8 3z" />
    <path d="M12 8v4" />
    <path d="M12 16h.01" />
  </svg>
)

const people = [
  { email: 'shadcn@vercel.com', username: 'shadcn' },
  { email: 'maxleiter@vercel.com', username: 'maxleiter' },
  { email: 'evilrabbit@vercel.com', username: 'evilrabbit' }
]

const models = [
  { description: 'Everyday tasks and UI generation.', name: 'v0-1.5-sm' },
  { description: 'Advanced thinking and reasoning.', name: 'v0-1.5-lg' },
  { description: 'Open source model for everyone.', name: 'v0-2.0-mini' }
]

const meta = {
  component: Item,
  parameters: {
    docs: {
      description: {
        component:
          'A structured row primitive for repeated lists, settings, and menu-like content. Examples and guidance reference the [shadcn/ui Item documentation](https://ui.shadcn.com/docs/components/base/item.md).'
      }
    }
  },
  tags: ['autodocs'],
  title: 'Material Design 3/Item'
} satisfies Meta<typeof Item>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Compose Item with media, content, description, and actions. Reference: [shadcn/ui Item Icon example](https://ui.shadcn.com/docs/components/base/item.md#icon)'
      }
    }
  },
  render: () => (
    <Item className="max-w-lg" variant="outline">
      <ItemMedia variant="icon">
        <ShieldAlertIcon />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Security Alert</ItemTitle>
        <ItemDescription>New login detected from unknown device.</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button size="sm" variant="outline">
          Review
        </Button>
      </ItemActions>
    </Item>
  )
}
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(canvas.getByText('Security Alert')).toHaveAttribute('data-slot', 'item-title')
  await expect(canvas.getByText('New login detected from unknown device.')).toHaveAttribute(
    'data-slot',
    'item-description'
  )
  await expect(canvas.getByRole('button', { name: 'Review' })).toBeVisible()
}

export const Variants: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use the variant prop to switch between default, outline, and muted surfaces. Reference: [shadcn/ui Item Variant section](https://ui.shadcn.com/docs/components/base/item.md#variant)'
      }
    }
  },
  render: () => (
    <div className="flex w-full max-w-md flex-col gap-4">
      {(['default', 'outline', 'muted'] as const).map((variant) => (
        <Item key={variant} variant={variant}>
          <ItemMedia variant="icon">
            <InboxIcon />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>{variant[0].toUpperCase() + variant.slice(1)} Variant</ItemTitle>
            <ItemDescription>Use this surface for {variant} item emphasis.</ItemDescription>
          </ItemContent>
        </Item>
      ))}
    </div>
  )
}
Variants.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(canvas.getByText('Default Variant').closest('[data-slot="item"]')).toHaveAttribute(
    'data-variant',
    'default'
  )
  await expect(canvas.getByText('Muted Variant').closest('[data-slot="item"]')).toHaveAttribute('data-variant', 'muted')
}

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use the size prop to adapt item density. Reference: [shadcn/ui Item Size section](https://ui.shadcn.com/docs/components/base/item.md#size)'
      }
    }
  },
  render: () => (
    <div className="flex w-full max-w-md flex-col gap-4">
      {(['default', 'sm', 'xs'] as const).map((size) => (
        <Item key={size} size={size} variant="outline">
          <ItemMedia variant="icon">
            <InboxIcon />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>{size === 'default' ? 'Default' : size.toUpperCase()} Size</ItemTitle>
            <ItemDescription>Density for {size} item layouts.</ItemDescription>
          </ItemContent>
        </Item>
      ))}
    </div>
  )
}
Sizes.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(canvas.getByText('Default Size').closest('[data-slot="item"]')).toHaveAttribute('data-size', 'default')
  await expect(canvas.getByText('XS Size').closest('[data-slot="item"]')).toHaveAttribute('data-size', 'xs')
}

export const AvatarExample: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use ItemMedia with Avatar for people and account rows. Reference: [shadcn/ui Item Avatar example](https://ui.shadcn.com/docs/components/base/item.md#avatar)'
      }
    }
  },
  render: () => (
    <Item className="max-w-lg" variant="outline">
      <ItemMedia>
        <Avatar>
          <AvatarImage alt="@shadcn" src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </ItemMedia>
      <ItemContent>
        <ItemTitle>shadcn</ItemTitle>
        <ItemDescription>Last seen 5 months ago</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button size="sm" variant="outline">
          Invite
        </Button>
      </ItemActions>
    </Item>
  )
}
AvatarExample.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(canvas.getByText('shadcn')).toHaveAttribute('data-slot', 'item-title')
  await expect(canvas.getByRole('button', { name: 'Invite' })).toBeVisible()
}

export const ImageExample: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use ItemMedia variant="image" for artwork or thumbnail rows. Reference: [shadcn/ui Item Image example](https://ui.shadcn.com/docs/components/base/item.md#image)'
      }
    }
  },
  render: () => (
    <ItemGroup className="max-w-md gap-4">
      {['Midnight City Lights', 'Coffee Shop Conversations', 'Digital Rain'].map((song) => (
        <Item key={song} variant="outline">
          <ItemMedia variant="image">
            <img alt="" src={`https://avatar.vercel.sh/${encodeURIComponent(song)}`} />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>{song}</ItemTitle>
            <ItemDescription>Neon Dreams</ItemDescription>
          </ItemContent>
          <ItemContent className="flex-none text-right">
            <ItemDescription>3:45</ItemDescription>
          </ItemContent>
        </Item>
      ))}
    </ItemGroup>
  )
}
ImageExample.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(canvasElement.querySelector('[data-slot="item-group"]')).toBeVisible()
  await expect(canvas.getByText('Digital Rain')).toHaveAttribute('data-slot', 'item-title')
}

export const Group: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use ItemGroup and ItemSeparator to compose related item lists. Reference: [shadcn/ui Item Group example](https://ui.shadcn.com/docs/components/base/item.md#group)'
      }
    }
  },
  render: () => (
    <ItemGroup className="max-w-sm">
      {people.map((person, index) => (
        <div key={person.username}>
          <Item variant="outline">
            <ItemMedia>
              <Avatar>
                <AvatarFallback>{person.username.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
            </ItemMedia>
            <ItemContent>
              <ItemTitle>{person.username}</ItemTitle>
              <ItemDescription>{person.email}</ItemDescription>
            </ItemContent>
            <ItemActions>
              <ChevronRightIcon className="size-4" />
            </ItemActions>
          </Item>
          {index < people.length - 1 ? <ItemSeparator className="my-2" /> : null}
        </div>
      ))}
    </ItemGroup>
  )
}
Group.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(canvasElement.querySelector('[data-slot="item-group"]')).toBeVisible()
  await expect(canvas.getByText('maxleiter')).toHaveAttribute('data-slot', 'item-title')
  await expect(canvasElement.querySelectorAll('[data-slot="item-separator"]')).toHaveLength(2)
}

export const Header: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use ItemHeader for media or content above the main item body. Reference: [shadcn/ui Item Header example](https://ui.shadcn.com/docs/components/base/item.md#header)'
      }
    }
  },
  render: () => (
    <ItemGroup className="grid max-w-xl grid-cols-3 gap-4">
      {models.map((model) => (
        <Item className="flex-col" key={model.name} variant="outline">
          <ItemHeader>
            <div className="aspect-square w-full rounded-sm bg-muted" />
          </ItemHeader>
          <ItemContent>
            <ItemTitle>{model.name}</ItemTitle>
            <ItemDescription>{model.description}</ItemDescription>
          </ItemContent>
        </Item>
      ))}
    </ItemGroup>
  )
}
Header.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(canvasElement.querySelectorAll('[data-slot="item-header"]')).toHaveLength(3)
  await expect(canvas.getByText('v0-1.5-lg')).toHaveAttribute('data-slot', 'item-title')
}

export const Footer: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use ItemFooter for secondary actions or metadata below the item body. Reference: [shadcn/ui Item ItemFooter API](https://ui.shadcn.com/docs/components/base/item.md#itemfooter)'
      }
    }
  },
  render: () => (
    <Item className="max-w-md flex-col" variant="outline">
      <ItemContent>
        <ItemTitle>Storage usage</ItemTitle>
        <ItemDescription>12.4 GB of 20 GB used.</ItemDescription>
      </ItemContent>
      <ItemFooter>
        <Button size="sm" variant="outline">
          Manage
        </Button>
        <Button size="sm">Upgrade</Button>
      </ItemFooter>
    </Item>
  )
}
Footer.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(canvasElement.querySelector('[data-slot="item-footer"]')).toBeVisible()
  await expect(canvas.getByRole('button', { name: 'Upgrade' })).toBeVisible()
}

export const Link: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use render to render the item as a link. Reference: [shadcn/ui Item Link example](https://ui.shadcn.com/docs/components/base/item.md#link)'
      }
    }
  },
  render: () => (
    <div className="flex w-full max-w-md flex-col gap-4">
      <Item render={<a href="#docs" />}>
        <ItemContent>
          <ItemTitle>Visit our documentation</ItemTitle>
          <ItemDescription>Learn how to get started with our components.</ItemDescription>
        </ItemContent>
        <ItemActions>
          <ChevronRightIcon className="size-4" />
        </ItemActions>
      </Item>
      <Item render={<a href="#external" rel="noreferrer" target="_blank" />} variant="outline">
        <ItemContent>
          <ItemTitle>External resource</ItemTitle>
          <ItemDescription>Opens in a new tab with security attributes.</ItemDescription>
        </ItemContent>
        <ItemActions>
          <ExternalLinkIcon className="size-4" />
        </ItemActions>
      </Item>
    </div>
  )
}
Link.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(canvas.getByRole('link', { name: /Visit our documentation/ })).toHaveAttribute('data-slot', 'item')
  await expect(canvas.getByRole('link', { name: /External resource/ })).toHaveAttribute('target', '_blank')
}

export const Dropdown: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use Item inside DropdownMenuItem for rich menu rows. Reference: [shadcn/ui Item Dropdown example](https://ui.shadcn.com/docs/components/base/item.md#dropdown)'
      }
    }
  },
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" />}>
        Select <ChevronDownIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuGroup>
          {people.map((person) => (
            <DropdownMenuItem key={person.username}>
              <Item className="w-full p-2" size="xs">
                <ItemMedia>
                  <Avatar className="size-6">
                    <AvatarImage
                      alt={person.username}
                      className="grayscale"
                      src={`https://github.com/${person.username}.png`}
                    />
                    <AvatarFallback>{person.username.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </ItemMedia>
                <ItemContent className="gap-0">
                  <ItemTitle>{person.username}</ItemTitle>
                  <ItemDescription className="leading-none">{person.email}</ItemDescription>
                </ItemContent>
              </Item>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
Dropdown.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const page = within(canvasElement.ownerDocument.body)

  await userEvent.click(canvas.getByRole('button', { name: /Select/ }))

  await expect(await page.findByText('maxleiter')).toHaveAttribute('data-slot', 'item-title')
  await expect(page.getByText('maxleiter@vercel.com')).toHaveAttribute('data-slot', 'item-description')
}
