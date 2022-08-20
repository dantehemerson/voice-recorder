import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Timer, TimerProps } from './Timer';

export default {
  component: Timer,
  title: 'Timer',
} as ComponentMeta<typeof Timer>;

const Template: ComponentStory<typeof Timer> = (args: TimerProps) => (
  <Timer {...args} />
);

export const Primary = Template.bind({});

Primary.args = {
  mm: 24,
  ss: 8,
  ms: 123,
};
