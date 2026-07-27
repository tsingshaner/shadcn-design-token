import { createElement } from 'react'

import type { Decorator, Preview } from '@storybook/react-vite'
import '../src/styles/globals.css'

const withMaterialDesign3Theme: Decorator = (Story, context) => {
  const root = document.documentElement

  root.classList.toggle('dark', context.globals.theme === 'dark')

  if (context.title.startsWith('Material Design 3/')) {
    root.dataset.theme = 'md3'
  } else {
    delete root.dataset.theme
  }

  return createElement(Story)
}

const preview: Preview = {
  decorators: [withMaterialDesign3Theme],
  globalTypes: {
    theme: {
      description: 'Color scheme',
      toolbar: {
        dynamicTitle: true,
        icon: 'circlehollow',
        items: [
          { icon: 'sun', title: 'Light', value: 'light' },
          { icon: 'moon', title: 'Dark', value: 'dark' }
        ]
      }
    }
  },
  initialGlobals: {
    theme: 'light'
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    layout: 'centered'
  }
}

export default preview
