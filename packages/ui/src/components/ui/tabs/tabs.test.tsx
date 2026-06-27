import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs'

describe('Tabs', () => {
  afterEach(() => {
    cleanup()
  })

  test('renders the active tab panel and switches panels', () => {
    render(
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">Account panel</TabsContent>
        <TabsContent value="password">Password panel</TabsContent>
      </Tabs>
    )

    expect(screen.getByRole('tabpanel')).toHaveTextContent('Account panel')

    fireEvent.click(screen.getByRole('tab', { name: 'Password' }))

    expect(screen.getByRole('tabpanel')).toHaveTextContent('Password panel')
  })

  test('supports line list variant and vertical orientation', () => {
    render(
      <Tabs defaultValue="account" orientation="vertical">
        <TabsList variant="line">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger disabled value="password">
            Password
          </TabsTrigger>
        </TabsList>
      </Tabs>
    )

    expect(screen.getByRole('tablist')).toHaveAttribute('aria-orientation', 'vertical')
    expect(screen.getByRole('tablist')).toHaveAttribute('data-variant', 'line')
    expect(screen.getByRole('tab', { name: 'Password' })).toHaveAttribute('data-disabled')
  })
})
