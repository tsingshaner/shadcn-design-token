import { resolve } from 'node:path'

import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { playwright } from '@vitest/browser-playwright'
import { defineConfig } from 'vite'
import { configDefaults } from 'vitest/config'

export default defineConfig({
  define: {
    global: 'globalThis'
  },
  plugins: [react({ compiler: true }), tailwindcss()],
  resolve: {
    alias: {
      '@': resolve(import.meta.dirname, 'src')
    }
  },
  test: {
    exclude: [...configDefaults.exclude, 'dist', 'storybook-static'],
    projects: [
      {
        extends: true,
        test: {
          environment: 'jsdom',
          include: ['src/**/*.test.{ts,tsx}'],
          name: 'unit',
          setupFiles: ['./vitest.setup.ts']
        }
      },
      {
        extends: true,
        plugins: [
          storybookTest({
            configDir: resolve(import.meta.dirname, '.storybook'),
            storybookScript: 'pnpm storybook --ci'
          })
        ],
        test: {
          browser: {
            enabled: true,
            headless: true,
            instances: [{ browser: 'chromium' }],
            provider: playwright({})
          },
          name: 'storybook',
          setupFiles: ['./.storybook/vitest.setup.ts']
        }
      }
    ]
  }
})
