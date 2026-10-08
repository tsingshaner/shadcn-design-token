import { expect, within } from 'storybook/test'

import type { Meta, StoryObj } from '@storybook/react-vite'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from './navigation-menu'

const meta = {
  component: NavigationMenu,
  parameters: {
    docs: {
      description: {
        component:
          'A responsive navigation menu for top-level links and grouped destinations. Examples and guidance reference the [shadcn/ui Navigation Menu documentation](https://ui.shadcn.com/docs/components/base/navigation-menu.md).'
      }
    }
  },
  tags: ['autodocs'],
  title: 'UI/NavigationMenu'
} satisfies Meta<typeof NavigationMenu>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <NavigationMenu defaultValue="tokens">
      <NavigationMenuList>
        <NavigationMenuItem value="tokens">
          <NavigationMenuTrigger>Tokens</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-72 gap-2">
              <NavigationMenuLink href="#">Color tokens</NavigationMenuLink>
              <NavigationMenuLink href="#">Typography tokens</NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#">Docs</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const page = within(canvasElement.ownerDocument.body)

  await expect(canvas.getByRole('button', { name: /Tokens/ })).toHaveAttribute('data-scope', 'navigation-menu')
  await expect(canvas.getByRole('button', { name: /Tokens/ })).toHaveAttribute('data-slot', 'trigger')
  await expect(await page.findByText('Color tokens')).toHaveAttribute('data-scope', 'navigation-menu')
  await expect(await page.findByText('Color tokens')).toHaveAttribute('data-slot', 'link')
  await expect(page.getByText('Typography tokens')).toHaveAttribute('data-scope', 'navigation-menu')
  await expect(page.getByText('Typography tokens')).toHaveAttribute('data-slot', 'link')
  await expect(canvas.getByRole('link', { name: 'Docs' })).toHaveAttribute('data-scope', 'navigation-menu')
  await expect(canvas.getByRole('link', { name: 'Docs' })).toHaveAttribute('data-slot', 'link')
  await expect(
    page.getByText('Color tokens').closest('[data-scope="navigation-menu"][data-slot="popup"]')
  ).toBeInTheDocument()
}
