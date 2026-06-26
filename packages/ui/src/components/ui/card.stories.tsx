import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";

const meta = {
  title: "UI/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-[360px]">
      <CardHeader>
        <CardTitle>Design tokens</CardTitle>
        <CardDescription>Package shared UI tokens with components.</CardDescription>
        <CardAction>
          <Button size="sm" variant="outline">
            Sync
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Build primitives in a shadcn-like structure while keeping them easy to
          theme and test.
        </p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Open library</Button>
      </CardFooter>
    </Card>
  ),
};
