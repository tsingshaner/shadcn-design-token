// This file has been automatically migrated to valid ESM format by Storybook.

import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import type { StorybookConfig } from '@storybook/react-vite'

const currentFilename = fileURLToPath(import.meta.url)
const currentDirname = dirname(currentFilename)
const baseUiCreateSelectorMemoizedModule = '@base-ui/utils/store/createSelectorMemoized.mjs'

const config: StorybookConfig = {
  addons: ['@storybook/addon-docs'],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  viteFinal: (config) => {
    config.plugins ??= []
    config.plugins.push({
      name: 'base-ui-create-selector-pure-annotation',
      transform(code, id) {
        if (!id.includes(baseUiCreateSelectorMemoizedModule)) {
          return null
        }

        return code.replace(
          'const reselectCreateSelector = createSelectorCreator({',
          'const reselectCreateSelector = /* @__PURE__ */ createSelectorCreator({'
        )
      }
    })

    config.resolve ??= {}
    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
      '@': resolve(currentDirname, '../src')
    }

    return config
  }
}

export default config
