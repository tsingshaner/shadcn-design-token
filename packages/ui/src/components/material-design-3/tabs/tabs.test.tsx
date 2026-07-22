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

    expect(screen.getByRole('tablist').closest('[data-slot="tabs"]')).toHaveClass('cn-tabs')
    expect(screen.getByRole('tablist')).toHaveClass('cn-tabs-list', 'cn-tabs-list-variant-default')
    expect(screen.getByRole('tab', { name: 'Account' })).toHaveClass('cn-tabs-trigger')
    expect(screen.getByRole('tabpanel')).toHaveClass('cn-tabs-content')
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
    expect(screen.getByRole('tablist')).toHaveClass('cn-tabs-list-variant-line')
    expect(screen.getByRole('tab', { name: 'Password' })).toHaveAttribute('data-disabled')
  })

  test('uses the MD3 active indicator', () => {
    render(
      <Tabs defaultValue="account">
        <TabsList variant="line">
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>
      </Tabs>
    )

    expect(screen.getByRole('tab', { name: 'Account' })).toHaveClass(
      'group-data-horizontal/tabs:after:bottom-0',
      'after:bg-primary'
    )
  })
})
