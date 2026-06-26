// This file has been automatically migrated to valid ESM format by Storybook.

import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import type { StorybookConfig } from '@storybook/react-vite'

const currentFilename = fileURLToPath(import.meta.url)
const currentDirname = dirname(currentFilename)

const config: StorybookConfig = {
  addons: ['@storybook/addon-docs'],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  viteFinal: (config) => {
    config.resolve ??= {}
    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
      '@': resolve(currentDirname, '../src')
    }

    return config
  }
}

export default config
