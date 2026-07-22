import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import { ConfirmDialog } from './confirm-dialog'

afterEach(cleanup)

describe('Material Design 3 ConfirmDialog', () => {
  test('resolves false when cancelled', async () => {
    render(<ConfirmDialog />)
    const response = ConfirmDialog.call({ title: 'Delete token?' })

    fireEvent.click(await screen.findByRole('button', { name: 'Cancel' }))

    await expect(response).resolves.toBe(false)
  })
})
