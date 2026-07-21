import { CheckIcon, CopyIcon, PaletteIcon, RotateCcwIcon, SparklesIcon } from 'lucide-react'
import { type CSSProperties, useState } from 'react'
import { expect, fireEvent, userEvent, waitFor, within } from 'storybook/test'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { Badge } from './components/ui/badge'
import { Button } from './components/ui/button'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './components/ui/card'
import { Input } from './components/ui/input'
import { Label } from './components/ui/label'
import { NativeSelect, NativeSelectOption } from './components/ui/native-select'
import { Switch } from './components/ui/switch'

type Theme = {
  background: string
  border: string
  card: string
  foreground: string
  muted: string
  mutedForeground: string
  primary: string
  primaryForeground: string
  radius: number
}

type ColorKey = Exclude<keyof Theme, 'radius'>
type ComponentName = 'badge' | 'button' | 'card' | 'input'
type ComponentColorKey = 'border' | 'fill' | 'textColor'
type ComponentOverride = {
  border?: string
  fill?: string
  radius?: number
  textColor?: string
}
type ComponentOverrides = Record<ComponentName, ComponentOverride>

const defaultTheme: Theme = {
  background: '#fafafa',
  border: '#e4e4e7',
  card: '#ffffff',
  foreground: '#18181b',
  muted: '#f4f4f5',
  mutedForeground: '#71717a',
  primary: '#18181b',
  primaryForeground: '#fafafa',
  radius: 10
}

const colorControls: Array<{ key: ColorKey; label: string }> = [
  { key: 'primary', label: 'Brand' },
  { key: 'primaryForeground', label: 'On brand' },
  { key: 'background', label: 'Canvas' },
  { key: 'card', label: 'Surface' },
  { key: 'foreground', label: 'Text' },
  { key: 'muted', label: 'Subtle' },
  { key: 'mutedForeground', label: 'Muted text' },
  { key: 'border', label: 'Border' }
]

const componentDefinitions: Record<ComponentName, { colorKeys: ComponentColorKey[]; label: string; selector: string }> =
  {
    badge: { colorKeys: ['fill', 'textColor'], label: 'Badge', selector: '.cn-badge' },
    button: { colorKeys: ['fill', 'textColor'], label: 'Button', selector: '.cn-button' },
    card: { colorKeys: ['fill', 'textColor', 'border'], label: 'Card', selector: '.cn-card' },
    input: { colorKeys: ['fill', 'textColor', 'border'], label: 'Input', selector: '.cn-input' }
  }

const componentNames = Object.keys(componentDefinitions) as ComponentName[]
const componentColorLabels: Record<ComponentColorKey, string> = {
  border: 'border',
  fill: 'fill',
  textColor: 'text'
}

const getEmptyComponentOverrides = (): ComponentOverrides => ({ badge: {}, button: {}, card: {}, input: {} })

const getThemeEntries = (theme: Theme) => [
  ['--background', theme.background],
  ['--foreground', theme.foreground],
  ['--card', theme.card],
  ['--card-foreground', theme.foreground],
  ['--popover', theme.card],
  ['--popover-foreground', theme.foreground],
  ['--primary', theme.primary],
  ['--primary-foreground', theme.primaryForeground],
  ['--secondary', theme.muted],
  ['--secondary-foreground', theme.foreground],
  ['--muted', theme.muted],
  ['--muted-foreground', theme.mutedForeground],
  ['--accent', theme.muted],
  ['--accent-foreground', theme.foreground],
  ['--border', theme.border],
  ['--input', theme.border],
  ['--ring', theme.primary],
  ['--radius', `${theme.radius}px`]
]

const getThemeCss = (theme: Theme) => `:root {
${getThemeEntries(theme)
  .map(([token, value]) => `  ${token}: ${value};`)
  .join('\n')}
}`

