import { resolve } from 'node:path'

import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { playwright } from '@vitest/browser-playwright'
import { defineConfig } from 'vite'
import { configDefaults } from 'vitest/config'

export default defineConfig({
  build: {
    cssCodeSplit: false,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      fileName: 'index',
      formats: ['es']
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        assetFileNames: 'styles.css'
      }
    }
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
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
            configDir: resolve(__dirname, '.storybook'),
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
