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

    expect(screen.getByRole('dialog', { name: 'Edit token set' })).toBeInTheDocument()
    expect(screen.getByText('Drawer details')).toBeInTheDocument()
  })
})