const formatRule = (selector: string, declarations: [string, string | undefined][], scope = '') => {
  const values = declarations.filter((entry): entry is [string, string] => entry[1] !== undefined)

  if (values.length === 0) {
    return ''
  }

  return `${scope}${selector} {
${values.map(([property, value]) => `  ${property}: ${value};`).join('\n')}
}`
}

const getComponentCss = (overrides: ComponentOverrides, scope = '') => {
  const rules = componentNames.flatMap((component) => {
    const override = overrides[component]
    const radius = override.radius === undefined ? undefined : `${override.radius}px`

    if (component === 'button') {
      return [
        formatRule('.cn-button', [['border-radius', radius]], scope),
        formatRule(
          '.cn-button-variant-default',
          [
            ['--primary', override.fill],
            ['--primary-foreground', override.textColor],
            ['--ring', override.fill]
          ],
          scope
        )
      ]
    }

    if (component === 'badge') {
      return [
        formatRule('.cn-badge', [['border-radius', radius]], scope),
        formatRule(
          '.cn-badge-variant-default',
          [
            ['--primary', override.fill],
            ['--primary-foreground', override.textColor]
          ],
          scope
        )
      ]
    }

    if (component === 'card') {
      return [
        formatRule(
          '.cn-card',
          [
            ['--card', override.fill],
            ['--card-foreground', override.textColor],
            ['--border', override.border],
            ['border-radius', radius]
          ],
          scope
        )
      ]
    }

    return [
      formatRule(
        '.cn-input',
        [
          ['background-color', override.fill],
          ['color', override.textColor],
          ['--input', override.border],
          ['border-radius', radius]
        ],
        scope
      )
    ]
  })

  return rules.filter(Boolean).join('\n\n')
}

const getCss = (theme: Theme, overrides: ComponentOverrides) => {
  const componentCss = getComponentCss(overrides)

  return componentCss
    ? `${getThemeCss(theme)}\n\n/* Component overrides — load after @packages/ui/styles.css */\n${componentCss}`
    : getThemeCss(theme)
}

const getLuminance = (hex: string) => {
  const [red, green, blue] = [1, 3, 5].map((offset) => Number.parseInt(hex.slice(offset, offset + 2), 16) / 255)
  const linearize = (channel: number) => (channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4)

  return 0.2126 * linearize(red) + 0.7152 * linearize(green) + 0.0722 * linearize(blue)
}

const getContrast = (foreground: string, background: string) => {
  const values = [getLuminance(foreground), getLuminance(background)].sort((a, b) => b - a)
  return (values[0] + 0.05) / (values[1] + 0.05)
}

const getComponentDefaults = (component: ComponentName, theme: Theme): Required<ComponentOverride> => {
  if (component === 'button' || component === 'badge') {
    return {
      border: theme.primary,
      fill: theme.primary,
      radius: component === 'button' ? theme.radius : Math.round(theme.radius * 0.8),
      textColor: theme.primaryForeground
    }
  }

  return {
    border: theme.border,
    fill: component === 'card' ? theme.card : theme.background,
    radius: component === 'card' ? theme.radius : Math.round(theme.radius * 0.8),
    textColor: theme.foreground
  }
}

type ColorControlProps = {
  label: string
  onChange: (value: string) => void
  value: string
}

const ColorControl = ({ label, onChange, value }: ColorControlProps) => (
  <label className="flex min-w-0 items-center gap-3 rounded-lg border bg-background p-2.5 transition-colors hover:bg-muted/50">
    <input
      aria-label={`${label} color`}
      className="size-9 shrink-0 cursor-pointer rounded-md border bg-transparent p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      onChange={(event) => onChange(event.currentTarget.value)}
      type="color"
      value={value}
    />
    <span className="min-w-0">
      <span className="block truncate font-medium text-sm">{label}</span>
      <code className="block text-muted-foreground text-xs uppercase">{value}</code>
    </span>
  </label>
)

type ContrastBadgeProps = {
  label: string
  score: number
}

