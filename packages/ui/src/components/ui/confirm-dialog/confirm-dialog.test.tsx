import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import { ConfirmDialog } from './confirm-dialog'

afterEach(cleanup)

describe('ConfirmDialog', () => {
  test('resolves true when confirmed', async () => {
    render(<ConfirmDialog />)
    const response = ConfirmDialog.call({ title: 'Delete token?' })

    fireEvent.click(await screen.findByRole('button', { name: 'Continue' }))

    await expect(response).resolves.toBe(true)
  })
})
