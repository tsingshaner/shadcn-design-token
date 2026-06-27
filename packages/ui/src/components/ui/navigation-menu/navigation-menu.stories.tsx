import type { Meta, StoryObj } from '@storybook/react-vite'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport
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
      <NavigationMenuViewport />
    </NavigationMenu>
  )
}