const ContrastBadge = ({ label, score }: ContrastBadgeProps) => {
  const passes = score >= 4.5

  return (
    <Badge
      aria-label={`${label} contrast ${score.toFixed(1)} to 1, ${passes ? 'passes' : 'needs attention'}`}
      variant={passes ? 'secondary' : 'destructive'}
    >
      {label} {score.toFixed(1)}:1 · {passes ? 'AA' : 'Low'}
    </Badge>
  )
}

type RangeControlProps = {
  label: string
  max: number
  min?: number
  name: string
  onChange: (value: number) => void
  value: number
}

const RangeControl = ({ label, max, min = 0, name, onChange, value }: RangeControlProps) => {
  const id = `style-studio-${name.toLowerCase().replaceAll(' ', '-')}`

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <Label htmlFor={id}>{label}</Label>
        <output className="font-mono text-muted-foreground text-xs" htmlFor={id}>
          {value}px
        </output>
      </div>
      <input
        aria-label={name}
        className="h-2 w-full cursor-pointer accent-primary"
        id={id}
        max={max}
        min={min}
        onChange={(event) => onChange(Number(event.currentTarget.value))}
        type="range"
        value={value}
      />
    </div>
  )
}

type ThemeEditorProps = {
  onChange: (change: Partial<Theme>) => void
  theme: Theme
}

const ThemeEditor = ({ onChange, theme }: ThemeEditorProps) => (
  <div className="mt-5 space-y-5 border-t pt-5">
    <fieldset>
      <legend className="mb-2 font-medium text-sm">Colors</legend>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {colorControls.map((control) => (
          <ColorControl
            key={control.key}
            label={control.label}
            onChange={(value) => onChange({ [control.key]: value })}
            value={theme[control.key]}
          />
        ))}
      </div>
    </fieldset>

    <RangeControl
      label="Corner radius"
      max={24}
      name="Theme radius"
      onChange={(radius) => onChange({ radius })}
      value={theme.radius}
    />

    <div>
      <div className="mb-2 font-medium text-sm">Contrast</div>
      <div className="flex flex-wrap gap-2">
        <ContrastBadge label="Text" score={getContrast(theme.foreground, theme.background)} />
        <ContrastBadge label="Brand" score={getContrast(theme.primaryForeground, theme.primary)} />
      </div>
      <p className="mt-2 text-muted-foreground text-xs">AA badges require at least 4.5:1 contrast.</p>
    </div>
  </div>
)

type ComponentEditorProps = {
  component: ComponentName
  onChange: (change: ComponentOverride) => void
  onComponentChange: (component: ComponentName) => void
  onReset: () => void
  override: ComponentOverride
  theme: Theme
}

const ComponentEditor = ({
  component,
  onChange,
  onComponentChange,
  onReset,
  override,
  theme
}: ComponentEditorProps) => {
  const definition = componentDefinitions[component]
  const effectiveStyle = { ...getComponentDefaults(component, theme), ...override }
  const customized = Object.keys(override).length > 0

  return (
    <div className="mt-5 space-y-5 border-t pt-5">
      <div>
        <div className="mb-2 flex items-center justify-between gap-2">
          <Label htmlFor="style-studio-component">Component</Label>
          <Button disabled={!customized} onClick={onReset} size="xs" type="button" variant="ghost">
            Reset {definition.label}
          </Button>
        </div>
        <NativeSelect
          aria-label="Component"
          className="w-full"
          id="style-studio-component"
          onChange={(event) => onComponentChange(event.currentTarget.value as ComponentName)}
          value={component}
        >
          {componentNames.map((name) => (
            <NativeSelectOption key={name} value={name}>
              {componentDefinitions[name].label}
            </NativeSelectOption>
          ))}
        </NativeSelect>
        <code className="mt-2 block text-muted-foreground text-xs">{definition.selector}</code>
      </div>

      <fieldset>
        <legend className="mb-2 font-medium text-sm">Component colors</legend>
        <div className="grid grid-cols-2 gap-2">
          {definition.colorKeys.map((key) => (
            <ColorControl
              key={key}
              label={`${definition.label} ${componentColorLabels[key]}`}
              onChange={(value) => onChange({ [key]: value })}
              value={effectiveStyle[key]}
            />
          ))}
        </div>
      </fieldset>

      <RangeControl
        label="Corner radius"
        max={32}
        name="Component radius"
        onChange={(radius) => onChange({ radius })}
        value={effectiveStyle.radius}
      />

      <div>
        <div className="mb-2 font-medium text-sm">Component contrast</div>
        <ContrastBadge label={definition.label} score={getContrast(effectiveStyle.textColor, effectiveStyle.fill)} />
        <p className="mt-2 text-muted-foreground text-xs">Only changed values are added to the exported selector.</p>
      </div>
    </div>
  )
}

