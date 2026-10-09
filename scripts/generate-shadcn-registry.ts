import { execFile } from 'node:child_process'
import { readdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = dirname(fileURLToPath(new URL('../package.json', import.meta.url)))
const componentsDir = join(rootDir, 'packages/ui/src/components')
const registryPath = join(rootDir, 'registry.json')
const registryOutputDir = join(rootDir, 'packages/ui/storybook-static/r')

const groups = [
  { directory: 'ui', namespace: '@ui', prefix: '', target: '@ui' },
  {
    directory: 'material-design-3',
    namespace: '@material-design-3',
    prefix: 'material-design-3-',
    target: '@ui/material-design-3'
  }
]
const importPattern = /from\s+['"]([^'"]+)['"]/g

const toPosixPath = (path: string) => path.split('\\').join('/')

const getComponents = async () =>
  (
    await Promise.all(
      groups.map(async (group) => {
        const entries = await readdir(join(componentsDir, group.directory), { withFileTypes: true })

        return (
          await Promise.all(
            entries
              .filter((entry) => entry.isDirectory())
              .map(async (entry) => {
                const files = await readdir(join(componentsDir, group.directory, entry.name))
                return files.includes(`${entry.name}.tsx`) ? { ...group, componentName: entry.name } : null
              })
          )
        ).filter(Boolean)
      })
    )
  )
    .flat()
    .sort((a, b) => `${a?.prefix}${a?.componentName}`.localeCompare(`${b?.prefix}${b?.componentName}`))

const getRegistryDependency = (specifier: string, filePath: string, componentNames: Set<string>) => {
  const aliasMatch = specifier.match(/^@\/components\/(ui|material-design-3)\/([^/]+)/)
  const parts = aliasMatch
    ? aliasMatch.slice(1)
    : specifier.startsWith('.')
      ? toPosixPath(relative(componentsDir, resolve(dirname(filePath), specifier))).split('/')
      : []
  const [directory, componentName] = parts
  const group = groups.find((candidate) => candidate.directory === directory)

  return group && componentNames.has(`${directory}/${componentName}`) ? `${group.namespace}/${componentName}` : null
}

const getPackageName = (specifier: string) => {
  if (
    specifier.startsWith('.') ||
    specifier.startsWith('@/') ||
    specifier === 'react' ||
    specifier.startsWith('react/')
  ) {
    return null
  }

  return specifier.startsWith('@') ? specifier.split('/').slice(0, 2).join('/') : specifier.split('/')[0]
}

const components = (await getComponents()).filter((v) => v !== null)
const componentNames = new Set(components.map(({ componentName, directory }) => `${directory}/${componentName}`))

const items = await Promise.all(
  components.map(async ({ componentName, directory, prefix, target }) => {
    const filePath = join(componentsDir, directory, componentName, `${componentName}.tsx`)
    const source = await readFile(filePath, 'utf8')
    const imports = [...source.matchAll(importPattern)].map((match) => match[1])
    const usesCva = imports.includes('@/lib/cva')
    const registryDependencies = [
      ...new Set(
        imports.map((specifier) => getRegistryDependency(specifier, filePath, componentNames)).filter((v) => v !== null)
      )
    ].sort((a, b) => a.localeCompare(b))
    const dependencies = [
      ...new Set([
        ...imports.map(getPackageName).filter((v) => v !== null),
        ...(usesCva ? ['cn', 'cva@1.0.0-beta.12'] : [])
      ])
    ].sort((a, b) => a.localeCompare(b))

    return {
      ...(dependencies.length > 0 ? { dependencies } : {}),
      files: [
        {
          path: toPosixPath(relative(rootDir, filePath)),
          target: `${target}/${componentName}/index.tsx`,
          type: 'registry:ui'
        },
        ...(usesCva ? [{ path: 'packages/ui/src/lib/cva.ts', target: '@lib/cva.ts', type: 'registry:lib' }] : [])
      ],
      name: `${prefix}${componentName}`,
      ...(registryDependencies.length > 0 ? { registryDependencies } : {}),
      type: 'registry:ui'
    }
  })
)

const registry = {
  $schema: 'https://ui.shadcn.com/schema/registry.json',
  homepage: 'https://github.com/tsingshaner/shadcn-design-token',
  items,
  name: 'qingshaner-design'
}

await writeFile(registryPath, `${JSON.stringify(registry, null, 2)}\n`)

await Promise.all([
  execFile('pnpm', ['biome', 'format', '--write', registryPath], { cwd: rootDir }),
  execFile('shadcn', ['build', registryPath, '--output', registryOutputDir], { cwd: rootDir })
])
