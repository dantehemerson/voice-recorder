import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Chronometer, ChronometerProps } from './Chronometer';

export default {
  component: Chronometer,
  title: 'Timer',
} as ComponentMeta<typeof Chronometer>;

const Template: ComponentStory<typeof Chronometer> = (
  args: ChronometerProps
) => <Chronometer {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  mm: 24,
  ss: 8,
  ms: 123,
};
