import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./button";

const meta = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Button wraps Base UI's unstyled Button primitive with shared design-token variants, sizes, focus states, and disabled behavior. Use it for actions, form controls, toolbar commands, and icon-only controls. For native form submission, pass `type=\"submit\"` explicitly. See the [Base UI Button documentation](https://base-ui.com/react/components/button).",
      },
    },
  },
  argTypes: {
    size: {
      control: "select",
      description: "Controls the button height and horizontal padding.",
      options: ["default", "sm", "lg", "icon"],
      table: {
        defaultValue: { summary: "default" },
        type: { summary: '"default" | "sm" | "lg" | "icon"' },
      },
    },
    variant: {
      control: "select",
      description: "Controls the visual treatment for the button action.",
      options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
      table: {
        defaultValue: { summary: "default" },
        type: {
          summary:
            '"default" | "destructive" | "outline" | "secondary" | "ghost" | "link"',
        },
      },
    },
  },
  args: {
    children: "Button",
    size: "default",
    variant: "default",
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithRender: Story = {
  args: {
    children: "Open tokens",
    variant: "outline",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Uses Base UI's render composition for non-native button surfaces. Keep this for button semantics, not navigation links.",
      },
    },
  },
  render: (args) => {
    return (
      <Button
        {...args}
        nativeButton={false}
        render={(props, state) => (
          <div
            {...props}
            aria-disabled={state.disabled || undefined}
          />
        )}
      />
    );
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};