const StyleStudio = () => {
  const [componentOverrides, setComponentOverrides] = useState<ComponentOverrides>(getEmptyComponentOverrides)
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'error'>('idle')
  const [editorMode, setEditorMode] = useState<'component' | 'theme'>('component')
  const [selectedComponent, setSelectedComponent] = useState<ComponentName>('button')
  const [theme, setTheme] = useState(defaultTheme)
  const css = getCss(theme, componentOverrides)
  const previewStyle = Object.fromEntries(getThemeEntries(theme)) as CSSProperties
  const previewCss = [
    getComponentCss(componentOverrides, '.style-studio-preview '),
    editorMode === 'component'
      ? `.style-studio-preview ${componentDefinitions[selectedComponent].selector} {
  outline: 2px solid var(--ring);
  outline-offset: 2px;
}`
      : ''
  ]
    .filter(Boolean)
    .join('\n\n')

  const updateTheme = (change: Partial<Theme>) => {
    setTheme((current) => ({ ...current, ...change }))
    setCopyState('idle')
  }

  const updateComponent = (change: ComponentOverride) => {
    setComponentOverrides((current) => ({
      ...current,
      [selectedComponent]: { ...current[selectedComponent], ...change }
    }))
    setCopyState('idle')
  }

  const resetComponent = () => {
    setComponentOverrides((current) => ({ ...current, [selectedComponent]: {} }))
    setCopyState('idle')
  }

  const reset = () => {
    setComponentOverrides(getEmptyComponentOverrides())
    setTheme(defaultTheme)
    setCopyState('idle')
  }

  const copyCss = async () => {
    try {
      await navigator.clipboard.writeText(css)
      setCopyState('copied')
    } catch {
      setCopyState('error')
    }
  }

  return (
    <div className="min-h-screen bg-muted/40 p-4 text-foreground sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1440px]">
        <header className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="mb-2 flex items-center gap-2 font-medium text-muted-foreground text-sm">
              <PaletteIcon aria-hidden="true" className="size-4" />
              Design system playground
            </div>
            <h1 className="font-semibold text-2xl tracking-tight sm:text-3xl">Component style studio</h1>
            <p className="mt-1 max-w-2xl text-muted-foreground text-sm">
              Customize shared tokens or target one component without changing its siblings.
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={reset} type="button" variant="outline">
              <RotateCcwIcon aria-hidden="true" data-icon="inline-start" />
              Reset
            </Button>
            <Button aria-live="polite" onClick={copyCss} type="button">
              {copyState === 'copied' ? (
                <CheckIcon aria-hidden="true" data-icon="inline-start" />
              ) : (
                <CopyIcon aria-hidden="true" data-icon="inline-start" />
              )}
              {copyState === 'copied' ? 'Copied' : copyState === 'error' ? 'Copy failed' : 'Copy CSS'}
            </Button>
          </div>
        </header>

        <main className="grid items-start gap-5 lg:grid-cols-[20rem_minmax(0,1fr)]">
          <aside className="rounded-xl border bg-background p-4 shadow-xs lg:sticky lg:top-6">
            <div className="mb-4">
              <h2 className="font-semibold">Style inspector</h2>
              <p className="mt-1 text-muted-foreground text-xs">
                Preview locally, then export only the CSS you changed.
              </p>
            </div>

            <fieldset className="grid grid-cols-2 gap-1 rounded-lg bg-muted p-1">
              <legend className="sr-only">Style scope</legend>
              <Button
                aria-pressed={editorMode === 'component'}
                className="w-full"
                onClick={() => setEditorMode('component')}
                size="sm"
                type="button"
                variant={editorMode === 'component' ? 'secondary' : 'ghost'}
              >
                Components
              </Button>
              <Button
                aria-pressed={editorMode === 'theme'}
                className="w-full"
                onClick={() => setEditorMode('theme')}
                size="sm"
                type="button"
                variant={editorMode === 'theme' ? 'secondary' : 'ghost'}
              >
                Theme
              </Button>
            </fieldset>

            {editorMode === 'component' ? (
              <ComponentEditor
                component={selectedComponent}
                onChange={updateComponent}
                onComponentChange={setSelectedComponent}
                onReset={resetComponent}
                override={componentOverrides[selectedComponent]}
                theme={theme}
              />
            ) : (
              <ThemeEditor onChange={updateTheme} theme={theme} />
            )}
          </aside>

          <div className="min-w-0 space-y-5">
            <style>{previewCss}</style>
            <section
              className="style-studio-preview overflow-hidden rounded-2xl border bg-background p-4 text-foreground shadow-sm sm:p-7"
              data-testid="theme-preview"
              style={previewStyle}
            >
              <div className="mx-auto max-w-5xl">
                <div className="mb-6 flex items-center justify-between gap-4 border-b pb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <SparklesIcon aria-hidden="true" className="size-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">Acme Studio</div>
                      <div className="text-muted-foreground text-xs">Live component preview</div>
                    </div>
                  </div>
                  <Badge variant="secondary">Draft theme</Badge>
                </div>

                <div className="grid gap-4 2xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
                  <Card>
                    <CardHeader>
                      <CardTitle>Design system activity</CardTitle>
                      <CardDescription>Component adoption across your workspace.</CardDescription>
                      <CardAction>
                        <Badge>+18%</Badge>
                      </CardAction>
                    </CardHeader>
                    <CardContent className="space-y-5">
                      <div>
                        <div className="flex items-end justify-between gap-4">
                          <div>
                            <div className="text-muted-foreground text-xs">Components in production</div>
                            <div className="mt-1 font-semibold text-3xl tracking-tight">48</div>
                          </div>
                          <span className="text-muted-foreground text-xs">68% coverage</span>
                        </div>
                        <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
                          <div className="h-full w-[68%] rounded-full bg-primary" />
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          ['Tokens', '126'],
                          ['Themes', '4'],
                          ['Updates', '12']
                        ].map(([label, value]) => (
                          <div className="rounded-lg border bg-muted/35 p-3" key={label}>
                            <div className="font-semibold">{value}</div>
                            <div className="mt-0.5 text-muted-foreground text-xs">{label}</div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="gap-2">
                      <Button type="button">Publish theme</Button>
                      <Button type="button" variant="outline">
                        View changes
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Create token set</CardTitle>
                      <CardDescription>Start from a semantic color foundation.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form className="space-y-4" onSubmit={(event) => event.preventDefault()}>
                        <div className="space-y-2">
                          <Label htmlFor="preview-name">Name</Label>
                          <Input id="preview-name" placeholder="Marketing theme" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="preview-base">Base palette</Label>
                          <NativeSelect className="w-full" defaultValue="neutral" id="preview-base">
                            <NativeSelectOption value="neutral">Neutral</NativeSelectOption>
                            <NativeSelectOption value="stone">Stone</NativeSelectOption>
                            <NativeSelectOption value="slate">Slate</NativeSelectOption>
                          </NativeSelect>
                        </div>
                        <div className="flex items-center justify-between rounded-lg border p-3">
                          <div>
                            <Label htmlFor="preview-sync">Auto-sync</Label>
                            <p className="mt-1 text-muted-foreground text-xs">Publish token changes automatically.</p>
                          </div>
                          <Switch defaultChecked id="preview-sync" />
                        </div>
                        <Button className="w-full" type="submit">
                          Create token set
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-4 rounded-xl border bg-card p-4">
                  <div className="mb-3 font-medium text-sm">Component states</div>
                  <div className="flex flex-wrap gap-2">
                    <Button type="button">Primary</Button>
                    <Button type="button" variant="secondary">
                      Secondary
                    </Button>
                    <Button type="button" variant="outline">
                      Outline
                    </Button>
                    <Button type="button" variant="ghost">
                      Ghost
                    </Button>
                    <Button disabled type="button">
                      Disabled
                    </Button>
                  </div>
                </div>
              </div>
            </section>

            <section className="overflow-hidden rounded-xl border bg-zinc-950 text-zinc-100 shadow-sm">
              <div className="flex items-center justify-between border-zinc-800 border-b px-4 py-3">
                <div>
                  <h2 className="font-medium text-sm">Generated CSS</h2>
                  <p className="text-xs text-zinc-400">Load after @packages/ui/styles.css.</p>
                </div>
                <Badge className="border-zinc-700 text-zinc-300" variant="outline">
                  Theme + overrides
                </Badge>
              </div>
              <pre className="max-h-64 overflow-auto p-4 font-mono text-xs leading-5" data-testid="css-output">
                <code>{css}</code>
              </pre>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}

const meta = {
  parameters: {
    docs: {
      description: {
        component:
          'A visual workspace for tuning shared tokens or isolated component hooks and exporting only the resulting CSS.'
      }
    },
    layout: 'fullscreen'
  },
  title: 'Playground/Style Studio'
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const ComponentStyles: Story = {
  render: () => <StyleStudio />
}

ComponentStyles.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const component = canvas.getByRole('combobox', { name: 'Component' })
  const css = canvas.getByTestId('css-output')
  const preview = within(canvas.getByTestId('theme-preview'))
  const radius = canvas.getByRole('slider', { name: 'Component radius' })
  const button = preview.getByRole('button', { name: 'Primary' })
  const card = preview.getByText('Design system activity').closest<HTMLElement>('[data-slot="card"]')
  const input = preview.getByRole('textbox', { name: 'Name' })

  if (!card) {
    throw new Error('Card preview was not found.')
  }

  const initial = {
    button: getComputedStyle(button).borderRadius,
    card: getComputedStyle(card).borderRadius,
    css: css.textContent,
    input: getComputedStyle(input).borderRadius
  }

  await expect(canvas.getByRole('heading', { name: 'Component style studio' })).toBeVisible()
  await fireEvent.change(radius, { target: { value: '20' } })

  await userEvent.selectOptions(component, 'card')
  await expect(radius).toHaveValue('10')
  await fireEvent.change(radius, { target: { value: '14' } })

  await userEvent.selectOptions(component, 'input')
  await expect(radius).toHaveValue('8')

  await waitFor(() => {
    expect(getComputedStyle(button).borderRadius).toBe('20px')
    expect(getComputedStyle(card).borderRadius).toBe('14px')
    expect(getComputedStyle(input).borderRadius).toBe(initial.input)
  })

  await expect(css).toHaveTextContent(/\.cn-button\s*\{\s*border-radius:\s*20px;\s*\}/)
  await expect(css).toHaveTextContent(/\.cn-card\s*\{\s*border-radius:\s*14px;\s*\}/)
  await expect(css.textContent).not.toContain('.cn-input {')

  await userEvent.click(canvas.getByRole('button', { name: 'Reset' }))

  await waitFor(() => {
    expect(getComputedStyle(button).borderRadius).toBe(initial.button)
    expect(getComputedStyle(card).borderRadius).toBe(initial.card)
    expect(getComputedStyle(input).borderRadius).toBe(initial.input)
    expect(css.textContent).toBe(initial.css)
  })
}
