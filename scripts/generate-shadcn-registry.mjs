import { readdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = dirname(fileURLToPath(new URL('../package.json', import.meta.url)))
const componentsDir = join(rootDir, 'packages/ui/src/components/ui')
const registryPath = join(rootDir, 'registry.json')

const importPattern = /from\s+['"]([^'"]+)['"]/g

const toPosixPath = (path) => path.split('\\').join('/')

const getComponentNames = async () => {
  const entries = await readdir(componentsDir, { withFileTypes: true })

  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b))
}

const readComponentImports = async (name) => {
  const filePath = join(componentsDir, name, `${name}.tsx`)
  const source = await readFile(filePath, 'utf8')
  const imports = [...source.matchAll(importPattern)].map((match) => match[1])

  return { filePath, imports }
}

const getRegistryDependencies = (imports, componentNames) => {
  const localComponentImports = imports
    .filter((specifier) => specifier.startsWith('../'))
    .map((specifier) => specifier.replace(/^\.\.\//, '').split('/')[0])
    .filter((name) => componentNames.has(name))

  return [...new Set(localComponentImports)].sort((a, b) => a.localeCompare(b))
}

const getDependencies = (imports) => {
  const dependencies = imports
    .map((specifier) => {
      if (specifier === '@base-ui/react' || specifier.startsWith('@base-ui/react/')) {
        return '@base-ui/react'
      }

      if (specifier === 'tailwind-variants' || specifier.startsWith('tailwind-variants/')) {
        return 'tailwind-variants'
      }

      return null
    })
    .filter(Boolean)

  return [...new Set(dependencies)].sort((a, b) => a.localeCompare(b))
}

const components = await getComponentNames()
const componentNames = new Set(components)

const items = await Promise.all(
  components.map(async (name) => {
    const { filePath, imports } = await readComponentImports(name)
    const registryDependencies = getRegistryDependencies(imports, componentNames)
    const dependencies = getDependencies(imports)

    return {
      ...(dependencies.length > 0
        ? {
            dependencies
          }
        : {}),
      files: [
        {
          path: toPosixPath(relative(rootDir, filePath)),
          target: `@ui/${name}.tsx`,
          type: 'registry:ui'
        }
      ],
      name,
      ...(registryDependencies.length > 0 ? { registryDependencies } : {}),
      type: 'registry:ui'
    }
  })
)

const registry = {
  $schema: 'https://ui.shadcn.com/schema/registry.json',
  homepage: 'https://github.com/tsingshaner/shadcn-design-token',
  items,
  name: 'shadcn-design-token'
}

await writeFile(registryPath, `${JSON.stringify(registry, null, 2)}\n`)
