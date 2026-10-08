import { describe, expect, test } from 'vitest'

import { badgeVariants as md3BadgeVariants } from '@/components/material-design-3/badge'
import { buttonVariants as md3ButtonVariants } from '@/components/material-design-3/button'
import { toggleVariants as md3ToggleVariants } from '@/components/material-design-3/toggle'
import { badgeVariants } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { toggleVariants } from '@/components/ui/toggle'

describe('shared cva variants', () => {
  test.each([
    ['UI', buttonVariants, 'h-8'],
    ['MD3', md3ButtonVariants, 'h-10']
  ] as const)('%s buttons default to primary and md styles', (_, variants, height) => {
    expect(variants()).toBe(variants({ size: 'md', variant: 'primary' }))
    expect(variants().split(' ')).toEqual(expect.arrayContaining(['bg-primary', 'text-primary-foreground', height]))
  })

  test.each([
    ['UI', badgeVariants],
    ['MD3', md3BadgeVariants]
  ] as const)('%s badges default to primary styles', (_, variants) => {
    expect(variants()).toBe(variants({ variant: 'primary' }))
    expect(variants().split(' ')).toEqual(expect.arrayContaining(['bg-primary', 'text-primary-foreground']))
  })

  test.each([
    ['UI', toggleVariants, 'h-9'],
    ['MD3', md3ToggleVariants, 'h-8']
  ] as const)('%s toggles retain their md dimensions', (_, variants, height) => {
    expect(variants()).toBe(variants({ size: 'md' }))
    expect(variants().split(' ')).toContain(height)
  })

  test.each(['class', 'className'] as const)('custom %s overrides conflicting variant utilities', (prop) => {
    const classes = md3ButtonVariants({ [prop]: 'h-20 bg-transparent', size: 'sm', variant: 'primary' }).split(' ')

    expect(classes).toEqual(expect.arrayContaining(['h-20', 'bg-transparent', 'text-primary-foreground']))
    expect(classes).not.toContain('h-9')
    expect(classes).not.toContain('bg-primary')
  })
})
