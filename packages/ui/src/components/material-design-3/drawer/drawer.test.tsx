import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import { Button } from '../button'
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from './drawer'

afterEach(cleanup)

describe('Drawer', () => {
  test('opens drawer content from the trigger', () => {
    render(
      <Drawer>
        <DrawerTrigger render={<Button />}>Open drawer</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Edit token set</DrawerTitle>
            <DrawerDescription>Drawer details</DrawerDescription>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    )

    fireEvent.click(screen.getByRole('button', { name: 'Open drawer' }))

    expect(screen.getByRole('dialog', { name: 'Edit token set' })).toHaveAttribute('data-scope', 'drawer')
    expect(screen.getByRole('dialog', { name: 'Edit token set' })).toHaveAttribute('data-slot', 'content')
    expect(screen.getByText('Edit token set')).toHaveAttribute('data-scope', 'drawer')
    expect(screen.getByText('Edit token set')).toHaveAttribute('data-slot', 'title')
    expect(screen.getByText('Drawer details')).toHaveAttribute('data-scope', 'drawer')
    expect(screen.getByText('Drawer details')).toHaveAttribute('data-slot', 'description')
    expect(document.querySelector('[data-scope="drawer"][data-slot="overlay"]')).toHaveAttribute('data-scope', 'drawer')
    expect(document.querySelector('[data-scope="drawer"][data-slot="overlay"]')).toHaveAttribute('data-slot', 'overlay')
    expect(document.querySelector('[data-scope="drawer"][data-slot="handle"]')).toHaveAttribute('data-scope', 'drawer')
    expect(document.querySelector('[data-scope="drawer"][data-slot="handle"]')).toHaveAttribute('data-slot', 'handle')
    expect(document.querySelector('[data-scope="drawer"][data-slot="handle"]')).toHaveClass('h-1', 'w-8')
  })
})
