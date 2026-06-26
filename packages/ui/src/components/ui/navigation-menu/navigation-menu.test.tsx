import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport
} from './navigation-menu'

afterEach(cleanup)

describe('NavigationMenu', () => {
  test('renders the active navigation menu content', () => {
    render(
      <NavigationMenu defaultValue="tokens">
        <NavigationMenuList>
          <NavigationMenuItem value="tokens">
            <NavigationMenuTrigger>Tokens</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink href="#">Color tokens</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
        <NavigationMenuViewport />
      </NavigationMenu>
    )

    expect(screen.getByRole('button', { name: /Tokens/ })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Color tokens' })).toBeInTheDocument()
  })
})
