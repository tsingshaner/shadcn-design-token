import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'
import type { SVGProps } from 'react'

import { Button } from '../button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../card'
import { Field, FieldGroup, FieldLabel } from '../field'
import { Input } from '../input'
import { Tabs, TabsList, TabsTrigger } from '../tabs'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './collapsible'

type IconProps = SVGProps<SVGSVGElement>

const ChevronDownIcon = (props: IconProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
)

const ChevronRightIcon = (props: IconProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
)

const FileIcon = (props: IconProps) => (
  <svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" {...props}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6" />
  </svg>
)

const FolderIcon = (props: IconProps) => (
  <svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" {...props}>
    <path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
  </svg>
)

const MaximizeIcon = (props: IconProps) => (
  <svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" {...props}>
    <path d="M8 3H5a2 2 0 0 0-2 2v3" />
    <path d="M16 3h3a2 2 0 0 1 2 2v3" />
    <path d="M8 21H5a2 2 0 0 1-2-2v-3" />
    <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
  </svg>
)

const MinimizeIcon = (props: IconProps) => (
  <svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" {...props}>
    <path d="M8 3v3a2 2 0 0 1-2 2H3" />
    <path d="M16 3v3a2 2 0 0 0 2 2h3" />
    <path d="M8 21v-3a2 2 0 0 0-2-2H3" />
    <path d="M16 21v-3a2 2 0 0 1 2-2h3" />
  </svg>
)

const meta = {
  component: Collapsible,
  parameters: {
    docs: {
      description: {
        component:
          'A disclosure pattern for showing and hiding a single content region. Examples and guidance reference the [shadcn/ui Collapsible documentation](https://ui.shadcn.com/docs/components/base/collapsible.md).'
      }
    }
  },
  tags: ['autodocs'],
  title: 'UI/Collapsible'
} satisfies Meta<typeof Collapsible>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Basic collapsible content with a trigger and panel. Reference: [shadcn/ui Collapsible Basic example](https://ui.shadcn.com/docs/components/base/collapsible.md#basic)'
      }
    }
  },
  render: () => (
    <Card className="mx-auto w-full max-w-sm">
      <CardContent>
        <Collapsible className="rounded-md data-open:bg-muted">
          <CollapsibleTrigger render={<Button className="w-full" variant="ghost" />}>
            Product details
            <ChevronDownIcon className="ml-auto" />
          </CollapsibleTrigger>
          <CollapsibleContent className="flex flex-col items-start gap-2 p-2.5 pt-0 text-sm">
            <div>This panel can be expanded or collapsed to reveal additional content.</div>
            <Button size="xs">Learn More</Button>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  )
}

export const SettingsPanel: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use a trigger button to reveal additional settings. Reference: [shadcn/ui Collapsible Settings Panel example](https://ui.shadcn.com/docs/components/base/collapsible.md#settings-panel)'
      }
    }
  },
  render: function CollapsibleSettings() {
    const [isOpen, setIsOpen] = useState(false)

    return (
      <Card className="mx-auto w-full max-w-xs">
        <CardHeader>
          <CardTitle>Radius</CardTitle>
          <CardDescription>Set the corner radius of the element.</CardDescription>
        </CardHeader>
        <CardContent>
          <Collapsible className="flex items-start gap-2" onOpenChange={setIsOpen} open={isOpen}>
            <FieldGroup className="grid w-full grid-cols-2 gap-2">
              <Field>
                <FieldLabel className="sr-only" htmlFor="radius-x">
                  Radius X
                </FieldLabel>
                <Input defaultValue={0} id="radius-x" placeholder="0" />
              </Field>
              <Field>
                <FieldLabel className="sr-only" htmlFor="radius-y">
                  Radius Y
                </FieldLabel>
                <Input defaultValue={0} id="radius-y" placeholder="0" />
              </Field>
              <CollapsibleContent className="col-span-full grid grid-cols-subgrid gap-2">
                <Input aria-label="Radius top" defaultValue={0} placeholder="0" />
                <Input aria-label="Radius bottom" defaultValue={0} placeholder="0" />
              </CollapsibleContent>
            </FieldGroup>
            <CollapsibleTrigger render={<Button size="icon" variant="outline" />}>
              {isOpen ? <MinimizeIcon /> : <MaximizeIcon />}
            </CollapsibleTrigger>
          </Collapsible>
        </CardContent>
      </Card>
    )
  }
}

type FileTreeItem = { items?: FileTreeItem[]; name: string }
const fileTree: FileTreeItem[] = [
  {
    items: [{ items: [{ name: 'button.tsx' }, { name: 'card.tsx' }], name: 'ui' }, { name: 'login-form.tsx' }],
    name: 'components'
  },
  { items: [{ name: 'utils.ts' }, { name: 'api.ts' }], name: 'lib' },
  { name: 'app.tsx' },
  { name: 'package.json' }
]

const renderFileTreeItem = (fileItem: FileTreeItem) => {
  if (fileItem.items) {
    return (
      <Collapsible key={fileItem.name}>
        <CollapsibleTrigger render={<Button className="w-full justify-start" size="sm" variant="ghost" />}>
          <ChevronRightIcon />
          <FolderIcon />
          {fileItem.name}
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-1 ml-5">
          <div className="flex flex-col gap-1">{fileItem.items.map((child) => renderFileTreeItem(child))}</div>
        </CollapsibleContent>
      </Collapsible>
    )
  }

  return (
    <Button className="w-full justify-start gap-2 text-foreground" key={fileItem.name} size="sm" variant="link">
      <FileIcon />
      <span>{fileItem.name}</span>
    </Button>
  )
}

export const FileTree: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use nested collapsibles to build a file tree. Reference: [shadcn/ui Collapsible File Tree example](https://ui.shadcn.com/docs/components/base/collapsible.md#file-tree)'
      }
    }
  },
  render: () => (
    <Card className="mx-auto w-full max-w-[16rem] gap-2">
      <CardHeader>
        <Tabs defaultValue="explorer">
          <TabsList className="w-full">
            <TabsTrigger value="explorer">Explorer</TabsTrigger>
            <TabsTrigger value="settings">Outline</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-1">{fileTree.map((item) => renderFileTreeItem(item))}</div>
      </CardContent>
    </Card>
  )
}
