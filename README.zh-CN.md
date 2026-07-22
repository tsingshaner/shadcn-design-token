# shadcn-design-token

基于 React、Tailwind CSS、Base UI 和 shadcn registry 的组件库工作区。仓库以 `packages/ui` 为核心包，维护一组可复用 UI 组件，并支持生成 shadcn 兼容的 `registry.json`。

English documentation: [README.md](README.md)

## 特性

- 64 个 UI 组件，覆盖表单、弹层、导航、数据展示、反馈和布局等常见场景。
- 组件源码、测试和 Storybook 示例集中在 `packages/ui/src/components/ui`。
- 支持作为包构建，也支持通过 shadcn registry 分发组件源码。
- 使用 Storybook 进行组件开发和文档预览。
- 使用 Vitest、Testing Library 和 Playwright browser mode 进行组件测试。
- 使用 Biome 统一格式化和 lint。

## 环境要求

- Node.js `>=24.0.0`
- pnpm `>=11.0.4`

## 快速开始

```bash
pnpm install
pnpm --filter=ui dev
```

Storybook 默认运行在 <http://localhost:6006>。

## 常用命令

```bash
# 启动 Storybook
pnpm --filter=ui dev

# 运行测试
pnpm test

# 构建 UI 包
pnpm --filter=ui build

# 构建 Storybook 静态站点
pnpm --filter=ui build-storybook

# 格式化和 lint
pnpm check

# 重新生成 shadcn registry.json
pnpm registry:generate

# 构建 shadcn registry
pnpm registry:build
```

## 项目结构

```text
.
├── packages/
│   └── ui/
│       ├── src/
│       │   ├── components/ui/   # 组件源码、测试和 stories
│       │   ├── lib/             # 通用工具
│       │   └── styles/          # 全局样式入口
│       ├── .storybook/          # Storybook 配置
│       └── package.json
├── scripts/
│   └── generate-shadcn-registry.mjs
├── registry.json
└── package.json
```

## 使用 UI 包

本仓库当前是私有 workspace，`@packages/ui` 主要供仓库内开发和构建使用。包入口会自动引入全局样式：

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

如果发布为独立 npm 包，构建产物会从 `packages/ui/dist` 导出：

- `@packages/ui`：组件和工具的 TypeScript/JavaScript 入口。
- `@packages/ui/styles.css`：构建后的样式文件。

## shadcn Registry

`registry.json` 由 `scripts/generate-shadcn-registry.mjs` 根据 `packages/ui/src/components/ui` 和 `packages/ui/src/components/material-design-3` 下的组件目录自动生成。脚本会：

- 将 UI 组件注册为 `<component>`，Material Design 3 组件注册为 `material-design-3-<component>`。
- 将 UI 组件安装到 `@ui/<component>/index.tsx`，Material Design 3 组件安装到 `@components/material-design-3/<component>/index.tsx`。
- 从本地组件 import 推导 `registryDependencies`。
- 从外部 import 推导必要的 npm dependencies。

用户可以为两个组件族分别配置 namespace：

```json
{
  "registries": {
    "@ui": "https://<your-domain>/r/{name}.json",
    "@material-design-3": "https://<your-domain>/r/material-design-3-{name}.json"
  }
}
```

然后按需下载同名组件：

```bash
pnpm dlx shadcn@latest add @ui/button
pnpm dlx shadcn@latest add @material-design-3/button
```

生成 registry：

```bash
pnpm registry:generate
```

构建 shadcn registry：

```bash
pnpm registry:build
```

生成文件位于 `public/r`。

构建到 Storybook 静态目录：

```bash
pnpm registry:build:pages
```

## 组件开发

新增组件时建议保持现有目录结构：

```text
packages/ui/src/components/ui/<component>/
├── <component>.tsx
├── <component>.test.tsx
├── <component>.stories.tsx
└── index.ts
```

新增组件后需要：

1. 在 `packages/ui/src/index.ts` 导出组件。
2. 为核心行为补充 Vitest 测试。
3. 为可视状态补充 Storybook stories。
4. 运行 `pnpm registry:generate` 更新 `registry.json`。
5. 运行 `pnpm test` 和 `pnpm check` 验证变更。

## 代码质量

提交前会通过 `simple-git-hooks` 和 `nano-staged` 对暂存文件执行 Biome 自动修复；推送前会运行测试：

```bash
pnpm prepare
pnpm test
```

## License

ISC
