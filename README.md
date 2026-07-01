# shadcn-design-token

React UI component workspace built with Tailwind CSS, Base UI, and the shadcn registry format. The main package lives in `packages/ui`, where reusable components are developed, tested, documented, and exported.

中文文档: [README.zh-CN.md](README.zh-CN.md)

## Features

- 64 UI components covering forms, overlays, navigation, data display, feedback, and layout patterns.
- Component source, tests, and Storybook stories are colocated under `packages/ui/src/components/ui`.
- Components can be built as a package or distributed as shadcn-compatible registry source.
- Storybook is used for local component development and documentation.
- Vitest, Testing Library, and Playwright browser mode are used for component tests.
- Biome handles formatting and linting.

## Requirements

- Node.js `>=24.0.0`
- pnpm `>=11.0.4`

## Quick Start

```bash
pnpm install
pnpm --filter=ui dev
```

Storybook runs at <http://localhost:6006> by default.

## Scripts

```bash
# Start Storybook
pnpm --filter=ui dev

# Run tests
pnpm test

# Build the UI package
pnpm --filter=ui build

# Build static Storybook
pnpm --filter=ui build-storybook

# Format and lint
pnpm check

# Regenerate shadcn registry.json
pnpm registry:generate

# Build the shadcn registry
pnpm registry:build
```

## Project Structure

```text
.
├── packages/
│   └── ui/
│       ├── src/
│       │   ├── components/ui/   # Component source, tests, and stories
│       │   ├── lib/             # Shared utilities
│       │   └── styles/          # Global style entry
│       ├── .storybook/          # Storybook config
│       └── package.json
├── scripts/
│   └── generate-shadcn-registry.mjs
├── registry.json
└── package.json
```

## Using the UI Package

This repository is currently a private workspace. `@packages/ui` is primarily intended for local workspace development and builds. The package entry imports global styles automatically:

```tsx
import { Button, Card, CardContent, CardHeader, CardTitle } from '@packages/ui'

export function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Example</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Submit</Button>
      </CardContent>
    </Card>
  )
}
```

If the package is published independently, build output is exported from `packages/ui/dist`:

- `@packages/ui`: TypeScript and JavaScript entry for components and utilities.
- `@packages/ui/styles.css`: Built stylesheet.

## shadcn Registry

`registry.json` is generated from component directories under `packages/ui/src/components/ui` by `scripts/generate-shadcn-registry.mjs`. The script:

- Uses component directory names as registry item names.
- Maps each component source file to `@ui/<component>.tsx`.
- Infers `registryDependencies` from local component imports.
- Infers npm dependencies from external imports, including `@base-ui/react`, `tailwind-variants`, and `tailwind-merge`.

Generate the registry:

```bash
pnpm registry:generate
```

Build the shadcn registry:

```bash
pnpm registry:build
```

Build the registry into the Storybook static directory:

```bash
pnpm registry:build:pages
```

## Component Development

New components should follow the existing directory shape:

```text
packages/ui/src/components/ui/<component>/
├── <component>.tsx
├── <component>.test.tsx
├── <component>.stories.tsx
└── index.ts
```

When adding a component:

1. Export it from `packages/ui/src/index.ts`.
2. Add Vitest tests for core behavior.
3. Add Storybook stories for visual states.
4. Run `pnpm registry:generate` to update `registry.json`.
5. Run `pnpm test` and `pnpm check` before committing.

## Code Quality

Before commits, `simple-git-hooks` and `nano-staged` run Biome fixes on staged files. Before pushes, tests are run:

```bash
pnpm prepare
pnpm test
```

## License

ISC
